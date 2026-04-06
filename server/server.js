const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ========== In-Memory Data ==========
const notes = [
  {
    id: 1,
    title: "Welcome to NoteFlow",
    content: "A modern full-stack app with React and Node.js. Explore the features!"
  },
  {
    id: 2,
    title: "Tailwind CSS Magic",
    content: "Utility-first CSS framework that makes styling fast and consistent."
  },
  {
    id: 3,
    title: "Production Ready",
    content: "Deploy frontend to Vercel/Netlify and backend to Render/Railway."
  },
  {
    id: 4,
    title: "Real-time Messages",
    content: "Your contact messages are stored in memory and displayed instantly."
  }
];

let messages = [];
let messageId = 1;

// ========== API Endpoints ==========

// GET /api/notes - Fetch all notes
app.get('/api/notes', (req, res) => {
  res.json(notes);
});

// POST /api/contact - Store a new contact message
app.post('/api/contact', (req, res) => {
  const { name, message } = req.body;
  
  if (!name || !message) {
    return res.status(400).json({ 
      error: 'Name and message are required fields' 
    });
  }
  
  const newMessage = {
    id: messageId++,
    name: name.trim(),
    message: message.trim(),
    timestamp: new Date().toISOString()
  };
  
  messages.push(newMessage);
  res.status(201).json({ 
    success: true, 
    data: newMessage 
  });
});

// GET /api/messages - Fetch all contact messages
app.get('/api/messages', (req, res) => {
  res.json(messages);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Notes endpoint: http://localhost:${PORT}/api/notes`);
  console.log(`💬 Contact endpoint: http://localhost:${PORT}/api/contact`);
  console.log(`📋 Messages endpoint: http://localhost:${PORT}/api/messages`);
});
