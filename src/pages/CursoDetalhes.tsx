import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, FileText, Clock, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import api from '@/lib/api';
import { Course } from '@/types';

export default function CursoDetalhes() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await api.get<Course>(`/cursos/${id}`);
        setCourse(response.data);
      } catch (error) {
        console.error('Erro ao carregar curso:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-muted rounded animate-pulse" />
        <div className="h-64 bg-muted rounded animate-pulse" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-muted-foreground">Curso não encontrado</p>
        <Button onClick={() => navigate('/cursos')} className="mt-4">
          Voltar para cursos
        </Button>
      </div>
    );
  }

  const totalAulas = course.modulos.reduce(
    (acc, mod) => acc + mod.disciplinas.reduce((acc2, disc) => acc2 + disc.aulas.length, 0),
    0
  );

  const aulasConcluidasCount = course.modulos.reduce(
    (acc, mod) =>
      acc +
      mod.disciplinas.reduce(
        (acc2, disc) => acc2 + disc.aulas.filter(a => a.concluida).length,
        0
      ),
    0
  );

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => navigate('/cursos')}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar
      </Button>

      {/* Header do Curso */}
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={course.thumbnail}
          alt={course.titulo}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <Badge className="mb-2">{course.categoria.replace('_', ' ')}</Badge>
          <h1 className="text-3xl font-bold mb-2">{course.titulo}</h1>
          <p className="text-white/90">{course.descricao}</p>
        </div>
      </div>

      {/* Informações e Progresso */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Progresso Geral</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">{course.progresso}%</div>
              <Progress value={course.progresso} />
              <p className="text-sm text-muted-foreground">
                {aulasConcluidasCount} de {totalAulas} aulas concluídas
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Carga Horária</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span className="text-2xl font-bold">{course.cargaHoraria}h</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Professor: {course.professor}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Data de Início</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Date(course.dataInicio).toLocaleDateString('pt-BR')}
            </div>
            {course.dataFim && (
              <p className="text-sm text-muted-foreground mt-2">
                Fim: {new Date(course.dataFim).toLocaleDateString('pt-BR')}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Conteúdo do Curso */}
      <Card>
        <CardHeader>
          <CardTitle>Conteúdo do Curso</CardTitle>
          <CardDescription>
            {course.modulos.length} módulos • {totalAulas} aulas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" className="w-full">
            {course.modulos.map((modulo) => (
              <AccordionItem key={modulo.id} value={modulo.id}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{modulo.titulo}</span>
                    <Badge variant="secondary">
                      {modulo.disciplinas.reduce((acc, d) => acc + d.aulas.length, 0)} aulas
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Accordion type="multiple" className="w-full pl-4">
                    {modulo.disciplinas.map((disciplina) => (
                      <AccordionItem key={disciplina.id} value={disciplina.id}>
                        <AccordionTrigger className="text-sm">
                          {disciplina.titulo}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 pl-4">
                            {disciplina.aulas.map((aula) => (
                              <div
                                key={aula.id}
                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                                onClick={() => navigate(`/cursos/${course.id}/aula/${aula.id}`)}
                              >
                                {aula.concluida ? (
                                  <CheckCircle2 className="h-5 w-5 text-success" />
                                ) : (
                                  <Play className="h-5 w-5 text-muted-foreground" />
                                )}
                                <div className="flex-1">
                                  <p className="text-sm font-medium">{aula.titulo}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {aula.duracao} min
                                  </p>
                                </div>
                                {aula.materiais.length > 0 && (
                                  <FileText className="h-4 w-4 text-muted-foreground" />
                                )}
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
