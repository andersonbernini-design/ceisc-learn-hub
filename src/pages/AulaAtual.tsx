import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, CheckCircle2, PlayCircle, Download, BookOpen, FileText, MessageSquare, Menu } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useProgressoStore } from '@/store/useProgressoStore';
import { courses } from '@/mocks/data/courses';

export default function AulaAtual() {
  const { cursoId, aulaId } = useParams<{ cursoId: string; aulaId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { marcarConcluida, isAulaConcluida } = useProgressoStore();
  
  const [anotacao, setAnotacao] = useState('');
  const [velocidade, setVelocidade] = useState(1);

  // Buscar curso e aula atual
  const curso = courses.find(c => c.id === cursoId);
  
  const todasAulas = curso?.modulos.flatMap(m => 
    m.disciplinas.flatMap(d => 
      d.aulas.map(a => ({ ...a, moduloId: m.id, disciplinaId: d.id, moduloTitulo: m.titulo, disciplinaTitulo: d.titulo }))
    )
  ) || [];

  const aulaAtual = todasAulas.find(a => a.id === aulaId);
  const indexAtual = todasAulas.findIndex(a => a.id === aulaId);
  const proximaAula = todasAulas[indexAtual + 1];
  const aulaAnterior = todasAulas[indexAtual - 1];

  const progressoCurso = curso ? Math.round(
    (todasAulas.filter(a => isAulaConcluida(cursoId!, a.id)).length / todasAulas.length) * 100
  ) : 0;

  useEffect(() => {
    if (!curso || !aulaAtual) {
      navigate('/meus-cursos');
    }
  }, [curso, aulaAtual, navigate]);

  const handleMarcarConcluida = () => {
    if (cursoId && aulaId) {
      marcarConcluida(cursoId, aulaId);
      toast({
        title: "Aula concluída!",
        description: "Seu progresso foi salvo com sucesso.",
      });
    }
  };

  const handleProximaAula = () => {
    if (proximaAula) {
      navigate(`/aula/${cursoId}/${proximaAula.id}`);
    }
  };

  const handleAulaAnterior = () => {
    if (aulaAnterior) {
      navigate(`/aula/${cursoId}/${aulaAnterior.id}`);
    }
  };

  const handleSalvarAnotacao = () => {
    // Salvar no localStorage
    const anotacoes = JSON.parse(localStorage.getItem('anotacoes') || '{}');
    anotacoes[`${cursoId}-${aulaId}`] = anotacao;
    localStorage.setItem('anotacoes', JSON.stringify(anotacoes));
    toast({
      title: "Anotação salva",
      description: "Sua anotação foi salva com sucesso.",
    });
  };

  useEffect(() => {
    // Carregar anotação salva
    const anotacoes = JSON.parse(localStorage.getItem('anotacoes') || '{}');
    const anotacaoSalva = anotacoes[`${cursoId}-${aulaId}`];
    if (anotacaoSalva) {
      setAnotacao(anotacaoSalva);
    }
  }, [cursoId, aulaId]);

  if (!curso || !aulaAtual) {
    return null;
  }

  const SidebarContent = () => (
    <div className="space-y-4 p-4">
      <div>
        <h3 className="font-semibold mb-2">Progresso do curso</h3>
        <Progress value={progressoCurso} className="h-2 mb-2" />
        <p className="text-sm text-muted-foreground">{progressoCurso}% concluído</p>
      </div>

      <ScrollArea className="h-[calc(100vh-200px)]">
        <Accordion type="single" collapsible className="space-y-2">
          {curso.modulos.map((modulo) => (
            <AccordionItem key={modulo.id} value={modulo.id}>
              <AccordionTrigger className="text-sm font-medium">
                {modulo.titulo}
              </AccordionTrigger>
              <AccordionContent>
                {modulo.disciplinas.map((disciplina) => (
                  <div key={disciplina.id} className="ml-2 space-y-1">
                    <p className="text-xs font-medium text-muted-foreground mt-2">
                      {disciplina.titulo}
                    </p>
                    {disciplina.aulas.map((aula) => {
                      const concluida = isAulaConcluida(cursoId, aula.id);
                      const atual = aula.id === aulaId;
                      
                      return (
                        <button
                          key={aula.id}
                          onClick={() => navigate(`/aula/${cursoId}/${aula.id}`)}
                          className={`w-full text-left p-2 rounded-md text-sm flex items-center gap-2 transition-colors ${
                            atual 
                              ? 'bg-primary text-primary-foreground' 
                              : concluida
                              ? 'bg-muted hover:bg-muted/80'
                              : 'hover:bg-muted/50'
                          }`}
                        >
                          {concluida ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                          ) : (
                            <PlayCircle className="h-4 w-4 flex-shrink-0" />
                          )}
                          <span className="line-clamp-2 flex-1">{aula.titulo}</span>
                          <span className="text-xs text-muted-foreground flex-shrink-0">
                            {aula.duracao}min
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollArea>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen gap-4 p-4">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:block w-80 border-r bg-card">
        <SidebarContent />
      </aside>

      {/* Sidebar Mobile */}
      <Sheet>
        <SheetTrigger asChild className="lg:hidden fixed top-20 left-4 z-50">
          <Button size="icon" variant="outline">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Conteúdo Principal */}
      <main className="flex-1 space-y-4 max-w-6xl mx-auto w-full">
        {/* Player de Vídeo */}
        <Card>
          <CardContent className="p-0">
            <div className="relative aspect-video bg-black rounded-t-lg overflow-hidden">
              <video
                controls
                controlsList="nodownload"
                className="w-full h-full"
                src={aulaAtual.videoUrl}
                onRateChange={(e) => setVelocidade((e.target as HTMLVideoElement).playbackRate)}
              >
                Seu navegador não suporta vídeo HTML5.
              </video>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{aulaAtual.moduloTitulo}</Badge>
                    <Badge variant="secondary">{aulaAtual.disciplinaTitulo}</Badge>
                  </div>
                  <h1 className="text-2xl font-bold mb-2">{aulaAtual.titulo}</h1>
                  <p className="text-muted-foreground">{aulaAtual.descricao}</p>
                </div>
                
                <Button
                  variant={isAulaConcluida(cursoId, aulaId) ? "outline" : "default"}
                  onClick={handleMarcarConcluida}
                  disabled={isAulaConcluida(cursoId, aulaId)}
                >
                  {isAulaConcluida(cursoId, aulaId) ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Concluída
                    </>
                  ) : (
                    <>Marcar como concluída</>
                  )}
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={handleAulaAnterior}
                  disabled={!aulaAnterior}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Anterior
                </Button>
                <Button
                  variant="default"
                  onClick={handleProximaAula}
                  disabled={!proximaAula}
                >
                  Próxima
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Abas de Conteúdo */}
        <Card>
          <Tabs defaultValue="visao_geral" className="w-full">
            <CardHeader>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="visao_geral">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Visão geral
                </TabsTrigger>
                <TabsTrigger value="materiais">
                  <FileText className="h-4 w-4 mr-2" />
                  Materiais
                </TabsTrigger>
                <TabsTrigger value="anotacoes">
                  <FileText className="h-4 w-4 mr-2" />
                  Anotações
                </TabsTrigger>
                <TabsTrigger value="duvidas">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Dúvidas
                </TabsTrigger>
              </TabsList>
            </CardHeader>

            <CardContent>
              <TabsContent value="visao_geral" className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Sobre esta aula</h3>
                  <p className="text-muted-foreground">
                    {aulaAtual.descricao}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Detalhes</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Duração</p>
                      <p className="font-medium">{aulaAtual.duracao} minutos</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Publicado em</p>
                      <p className="font-medium">{new Date(aulaAtual.dataPublicacao).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="materiais" className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-4">Materiais complementares</h3>
                  {aulaAtual.materiais.length > 0 ? (
                    <div className="space-y-2">
                      {aulaAtual.materiais.map((material) => (
                        <Card key={material.id}>
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
                            <div>
                              <CardTitle className="text-base">{material.titulo}</CardTitle>
                              <CardDescription>
                                {material.tipo.toUpperCase()} • {material.tamanho}
                              </CardDescription>
                            </div>
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </CardHeader>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">
                      Nenhum material disponível para esta aula
                    </p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="anotacoes" className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-4">Suas anotações</h3>
                  <Textarea
                    placeholder="Faça suas anotações sobre esta aula..."
                    value={anotacao}
                    onChange={(e) => setAnotacao(e.target.value)}
                    rows={8}
                    className="mb-4"
                  />
                  <Button onClick={handleSalvarAnotacao}>
                    Salvar anotação
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="duvidas" className="space-y-4">
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-semibold mb-2">Tem alguma dúvida?</h3>
                  <p className="text-muted-foreground mb-4">
                    Entre em contato com os professores ou acesse o fórum de discussões
                  </p>
                  <Button onClick={() => navigate('/minhas-perguntas')}>
                    Fazer uma pergunta
                  </Button>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </main>
    </div>
  );
}
