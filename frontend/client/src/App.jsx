import { useState } from 'react';
import Navbar from './components/Navbar';
import NotesSection from './components/NotesSection';
import ContactForm from './components/ContactForm';
import MessagesList from './components/MessagesList';

function App() {
  const [refreshMessages, setRefreshMessages] = useState(0);

  const handleMessageSuccess = () => {
    setRefreshMessages(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20 md:py-28">
          <div className="max-w-5xl mx-auto text-center px-4">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Production Ready Full-Stack App
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6">
              Note<span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Flow</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Capture ideas, share feedback, and connect seamlessly.
              A modern full-stack experience with React and Node.js.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <a 
                href="#notes" 
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition transform hover:scale-105"
              >
                Explore Notes
              </a>
              <a 
                href="#contact" 
                className="px-6 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>

        {/* Notes Section */}
        <NotesSection />

        {/* Contact Form Section */}
        <ContactForm onSuccess={handleMessageSuccess} />

        {/* Messages Section */}
        <section id="messages" className="py-16 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">📬 Recent Messages</h2>
              <p className="text-gray-600">Messages from visitors like you</p>
            </div>
            <MessagesList refreshTrigger={refreshMessages} />
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-100 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-500 text-sm">
              © 2025 NoteFlow — Built with React, Node.js, and Tailwind CSS
            </p>
            <p className="text-gray-400 text-xs mt-2">
              Full-stack demo app | In-memory storage
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
