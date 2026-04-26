import { useState } from 'react';
import { ArrowRight, Clock, Users, Trophy, Code, Lightbulb, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { RegistrationForm } from '@/components/forms/RegistrationForm';
import { events } from '@/data/events';
import type { Event } from '@/types';

const hackathonThemes = [
  {
    icon: Code,
    title: 'Web & Mobile',
    description: 'Build innovative web and mobile applications',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Lightbulb,
    title: 'AI & ML',
    description: 'Create intelligent solutions using AI/ML',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Cpu,
    title: 'IoT & Hardware',
    description: 'Develop connected devices and hardware projects',
    color: 'from-green-500 to-emerald-500',
  },
];

export function Hackathons() {
  const [selectedHackathon, setSelectedHackathon] = useState<Event | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const hackathons = events.filter(e => e.category === 'hackathon');

  const handleHackathonClick = (hackathon: Event) => {
    setSelectedHackathon(hackathon);
    setIsDetailsOpen(true);
  };

  const handleRegisterClick = () => {
    setIsDetailsOpen(false);
    setIsRegisterOpen(true);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <section id="hackathons" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] to-[#0F2557]/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 mb-4">
            <Code className="w-3 h-3 mr-1" />
            Code. Create. Conquer.
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Featured <span className="text-gradient">Hackathons</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Push your limits in our flagship hackathons. Compete with the best minds, 
            build amazing projects, and win incredible prizes.
          </p>
        </div>

        {/* Themes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {hackathonThemes.map((theme, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${theme.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <theme.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{theme.title}</h3>
              <p className="text-white/60 text-sm">{theme.description}</p>
            </div>
          ))}
        </div>

        {/* Featured Hackathons */}
        <div className="space-y-6">
          {hackathons.map((hackathon, index) => (
            <div
              key={hackathon.id}
              className="group relative bg-gradient-to-r from-white/5 to-transparent rounded-2xl p-6 md:p-8 border border-white/10 hover:border-[#2B71F8]/50 transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                {/* Left: Number & Basic Info */}
                <div className="flex items-start gap-4 md:w-1/3">
                  <span className="text-5xl font-bold text-white/10 group-hover:text-[#2B71F8]/30 transition-colors">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#5B9AFF] transition-colors mb-1">
                      {hackathon.title}
                    </h3>
                    <p className="text-white/50 text-sm">{formatDate(hackathon.date)}</p>
                  </div>
                </div>

                {/* Middle: Details */}
                <div className="flex flex-wrap gap-4 md:gap-8 md:w-1/3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-white/40" />
                    <span className="text-white/70 text-sm">24-48 Hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-white/40" />
                    <span className="text-white/70 text-sm">{hackathon.teamSize}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-[#FF6B35]" />
                    <span className="text-[#FF6B35] font-medium text-sm">{hackathon.prizes}</span>
                  </div>
                </div>

                {/* Right: Action */}
                <div className="md:w-1/3 md:text-right">
                  <Button
                    onClick={() => handleHackathonClick(hackathon)}
                    className="bg-white/5 hover:bg-[#2B71F8] text-white border border-white/10 hover:border-[#2B71F8] transition-all group/btn"
                  >
                    View Details
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-6 pt-6 border-t border-white/5">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-white/50">Registration Progress</span>
                  <span className="text-white/70">
                    {Math.round((hackathon.registered / hackathon.seats) * 100)}% filled
                  </span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#2B71F8] to-[#5B9AFF] rounded-full transition-all duration-1000"
                    style={{ width: `${(hackathon.registered / hackathon.seats) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Hackathon Details Dialog */}
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="max-w-2xl bg-[#0F2557]/95 backdrop-blur-xl border border-white/10 text-white max-h-[90vh] overflow-y-auto">
            {selectedHackathon && (
              <>
                <div className="relative h-56 -mx-6 -mt-6 mb-6 overflow-hidden rounded-t-lg">
                  <img
                    src={selectedHackathon.image}
                    alt={selectedHackathon.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F2557] via-[#0F2557]/50 to-transparent" />
                  <Badge className="absolute top-4 left-4 bg-purple-500/20 text-purple-400 border-purple-500/30">
                    Hackathon
                  </Badge>
                </div>
                
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-white">
                    {selectedHackathon.title}
                  </DialogTitle>
                  <DialogDescription className="text-white/60">
                    {selectedHackathon.description}
                  </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-2 gap-4 my-6">
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-white/50 mb-1">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">Duration</span>
                    </div>
                    <p className="text-white font-medium">24-48 Hours</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-white/50 mb-1">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">Team Size</span>
                    </div>
                    <p className="text-white font-medium">{selectedHackathon.teamSize}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-white/50 mb-1">
                      <Trophy className="w-4 h-4" />
                      <span className="text-sm">Prize Pool</span>
                    </div>
                    <p className="text-[#FF6B35] font-bold">{selectedHackathon.prizes}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-white/50 mb-1">
                      <Code className="w-4 h-4" />
                      <span className="text-sm">Venue</span>
                    </div>
                    <p className="text-white font-medium">{selectedHackathon.venue}</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg p-4 mb-6 border border-purple-500/20">
                  <h4 className="font-semibold text-white mb-2">What to Expect</h4>
                  <ul className="space-y-2 text-white/70 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">•</span>
                      Intensive coding sessions with mentorship from industry experts
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">•</span>
                      Networking opportunities with fellow developers and companies
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">•</span>
                      Workshops and tech talks throughout the event
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">•</span>
                      Amazing prizes and internship opportunities
                    </li>
                  </ul>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleRegisterClick}
                    className="flex-1 bg-[#2B71F8] hover:bg-[#5B9AFF] text-white rounded-full py-6 transition-all hover:scale-[1.02]"
                  >
                    Register Team
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsDetailsOpen(false)}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    Close
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Registration Dialog */}
        <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
          <DialogContent className="max-w-lg bg-[#0F2557]/95 backdrop-blur-xl border border-white/10 text-white max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white">
                Register for {selectedHackathon?.title}
              </DialogTitle>
              <DialogDescription className="text-white/60">
                Fill in your details to register your team for this hackathon.
              </DialogDescription>
            </DialogHeader>
            {selectedHackathon && (
              <RegistrationForm
                eventId={selectedHackathon.id}
                eventTitle={selectedHackathon.title}
                onSuccess={() => setIsRegisterOpen(false)}
                onCancel={() => setIsRegisterOpen(false)}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
