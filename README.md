# Portal CEISC - Plataforma EAD

Portal web completo para educação jurídica com sistema de cursos, aulas, banco de questões, simulados e área do professor.

## 🚀 Tecnologias

- **Framework:** React 18 + TypeScript + Vite
- **UI:** Tailwind CSS + shadcn/ui + lucide-react
- **Estado:** Zustand (gerenciamento de estado)
- **Roteamento:** React Router v6
- **API:** Axios + MSW (Mock Service Worker)
- **Forms:** React Hook Form + Zod
- **Qualidade:** ESLint + TypeScript

## 📦 Instalação e Execução

### Pré-requisitos

- Node.js 18+ e npm/yarn

### Passos

```bash
# 1. Clonar o repositório
git clone <repository-url>
cd <project-name>

# 2. Instalar dependências
npm install

# 3. Iniciar desenvolvimento (mock ativa automaticamente)
npm run dev

# 4. Abrir no navegador
# http://localhost:8080
```

### Scripts Disponíveis

```bash
npm run dev          # Inicia servidor de desenvolvimento com mock
npm run build        # Build para produção
npm run preview      # Preview do build de produção
npm run lint         # Verifica qualidade do código
```

## 🔐 Credenciais de Teste

O sistema possui 3 perfis de usuário mockados:

### Aluno
- **CPF:** 123.456.789-00
- **Senha:** 123456
- **Email:** aluno@ceisc.com.br

### Professor
- **CPF:** 987.654.321-00
- **Senha:** 123456
- **Email:** professor@ceisc.com.br

### Admin
- **CPF:** 111.222.333-44
- **Senha:** 123456
- **Email:** admin@ceisc.com.br

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Layout/         # Layout principal (sidebar, topbar)
│   ├── ui/             # Componentes shadcn/ui
│   └── ProtectedRoute.tsx
├── pages/              # Páginas da aplicação
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   ├── Cursos.tsx
│   └── CursoDetalhes.tsx
├── mocks/              # Mock Service Worker
│   ├── data/          # Dados mockados
│   ├── handlers.ts    # Handlers das rotas
│   └── browser.ts     # Configuração MSW
├── store/              # Zustand stores
│   └── useAuthStore.ts
├── lib/                # Utilitários
│   ├── api.ts         # Cliente axios
│   └── utils.ts
├── types/              # TypeScript types
│   └── index.ts
└── hooks/              # Custom hooks
```

## 🔄 Mock API

O mock está configurado com MSW e intercepta automaticamente todas as chamadas para `/api/*`.

### Endpoints Disponíveis

#### Autenticação
- `POST /api/auth/login` - Login
- `POST /api/auth/recuperar-senha` - Recuperar senha
- `POST /api/auth/validar-token` - Validar token de recuperação
- `POST /api/auth/redefinir-senha` - Redefinir senha
- `GET /api/me` - Dados do usuário logado

#### Cursos
- `GET /api/cursos` - Lista todos os cursos
- `GET /api/cursos/:id` - Detalhes de um curso

#### Avisos
- `GET /api/avisos?cursoId=xxx` - Lista avisos (filtráveis por curso)

### Modificar Dados Mock

Os dados mockados estão em `src/mocks/data/`:
- `users.ts` - Usuários e credenciais
- `courses.ts` - Cursos, módulos, disciplinas e aulas
- `avisos.ts` - Avisos e notificações

## 🎨 Design System

O projeto utiliza um design system robusto baseado em:

### Cores Principais
- **Primary:** Azul profissional (educação jurídica)
- **Accent:** Dourado (excelência e destaque)
- **Gradientes:** Sutis para hero sections
- **Modo:** Claro e escuro

### Tokens CSS
Todos os estilos são definidos via tokens CSS em `src/index.css`:
- `--primary`, `--accent`, `--success`, etc.
- `--gradient-hero`, `--gradient-card`
- `--shadow-card`, `--shadow-elevated`

### Componentes shadcn/ui
Todos os componentes são customizáveis via `tailwind.config.ts` e seguem o design system.

## 🔒 Autenticação

- **Persistência:** LocalStorage via Zustand
- **Token:** JWT mockado
- **Rotas protegidas:** Via `ProtectedRoute` component
- **Interceptor:** Axios adiciona token automaticamente
- **Redirecionamento:** 401 redireciona para login

## 📱 Responsividade

- Mobile-first design
- Sidebar colapsável
- Cards adaptáveis
- Tabelas transformam em cards em mobile

## ♿ Acessibilidade

- Componentes shadcn/ui são acessíveis por padrão
- Navegação por teclado
- ARIA labels apropriados
- Contraste de cores WCAG AA

## 🧪 Testes

(Estrutura preparada para testes futuros)

```bash
# Quando implementados:
npm run test         # Executar testes
npm run test:watch   # Modo watch
```

## 📋 Funcionalidades Implementadas

### ✅ MVP - Fase 1

- [x] Sistema de autenticação completo
- [x] Recuperação de senha
- [x] Dashboard do aluno
- [x] Listagem de cursos (ativos e concluídos)
- [x] Detalhes do curso (módulos, disciplinas, aulas)
- [x] Quadro de avisos
- [x] Área do professor (estrutura)
- [x] Layout responsivo com sidebar
- [x] Mock completo com MSW

### 🚧 Próximas Implementações

- [ ] Player de vídeo integrado
- [ ] Banco de questões
- [ ] Simulados (objetivos e discursivos)
- [ ] Cronograma de estudos
- [ ] Anotações
- [ ] Sistema de certificados
- [ ] TCC para pós-graduação
- [ ] Chat com professor
- [ ] Livraria
- [ ] Área financeira

## 🏗️ Arquitetura e Decisões

### Zustand vs Redux
Optamos por Zustand pela simplicidade e menor boilerplate, ideal para o escopo do projeto.

### MSW vs JSON Server
MSW foi escolhido por:
- Interceptar requests no nível do service worker
- Não precisar de servidor adicional
- Melhor para simular comportamento real de API
- Facilita transição para API real

### Estrutura de Pastas
Organização por tipo (components, pages, mocks) facilita navegação e manutenção.

## 🔄 Migração para API Real

Quando a API backend estiver pronta:

1. Desabilitar MSW no `src/main.tsx`
2. Atualizar `baseURL` no `src/lib/api.ts`
3. Ajustar tipos TypeScript se necessário
4. Testar endpoints com Postman/Insomnia

## 🐛 Debugging

### Logs MSW
O MSW loga todas as requisições interceptadas no console:
```
[MSW] GET /api/cursos (200 OK)
```

### DevTools
- React Developer Tools
- Redux DevTools (Zustand é compatível)

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit: `git commit -m 'Add nova funcionalidade'`
4. Push: `git push origin feature/nova-funcionalidade`
5. Pull Request

## 📝 Licença

Projeto proprietário - CEISC © 2025

## 📞 Suporte

- **Email:** suporte@ceisc.com.br
- **Documentação:** [docs.ceisc.com.br](https://docs.ceisc.com.br)

---

**Desenvolvido com ❤️ para CEISC**
