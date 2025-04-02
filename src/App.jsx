import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Bell } from 'lucide-react';
import Sidebar from './Components/SideBar';
import ComposeModal from './Components/ComposeModel';
import MessageList from './Components/MessageList';
import SearchBar from './Components/SearchBar';
import Notification from './Components/Notification';

const mockMessages = [
  {
    id: '1',
    type: 'email',
    subject: 'Weekly Update',
    content: 'Here is your weekly project update...',
    sender: 'john@example.com',
    recipient: 'user@example.com',
    timestamp: new Date(),
    read: false,
    folder: 'inbox'
  },
  {
    id: '2',
    type: 'text',
    content: 'Meeting at 3pm today',
    sender: '+1234567890',
    recipient: '+0987654321',
    timestamp: new Date(),
    read: true,
    folder: 'inbox'
  }
];

const WS_URL = 'wss://echo.websocket.org';

function App() {
  const [messages, setMessages] = useState(mockMessages);
  const [activeFolder, setActiveFolder] = useState('inbox');
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [wsConnected, setWsConnected] = useState(false);

  const unreadCount = {
    inbox: messages.filter(m => m.folder === 'inbox' && !m.read).length,
    outbox: messages.filter(m => m.folder === 'outbox' && !m.read).length,
    sent: messages.filter(m => m.folder === 'sent' && !m.read).length
  };

  const filteredMessages = messages
    .filter(m => m.folder === activeFolder)
    .filter(m => 
      m.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (m.subject?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );

  const handleMessageSelect = (message) => {
    setMessages(messages.map(m => 
      m.id === message.id ? { ...m, read: true } : m
    ));
  };

  const handleSend = (data) => {
    const newMessage = {
      id: Date.now().toString(),
      ...data,
      sender: 'user@example.com',
      timestamp: new Date(),
      read: true,
      folder: 'sent'
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const showNotification = useCallback((message) => {
    setNotification({
      id: Date.now(),
      title: message.type === 'email' ? message.subject : 'New Message',
      message: `From: ${message.sender}`,
      type: message.type
    });

    setTimeout(() => {
      setNotification(null);
    }, 5000);
  }, []);

  useEffect(() => {
    let ws = null;
    let reconnectTimeout = null;
    let pingInterval = null;

    const connect = () => {
      try {
        ws = new WebSocket(WS_URL);

        ws.onopen = () => {
          console.log('WebSocket connected');
          setWsConnected(true);
          setError(null);

          pingInterval = setInterval(() => {
            if (ws.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify({ type: 'ping' }));
            }
          }, 30000);
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.type === 'pong') return;

            const newMessage = {
              id: Date.now().toString(),
              type: data.messageType || 'email',
              subject: data.subject || 'New Message',
              content: data.content || 'You have a new message',
              sender: data.sender || 'system@example.com',
              recipient: 'user@example.com',
              timestamp: new Date(),
              read: false,
              folder: 'inbox'
            };

            setMessages(prev => [...prev, newMessage]);
            showNotification(newMessage);
          } catch (err) {
            console.error('Error processing message:', err);
          }
        };

        ws.onclose = () => {
          console.log('WebSocket disconnected');
          setWsConnected(false);
          clearInterval(pingInterval);

          reconnectTimeout = setTimeout(connect, 5000);
        };

        ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          setError('Connection error. Retrying...');
        };
      } catch (err) {
        console.error('WebSocket connection error:', err);
        setError('Failed to connect. Retrying...');
        reconnectTimeout = setTimeout(connect, 5000);
      }
    };

    connect();

    return () => {
      if (ws) {
        ws.close();
      }
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
      if (pingInterval) {
        clearInterval(pingInterval);
      }
    };
  }, [showNotification]);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          activeFolder={activeFolder}
          onFolderChange={setActiveFolder}
          unreadCount={unreadCount}
          connected={wsConnected}
        />
        
        <div className="flex-1 flex flex-col">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onFilterClick={() => {/* Implement filter dialog */}}
          />
          
          {loading ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
            </div>
          ) : error ? (
            <div className="flex-1 flex items-center justify-center text-red-600">
              {error}
            </div>
          ) : (
            <MessageList
              messages={filteredMessages}
              onMessageSelect={handleMessageSelect}
            />
          )}
        </div>
      </div>

      <button
        onClick={() => setIsComposeOpen(true)}
        className="fixed right-6 bottom-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700"
      >
        <Plus className="h-6 w-6" />
      </button>

      <ComposeModal
        isOpen={isComposeOpen}
        onClose={() => setIsComposeOpen(false)}
        onSend={handleSend}
      />

      {notification && <Notification {...notification} onClose={() => setNotification(null)} />}
    </div>
  );
}

export default App;