import { FileText, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Simulados() {
  const simulados = [
    {
      id: 1,
      titulo: 'Simulado OAB 1ª Fase - Janeiro 2025',
      tipo: 'Objetivo',
      questoes: 80,
      duracao: 300,
      status: 'disponivel',
      dataLiberacao: '2025-01-15',
    },
    {
      id: 2,
      titulo: 'Simulado OAB 2ª Fase - Penal',
      tipo: 'Discursivo',
      questoes: 4,
      duracao: 300,
      status: 'em_breve',
      dataLiberacao: '2025-01-25',
    },
    {
      id: 3,
      titulo: 'Simulado Constitucional',
      tipo: 'Objetivo',
      questoes: 30,
      duracao: 90,
      status: 'concluido',
      nota: 85,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'disponivel':
        return <Badge variant="success">Disponível</Badge>;
      case 'em_breve':
        return <Badge variant="secondary">Em Breve</Badge>;
      case 'concluido':
        return <Badge>Concluído</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Simulados</h1>
        <p className="text-muted-foreground">
          Teste seus conhecimentos com simulados completos
        </p>
      </div>

      {/* Lista de Simulados */}
      <div className="grid gap-4">
        {simulados.map((simulado) => (
          <Card key={simulado.id} className="hover:shadow-elevated transition-all">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="line-clamp-1">{simulado.titulo}</CardTitle>
                    {getStatusBadge(simulado.status)}
                  </div>
                  <CardDescription>
                    {simulado.tipo} • {simulado.questoes} questões • {simulado.duracao} minutos
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  {simulado.status === 'concluido' ? (
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <span>Nota: <strong className="text-foreground">{simulado.nota}%</strong></span>
                    </div>
                  ) : simulado.status === 'disponivel' ? (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>Disponível desde {new Date(simulado.dataLiberacao).toLocaleDateString('pt-BR')}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      <span>Disponível em {new Date(simulado.dataLiberacao).toLocaleDateString('pt-BR')}</span>
                    </div>
                  )}
                </div>
                {simulado.status === 'disponivel' && (
                  <Button>Iniciar Simulado</Button>
                )}
                {simulado.status === 'concluido' && (
                  <Button variant="outline">Ver Correção</Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Em Desenvolvimento */}
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <FileText className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-center max-w-md">
            Novos simulados são adicionados regularmente. Fique atento!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
