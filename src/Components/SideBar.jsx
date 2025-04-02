import React from 'react';
import { Inbox, Send, Archive, Mail, MessageSquare, Wifi, WifiOff } from 'lucide-react';

export default function Sidebar({ activeFolder, onFolderChange, unreadCount, connected }) {
  const folders = [
    { name: 'inbox', icon: Inbox, label: 'Inbox', count: unreadCount.inbox },
    { name: 'outbox', icon: Archive, label: 'Outbox', count: unreadCount.outbox },
    { name: 'sent', icon: Send, label: 'Sent', count: unreadCount.sent },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full">
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Mail className="h-6 w-6 text-indigo-600" />
            <MessageSquare className="h-6 w-6 text-indigo-600" />
            <span className="font-semibold text-lg">Messages</span>
          </div>
          {connected ? (
            <Wifi className="h-4 w-4 text-green-500" />
          ) : (
            <WifiOff className="h-4 w-4 text-red-500" />
          )}
        </div>
        
        {folders.map((folder) => (
          <button
            key={folder.name}
            onClick={() => onFolderChange(folder.name)}
            className={`w-full flex items-center justify-between p-3 rounded-lg mb-2 ${
              activeFolder === folder.name
                ? 'bg-indigo-50 text-indigo-600'
                : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <folder.icon className="h-5 w-5" />
              <span>{folder.label}</span>
            </div>
            {folder.count > 0 && (
              <span className="bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full text-xs">
                {folder.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}