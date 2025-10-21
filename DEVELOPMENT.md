# Guia de Desenvolvimento - Portal CEISC

## Próximas Funcionalidades a Implementar

### 1. Player de Vídeo Integrado

```typescript
// src/pages/AulaPlayer.tsx
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player'; // adicionar dependência

export default function AulaPlayer() {
  const { cursoId, aulaId } = useParams();
  
  // Buscar dados da aula
  // Implementar controles personalizados
  // Marcar como concluída
  // Integrar com anotações
  
  return (
    <div>
      <ReactPlayer url="video-url" />
      {/* Sidebar com anotações, materiais, etc */}
    </div>
  );
}
```

### 2. Banco de Questões Completo

**Arquivos necessários:**
- `src/pages/Questoes.tsx` - já criado (placeholder)
- `src/components/Questao/QuestaoCard.tsx`
- `src/components/Questao/FiltrosQuestoes.tsx`
- `src/mocks/data/questoes.ts`

**Mock adicional:**
```typescript
// Adicionar em src/mocks/handlers.ts
http.get('/api/questoes', async ({ request }) => {
  const url = new URL(request.url);
  const disciplina = url.searchParams.get('disciplina');
  const dificuldade = url.searchParams.get('dificuldade');
  
  // Filtrar questões
  return HttpResponse.json(filteredQuestoes);
});
```

### 3. Sistema de Anotações

**Store:**
```typescript
// src/store/useNotesStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Note {
  id: string;
  content: string;
  timestamp: number;
  type: 'aula' | 'questao' | 'material';
  referenceId: string;
}

interface NotesState {
  notes: Note[];
  addNote: (note: Omit<Note, 'id'>) => void;
  updateNote: (id: string, content: string) => void;
  deleteNote: (id: string) => void;
}

export const useNotesStore = create<NotesState>()(
  persist(
    (set) => ({
      notes: [],
      addNote: (note) => set((state) => ({
        notes: [...state.notes, { ...note, id: crypto.randomUUID() }]
      })),
      // ... outras funções
    }),
    { name: 'notes-storage' }
  )
);
```

### 4. Cronograma Interativo

**Dependências:**
```bash
npm install @fullcalendar/react @fullcalendar/daygrid
```

**Componente:**
```typescript
// src/pages/Cronograma.tsx
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

export default function Cronograma() {
  const events = [
    { title: 'Aula de Constitucional', date: '2025-01-20' },
    // ...
  ];
  
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events}
      locale="pt-br"
    />
  );
}
```

### 5. Chat com Professor

**Dependências:**
```bash
npm install socket.io-client
```

**Implementação:**
```typescript
// src/lib/socket.ts
import { io } from 'socket.io-client';

export const socket = io('ws://localhost:3000', {
  autoConnect: false,
  auth: {
    token: localStorage.getItem('token')
  }
});

// src/pages/Chat.tsx
import { useEffect, useState } from 'react';
import { socket } from '@/lib/socket';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    socket.connect();
    
    socket.on('message', (msg) => {
      setMessages(prev => [...prev, msg]);
    });
    
    return () => socket.disconnect();
  }, []);
  
  // UI do chat
}
```

### 6. Sistema de Upload de Arquivos

```typescript
// src/components/FileUpload.tsx
import { useState } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function FileUpload({ onUpload }) {
  const [file, setFile] = useState(null);
  
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    
    // Mock ou real API
    await api.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    
    onUpload();
  };
  
  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <Button onClick={handleUpload}>
        <Upload /> Enviar
      </Button>
    </div>
  );
}
```

## Integrações Externas

### 1. Plataforma de Vídeo (Vimeo/YouTube)

```typescript
// src/lib/videoService.ts
export class VideoService {
  static async getVideoUrl(videoId: string) {
    // Integração com Vimeo ou YouTube
    return `https://player.vimeo.com/video/${videoId}`;
  }
  
  static async trackProgress(videoId: string, progress: number) {
    // Salvar progresso
    await api.post('/videos/progress', { videoId, progress });
  }
}
```

### 2. Sistema de Pagamentos (Stripe/PagSeguro)

```typescript
// src/lib/paymentService.ts
export class PaymentService {
  static async createCheckoutSession(courseId: string) {
    const response = await api.post('/payments/checkout', {
      courseId
    });
    
    // Redirecionar para checkout
    window.location.href = response.data.checkoutUrl;
  }
}
```

### 3. Certificados (Canvas API)

```typescript
// src/lib/certificateService.ts
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export class CertificateService {
  static async generate(userName: string, courseName: string) {
    const element = document.getElementById('certificate-template');
    const canvas = await html2canvas(element);
    
    const pdf = new jsPDF('landscape');
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 0, 0, 297, 210);
    pdf.save(`certificado-${courseName}.pdf`);
  }
}
```

## Otimizações de Performance

### 1. Code Splitting

```typescript
// src/App.tsx
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Cursos = lazy(() => import('./pages/Cursos'));

// Em Routes
<Suspense fallback={<Loading />}>
  <Route path="/dashboard" element={<Dashboard />} />
</Suspense>
```

### 2. React Query para Cache

```bash
npm install @tanstack/react-query
```

```typescript
// src/lib/queries.ts
import { useQuery } from '@tanstack/react-query';

export function useCourses() {
  return useQuery({
    queryKey: ['courses'],
    queryFn: () => api.get('/cursos').then(res => res.data),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
}
```

### 3. Virtual Scrolling para Listas Longas

```bash
npm install @tanstack/react-virtual
```

```typescript
import { useVirtualizer } from '@tanstack/react-virtual';

export function QuestoesList({ questoes }) {
  const parentRef = useRef(null);
  
  const virtualizer = useVirtualizer({
    count: questoes.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
  });
  
  // Renderizar apenas items visíveis
}
```

## Testes

### 1. Setup de Testes

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
});
```

### 2. Exemplo de Teste

```typescript
// src/components/__tests__/Login.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Login from '@/pages/Login';

describe('Login', () => {
  it('should render login form', () => {
    render(<Login />);
    expect(screen.getByLabelText('CPF')).toBeInTheDocument();
    expect(screen.getByLabelText('Senha')).toBeInTheDocument();
  });
  
  it('should show error for invalid CPF', async () => {
    render(<Login />);
    const cpfInput = screen.getByLabelText('CPF');
    fireEvent.change(cpfInput, { target: { value: '123' } });
    fireEvent.submit(screen.getByRole('button', { name: /entrar/i }));
    
    expect(await screen.findByText('CPF inválido')).toBeInTheDocument();
  });
});
```

## Storybook

### 1. Setup

```bash
npx storybook@latest init
```

### 2. Exemplo de Story

```typescript
// src/components/ui/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Button',
    variant: 'default',
  },
};

export const Accent: Story = {
  args: {
    children: 'Accent Button',
    variant: 'accent',
  },
};
```

## Migração para Backend Real

### 1. Atualizar API Client

```typescript
// src/lib/api.ts
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  // ...
});
```

### 2. Desabilitar MSW

```typescript
// src/main.tsx
async function enableMocking() {
  if (import.meta.env.VITE_USE_MOCK === 'true') {
    const { worker } = await import('./mocks/browser');
    return worker.start();
  }
}
```

### 3. Variáveis de Ambiente

```env
# .env.development
VITE_USE_MOCK=true
VITE_API_URL=http://localhost:8080/api

# .env.production
VITE_USE_MOCK=false
VITE_API_URL=https://api.ceisc.com.br/v1
```

## Analytics e Monitoramento

### 1. Google Analytics

```bash
npm install react-ga4
```

```typescript
// src/lib/analytics.ts
import ReactGA from 'react-ga4';

export const initGA = () => {
  ReactGA.initialize('G-XXXXXXXXXX');
};

export const logPageView = (path: string) => {
  ReactGA.send({ hitType: 'pageview', page: path });
};
```

### 2. Sentry (Error Tracking)

```bash
npm install @sentry/react
```

```typescript
// src/main.tsx
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
});
```

## Deployment

### Vercel
```bash
npm install -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Upload dist/ folder
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8080
CMD ["npm", "run", "preview"]
```

---

**Mantenha este guia atualizado conforme o projeto evolui!**
