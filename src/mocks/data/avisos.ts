import { Aviso } from '@/types';

export const avisos: Aviso[] = [
  {
    id: '1',
    titulo: 'Bem-vindo ao Portal CEISC!',
    conteudo:
      'Estamos felizes em tê-lo conosco. Explore os recursos da plataforma e tire o máximo proveito dos cursos.',
    dataPublicacao: '2025-01-10',
    fixado: true,
  },
  {
    id: '2',
    titulo: 'Novo simulado disponível',
    conteudo:
      'O simulado da 1ª fase da OAB já está disponível. Acesse a área de simulados e teste seus conhecimentos!',
    dataPublicacao: '2025-01-18',
    fixado: true,
    cursoId: '1',
  },
  {
    id: '3',
    titulo: 'Manutenção programada',
    conteudo:
      'O sistema ficará em manutenção no dia 25/01 das 00h às 04h. Pedimos desculpas pelo transtorno.',
    dataPublicacao: '2025-01-20',
    fixado: false,
  },
];
