import { useState } from 'react';
import { MessageCircle, ChevronLeft, Send } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Pergunta {
  id: string;
  titulo: string;
  assunto: string;
  data: string;
  status: 'respondida' | 'aguardando';
  respostas: Resposta[];
}

interface Resposta {
  id: string;
  autor: string;
  email: string;
  data: string;
  conteudo: string;
}

export default function MinhasPerguntas() {
  const [perguntaSelecionada, setPerguntaSelecionada] = useState<string | null>(null);
  const [novaResposta, setNovaResposta] = useState('');

  const perguntas: Pergunta[] = [
    {
      id: '1',
      titulo: 'Dúvida complementar aula 22/11',
      assunto: 'Para: Nome do Orientador direcionado',
      data: 'Sexta-Feira, 08/04/2024 - 11:12h',
      status: 'respondida',
      respostas: [
        {
          id: '1',
          autor: 'Nidal Ahmad',
          email: 'nidal@ceisc.com.br',
          data: 'Sexta-Feira, 08/04/2024 - 11:12h',
          conteudo: `Figma ipsum component variant main layer. Select effect connection pixel list align comment image. Project text inspect boolean layout figma link. Object follower slice horizontal blur boolean underline line mask. List share opacity selection comment library move line. Move editor overflow community edit edit. Italic vector star follower align device undo font fill. Link figma line move arrow link.Figma ipsum component variant main layer. Select effect connection pixel list align comment image. Project text inspect boolean layout figma link. Object follower slice horizontal blur boolean underline line mask. List share opacity selection comment library move line. Move editor overflow community edit edit. Italic vector star follower align device undo font fill. Link figma line move arrow link.

Project text inspect boolean layout figma link. Object follower slice horizontal blur boolean underline line mask. List share opacity selection comment library move line. Move editor overflow community edit edit. Italic vector star follower align device undo font fill. Link figma line move arrow link.Figma ipsum component variant main layer. Select effect connection pixel list align comment image. Project text inspect boolean layout figma link. Object follower slice horizontal blur boolean underline line mask. List share opacity selection comment library move line. Move editor overflow community edit edit. Italic vector star follower align device undo font fill. Link figma line move arrow link.`,
        },
      ],
    },
  ];

  const perguntaAtual = perguntas.find(p => p.id === perguntaSelecionada);

  const handleEnviarResposta = () => {
    if (novaResposta.trim()) {
      // Lógica para enviar resposta
      setNovaResposta('');
    }
  };

  if (perguntaSelecionada && perguntaAtual) {
    return (
      <div className="space-y-6">
        <div>
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => setPerguntaSelecionada(null)}
          >
            <ChevronLeft className="h-4 w-4" />
            Voltar
          </Button>
          
          <div className="flex items-center gap-3 mb-2">
            <MessageCircle className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Minhas perguntas</h1>
          </div>
          <p className="text-muted-foreground">
            Texto de apoio com informações sobre a área que o aluno esta no momento.
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <CardTitle className="text-xl mb-2">{perguntaAtual.titulo}</CardTitle>
                <CardDescription>{perguntaAtual.assunto}</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{perguntaAtual.data}</span>
                <Badge variant={perguntaAtual.status === 'respondida' ? 'success' : 'secondary'}>
                  {perguntaAtual.status === 'respondida' ? 'Respondida' : 'Aguardando'}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-foreground whitespace-pre-line">
                Figma ipsum component variant main layer. Rotate rotate edit object content font prototype italic. Clip pencil fill duplicate line. Figma community arrange auto pen layout pixel background. Overflow hand opacity fill thumbnail text clip rotate. Arrow font vector rotate device distribute content vertical plugin. Line distribute union rectangle undo. Polygon shadow prototype component figjam rectangle. Ipsum edit prototype arrow text.
              </p>
            </div>

            {perguntaAtual.status === 'respondida' && (
              <>
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Histórico da conversa</h3>
                  
                  {perguntaAtual.respostas.map((resposta) => (
                    <div key={resposta.id} className="space-y-4">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>{resposta.autor.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold">{resposta.autor}</span>
                            <span className="text-sm text-muted-foreground">{resposta.email}</span>
                          </div>
                          <div className="text-sm text-muted-foreground mb-3">{resposta.data}</div>
                          <p className="text-foreground whitespace-pre-line">{resposta.conteudo}</p>
                        </div>
                      </div>

                      <div className="pl-14">
                        <Card className="bg-muted/50">
                          <CardHeader className="pb-3">
                            <CardDescription className="text-sm">
                              Anexos:
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <Button variant="link" className="h-auto p-0 text-primary">
                              Tech-requirements.pdf
                            </Button>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Nova resposta</h3>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Digite sua resposta..."
                      value={novaResposta}
                      onChange={(e) => setNovaResposta(e.target.value)}
                      rows={6}
                      className="resize-none"
                    />
                    <p className="text-sm text-muted-foreground">
                      {564 - novaResposta.length} caracteres restantes
                    </p>
                    <div className="flex gap-3">
                      <Button onClick={handleEnviarResposta}>
                        <Send className="h-4 w-4" />
                        Enviar resposta
                      </Button>
                      <Button variant="outline" onClick={() => setPerguntaSelecionada(null)}>
                        Cancelar
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <MessageCircle className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Minhas perguntas</h1>
        </div>
        <p className="text-muted-foreground">
          Texto de apoio com informações sobre a área que o aluno esta no momento.
        </p>
      </div>

      <div className="grid gap-4">
        {perguntas.map((pergunta) => (
          <Card
            key={pergunta.id}
            className="hover:shadow-elevated transition-all cursor-pointer"
            onClick={() => setPerguntaSelecionada(pergunta.id)}
          >
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{pergunta.titulo}</CardTitle>
                  <CardDescription>{pergunta.assunto}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground whitespace-nowrap">{pergunta.data}</span>
                  <Badge variant={pergunta.status === 'respondida' ? 'success' : 'secondary'}>
                    {pergunta.status === 'respondida' ? 'Respondida' : 'Aguardando'}
                  </Badge>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
