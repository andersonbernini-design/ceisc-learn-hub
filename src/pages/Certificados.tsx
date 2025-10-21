import { Award, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Certificado {
  id: string;
  categoria: string;
  titulo: string;
  ano: string;
}

export default function Certificados() {
  const certificados: Certificado[] = [
    {
      id: '1',
      categoria: 'OAB',
      titulo: 'Pós- Graduação em direito e processo do trabalho - 1ª Turma 2024',
      ano: '2024',
    },
    {
      id: '2',
      categoria: 'OAB',
      titulo: 'Pós- Graduação em direito e processo do trabalho - 1ª Turma 2024',
      ano: '2024',
    },
    {
      id: '3',
      categoria: 'OAB',
      titulo: 'Pós- Graduação em direito e processo do trabalho - 1ª Turma 2024',
      ano: '2024',
    },
    {
      id: '4',
      categoria: 'OAB',
      titulo: 'Pós- Graduação em direito e processo do trabalho - 1ª Turma 2024',
      ano: '2024',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Award className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Certificados</h1>
        </div>
        <p className="text-muted-foreground">
          Texto de apoio com informações sobre a área que o aluno esta no momento.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {certificados.map((cert) => (
          <Card key={cert.id} className="hover:shadow-elevated transition-all">
            <CardHeader>
              <div className="mb-3">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  {cert.categoria}
                </Badge>
              </div>
              <CardTitle className="text-lg leading-snug">
                {cert.titulo}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                <Download className="h-4 w-4" />
                Baixar certificado
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
