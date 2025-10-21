import { User } from '@/types';

export const users: User[] = [
  {
    id: '1',
    nome: 'João Silva',
    email: 'aluno@ceisc.com.br',
    cpf: '123.456.789-00',
    perfil: 'aluno',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=joao',
    tempoEstudo: '2-4h',
    turnoEstudo: 'noite',
    preferenciaEstudo: 'video',
  },
  {
    id: '2',
    nome: 'Maria Santos',
    email: 'professor@ceisc.com.br',
    cpf: '987.654.321-00',
    perfil: 'professor',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
  },
  {
    id: '3',
    nome: 'Admin CEISC',
    email: 'admin@ceisc.com.br',
    cpf: '111.222.333-44',
    perfil: 'admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
  },
];

// Senha padrão: 123456
export const credentials = {
  aluno: { cpf: '123.456.789-00', senha: '123456' },
  professor: { cpf: '987.654.321-00', senha: '123456' },
  admin: { cpf: '111.222.333-44', senha: '123456' },
};
