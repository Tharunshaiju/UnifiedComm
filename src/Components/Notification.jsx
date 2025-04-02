import React from 'react';
import { Mail, MessageSquare, X } from 'lucide-react';

export default function Notification({ id, title, message, type, onClose }) {
  return (
    <div className="fixed top-4 right-4 max-w-sm w-full bg-white rounded-lg shadow-lg border border-gray-200 transform transition-transform duration-300 ease-in-out">
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {type === 'email' ? (
              <Mail className="h-6 w-6 text-indigo-600" />
            ) : (
              <MessageSquare className="h-6 w-6 text-indigo-600" />
            )}
          </div>
          <div className="ml-3 w-0 flex-1">
            <p className="text-sm font-medium text-gray-900">{title}</p>
            <p className="mt-1 text-sm text-gray-500">{message}</p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              onClick={onClose}
              className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="sr-only">Close</span>
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}