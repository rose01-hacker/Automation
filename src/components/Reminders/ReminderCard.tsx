import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  Mail, 
  MessageSquare, 
  MoreVertical, 
  Edit, 
  Trash2,
  Calendar
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Reminder {
  id: string;
  title: string;
  description: string;
  scheduledTime: string;
  deliveryMethod: 'email' | 'sms' | 'whatsapp';
  status: 'pending' | 'sent' | 'failed';
  isRecurring: boolean;
}

interface ReminderCardProps {
  reminder: Reminder;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ReminderCard = ({ reminder, onEdit, onDelete }: ReminderCardProps) => {
  const getDeliveryIcon = () => {
    switch (reminder.deliveryMethod) {
      case 'email':
        return <Mail className="w-4 h-4" />;
      case 'sms':
      case 'whatsapp':
        return <MessageSquare className="w-4 h-4" />;
      default:
        return <Mail className="w-4 h-4" />;
    }
  };

  const getStatusBadge = () => {
    const variants = {
      pending: 'bg-warning/10 text-warning border-warning/20',
      sent: 'bg-success/10 text-success border-success/20',
      failed: 'bg-destructive/10 text-destructive border-destructive/20'
    };

    return (
      <Badge variant="outline" className={variants[reminder.status]}>
        {reminder.status}
      </Badge>
    );
  };

  return (
    <Card className="p-6 bg-gradient-card border-border/50 shadow-soft hover:shadow-medium transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="space-y-1">
          <h3 className="font-semibold text-lg">{reminder.title}</h3>
          <p className="text-muted-foreground text-sm">{reminder.description}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(reminder.id)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onDelete(reminder.id)}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          {new Date(reminder.scheduledTime).toLocaleDateString()}
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          {new Date(reminder.scheduledTime).toLocaleTimeString()}
        </div>
        <div className="flex items-center gap-2">
          {getDeliveryIcon()}
          {reminder.deliveryMethod.toUpperCase()}
        </div>
      </div>

      <div className="flex items-center justify-between">
        {getStatusBadge()}
        {reminder.isRecurring && (
          <Badge variant="outline" className="bg-info/10 text-info border-info/20">
            Recurring
          </Badge>
        )}
      </div>
    </Card>
  );
};