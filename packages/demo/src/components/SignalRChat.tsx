'use client';

import { useState, useEffect, useRef } from 'react';
import * as signalR from '@microsoft/signalr';

interface Message {
  user: string;
  text: string;
  timestamp: Date;
}
const useUserName = () => {
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    // Генерируем имя ТОЛЬКО на клиенте
    setUserName(`User${Math.floor(Math.random() * 1000)}`);
  }, []);

  return userName;
};

export default function SignalRChat() {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null,
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('Отключен');
  const userName = useUserName();

  // Подключение к SignalR
  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl('wss://localhost:5001/chat')
      .withAutomaticReconnect() // Автоподключение при разрыве
      .configureLogging(signalR.LogLevel.Information) // Логирование
      .build();

    // Обработчики событий
    newConnection.on('newMessage', (user: string, message: string) => {
      setMessages((prev) => [
        ...prev,
        {
          user,
          text: message,
          timestamp: new Date(),
        },
      ]);
    });

    newConnection.onclose(() => setStatus('Отключен'));
    newConnection.onreconnecting(() => setStatus('Переподключение...'));
    newConnection.onreconnected(() => setStatus('Подключен'));

    // Запуск соединения
    newConnection
      .start()
      .then(() => {
        setStatus('Подключен');
        setConnection(newConnection);
      })
      .catch((err) => {
        console.error('Ошибка подключения:', err);
        setStatus('Ошибка подключения');
      });

    // Очистка при размонтировании
    return () => {
      newConnection.stop();
    };
  }, []);

  // Отправка сообщения
  const sendMessage = async () => {
    if (!connection || !input.trim()) return;

    try {
      await connection.invoke('SendMessage', userName, input);
      setInput('');
    } catch (err) {
      console.error('Ошибка отправки:', err);
    }
  };

  return (
    <div
      style={{
        padding: '20px',
        border: '1px solid #007bff',
        borderRadius: '8px',
      }}
    >
      <h3>💬 SignalR Чат (Real-time)</h3>
      <p>
        Статус: <strong>{status}</strong>
      </p>
      <p>
        Имя: <strong>{userName}</strong>
      </p>

      <div
        style={{
          height: '300px',
          overflowY: 'auto',
          border: '1px solid #ccc',
          padding: '10px',
          marginBottom: '10px',
          backgroundColor: '#f9f9f9',
        }}
      >
        {messages.map((msg, idx) => (
          <div key={idx} style={{ marginBottom: '8px' }}>
            <strong>{msg.user}:</strong> {msg.text}
            <div style={{ fontSize: '12px', color: '#666' }}>
              {msg.timestamp.toLocaleTimeString()}
            </div>
          </div>
        ))}
        {messages.length === 0 && (
          <p style={{ color: '#999', textAlign: 'center' }}>
            Сообщений пока нет. Напишите первым!
          </p>
        )}
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Введите сообщение..."
          style={{ flex: 1, padding: '8px' }}
          disabled={status !== 'Подключен'}
        />
        <button
          onClick={sendMessage}
          disabled={status !== 'Подключен' || !input.trim()}
          style={{
            padding: '8px 16px',
            backgroundColor: status === 'Подключен' ? '#007bff' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: status === 'Подключен' ? 'pointer' : 'not-allowed',
          }}
        >
          Отправить
        </button>
      </div>

      <div style={{ marginTop: '15px', fontSize: '12px', color: '#666' }}>
        ⚡ SignalR автоматически выбирает: WebSocket → SSE → Long Polling
      </div>
    </div>
  );
}
