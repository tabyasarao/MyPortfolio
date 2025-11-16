import React, { useState, useEffect } from 'react';
import { list, remove } from '../../lib/api-contact';

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');

  // 1. Fetch all messages on component load
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    list(signal).then((data) => {
      if (data && data.error) {
        setError(data.error);
      } else if (data) {
        setMessages(data);
      }
    }).catch(err => {
      setError("Failed to fetch messages.");
      console.error(err);
    });

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  // 2. Handler for Deleting a message
  const deleteMessage = async (messageId) => {
    if (!window.confirm("Are you sure you want to delete this message?")) {
      return;
    }
    const data = await remove(messageId);
    if (data && data.error) {
      setError(data.error);
    } else {
      // Update state to remove the deleted item instantly
      setMessages(messages.filter(item => item._id !== messageId));
    }
  };

  return (
    <div className="p-4 md:p-10 max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
        Contact Messages (Admin Inbox)
      </h1>

      {error && <p className="text-center text-red-500 text-lg">{error}</p>}
      
      <div className="space-y-6">
        {messages.length > 0 ? (
          messages.map((item) => (
            <div 
              key={item._id} 
              className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-500"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
                  <a href={`mailto:${item.email}`} className="text-md text-blue-600 hover:underline">{item.email}</a>
                  <p className="text-sm text-gray-500 mt-1">
                    Received on: {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
                
                {/* Admin Delete Action */}
                <button 
                  onClick={() => deleteMessage(item._id)}
                  className="text-red-500 hover:text-red-700 transition"
                  title="Delete"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              </div>
              <p className="text-gray-700 mt-4 p-4 bg-gray-50 rounded-md">
                {item.message}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-xl">No contact messages received yet.</p>
        )}
      </div>
    </div>
  );
};

export default ContactMessages;