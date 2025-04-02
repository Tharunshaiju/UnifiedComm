import React, { useState } from 'react';
import { X, Mail, MessageSquare } from 'lucide-react';

export default function ComposeModal({ isOpen, onClose, onSend }) {
  const [messageType, setMessageType] = useState('email');
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSend({ type: messageType, recipient, subject, content });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex space-x-4">
            <button
              onClick={() => setMessageType('email')}
              className={`flex items-center space-x-2 px-3 py-1 rounded ${
                messageType === 'email'
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600'
              }`}
            >
              <Mail className="h-4 w-4" />
              <span>Email</span>
            </button>
            <button
              onClick={() => setMessageType('text')}
              className={`flex items-center space-x-2 px-3 py-1 rounded ${
                messageType === 'text'
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600'
              }`}
            >
              <MessageSquare className="h-4 w-4" />
              <span>Text</span>
            </button>
          </div>
          <button onClick={onClose}>
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="To"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            {messageType === 'email' && (
              <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            )}
            <textarea
              placeholder="Write your message..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}