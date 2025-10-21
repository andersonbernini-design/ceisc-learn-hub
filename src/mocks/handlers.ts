import { http, HttpResponse, delay } from 'msw';
import { users, credentials } from './data/users';
import { courses } from './data/courses';
import { avisos } from './data/avisos';

const MOCK_TOKEN = 'mock-jwt-token-ceisc-2025';

export const handlers = [
  // AUTH
  http.post('/api/auth/login', async ({ request }) => {
    await delay(500);
    const body = await request.json() as { cpf: string; senha: string };
    
    const user = users.find(u => u.cpf === body.cpf);
    
    if (!user) {
      return HttpResponse.json(
        { message: 'CPF não encontrado' },
        { status: 404 }
      );
    }

    const isValidCredential = Object.values(credentials).some(
      cred => cred.cpf === body.cpf && cred.senha === body.senha
    );

    if (!isValidCredential) {
      return HttpResponse.json(
        { message: 'Senha incorreta' },
        { status: 401 }
      );
    }

    return HttpResponse.json({
      token: MOCK_TOKEN,
      user,
    });
  }),

  http.post('/api/auth/recuperar-senha', async ({ request }) => {
    await delay(500);
    const body = await request.json() as { cpf: string };
    
    const user = users.find(u => u.cpf === body.cpf);
    
    if (!user) {
      return HttpResponse.json(
        { message: 'CPF não encontrado' },
        { status: 404 }
      );
    }

    return HttpResponse.json({
      message: 'Token enviado para o email cadastrado',
      email: user.email,
    });
  }),

  http.post('/api/auth/validar-token', async ({ request }) => {
    await delay(500);
    const body = await request.json() as { token: string };
    
    if (body.token === '123456') {
      return HttpResponse.json({ valid: true });
    }

    return HttpResponse.json(
      { message: 'Token inválido' },
      { status: 400 }
    );
  }),

  http.post('/api/auth/redefinir-senha', async ({ request }) => {
    await delay(500);
    return HttpResponse.json({
      message: 'Senha redefinida com sucesso',
    });
  }),

  http.get('/api/me', async ({ request }) => {
    await delay(300);
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.includes(MOCK_TOKEN)) {
      return HttpResponse.json(
        { message: 'Não autorizado' },
        { status: 401 }
      );
    }

    return HttpResponse.json(users[0]);
  }),

  // CURSOS
  http.get('/api/cursos', async () => {
    await delay(300);
    return HttpResponse.json(courses);
  }),

  http.get('/api/cursos/:id', async ({ params }) => {
    await delay(300);
    const course = courses.find(c => c.id === params.id);
    
    if (!course) {
      return HttpResponse.json(
        { message: 'Curso não encontrado' },
        { status: 404 }
      );
    }

    return HttpResponse.json(course);
  }),

  // AVISOS
  http.get('/api/avisos', async ({ request }) => {
    await delay(300);
    const url = new URL(request.url);
    const cursoId = url.searchParams.get('cursoId');

    let filteredAvisos = avisos;
    if (cursoId) {
      filteredAvisos = avisos.filter(a => !a.cursoId || a.cursoId === cursoId);
    }

    return HttpResponse.json(filteredAvisos);
  }),
];
