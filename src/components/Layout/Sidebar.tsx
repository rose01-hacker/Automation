import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Clock, 
  User, 
  Settings, 
  LogOut, 
  Bell,
  BarChart3,
  Users
} from "lucide-react";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isAdmin?: boolean;
}

export const Sidebar = ({ activeSection, onSectionChange, isAdmin = false }: SidebarProps) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Calendar },
    { id: 'reminders', label: 'Reminders', icon: Bell },
    { id: 'logs', label: 'Activity Logs', icon: BarChart3 },
    ...(isAdmin ? [{ id: 'users', label: 'User Management', icon: Users }] : []),
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 h-screen bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-info flex items-center justify-center">
            <Clock className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-semibold text-lg">RemindMe</h1>
            <p className="text-xs text-muted-foreground">Automation System</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeSection === item.id ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 h-11",
                activeSection === item.id && "bg-gradient-to-r from-primary/10 to-transparent border border-primary/20"
              )}
              onClick={() => onSectionChange(item.id)}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <Button variant="ghost" className="w-full justify-start gap-3 h-11 text-destructive hover:text-destructive">
          <LogOut className="w-5 h-5" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};