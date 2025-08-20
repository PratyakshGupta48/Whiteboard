// Backend Configuration
const config = {
  // Production backend URL (Render)
  BACKEND_URL: 'https://whiteboard-backend-or3o.onrender.com',
  
  // Development backend URL (local)
  // BACKEND_URL: 'http://localhost:5000',
  
  // Socket.IO configuration
  SOCKET_OPTIONS: {
    transports: ['websocket', 'polling'],
    timeout: 20000,
    forceNew: true
  }
};

export default config;
