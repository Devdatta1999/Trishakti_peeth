# Quick Tunnel Setup Guide

This guide will help you quickly set up a tunnel to share your website temporarily.

## Quick Start with localtunnel (Easiest - No Signup)

1. **Install localtunnel:**
   ```bash
   npm install -g localtunnel
   ```

2. **Start your servers:**
   ```bash
   # Terminal 1 - Start both servers
   npm run dev
   ```

3. **Create tunnels in separate terminals:**
   ```bash
   # Terminal 2 - Frontend tunnel
   npm run tunnel:frontend
   # Copy the URL shown (e.g., https://random-name.loca.lt)
   
   # Terminal 3 - Backend tunnel
   npm run tunnel:backend
   # Copy the URL shown (e.g., https://another-name.loca.lt)
   ```

4. **Configure API URL:**
   ```bash
   # In client/ directory, create .env file
   cd client
   echo REACT_APP_API_BASE_URL=https://YOUR-BACKEND-URL.loca.lt > .env
   ```
   Replace `YOUR-BACKEND-URL` with the actual backend tunnel URL from Terminal 3.

5. **Update CORS in server/index.js:**
   Add your frontend tunnel URL to the `origin` array:
   ```javascript
   origin: [
     'http://localhost:3000', 
     'http://localhost:3001',
     'https://YOUR-FRONTEND-URL.loca.lt'  // Add this
   ]
   ```

6. **Restart React server:**
   Stop and restart the React development server (Ctrl+C in Terminal 1, then `npm run dev` again)

7. **Share the frontend URL** from Terminal 2 with others!

## Using ngrok (More Stable)

1. **Install ngrok:**
   - Download from https://ngrok.com/download
   - Or: `npm install -g ngrok`

2. **Sign up and authenticate:**
   - Sign up at https://dashboard.ngrok.com/signup
   - Run: `ngrok config add-authtoken YOUR_TOKEN`

3. **Follow steps 2-7 above**, but use:
   ```bash
   # Instead of npm run tunnel:frontend
   ngrok http 3000
   
   # Instead of npm run tunnel:backend
   ngrok http 5001
   ```

## Troubleshooting

- **API calls not working?** Make sure you:
  1. Created the `.env` file in `client/` directory
  2. Set `REACT_APP_API_BASE_URL` to your backend tunnel URL
  3. Restarted the React development server

- **CORS errors?** Make sure you added your frontend tunnel URL to the `origin` array in `server/index.js`

- **Tunnel URL changed?** Update the `.env` file and CORS settings, then restart servers

## Notes

- Free tunnel URLs change each time you restart the tunnel
- For local development (no tunnel), leave `REACT_APP_API_BASE_URL` empty in `.env`
- Tunnels are for temporary sharing only - not for production use
