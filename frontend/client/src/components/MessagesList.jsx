import { useState, useEffect } from 'react';
import { fetchMessages } from '../api';

const MessagesList = ({ refreshTrigger }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadMessages = async () => {
    try {
      setLoading(true);
      const response = await fetchMessages();
      setMessages(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError('Failed to load messages. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, [refreshTrigger]);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={loadMessages}
          className="mt-4 px-4 py-2 text-indigo-600 hover:text-indigo-700 font-medium"
        >
          Retry ↻
        </button>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
        <div className="text-5xl mb-3">💭</div>
        <p className="text-gray-500">No messages yet. Be the first to send one!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {[...messages].reverse().map((msg, index) => (
        <div 
          key={msg.id} 
          className="bg-white rounded-xl p-5 border border-gray-200 hover:shadow-md transition-shadow duration-200"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-indigo-600 text-sm font-semibold">
                    {msg.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{msg.name}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(msg.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 ml-10 mt-1 leading-relaxed">{msg.message}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessagesList;
