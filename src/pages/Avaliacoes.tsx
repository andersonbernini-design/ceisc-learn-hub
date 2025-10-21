import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileCheck, Clock, AlertCircle, CheckCircle2, MoreVertical } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type AvaliacaoStatus = 'publicado' | 'finalizado' | 'em_correcao' | 'expirado' | 'aguarde_publicacao';

interface Avaliacao {
  id: string;
  modulo: string;
  titulo: string;
  tipo: 'Prova objetiva' | 'Prova discursiva';
  status: AvaliacaoStatus;
  prazo?: string;
  nota?: number;
}

export default function Avaliacoes() {
  const navigate = useNavigate();
  
  const [avaliacoes] = useState<Avaliacao[]>([
    {
      id: '1',
      modulo: 'Módulo I',
      titulo: 'Avaliação',
      tipo: 'Prova objetiva',
      status: 'publicado',
    },
    {
      id: '2',
      modulo: 'Módulo II',
      titulo: 'Avaliação',
      tipo: 'Prova objetiva',
      status: 'finalizado',
    },
    {
      id: '3',
      modulo: 'Módulo III',
      titulo: 'Avaliação',
      tipo: 'Prova objetiva',
      status: 'finalizado',
    },
    {
      id: '4',
      modulo: 'Módulo I',
      titulo: 'Avaliação',
      tipo: 'Prova discursiva',
      status: 'publicado',
    },
    {
      id: '5',
      modulo: 'Módulo I',
      titulo: 'Avaliação',
      tipo: 'Prova discursiva',
      status: 'em_correcao',
    },
    {
      id: '6',
      modulo: 'Módulo I',
      titulo: 'Avaliação',
      tipo: 'Prova discursiva',
      status: 'expirado',
    },
    {
      id: '7',
      modulo: 'Módulo III',
      titulo: 'Avaliação',
      tipo: 'Prova discursiva',
      status: 'finalizado',
    },
    {
      id: '8',
      modulo: 'Módulo III',
      titulo: 'Avaliação',
      tipo: 'Prova discursiva',
      status: 'finalizado',
    },
  ]);

  const getStatusBadge = (status: AvaliacaoStatus) => {
    const variants = {
      publicado: { variant: 'success' as const, label: 'Publicado' },
      finalizado: { variant: 'default' as const, label: 'Finalizado' },
      em_correcao: { variant: 'default' as const, label: 'Em correção' },
      expirado: { variant: 'destructive' as const, label: 'Expirado' },
      aguarde_publicacao: { variant: 'secondary' as const, label: 'Aguarde publicação' },
    };
    
    const config = variants[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const handleIniciarAvaliacao = (id: string) => {
    navigate(`/avaliacoes/${id}`);
  };

  const handleVerAndamento = (id: string) => {
    navigate(`/avaliacoes/${id}/andamento`);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <FileCheck className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Avaliações</h1>
        </div>
        <p className="text-muted-foreground">
          Texto de apoio com informações sobre a área que o aluno esta no momento.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Texto de apoio com informações sobre a área que o aluno esta no momento.
        </p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {avaliacoes.map((avaliacao) => (
            <Card key={avaliacao.id} className="hover:shadow-elevated transition-all">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      {getStatusBadge(avaliacao.status)}
                    </div>
                    <CardTitle className="text-lg line-clamp-2">
                      {avaliacao.modulo} - {avaliacao.titulo}
                    </CardTitle>
                    <CardDescription className="mt-1">{avaliacao.tipo}</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                      {avaliacao.status === 'finalizado' && (
                        <DropdownMenuItem>Ver gabarito</DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  {avaliacao.status === 'publicado' && (
                    <Button
                      className="w-full"
                      onClick={() => handleIniciarAvaliacao(avaliacao.id)}
                    >
                      Iniciar avaliação
                    </Button>
                  )}
                  {(avaliacao.status === 'finalizado' || avaliacao.status === 'em_correcao') && (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => handleVerAndamento(avaliacao.id)}
                    >
                      Ver andamento
                    </Button>
                  )}
                  {avaliacao.status === 'expirado' && (
                    <Button variant="outline" className="w-full" disabled>
                      Expirado
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
