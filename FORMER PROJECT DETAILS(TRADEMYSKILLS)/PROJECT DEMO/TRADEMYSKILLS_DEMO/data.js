const skills = [
  {
    id: 1,
    title: 'Python Tutoring',
    category: 'Technology',
    rating: 4.9,
    owner: 'Ava Chen',
    location: 'Regina, SK',
    description: 'Get help with basic Python, loops, functions, and beginner problem solving.',
    offer: 'I can teach Python basics and debugging.',
    want: 'Looking to trade for graphic design help.',
    tags: ['Python', 'Tutoring', 'Beginner'],
    image: '💻'
  },
  {
    id: 2,
    title: 'Guitar Lessons',
    category: 'Music',
    rating: 4.8,
    owner: 'Mateo Silva',
    location: 'Regina, SK',
    description: 'Beginner-friendly acoustic guitar sessions for chords, rhythm, and simple songs.',
    offer: 'I can teach rhythm guitar and chord transitions.',
    want: 'Would love help with video editing.',
    tags: ['Guitar', 'Music', 'Beginner'],
    image: '🎸'
  },
  {
    id: 3,
    title: 'Photography Tips',
    category: 'Creative',
    rating: 4.7,
    owner: 'Leah Brooks',
    location: 'Saskatoon, SK',
    description: 'Learn framing, lighting, and how to take stronger portrait and product photos.',
    offer: 'I can coach on photography basics and composition.',
    want: 'Trading for help with public speaking.',
    tags: ['Photos', 'Portraits', 'Lighting'],
    image: '📷'
  },
  {
    id: 4,
    title: 'Resume Review',
    category: 'Career',
    rating: 5.0,
    owner: 'Noah Patel',
    location: 'Calgary, AB',
    description: 'Improve your resume layout, wording, and clarity for internships and entry-level jobs.',
    offer: 'I can review resumes and LinkedIn profiles.',
    want: 'Looking for Excel help.',
    tags: ['Resume', 'Career', 'LinkedIn'],
    image: '📄'
  },
  {
    id: 5,
    title: 'Basic Web Design',
    category: 'Technology',
    rating: 4.6,
    owner: 'Sam Rivera',
    location: 'Winnipeg, MB',
    description: 'Intro to HTML, CSS, layout, and making simple websites look clean.',
    offer: 'I can help build basic pages using HTML and CSS.',
    want: 'Need help with logo design.',
    tags: ['HTML', 'CSS', 'Bootstrap'],
    image: '🌐'
  },
  {
    id: 6,
    title: 'Fitness Coaching',
    category: 'Health',
    rating: 4.8,
    owner: 'Jordan Lee',
    location: 'Edmonton, AB',
    description: 'Simple at-home workouts and beginner gym planning for consistency and form.',
    offer: 'I can help with starter workout plans.',
    want: 'Would trade for meal prep ideas.',
    tags: ['Fitness', 'Gym', 'Beginner'],
    image: '🏋️'
  }
];

const messages = [
  { from: 'Ava Chen', preview: 'Hey! I can help with Python basics this weekend.', time: '9:15 AM' },
  { from: 'Mateo Silva', preview: 'Can we trade guitar lessons for editing help?', time: 'Yesterday' },
  { from: 'Noah Patel', preview: 'I reviewed your resume and left some notes.', time: 'Yesterday' }
];

module.exports = { skills, messages };
