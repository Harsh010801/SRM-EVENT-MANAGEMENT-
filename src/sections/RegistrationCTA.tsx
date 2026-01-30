import { useState } from 'react';
import { ArrowRight, Sparkles, Zap, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { RegistrationForm } from '@/components/RegistrationForm';
import { events } from '@/data/events';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function RegistrationCTA() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string>('');

  const selectedEvent = events.find(e => e.id === selectedEventId);

  const handleQuickRegister = () => {
    if (selectedEventId) {
      setIsDialogOpen(true);
    }
  };

  return (
    <section id="register" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F2557] via-[#0a0a0a] to-[#0F2557]" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2B71F8]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FF6B35]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
            <Sparkles className="w-4 h-4 text-[#FF6B35]" />
            <span className="text-sm text-white/90">Limited Seats Available</span>
          </div>

          {/* Title */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Ready to <span className="text-gradient">Participate?</span>
          </h2>

          {/* Description */}
          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10">
            Secure your spot today. Join thousands of students in the biggest 
            technical and cultural celebration at SRM University.
          </p>

          {/* Quick Register */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto mb-12">
            <Select onValueChange={setSelectedEventId}>
              <SelectTrigger className="w-full sm:w-64 bg-white/5 border-white/20 text-white focus:ring-[#2B71F8]/20">
                <SelectValue placeholder="Select an event" />
              </SelectTrigger>
              <SelectContent className="bg-[#0F2557] border-white/10">
                {events.map((event) => (
                  <SelectItem key={event.id} value={event.id}>
                    {event.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={handleQuickRegister}
              disabled={!selectedEventId}
              className="w-full sm:w-auto bg-[#2B71F8] hover:bg-[#5B9AFF] text-white rounded-full px-8 py-6 text-lg font-semibold transition-all hover:scale-105 hover:shadow-xl hover:shadow-[#2B71F8]/30 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              Register Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: 'Quick Registration', desc: 'Sign up in under 2 minutes' },
              { icon: Target, title: 'Track Progress', desc: 'Monitor your registrations' },
              { icon: Sparkles, title: 'Get Updates', desc: 'Never miss event notifications' },
            ].map((feature, index) => (
              <div key={index} className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <feature.icon className="w-5 h-5 text-[#2B71F8]" />
                </div>
                <h3 className="text-white font-medium">{feature.title}</h3>
                <p className="text-white/50 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Registration Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg bg-[#0F2557]/95 backdrop-blur-xl border border-white/10 text-white max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">
              Register for {selectedEvent?.title}
            </DialogTitle>
            <DialogDescription className="text-white/60">
              Fill in your details to secure your spot at this event.
            </DialogDescription>
          </DialogHeader>
          {selectedEvent && (
            <RegistrationForm
              eventId={selectedEvent.id}
              eventTitle={selectedEvent.title}
              onSuccess={() => {
                setIsDialogOpen(false);
                setSelectedEventId('');
              }}
              onCancel={() => setIsDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
