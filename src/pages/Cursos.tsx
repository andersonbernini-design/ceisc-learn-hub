import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import api from '@/lib/api';
import { Course } from '@/types';

export default function Cursos() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get<Course[]>('/cursos');
        setCourses(response.data);
      } catch (error) {
        console.error('Erro ao carregar cursos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(course =>
    course.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeCourses = filteredCourses.filter(c => c.status === 'ativo');
  const completedCourses = filteredCourses.filter(c => c.status === 'concluido');

  const CourseCard = ({ course }: { course: Course }) => (
    <Card
      className="cursor-pointer transition-all hover:shadow-elevated group"
      onClick={() => navigate(`/cursos/${course.id}`)}
    >
      <div className="aspect-video w-full overflow-hidden rounded-t-lg">
        <img
          src={course.thumbnail}
          alt={course.titulo}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="line-clamp-2">{course.titulo}</CardTitle>
          <Badge variant={course.status === 'ativo' ? 'default' : 'secondary'}>
            {course.status === 'ativo' ? 'Ativo' : 'Concluído'}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">
          {course.descricao}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progresso</span>
            <span className="font-medium">{course.progresso}%</span>
          </div>
          <Progress value={course.progresso} />
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{course.professor}</span>
          <span>{course.cargaHoraria}h</span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Meus Cursos</h1>
        <p className="text-muted-foreground">
          Gerencie e acompanhe o progresso dos seus cursos
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar cursos..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="ativos" className="space-y-6">
        <TabsList>
          <TabsTrigger value="ativos">
            Ativos ({activeCourses.length})
          </TabsTrigger>
          <TabsTrigger value="concluidos">
            Concluídos ({completedCourses.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ativos" className="space-y-4">
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="aspect-video bg-muted" />
                  <CardHeader className="space-y-2">
                    <div className="h-6 bg-muted rounded" />
                    <div className="h-4 bg-muted rounded w-3/4" />
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : activeCourses.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground">Nenhum curso ativo encontrado</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {activeCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="concluidos" className="space-y-4">
          {completedCourses.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground">Nenhum curso concluído ainda</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {completedCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
