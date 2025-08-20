# Whiteboard Backend

Real-time collaborative whiteboard backend built with Express.js and Socket.IO.

## Features

- Real-time drawing collaboration
- Multiple whiteboard support
- WebSocket-based communication
- RESTful API endpoints

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

## Render Deployment

### Prerequisites
- Render account (sign up at [render.com](https://render.com))
- GitHub repository connected

### Deployment Steps

1. **Go to [render.com](https://render.com)**
2. **Click "New +" → "Web Service"**
3. **Connect your GitHub repository**
4. **Configure the service:**
   - **Name:** `whiteboard-backend`
   - **Environment:** `Node`
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** `Free`
5. **Click "Create Web Service"**

### Environment Variables

Render will automatically set:
- `PORT` - Render assigns this automatically
- `NODE_ENV` - Set to 'production'

### Custom Domain (Optional)

1. Go to your Render project dashboard
2. Navigate to Settings → Domains
3. Add your custom domain

## API Endpoints

- `GET /` - Health check
- WebSocket connections for real-time drawing

## WebSocket Events

- `join` - Join a whiteboard
- `drawing` - Send drawing data
- `clear` - Clear the whiteboard
- `load` - Load existing drawings

## Troubleshooting

- Ensure all dependencies are in `package.json`
- Check Render logs in the dashboard
- Verify environment variables are set correctly
- Ensure Node.js version is 18+ (specified in package.json)

## Current Deployment

**Live URL:** https://whiteboard-backend-or3o.onrender.com
**Status:** ✅ Production Ready
