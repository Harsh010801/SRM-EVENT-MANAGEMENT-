import { useState, useMemo } from 'react';
import { Calendar, MapPin, Users, Trophy, Clock, Search, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { events, clubs } from '@/data/events';
import type { Event } from '@/types';
import { RegistrationForm } from '@/components/forms/RegistrationForm';

export function Events() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClub, setSelectedClub] = useState<string>('all');
  const [selectedDateRange, setSelectedDateRange] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('upcoming');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  // Filter events based on all criteria
  const filteredEvents = useMemo(() => {
    let filtered = events;

    // Status filter
    const now = new Date('2026-01-01'); // Using 2026 as reference
    if (selectedStatus === 'upcoming') {
      filtered = filtered.filter(e => new Date(e.date) >= now);
    } else if (selectedStatus === 'ongoing') {
      // Events happening today
      filtered = filtered.filter(e => {
        const eventDate = new Date(e.date);
        return eventDate.toDateString() === now.toDateString();
      });
    } else if (selectedStatus === 'past') {
      filtered = filtered.filter(e => new Date(e.date) < now);
    }

    // Category filter
    if (activeCategory !== 'all') {
      filtered = filtered.filter(event => event.category === activeCategory);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.venue.toLowerCase().includes(query)
      );
    }

    // Club filter
    if (selectedClub !== 'all') {
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(selectedClub.toLowerCase())
      );
    }

    // Date range filter
    if (selectedDateRange !== 'all') {
      const eventDate = new Date();
      filtered = filtered.filter(event => {
        const date = new Date(event.date);
        if (selectedDateRange === 'this-week') {
          const weekFromNow = new Date(eventDate);
          weekFromNow.setDate(weekFromNow.getDate() + 7);
          return date >= eventDate && date <= weekFromNow;
        } else if (selectedDateRange === 'this-month') {
          return date.getMonth() === eventDate.getMonth() && date.getFullYear() === eventDate.getFullYear();
        } else if (selectedDateRange === 'next-month') {
          const nextMonth = new Date(eventDate);
          nextMonth.setMonth(nextMonth.getMonth() + 1);
          return date.getMonth() === nextMonth.getMonth();
        }
        return true;
      });
    }

    return filtered;
  }, [activeCategory, searchQuery, selectedClub, selectedDateRange, selectedStatus]);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsDetailsOpen(true);
  };

  const handleRegisterClick = () => {
    setIsDetailsOpen(false);
    setIsRegisterOpen(true);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'hackathon': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'technical': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'cultural': return 'bg-pink-500/20 text-pink-400 border-pink-500/30';
      case 'sports': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getPopularity = (event: Event) => {
    return Math.round((event.registered / event.seats) * 100);
  };

  return (
    <section id="events" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Upcoming <span className="text-gradient">Events</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Discover exciting events happening at SRM University. From hackathons to cultural nights, 
            there's something for everyone.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <Input
            type="text"
            placeholder="Search events, clubs, venues..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-6 bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-xl focus:border-[#2B71F8] focus:ring-[#2B71F8]/20"
          />
        </div>

        {/* Status Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {[
            { id: 'upcoming', label: 'Upcoming' },
            { id: 'ongoing', label: 'Ongoing' },
            { id: 'past', label: 'Past' },
            { id: 'all', label: 'All' },
          ].map((status) => (
            <button
              key={status.id}
              onClick={() => setSelectedStatus(status.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                selectedStatus === status.id
                  ? 'bg-[#2B71F8] text-white shadow-lg shadow-[#2B71F8]/30'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              {status.label}
            </button>
          ))}
        </div>

        {/* Advanced Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {/* Category Filter */}
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className="px-4 py-2.5 rounded-full bg-white/5 text-white/70 border border-white/10 text-sm focus:outline-none focus:border-[#2B71F8]"
          >
            <option value="all" className="bg-[#0F2557]">All Categories</option>
            <option value="hackathon" className="bg-[#0F2557]">Hackathons</option>
            <option value="technical" className="bg-[#0F2557]">Technical</option>
            <option value="cultural" className="bg-[#0F2557]">Cultural</option>
            <option value="sports" className="bg-[#0F2557]">Sports</option>
          </select>

          {/* Club Filter */}
          <select
            value={selectedClub}
            onChange={(e) => setSelectedClub(e.target.value)}
            className="px-4 py-2.5 rounded-full bg-white/5 text-white/70 border border-white/10 text-sm focus:outline-none focus:border-[#2B71F8]"
          >
            <option value="all" className="bg-[#0F2557]">All Clubs</option>
            {clubs.map((club) => (
              <option key={club.id} value={club.name} className="bg-[#0F2557]">
                {club.name}
              </option>
            ))}
          </select>

          {/* Date Range Filter */}
          <select
            value={selectedDateRange}
            onChange={(e) => setSelectedDateRange(e.target.value)}
            className="px-4 py-2.5 rounded-full bg-white/5 text-white/70 border border-white/10 text-sm focus:outline-none focus:border-[#2B71F8]"
          >
            <option value="all" className="bg-[#0F2557]">Any Date</option>
            <option value="this-week" className="bg-[#0F2557]">This Week</option>
            <option value="this-month" className="bg-[#0F2557]">This Month</option>
            <option value="next-month" className="bg-[#0F2557]">Next Month</option>
          </select>

          {/* Clear Filters */}
          {(activeCategory !== 'all' || selectedClub !== 'all' || selectedDateRange !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setActiveCategory('all');
                setSelectedClub('all');
                setSelectedDateRange('all');
                setSearchQuery('');
              }}
              className="px-4 py-2.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-sm hover:bg-red-500/30 transition-all"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Results Count */}
        <div className="text-center mb-8">
          <p className="text-white/50 text-sm">
            Showing <span className="text-white font-medium">{filteredEvents.length}</span> events
          </p>
        </div>

        {/* Events Grid - Campus Web Style Cards */}
        <div className="space-y-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              onClick={() => handleEventClick(event)}
              className="group relative bg-gradient-to-r from-white/5 to-transparent rounded-2xl overflow-hidden border border-white/10 hover:border-[#2B71F8]/50 transition-all duration-500 cursor-pointer"
            >
              {/* Event Image Banner */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
                
                {/* Category Badge */}
                <Badge className={`absolute top-4 left-4 ${getCategoryColor(event.category)}`}>
                  {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                </Badge>

                {/* Popularity */}
                <div className="absolute bottom-4 left-4 flex items-center gap-1 text-yellow-400">
                  <Star className="w-4 h-4 fill-yellow-400" />
                  <span className="text-sm font-medium">{getPopularity(event)}x</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title & Organizer */}
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#5B9AFF] transition-colors">
                  {event.title}
                </h3>
                <p className="text-white/50 text-sm mb-4">
                  by SRM University
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/70 border border-white/10">
                    {event.category}
                  </span>
                  <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/70 border border-white/10">
                    {formatDate(event.date)}
                  </span>
                  <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/70 border border-white/10">
                    {event.time}
                  </span>
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-1.5 text-white/50">
                    <MapPin className="w-4 h-4" />
                    <span>{event.venue}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/50">
                    <Users className="w-4 h-4" />
                    <span>{event.registered}/{event.seats} registered</span>
                  </div>
                  {event.prizes && (
                    <div className="flex items-center gap-1.5 text-[#FF6B35]">
                      <Trophy className="w-4 h-4" />
                      <span>{event.prizes}</span>
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEventClick(event);
                  }}
                  className="bg-[#2B71F8] hover:bg-[#5B9AFF] text-white rounded-lg px-6 transition-all"
                >
                  Register
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-white/40" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No events found</h3>
            <p className="text-white/60">Try adjusting your filters or search query</p>
          </div>
        )}

        {/* Event Details Dialog */}
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="max-w-2xl bg-[#0F2557]/95 backdrop-blur-xl border border-white/10 text-white max-h-[90vh] overflow-y-auto">
            {selectedEvent && (
              <>
                <div className="relative h-56 -mx-6 -mt-6 mb-6 overflow-hidden rounded-t-lg">
                  <img
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F2557] via-[#0F2557]/50 to-transparent" />
                  <Badge className={`absolute top-4 left-4 ${getCategoryColor(selectedEvent.category)}`}>
                    {selectedEvent.category.charAt(0).toUpperCase() + selectedEvent.category.slice(1)}
                  </Badge>
                </div>
                
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-white">
                    {selectedEvent.title}
                  </DialogTitle>
                  <DialogDescription className="text-white/60">
                    {selectedEvent.description}
                  </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-2 gap-4 my-6">
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-white/50 mb-1">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">Date</span>
                    </div>
                    <p className="text-white font-medium">{formatDate(selectedEvent.date)}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-white/50 mb-1">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">Time</span>
                    </div>
                    <p className="text-white font-medium">{selectedEvent.time}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-white/50 mb-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">Venue</span>
                    </div>
                    <p className="text-white font-medium">{selectedEvent.venue}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-white/50 mb-1">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">Team Size</span>
                    </div>
                    <p className="text-white font-medium">{selectedEvent.teamSize}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-white/5 rounded-lg p-4 mb-6">
                  <div>
                    <p className="text-white/50 text-sm">Registration</p>
                    <p className="text-white font-medium">
                      {selectedEvent.registered} / {selectedEvent.seats} seats filled
                    </p>
                  </div>
                  {selectedEvent.prizes && (
                    <div className="text-right">
                      <p className="text-white/50 text-sm">Prize Pool</p>
                      <p className="text-[#FF6B35] font-bold text-lg">{selectedEvent.prizes}</p>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleRegisterClick}
                    className="flex-1 bg-[#2B71F8] hover:bg-[#5B9AFF] text-white rounded-lg py-6 transition-all hover:scale-[1.02]"
                  >
                    Register Now
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
