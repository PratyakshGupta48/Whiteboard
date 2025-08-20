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

2. Create a `.env` file based on `env.example`

3. Start the development server:
   ```bash
   npm run dev
   ```

## Railway Deployment

### Prerequisites
- Railway account (sign up at [railway.app](https://railway.app))
- Railway CLI installed (`npm install -g @railway/cli`)

### Deployment Steps

1. **Login to Railway:**
   ```bash
   railway login
   ```

2. **Initialize Railway project:**
   ```bash
   cd backend
   railway init
   ```

3. **Deploy to Railway:**
   ```bash
   railway up
   ```

4. **Get your deployment URL:**
   ```bash
   railway status
   ```

### Environment Variables

Railway will automatically set:
- `PORT` - Railway assigns this automatically
- `NODE_ENV` - Set to 'production'

### Custom Domain (Optional)

1. Go to your Railway project dashboard
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
- Check Railway logs: `railway logs`
- Verify environment variables are set correctly
- Ensure Node.js version is 18+ (specified in package.json)
