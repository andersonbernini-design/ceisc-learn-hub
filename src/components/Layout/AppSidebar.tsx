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
    { title: 'Dashboard', url: '/dashboard', icon: Home, color: 'text-primary' },
    { title: 'Meus cursos', url: '/meus-cursos', icon: BookOpen, color: 'text-primary' },
    { title: 'Material de estudo', url: '/questoes', icon: ClipboardList, color: 'text-primary' },
    { title: 'Simulados', url: '/simulados', icon: FileText, color: 'text-primary' },
    { title: 'Banco de questões', url: '/questoes', icon: Library, color: 'text-primary' },
    { title: 'Notificações', url: '/notificacoes', icon: Bell, color: 'text-primary' },
    { title: 'Minhas perguntas', url: '/minhas-perguntas', icon: MessageCircle, color: 'text-primary' },
    { title: 'Avaliações', url: '/avaliacoes', icon: CheckSquare, color: 'text-primary' },
    { title: 'Certificados', url: '/certificados', icon: Award, color: 'text-primary' },
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
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground font-bold text-base">
            ▶
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="font-bold text-base tracking-wide">ceisc</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Ferramentas</span>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase tracking-wider text-muted-foreground px-3 mb-1">Ferramentas</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors ${
                          isActive
                            ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                            : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                        }`
                      }
                    >
                      <item.icon className={`h-5 w-5 ${(item as any).color || 'text-current'}`} />
                      <span className="text-sm">{item.title}</span>
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
