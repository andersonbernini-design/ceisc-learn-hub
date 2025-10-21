import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProgressoAula {
  aulaId: string;
  concluida: boolean;
  tempoAssistido: number;
  ultimoAcesso: string;
}

interface ProgressoCurso {
  cursoId: string;
  aulas: ProgressoAula[];
  ultimaAulaId?: string;
}

interface ProgressoState {
  cursos: ProgressoCurso[];
  marcarConcluida: (cursoId: string, aulaId: string) => void;
  atualizarProgresso: (cursoId: string, aulaId: string, tempoAssistido: number) => void;
  setUltimaAula: (cursoId: string, aulaId: string) => void;
  getProgressoCurso: (cursoId: string) => ProgressoCurso | undefined;
  isAulaConcluida: (cursoId: string, aulaId: string) => boolean;
  getUltimaAula: (cursoId: string) => string | undefined;
}

export const useProgressoStore = create<ProgressoState>()(
  persist(
    (set, get) => ({
      cursos: [],
      
      marcarConcluida: (cursoId, aulaId) =>
        set((state) => {
          const cursoIndex = state.cursos.findIndex((c) => c.cursoId === cursoId);
          
          if (cursoIndex === -1) {
            // Criar novo curso
            return {
              cursos: [
                ...state.cursos,
                {
                  cursoId,
                  aulas: [
                    {
                      aulaId,
                      concluida: true,
                      tempoAssistido: 0,
                      ultimoAcesso: new Date().toISOString(),
                    },
                  ],
                  ultimaAulaId: aulaId,
                },
              ],
            };
          }

          // Atualizar curso existente
          const cursoAtual = state.cursos[cursoIndex];
          const aulaIndex = cursoAtual.aulas.findIndex((a) => a.aulaId === aulaId);

          if (aulaIndex === -1) {
            // Adicionar nova aula
            return {
              cursos: state.cursos.map((c, i) =>
                i === cursoIndex
                  ? {
                      ...c,
                      aulas: [
                        ...c.aulas,
                        {
                          aulaId,
                          concluida: true,
                          tempoAssistido: 0,
                          ultimoAcesso: new Date().toISOString(),
                        },
                      ],
                      ultimaAulaId: aulaId,
                    }
                  : c
              ),
            };
          }

          // Atualizar aula existente
          return {
            cursos: state.cursos.map((c, i) =>
              i === cursoIndex
                ? {
                    ...c,
                    aulas: c.aulas.map((a, j) =>
                      j === aulaIndex
                        ? {
                            ...a,
                            concluida: true,
                            ultimoAcesso: new Date().toISOString(),
                          }
                        : a
                    ),
                    ultimaAulaId: aulaId,
                  }
                : c
            ),
          };
        }),

      atualizarProgresso: (cursoId, aulaId, tempoAssistido) =>
        set((state) => {
          const cursoIndex = state.cursos.findIndex((c) => c.cursoId === cursoId);
          
          if (cursoIndex === -1) {
            return {
              cursos: [
                ...state.cursos,
                {
                  cursoId,
                  aulas: [
                    {
                      aulaId,
                      concluida: false,
                      tempoAssistido,
                      ultimoAcesso: new Date().toISOString(),
                    },
                  ],
                  ultimaAulaId: aulaId,
                },
              ],
            };
          }

          const cursoAtual = state.cursos[cursoIndex];
          const aulaIndex = cursoAtual.aulas.findIndex((a) => a.aulaId === aulaId);

          if (aulaIndex === -1) {
            return {
              cursos: state.cursos.map((c, i) =>
                i === cursoIndex
                  ? {
                      ...c,
                      aulas: [
                        ...c.aulas,
                        {
                          aulaId,
                          concluida: false,
                          tempoAssistido,
                          ultimoAcesso: new Date().toISOString(),
                        },
                      ],
                      ultimaAulaId: aulaId,
                    }
                  : c
              ),
            };
          }

          return {
            cursos: state.cursos.map((c, i) =>
              i === cursoIndex
                ? {
                    ...c,
                    aulas: c.aulas.map((a, j) =>
                      j === aulaIndex
                        ? {
                            ...a,
                            tempoAssistido,
                            ultimoAcesso: new Date().toISOString(),
                          }
                        : a
                    ),
                    ultimaAulaId: aulaId,
                  }
                : c
            ),
          };
        }),

      setUltimaAula: (cursoId, aulaId) =>
        set((state) => {
          const cursoIndex = state.cursos.findIndex((c) => c.cursoId === cursoId);
          
          if (cursoIndex === -1) {
            return {
              cursos: [
                ...state.cursos,
                {
                  cursoId,
                  aulas: [],
                  ultimaAulaId: aulaId,
                },
              ],
            };
          }

          return {
            cursos: state.cursos.map((c, i) =>
              i === cursoIndex ? { ...c, ultimaAulaId: aulaId } : c
            ),
          };
        }),

      getProgressoCurso: (cursoId) => {
        return get().cursos.find((c) => c.cursoId === cursoId);
      },

      isAulaConcluida: (cursoId, aulaId) => {
        const curso = get().cursos.find((c) => c.cursoId === cursoId);
        if (!curso) return false;
        const aula = curso.aulas.find((a) => a.aulaId === aulaId);
        return aula?.concluida || false;
      },

      getUltimaAula: (cursoId) => {
        const curso = get().cursos.find((c) => c.cursoId === cursoId);
        return curso?.ultimaAulaId;
      },
    }),
    {
      name: 'progresso-storage',
    }
  )
);
