import React from 'react';
import { Mail, MessageSquare, Circle } from 'lucide-react';

export default function MessageList({ messages, onMessageSelect }) {
  return (
    <div className="flex-1 overflow-auto">
      {messages.map((message) => (
        <div
          key={message.id}
          onClick={() => onMessageSelect(message)}
          className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
            !message.read ? 'bg-indigo-50' : ''
          }`}
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              {message.type === 'email' ? (
                <Mail className="h-5 w-5 text-gray-400" />
              ) : (
                <MessageSquare className="h-5 w-5 text-gray-400" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <span className="font-medium truncate">{message.sender}</span>
                {!message.read && (
                  <Circle className="h-2 w-2 fill-current text-indigo-600" />
                )}
                <span className="text-sm text-gray-500">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
              {message.type === 'email' && (
                <p className="text-sm font-medium text-gray-900 truncate">
                  {message.subject}
                </p>
              )}
              <p className="text-sm text-gray-500 truncate">{message.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}