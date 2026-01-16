# Cloudflare Tunnel Setup Guide

This guide will help you host your website using Cloudflare Tunnel (cloudflared).

## Prerequisites

- ✅ cloudflared is already installed on your machine
- ✅ Your development servers running (React on port 3000, Node.js on port 5001)

## Step-by-Step Instructions

### Step 1: Start Your Development Servers

Open Terminal 1 and start both servers:

```bash
npm run dev
```

This will start:
- React frontend on `http://localhost:3000`
- Node.js backend on `http://localhost:5001`

Keep this terminal running.

### Step 2: Create Frontend Tunnel

Open a new terminal (Terminal 2) and run:

```bash
cloudflared tunnel --url http://localhost:3000
```

You'll see output like:
```
+--------------------------------------------------------------------------------------------+
|  Your quick Tunnel has been created! Visit it at (it may take some time to be reachable): |
|  https://random-name-1234.trycloudflare.com                                               |
+--------------------------------------------------------------------------------------------+
```

**Copy the frontend URL** (e.g., `https://random-name-1234.trycloudflare.com`)

Keep this terminal running.

### Step 3: Create Backend Tunnel

Open another new terminal (Terminal 3) and run:

```bash
cloudflared tunnel --url http://localhost:5001
```

You'll see output like:
```
+--------------------------------------------------------------------------------------------+
|  Your quick Tunnel has been created! Visit it at (it may take some time to be reachable): |
|  https://another-name-5678.trycloudflare.com                                              |
+--------------------------------------------------------------------------------------------+
```

**Copy the backend URL** (e.g., `https://another-name-5678.trycloudflare.com`)

Keep this terminal running.

### Step 4: Update CORS Settings

Edit `server/index.js` and add your frontend Cloudflare tunnel URL to the `origin` array:

```javascript
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'http://localhost:3001',
    'https://random-name-1234.trycloudflare.com'  // Add your frontend tunnel URL here
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
```

Replace `https://random-name-1234.trycloudflare.com` with your actual frontend tunnel URL from Step 2.

**Important:** After updating `server/index.js`, restart your development server (stop Terminal 1 with Ctrl+C, then run `npm run dev` again).

### Step 5: Configure React App to Use Backend Tunnel

Create a `.env` file in the `client/` directory:

**On Windows (PowerShell):**
```powershell
cd client
echo REACT_APP_API_BASE_URL=https://another-name-5678.trycloudflare.com > .env
```

**On Windows (Command Prompt):**
```cmd
cd client
echo REACT_APP_API_BASE_URL=https://another-name-5678.trycloudflare.com > .env
```

**On Mac/Linux:**
```bash
cd client
echo 'REACT_APP_API_BASE_URL=https://another-name-5678.trycloudflare.com' > .env
```

Replace `https://another-name-5678.trycloudflare.com` with your actual backend tunnel URL from Step 3.

### Step 6: Restart React Development Server

**Important:** You must restart the React development server for the `.env` file to take effect.

1. Stop the server in Terminal 1 (Ctrl+C)
2. Start it again:
   ```bash
   npm run dev
   ```

### Step 7: Share Your Website!

Your website is now live! Share the **frontend URL** from Step 2 with others:
- Example: `https://random-name-1234.trycloudflare.com`

## Quick Reference Commands

```bash
# Terminal 1 - Development servers
npm run dev

# Terminal 2 - Frontend tunnel
cloudflared tunnel --url http://localhost:3000

# Terminal 3 - Backend tunnel
cloudflared tunnel --url http://localhost:5001
```

## Troubleshooting

### Issue: API calls not working
- ✅ Make sure you created the `.env` file in `client/` directory
- ✅ Make sure `REACT_APP_API_BASE_URL` is set to your backend tunnel URL
- ✅ Restart the React development server after creating/updating `.env`

### Issue: CORS errors
- ✅ Make sure you added your frontend tunnel URL to the `origin` array in `server/index.js`
- ✅ Restart the Node.js server after updating CORS settings

### Issue: Tunnel URL changed
- Cloudflare Tunnel URLs change each time you restart the tunnel
- If you restart a tunnel, you'll need to:
  1. Update the `.env` file (if backend URL changed)
  2. Update CORS settings (if frontend URL changed)
  3. Restart your development servers

### Issue: "Connection refused" or tunnel not working
- Make sure your development servers are running before starting tunnels
- Check that ports 3000 and 5001 are not blocked by firewall
- Try restarting the tunnels

## Notes

- ⚠️ **Temporary URLs**: Cloudflare Tunnel URLs are temporary and change on restart
- ⚠️ **Free Tier**: The free tier has some limitations (connection timeouts after inactivity)
- ⚠️ **Security**: Only use for development/testing, not production
- ✅ **No Signup Required**: Cloudflare Tunnel works without account signup
- ✅ **HTTPS**: All tunnel URLs use HTTPS automatically

## Alternative: Single Tunnel (Advanced)

If you want to use a single tunnel for both frontend and backend, you can use Cloudflare Tunnel with a configuration file, but the two-tunnel approach above is simpler for quick sharing.
