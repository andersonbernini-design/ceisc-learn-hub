export interface User {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  perfil: 'aluno' | 'professor' | 'admin';
  avatar?: string;
  tempoEstudo?: string;
  turnoEstudo?: string;
  preferenciaEstudo?: string;
  deficiencias?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Course {
  id: string;
  titulo: string;
  descricao: string;
  categoria: 'oab_1fase' | 'oab_2fase' | 'concursos' | 'pos_graduacao' | 'mentoria';
  cargaHoraria: number;
  progresso: number;
  status: 'ativo' | 'concluido' | 'anterior';
  dataInicio: string;
  dataFim?: string;
  thumbnail: string;
  professor: string;
  modulos: Module[];
}

export interface Module {
  id: string;
  titulo: string;
  descricao: string;
  ordem: number;
  disciplinas: Disciplina[];
}

export interface Disciplina {
  id: string;
  titulo: string;
  descricao: string;
  ordem: number;
  aulas: Aula[];
}

export interface Aula {
  id: string;
  titulo: string;
  descricao: string;
  tipo: 'video' | 'material' | 'ao_vivo';
  duracao: number;
  videoUrl?: string;
  concluida: boolean;
  ordem: number;
  dataPublicacao: string;
  materiais: Material[];
}

export interface Material {
  id: string;
  titulo: string;
  tipo: 'pdf' | 'mapa_mental' | 'apostila' | 'podcast';
  url: string;
  tamanho: string;
}

export interface Questao {
  id: string;
  enunciado: string;
  tipo: 'objetiva' | 'discursiva';
  alternativas?: Alternativa[];
  disciplina: string;
  assunto: string;
  dificuldade: 'facil' | 'medio' | 'dificil';
  gabarito?: string;
  explicacao?: string;
  videoExplicacao?: string;
}

export interface Alternativa {
  id: string;
  texto: string;
  correta: boolean;
}

export interface Simulado {
  id: string;
  titulo: string;
  descricao: string;
  tipo: 'objetivo' | 'discursivo';
  dataPublicacao: string;
  dataLiberacaoGabarito: string;
  duracao: number;
  questoes: Questao[];
  status: 'pendente' | 'em_andamento' | 'concluido';
  nota?: number;
}

export interface Aviso {
  id: string;
  titulo: string;
  conteudo: string;
  dataPublicacao: string;
  fixado: boolean;
  cursoId?: string;
}

export interface Anotacao {
  id: string;
  conteudo: string;
  tipo: 'aula' | 'material' | 'questao' | 'simulado';
  referenciaId: string;
  disciplina: string;
  dataCriacao: string;
  dataAtualizacao: string;
}
