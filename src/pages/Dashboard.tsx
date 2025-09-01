import { useState } from "react";
import { Sidebar } from "@/components/Layout/Sidebar";
import { StatsCard } from "@/components/Dashboard/StatsCard";
import { ReminderCard } from "@/components/Reminders/ReminderCard";
import { ReminderForm } from "@/components/Forms/ReminderForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Bell, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Plus,
  Search,
  Filter,
  Calendar,
  Users,
  Activity
} from "lucide-react";

interface Reminder {
  id: string;
  title: string;
  description: string;
  scheduledTime: string;
  deliveryMethod: 'email' | 'sms' | 'whatsapp';
  status: 'pending' | 'sent' | 'failed';
  isRecurring: boolean;
}

interface LogEntry {
  id: string;
  reminderId: string;
  reminderTitle: string;
  status: 'sent' | 'failed';
  deliveryMethod: string;
  timestamp: string;
  recipient: string;
  errorMessage?: string;
}

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showReminderForm, setShowReminderForm] = useState(false);
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  // Mock data
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      title: 'Project Deadline',
      description: 'Submit final project deliverables to client',
      scheduledTime: '2024-01-15T14:30:00',
      deliveryMethod: 'email',
      status: 'pending',
      isRecurring: false
    },
    {
      id: '2',
      title: 'Weekly Team Meeting',
      description: 'Discuss project progress and upcoming tasks',
      scheduledTime: '2024-01-12T10:00:00',
      deliveryMethod: 'sms',
      status: 'sent',
      isRecurring: true
    },
    {
      id: '3',
      title: 'Client Presentation',
      description: 'Present Q4 results to stakeholders',
      scheduledTime: '2024-01-20T15:00:00',
      deliveryMethod: 'whatsapp',
      status: 'pending',
      isRecurring: false
    }
  ]);

  const [logs] = useState<LogEntry[]>([
    {
      id: '1',
      reminderId: '2',
      reminderTitle: 'Weekly Team Meeting',
      status: 'sent',
      deliveryMethod: 'SMS',
      timestamp: '2024-01-12T10:00:00',
      recipient: '+1234567890'
    },
    {
      id: '2',
      reminderId: '1',
      reminderTitle: 'Project Deadline',
      status: 'failed',
      deliveryMethod: 'Email',
      timestamp: '2024-01-11T09:30:00',
      recipient: 'john@example.com',
      errorMessage: 'SMTP connection timeout'
    }
  ]);

  const handleCreateReminder = (data: any) => {
    const newReminder: Reminder = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      scheduledTime: `${data.scheduledDate}T${data.scheduledTime}:00`,
      deliveryMethod: data.deliveryMethod,
      status: 'pending',
      isRecurring: data.isRecurring
    };

    setReminders([...reminders, newReminder]);
    setShowReminderForm(false);
    toast({
      title: "Reminder created",
      description: "Your reminder has been scheduled successfully.",
    });
  };

  const handleEditReminder = (data: any) => {
    if (!editingReminder) return;

    const updatedReminders = reminders.map(r => 
      r.id === editingReminder.id 
        ? { ...r, ...data, scheduledTime: `${data.scheduledDate}T${data.scheduledTime}:00` }
        : r
    );

    setReminders(updatedReminders);
    setEditingReminder(null);
    setShowReminderForm(false);
    toast({
      title: "Reminder updated",
      description: "Your reminder has been updated successfully.",
    });
  };

  const handleDeleteReminder = (id: string) => {
    setReminders(reminders.filter(r => r.id !== id));
    toast({
      title: "Reminder deleted",
      description: "The reminder has been removed.",
    });
  };

  const filteredReminders = reminders.filter(reminder =>
    reminder.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reminder.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    totalReminders: reminders.length,
    pendingReminders: reminders.filter(r => r.status === 'pending').length,
    sentReminders: reminders.filter(r => r.status === 'sent').length,
    failedReminders: reminders.filter(r => r.status === 'failed').length,
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-info bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-muted-foreground">Welcome back! Here's your reminder overview.</p>
        </div>
        <Button 
          onClick={() => setShowReminderForm(true)}
          className="bg-gradient-to-r from-primary to-info hover:from-primary/90 hover:to-info/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Reminder
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Reminders"
          value={stats.totalReminders}
          description="All scheduled reminders"
          icon={Bell}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Pending"
          value={stats.pendingReminders}
          description="Awaiting delivery"
          icon={Clock}
        />
        <StatsCard
          title="Delivered"
          value={stats.sentReminders}
          description="Successfully sent"
          icon={CheckCircle}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Failed"
          value={stats.failedReminders}
          description="Delivery issues"
          icon={XCircle}
          trend={{ value: 2, isPositive: false }}
        />
      </div>

      <Card className="p-6 bg-gradient-card border-border/50 shadow-medium">
        <h2 className="text-xl font-semibold mb-4">Recent Reminders</h2>
        <div className="space-y-4">
          {reminders.slice(0, 3).map((reminder) => (
            <ReminderCard
              key={reminder.id}
              reminder={reminder}
              onEdit={(id) => {
                const reminder = reminders.find(r => r.id === id);
                if (reminder) {
                  setEditingReminder(reminder);
                  setShowReminderForm(true);
                }
              }}
              onDelete={handleDeleteReminder}
            />
          ))}
        </div>
      </Card>
    </div>
  );

  const renderReminders = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reminders</h1>
          <p className="text-muted-foreground">Manage your automated notifications</p>
        </div>
        <Button 
          onClick={() => setShowReminderForm(true)}
          className="bg-gradient-to-r from-primary to-info hover:from-primary/90 hover:to-info/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Reminder
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search reminders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredReminders.map((reminder) => (
          <ReminderCard
            key={reminder.id}
            reminder={reminder}
            onEdit={(id) => {
              const reminder = reminders.find(r => r.id === id);
              if (reminder) {
                setEditingReminder(reminder);
                setShowReminderForm(true);
              }
            }}
            onDelete={handleDeleteReminder}
          />
        ))}
      </div>
    </div>
  );

  const renderLogs = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Activity Logs</h1>
        <p className="text-muted-foreground">Track your reminder delivery history</p>
      </div>

      <Card className="p-6 bg-gradient-card border-border/50 shadow-medium">
        <div className="space-y-4">
          {logs.map((log) => (
            <div key={log.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="space-y-1">
                <h3 className="font-medium">{log.reminderTitle}</h3>
                <p className="text-sm text-muted-foreground">
                  {log.deliveryMethod} to {log.recipient}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(log.timestamp).toLocaleString()}
                </p>
                {log.errorMessage && (
                  <p className="text-xs text-destructive">{log.errorMessage}</p>
                )}
              </div>
              <Badge 
                variant="outline" 
                className={log.status === 'sent' 
                  ? 'bg-success/10 text-success border-success/20' 
                  : 'bg-destructive/10 text-destructive border-destructive/20'
                }
              >
                {log.status}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderContent = () => {
    if (showReminderForm) {
      return (
        <ReminderForm
          onSubmit={editingReminder ? handleEditReminder : handleCreateReminder}
          onCancel={() => {
            setShowReminderForm(false);
            setEditingReminder(null);
          }}
          initialData={editingReminder ? {
            title: editingReminder.title,
            description: editingReminder.description,
            scheduledDate: editingReminder.scheduledTime.split('T')[0],
            scheduledTime: editingReminder.scheduledTime.split('T')[1].slice(0, 5),
            deliveryMethod: editingReminder.deliveryMethod,
            isRecurring: editingReminder.isRecurring
          } : undefined}
        />
      );
    }

    switch (activeSection) {
      case 'dashboard':
        return renderDashboard();
      case 'reminders':
        return renderReminders();
      case 'logs':
        return renderLogs();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
        isAdmin={true}
      />
      <main className="flex-1 p-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;