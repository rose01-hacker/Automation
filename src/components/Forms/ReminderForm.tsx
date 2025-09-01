import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Calendar, Clock, Send } from "lucide-react";

interface ReminderFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: any;
}

export const ReminderForm = ({ onSubmit, onCancel, initialData }: ReminderFormProps) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    scheduledDate: initialData?.scheduledDate || '',
    scheduledTime: initialData?.scheduledTime || '',
    deliveryMethod: initialData?.deliveryMethod || 'email',
    isRecurring: initialData?.isRecurring || false,
    recurringType: initialData?.recurringType || 'daily',
    recipient: initialData?.recipient || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="p-6 bg-gradient-card border-border/50 shadow-medium">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-info/20 flex items-center justify-center">
          <Calendar className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">
            {initialData ? 'Edit Reminder' : 'Create New Reminder'}
          </h2>
          <p className="text-muted-foreground text-sm">Set up your automated notification</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Meeting reminder, deadline alert..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient</Label>
            <Input
              id="recipient"
              value={formData.recipient}
              onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
              placeholder="email@example.com or +1234567890"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Additional details about this reminder..."
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.scheduledDate}
              onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Input
              id="time"
              type="time"
              value={formData.scheduledTime}
              onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="delivery">Delivery Method</Label>
            <Select 
              value={formData.deliveryMethod} 
              onValueChange={(value) => setFormData({ ...formData, deliveryMethod: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email (SMTP)</SelectItem>
                <SelectItem value="sms">SMS (Twilio)</SelectItem>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
          <div className="space-y-1">
            <Label htmlFor="recurring">Recurring Reminder</Label>
            <p className="text-sm text-muted-foreground">Send this reminder repeatedly</p>
          </div>
          <Switch
            id="recurring"
            checked={formData.isRecurring}
            onCheckedChange={(checked) => setFormData({ ...formData, isRecurring: checked })}
          />
        </div>

        {formData.isRecurring && (
          <div className="space-y-2">
            <Label htmlFor="recurringType">Frequency</Label>
            <Select 
              value={formData.recurringType} 
              onValueChange={(value) => setFormData({ ...formData, recurringType: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="flex gap-3 pt-4">
          <Button type="submit" className="bg-gradient-to-r from-primary to-info hover:from-primary/90 hover:to-info/90">
            <Send className="w-4 h-4 mr-2" />
            {initialData ? 'Update Reminder' : 'Create Reminder'}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};