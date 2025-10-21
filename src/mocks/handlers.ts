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

  // AULAS
  http.get('/api/cursos/:id/aulas', async ({ params }) => {
    await delay(300);
    const curso = courses.find((c) => c.id === params.id);
    
    if (!curso) {
      return new HttpResponse(null, { status: 404 });
    }

    const todasAulas = curso.modulos.flatMap(m => 
      m.disciplinas.flatMap(d => 
        d.aulas.map(a => ({
          ...a,
          moduloId: m.id,
          moduloTitulo: m.titulo,
          disciplinaId: d.id,
          disciplinaTitulo: d.titulo,
        }))
      )
    );

    return HttpResponse.json(todasAulas);
  }),

  http.get('/api/aulas/:id', async ({ params }) => {
    await delay(300);
    
    for (const curso of courses) {
      for (const modulo of curso.modulos) {
        for (const disciplina of modulo.disciplinas) {
          const aula = disciplina.aulas.find(a => a.id === params.id);
          if (aula) {
            return HttpResponse.json({
              ...aula,
              moduloId: modulo.id,
              moduloTitulo: modulo.titulo,
              disciplinaId: disciplina.id,
              disciplinaTitulo: disciplina.titulo,
              cursoId: curso.id,
              cursoTitulo: curso.titulo,
            });
          }
        }
      }
    }

    return new HttpResponse(null, { status: 404 });
  }),

  http.put('/api/aulas/:id/progresso', async ({ request }) => {
    await delay(300);
    const body = await request.json();
    console.log('Progresso atualizado:', body);
    return HttpResponse.json({ success: true });
  }),

  http.post('/api/aulas/:id/concluir', async () => {
    await delay(300);
    return HttpResponse.json({ success: true });
  }),
];
