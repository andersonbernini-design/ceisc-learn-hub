import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Heart, Calendar, BarChart3, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Curso {
  id: string;
  categoria: string;
  titulo: string;
  subtitulo: string;
  periodo: string;
  progresso: number;
  thumbnail: string;
  favorito?: boolean;
}

export default function MeusCursos() {
  const navigate = useNavigate();
  
  const [cursos] = useState<Curso[]>([
    {
      id: '1',
      categoria: '2ª Fase OAB',
      titulo: '2ª Fase | 43º Exame | Empresarial | Repescagem Plus',
      subtitulo: '2ª Fase OAB',
      periodo: 'De 22/10 a 22/11',
      progresso: 40,
      thumbnail: '/placeholder.svg',
    },
    {
      id: '2',
      categoria: '2ª Fase OAB',
      titulo: '2ª Fase | 43º Exame | Empresarial | Repescagem Plus',
      subtitulo: '2ª Fase OAB',
      periodo: 'De 22/10 a 22/11',
      progresso: 40,
      thumbnail: '/placeholder.svg',
      favorito: true,
    },
    {
      id: '3',
      categoria: '2ª Fase OAB',
      titulo: '2ª Fase | 43º Exame | Empresarial | Repescagem Plus',
      subtitulo: '2ª Fase OAB',
      periodo: 'De 22/10 a 22/11',
      progresso: 40,
      thumbnail: '/placeholder.svg',
    },
  ]);

  const handleContinuar = () => {
    navigate('/curso-atual');
  };

  const handleAcessarCurso = (cursoId: string) => {
    // Redireciona para a primeira aula do curso (ou última aula assistida)
    navigate(`/aula/${cursoId}/a1`);
  };

  // Mock de cursos recomendados
  const cursosRecomendados = [
    {
      id: '10',
      categoria: 'concursos',
      titulo: 'Preparação para Magistratura Federal',
      descricao: 'Curso completo para concursos de magistratura federal com foco em direito constitucional e administrativo.',
      thumbnail: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800',
      recomendadoEquipe: true,
    },
    {
      id: '11',
      categoria: 'oab_1fase',
      titulo: 'OAB 1ª Fase - Reta Final',
      descricao: 'Revisão intensiva para a 1ª fase do exame da OAB com questões comentadas.',
      thumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800',
      recomendadoEquipe: false,
    },
    {
      id: '12',
      categoria: 'pos_graduacao',
      titulo: 'Pós-Graduação em Direito Tributário',
      descricao: 'Especialização completa em direito tributário com casos práticos e atualizações legislativas.',
      thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
      recomendadoEquipe: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Meus cursos</h1>
        </div>
        <p className="text-muted-foreground">
          Texto de apoio com informações sobre a área que o aluno esta no momento.
        </p>
      </div>

      {/* Última Atividade */}
      <Card className="bg-accent/5 border-accent">
        <CardHeader>
          <Badge variant="success" className="w-fit mb-2">
            Última atividade
          </Badge>
          <CardTitle className="text-lg">Gestão de emoções</CardTitle>
          <CardDescription className="text-base">
            Mentoria 01. Primeiros passos e orientações de estudos I conhecendo a prova prático profissional
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleContinuar}>Continuar atividades</Button>
        </CardContent>
      </Card>

      {/* Cursos Disponíveis */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Cursos disponíveis</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Texto de apoio com informações sobre a área que o aluno esta no momento.
        </p>

        <Tabs defaultValue="em_andamento" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
            <TabsTrigger value="em_andamento">Em andamento</TabsTrigger>
            <TabsTrigger value="favoritos">Favoritos</TabsTrigger>
            <TabsTrigger value="eventos">
              Eventos
              <Badge variant="secondary" className="ml-2">2</Badge>
            </TabsTrigger>
            <TabsTrigger value="finalizado">Finalizado</TabsTrigger>
            <TabsTrigger value="todos">Mostrar todos</TabsTrigger>
          </TabsList>

          <TabsContent value="em_andamento" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {cursos.map((curso) => (
                <Card key={curso.id} className="group hover:shadow-elevated transition-all overflow-hidden">
                  <div className="relative aspect-video bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">PROMO IMAGE</span>
                    {curso.favorito && (
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-3 right-3 bg-background/20 hover:bg-background/40 backdrop-blur-sm"
                      >
                        <Heart className="h-4 w-4 fill-primary text-primary" />
                      </Button>
                    )}
                  </div>
                  
                  <CardHeader className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant="outline" className="text-xs">
                        <Calendar className="h-3 w-3 mr-1" />
                        {curso.periodo}
                      </Badge>
                      {curso.favorito && (
                        <Heart className="h-4 w-4 fill-primary text-primary" />
                      )}
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{curso.subtitulo}</p>
                      <CardTitle className="text-base leading-snug line-clamp-2">
                        {curso.titulo}
                      </CardTitle>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progresso</span>
                        <span className="font-semibold">{curso.progresso}%</span>
                      </div>
                      <Progress value={curso.progresso} className="h-2" />
                    </div>
                  </CardHeader>

                  <CardContent>
                    <Button 
                      variant="default" 
                      className="w-full"
                      onClick={() => handleAcessarCurso(curso.id)}
                    >
                      Acessar
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center">
              <Button variant="outline">Mostrar mais</Button>
            </div>
          </TabsContent>

          <TabsContent value="favoritos">
            <div className="text-center py-12 text-muted-foreground">
              Nenhum curso favoritado ainda
            </div>
          </TabsContent>

          <TabsContent value="eventos">
            <div className="text-center py-12 text-muted-foreground">
              Nenhum evento disponível
            </div>
          </TabsContent>

          <TabsContent value="finalizado">
            <div className="text-center py-12 text-muted-foreground">
              Nenhum curso finalizado
            </div>
          </TabsContent>

          <TabsContent value="todos">
            <div className="text-center py-12 text-muted-foreground">
              Todos os cursos
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Cursos Recomendados */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Cursos recomendados</h2>
          <p className="text-sm text-muted-foreground">
            Sugestões personalizadas baseadas no seu histórico e perfil de estudos
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cursosRecomendados.map((curso) => (
            <Card key={curso.id} className="group hover:shadow-elevated transition-all overflow-hidden">
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={curso.thumbnail} 
                  alt={curso.titulo}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {curso.recomendadoEquipe && (
                  <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
                    Recomendado
                  </Badge>
                )}
              </div>
              
              <CardHeader className="space-y-3">
                <div>
                  <Badge variant="outline" className="mb-2">
                    {curso.categoria === 'oab_1fase' ? '1ª Fase OAB' : 
                     curso.categoria === 'concursos' ? 'Concursos' : 
                     'Pós-graduação'}
                  </Badge>
                  <CardTitle className="text-base leading-snug line-clamp-2">
                    {curso.titulo}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                    {curso.descricao}
                  </p>
                </div>
              </CardHeader>

              <CardContent>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate(`/cursos/${curso.id}`)}
                >
                  Ver detalhes
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
