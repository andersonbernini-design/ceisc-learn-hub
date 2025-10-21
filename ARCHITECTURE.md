# Arquitetura do Portal CEISC

## Visão Geral

O Portal CEISC é uma Single Page Application (SPA) construída com React e TypeScript, seguindo princípios de arquitetura limpa e componentização.

## Camadas da Aplicação

### 1. Apresentação (UI Layer)
- **Componentes:** React components com shadcn/ui
- **Páginas:** Containers de alto nível
- **Layout:** Estrutura global (sidebar, topbar)

### 2. Estado (State Layer)
- **Zustand:** Gerenciamento de estado global
- **React Query:** Cache de dados assíncronos (futuro)
- **Form State:** React Hook Form

### 3. Lógica de Negócio (Business Layer)
- **Hooks personalizados:** Lógica reutilizável
- **Utils:** Funções auxiliares
- **Validações:** Schemas Zod

### 4. Dados (Data Layer)
- **API Client:** Axios configurado
- **Mock:** MSW para desenvolvimento
- **Types:** Interfaces TypeScript

## Fluxo de Dados

```
User Action
    ↓
Component
    ↓
Hook/Store (Zustand)
    ↓
API Call (Axios)
    ↓
MSW (Dev) / Real API (Prod)
    ↓
Response Processing
    ↓
State Update (Zustand)
    ↓
Component Re-render
```

## Padrões Utilizados

### 1. Container/Presenter
- Pages são containers
- Components são presenters

### 2. Composição
- Componentes pequenos e focados
- Reusabilidade máxima

### 3. Separation of Concerns
- Cada arquivo tem uma responsabilidade clara

### 4. Type Safety
- TypeScript em todos os arquivos
- Interfaces bem definidas

## Estrutura de Rotas

```
/ (redirect)
  ├── /login (public)
  ├── /recuperar-senha (public)
  └── /dashboard (protected)
      ├── /cursos (protected)
      │   └── /:id (protected)
      │       └── /aula/:aulaId (protected)
      ├── /questoes (protected)
      ├── /simulados (protected)
      ├── /cronograma (protected)
      └── /livraria (protected)
```

## Gerenciamento de Estado

### Estado Global (Zustand)
- Autenticação (user, token)
- Preferências do usuário
- Tema (futuro)

### Estado Local (useState)
- Loading states
- Form inputs
- UI states

### Estado do Servidor (React Query - futuro)
- Cache de cursos
- Cache de questões
- Invalidação automática

## Segurança

### Client-Side
- Token JWT no localStorage
- Rotas protegidas via HOC
- Validação de perfis

### API Layer
- Interceptor adiciona token
- Tratamento de erros 401
- Redirecionamento automático

## Performance

### Code Splitting
- React.lazy para rotas (futuro)
- Componentes sob demanda

### Memoization
- useMemo para cálculos pesados
- useCallback para funções

### Otimizações
- Debounce em buscas
- Paginação de listas
- Lazy loading de imagens

## Escalabilidade

### Modular
- Cada feature pode ser desenvolvida independentemente
- Fácil adicionar novos módulos

### Type-Safe
- TypeScript previne muitos bugs
- Refatorações seguras

### Testável
- Componentes isolados
- Mocks bem definidos
- Hooks testáveis

## Convenções de Código

### Nomenclatura
- Components: PascalCase
- Files: PascalCase para components
- Hooks: camelCase com use prefix
- Types: PascalCase

### Estrutura de Arquivos
```
ComponentName/
  ├── index.tsx (component)
  ├── ComponentName.types.ts (types)
  └── ComponentName.test.tsx (tests)
```

### Imports
```typescript
// 1. External
import React from 'react';
import { useQuery } from '@tanstack/react-query';

// 2. Internal
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/useAuthStore';

// 3. Types
import { User, Course } from '@/types';

// 4. Styles
import './styles.css';
```

## Design System

### Tokens
Definidos em `src/index.css`:
- Cores HSL
- Espaçamentos
- Tipografia
- Sombras
- Animações

### Components
shadcn/ui + customizações:
- Mantêm consistência
- Altamente customizáveis
- Acessíveis por padrão

## Fluxo de Autenticação

```
1. User entra credenciais
2. POST /api/auth/login
3. Recebe { user, token }
4. Store salva no Zustand + localStorage
5. Axios interceptor adiciona token
6. Navegação para /dashboard
7. ProtectedRoute valida autenticação
8. Se inválido, redirect para /login
```

## Futuras Melhorias

### Técnicas
- [ ] Implementar React Query
- [ ] Adicionar testes unitários (Vitest)
- [ ] Adicionar testes E2E (Playwright)
- [ ] Implementar Storybook
- [ ] PWA capabilities
- [ ] Service Worker para offline

### Features
- [ ] i18n completo (pt-BR)
- [ ] Tema customizável
- [ ] Notificações push
- [ ] Chat em tempo real
- [ ] Upload de arquivos
- [ ] Edição rich text

## Dependências Principais

```json
{
  "react": "^18.3.1",
  "typescript": "latest",
  "vite": "latest",
  "zustand": "latest",
  "axios": "latest",
  "msw": "latest",
  "react-router-dom": "^6.30.1",
  "react-hook-form": "^7.61.1",
  "zod": "^3.25.76"
}
```

## Ambiente de Desenvolvimento

### Requisitos
- Node.js 18+
- npm/yarn
- Editor com TypeScript support

### Ferramentas
- ESLint (linting)
- Prettier (formatação)
- TypeScript (type checking)
- Vite (bundling)

## Deployment

### Build
```bash
npm run build
# Gera pasta dist/
```

### Preview
```bash
npm run preview
# Testa build localmente
```

### Produção
- Desabilitar MSW
- Configurar variáveis de ambiente
- Apontar para API real
- Deploy em Vercel/Netlify/AWS

---

**Última atualização:** Janeiro 2025
