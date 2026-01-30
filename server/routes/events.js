const express = require('express');
const router = express.Router();

// Real SRM Events 2025-2026 based on actual data
const events = [
    // Major Fests
    {
        id: 'fest-1',
        title: 'Aaruush 2025 - Techno-Management Fest',
        description: '19th edition of one of India\'s largest national-level techno-management fests. Theme: "Rising in the Spirit of Innovation". Features Cognixion, Hack Summit, T-Summit, workshops, Tech Rally with TVS Apache, InfraNova & Relief Rethink, Data Vortex, and Government & Indian Coast Guard Expos.',
        date: '2025-09-10',
        time: '09:00 AM',
        venue: 'Tech Park, Kattankulathur Campus',
        category: 'technical',
        image: '/event-ai.jpg',
        seats: 30000,
        registered: 25000,
        prizes: '₹15,00,000+',
        teamSize: 'Varies by event'
    },
    {
        id: 'fest-2',
        title: 'Hack Horizons 2025',
        description: '12-hour hackathon with domains like Generative AI, Agentic AI and Cybersecurity. Organized by SRMIST Vadapalani Campus. Prize pool of ₹15,000+.',
        date: '2025-10-09',
        time: '09:00 AM',
        venue: 'Vadapalani Campus, Chennai',
        category: 'hackathon',
        image: '/event-coding.jpg',
        seats: 500,
        registered: 423,
        prizes: '₹15,000+',
        teamSize: '2-4 members'
    },
    {
        id: 'fest-3',
        title: 'Hack & Beyond 2025',
        description: 'Workshop and hackathon on Automotive Embedded Systems and AI-powered Embedded Solutions.',
        date: '2025-08-11',
        time: '09:00 AM',
        venue: 'Kattankulathur Campus',
        category: 'hackathon',
        image: '/hackathon-featured.jpg',
        seats: 200,
        registered: 178,
        prizes: '₹50,000',
        teamSize: '2-4 members'
    },
    // Workshops & Conferences 2025
    {
        id: 'ws-1',
        title: 'Ethical Hacking Workshop 2025',
        description: 'Learn ethical hacking techniques, penetration testing, and cybersecurity fundamentals.',
        date: '2025-09-27',
        time: '10:00 AM',
        venue: 'Computer Labs, Tech Block',
        category: 'technical',
        image: '/event-coding.jpg',
        seats: 100,
        registered: 89,
        teamSize: 'Individual'
    },
    {
        id: 'ws-2',
        title: 'IoT using Raspberry Pi and Python',
        description: 'Comprehensive workshop on IoT development using Raspberry Pi and Python.',
        date: '2025-09-27',
        time: '02:00 PM',
        venue: 'IoT Lab, Networking Block',
        category: 'technical',
        image: '/event-ai.jpg',
        seats: 80,
        registered: 67,
        teamSize: 'Individual'
    },
    {
        id: 'ws-3',
        title: 'Advanced Excel Workshop 2025',
        description: 'Master advanced Excel functions, data analysis, pivot tables, and macros.',
        date: '2025-09-27',
        time: '10:00 AM',
        venue: 'Seminar Hall A',
        category: 'technical',
        image: '/event-coding.jpg',
        seats: 120,
        registered: 98,
        teamSize: 'Individual'
    },
    // 2026 Events
    {
        id: '2026-1',
        title: '5 Days Workshop on Scientific Machine Learning',
        description: 'Advanced workshop on Scientific Machine Learning (Hybrid mode).',
        date: '2026-01-20',
        time: '09:00 AM',
        venue: 'Tech Park, Online/Offline',
        category: 'technical',
        image: '/event-ai.jpg',
        seats: 150,
        registered: 123,
        teamSize: 'Individual'
    },
    {
        id: '2026-2',
        title: 'Quantum Crossroads Workshop',
        description: 'Workshop on Materials, Computation, Information and Communication in Quantum Computing.',
        date: '2026-01-21',
        time: '10:00 AM',
        venue: 'Physics Department, Kattankulathur',
        category: 'technical',
        image: '/event-ai.jpg',
        seats: 100,
        registered: 78,
        teamSize: 'Individual'
    },
    {
        id: '2026-3',
        title: 'ICECBI 2026 - International Conference',
        description: 'International Conference on Electronics, Computing and Big Data Intelligence.',
        date: '2026-02-02',
        time: '09:00 AM',
        venue: 'TP Ganesan Auditorium',
        category: 'technical',
        image: '/event-ai.jpg',
        seats: 500,
        registered: 423,
        prizes: 'Best Paper Awards',
        teamSize: 'Individual/Team'
    },
    // Cultural Events
    {
        id: 'cult-1',
        title: 'Milan 2026 - National Cultural Fest',
        description: '18th edition of SRMIST\'s premier national-level cultural festival.',
        date: '2026-04-02',
        time: '06:00 PM',
        venue: 'Kattankulathur Campus, Multiple Venues',
        category: 'cultural',
        image: '/event-cultural.jpg',
        seats: 50000,
        registered: 35000,
        prizes: '₹10,00,000+',
        teamSize: 'Varies by event'
    },
    {
        id: 'cult-2',
        title: 'Alumni Day 2025',
        description: 'Annual Alumni Day celebration. Reconnect with old friends and network.',
        date: '2025-12-20',
        time: '10:00 AM',
        venue: 'TP Ganesan Auditorium',
        category: 'cultural',
        image: '/event-cultural.jpg',
        seats: 2000,
        registered: 1567,
        teamSize: 'Open'
    },
    // Sports Events
    {
        id: 'sport-1',
        title: 'SRM RUN 9.0 - Run for Zero Waste',
        description: 'Annual marathon promoting environmental awareness. Theme: "Run for Zero Waste".',
        date: '2025-08-31',
        time: '06:00 AM',
        venue: 'University Grounds, Kattankulathur',
        category: 'sports',
        image: '/event-cultural.jpg',
        seats: 3000,
        registered: 2345,
        prizes: 'Medals & Certificates',
        teamSize: 'Individual'
    },
    {
        id: 'sport-2',
        title: 'Chairman\'s Birthday Trophy 2025',
        description: 'State Level Volleyball and Handball Tournament.',
        date: '2025-09-27',
        time: '08:00 AM',
        venue: 'Indoor Stadium, Kattankulathur',
        category: 'sports',
        image: '/event-cultural.jpg',
        seats: 500,
        registered: 423,
        prizes: 'Trophies & Certificates',
        teamSize: 'Team'
    },
    // Technical Club Events
    {
        id: 'tech-1',
        title: 'ACM CodeRush 2025',
        description: 'Annual competitive programming contest by SRM ACM Student Chapter.',
        date: '2025-11-15',
        time: '10:00 AM',
        venue: 'Computer Labs, Tech Block',
        category: 'technical',
        image: '/event-coding.jpg',
        seats: 300,
        registered: 245,
        prizes: '₹75,000',
        teamSize: 'Individual'
    },
    {
        id: 'tech-2',
        title: 'White Hat Hackers CTF 2025',
        description: 'Capture The Flag competition with Web Exploitation, Cryptography, and more.',
        date: '2025-11-22',
        time: '09:30 AM',
        venue: 'Cyber Lab, IT Block',
        category: 'technical',
        image: '/event-coding.jpg',
        seats: 150,
        registered: 132,
        prizes: '₹1,00,000',
        teamSize: '1-3 members'
    },
    {
        id: 'tech-3',
        title: 'IEEE Robotics Challenge 2025',
        description: 'Design and build autonomous robots. Workshop included.',
        date: '2025-12-10',
        time: '10:00 AM',
        venue: 'Mechanical Hangar, ECE Block',
        category: 'technical',
        image: '/event-robotics.jpg',
        seats: 80,
        registered: 67,
        prizes: '₹1,50,000',
        teamSize: '3-5 members'
    },
    {
        id: 'tech-4',
        title: 'Beyond Hack 2025',
        description: '24-hour national-level hackathon by SRM Hackathon Club.',
        date: '2025-10-31',
        time: '10:00 AM',
        venue: 'Mini Hall 2, University Building',
        category: 'hackathon',
        image: '/hackathon-featured.jpg',
        seats: 200,
        registered: 178,
        prizes: '₹3,00,000',
        teamSize: '2-4 members'
    },
    {
        id: 'tech-5',
        title: 'National Students Space Challenge 2025',
        description: 'National-level competition for space technology enthusiasts.',
        date: '2025-11-07',
        time: '09:00 AM',
        venue: 'Tech Park, Kattankulathur',
        category: 'technical',
        image: '/event-robotics.jpg',
        seats: 150,
        registered: 123,
        prizes: '₹2,00,000 + ISRO Internships',
        teamSize: '3-5 members'
    }
];

// Get all events
router.get('/', (req, res) => {
    const { category, status, search } = req.query;
    let filteredEvents = [...events];

    // Filter by category
    if (category && category !== 'all') {
        filteredEvents = filteredEvents.filter(e => e.category === category);
    }

    // Filter by status
    const now = new Date('2026-01-30');
    if (status === 'upcoming') {
        filteredEvents = filteredEvents.filter(e => new Date(e.date) >= now);
    } else if (status === 'past') {
        filteredEvents = filteredEvents.filter(e => new Date(e.date) < now);
    }

    // Search filter
    if (search) {
        const query = search.toLowerCase();
        filteredEvents = filteredEvents.filter(e =>
            e.title.toLowerCase().includes(query) ||
            e.description.toLowerCase().includes(query) ||
            e.venue.toLowerCase().includes(query)
        );
    }

    res.json(filteredEvents);
});

// Get single event
router.get('/:id', (req, res) => {
    const event = events.find(e => e.id === req.params.id);
    if (!event) {
        return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
});

module.exports = router;
