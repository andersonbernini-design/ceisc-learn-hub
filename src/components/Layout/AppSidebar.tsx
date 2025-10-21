import { Home, BookOpen, ClipboardList, GraduationCap, User, FileText, Calendar, MessageSquare, Library } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/sidebar';
import { useAuthStore } from '@/store/useAuthStore';

export function AppSidebar() {
  const { user } = useAuthStore();

  const alunoItems = [
    { title: 'Dashboard', url: '/dashboard', icon: Home },
    { title: 'Meus Cursos', url: '/cursos', icon: BookOpen },
    { title: 'Banco de Questões', url: '/questoes', icon: ClipboardList },
    { title: 'Simulados', url: '/simulados', icon: FileText },
    { title: 'Cronograma', url: '/cronograma', icon: Calendar },
    { title: 'Livraria', url: '/livraria', icon: Library },
  ];

  const professorItems = [
    { title: 'Dashboard', url: '/dashboard', icon: Home },
    { title: 'Minhas Aulas', url: '/professor/aulas', icon: BookOpen },
    { title: 'Materiais', url: '/professor/materiais', icon: FileText },
    { title: 'Perguntas', url: '/professor/perguntas', icon: MessageSquare },
    { title: 'Calendário', url: '/professor/calendario', icon: Calendar },
  ];

  const items = user?.perfil === 'professor' ? professorItems : alunoItems;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-xl">
            C
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="font-bold text-lg">CEISC</span>
            <span className="text-xs text-muted-foreground">Portal do Aluno</span>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        isActive
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                          : 'hover:bg-sidebar-accent/50'
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
