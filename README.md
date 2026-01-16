# Trishakti Peeth Temple Website

A modern React and Node.js website for Trishakti Peeth Temple in Virul Ronghe, Amravati, Maharashtra.

## Project Structure

```
Trishakti_peeth/
├── client/          # React frontend
│   ├── public/      # Static files
│   └── src/         # React source code
├── server/          # Node.js backend
└── images/          # Image assets
```

## Setup Instructions

### 1. Install Dependencies

From the root directory, run:

```bash
npm run install-all
```

Or install separately:

```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### 2. Run Development Server

From the root directory:

```bash
npm run dev
```

This will start:
- React development server on `http://localhost:3000`
- Node.js server on `http://localhost:5001`

Or run separately:

```bash
# Terminal 1 - Start React app
cd client
npm start

# Terminal 2 - Start Node.js server
cd server
npm run dev
```

### 3. Build for Production

```bash
npm run build
```

This builds the React app for production. The build folder will be in `client/build/`.

## Making Your Website Temporarily Live (Tunneling)

To share your website with others while developing, you can use a tunnel service. Here are three popular options:

### Option 1: Using ngrok (Recommended)

**ngrok** is the most popular tunneling service with a free tier.

1. **Install ngrok:**
   - Download from [ngrok.com](https://ngrok.com/download)
   - Or install via npm: `npm install -g ngrok`
   - Or install via chocolatey (Windows): `choco install ngrok`

2. **Sign up for free account** at [ngrok.com](https://dashboard.ngrok.com/signup) and get your authtoken

3. **Authenticate:**
   ```bash
   ngrok config add-authtoken YOUR_AUTH_TOKEN
   ```

4. **Start your development servers** (in separate terminals):
   ```bash
   # Terminal 1 - Start React app
   cd client
   npm start
   
   # Terminal 2 - Start Node.js server
   cd server
   npm run dev
   ```

5. **Create tunnels** (in separate terminals):
   ```bash
   # Terminal 3 - Tunnel for React frontend (port 3000)
   ngrok http 3000
   
   # Terminal 4 - Tunnel for Node.js backend (port 5001)
   ngrok http 5001
   ```

6. **Update CORS settings** in `server/index.js` to include your ngrok URLs:
   ```javascript
   origin: [
     'http://localhost:3000', 
     'http://localhost:3001',
     'https://YOUR-FRONTEND-NGROK-URL.ngrok-free.app'
   ]
   ```

7. **Configure API URL for React app:**
   
   Create a `.env` file in the `client/` directory:
   ```bash
   cd client
   echo REACT_APP_API_BASE_URL=https://YOUR-BACKEND-NGROK-URL.ngrok-free.app > .env
   ```
   
   Replace `YOUR-BACKEND-NGROK-URL` with your actual backend ngrok URL.
   
   **Important:** Restart your React development server after creating/updating the `.env` file.

8. **Share the frontend ngrok URL** (e.g., `https://abc123.ngrok-free.app`) with others!

**Note:** Free ngrok URLs change each time you restart. Paid plans offer fixed domains.

### Option 2: Using localtunnel (No Signup Required)

**localtunnel** is a free npm package that doesn't require signup.

1. **Install localtunnel globally:**
   ```bash
   npm install -g localtunnel
   ```

2. **Start your development servers** (same as above)

3. **Create tunnels:**
   ```bash
   # Terminal 3 - Tunnel for React frontend
   lt --port 3000
   
   # Terminal 4 - Tunnel for Node.js backend
   lt --port 5001
   ```

4. **Update CORS settings** in `server/index.js` with the localtunnel URLs

5. **Configure API URL for React app:**
   
   Create a `.env` file in the `client/` directory:
   ```bash
   cd client
   echo REACT_APP_API_BASE_URL=https://YOUR-BACKEND-LOCALTUNNEL-URL.loca.lt > .env
   ```
   
   Replace `YOUR-BACKEND-LOCALTUNNEL-URL` with your actual backend localtunnel URL.
   
   **Important:** Restart your React development server after creating/updating the `.env` file.

6. **Share the frontend URL** (e.g., `https://random-name.loca.lt`) with others!

**Note:** localtunnel URLs also change on restart. You can request a custom subdomain: `lt --port 3000 --subdomain my-temple-site`

### Option 3: Using Cloudflare Tunnel (Free, No Signup) ⭐ Recommended if you have cloudflared installed

**Cloudflare Tunnel** (cloudflared) is free and doesn't require signup.

1. **Verify cloudflared is installed:**
   ```bash
   cloudflared --version
   ```
   If not installed, download from [developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation)

2. **Start your development servers:**
   ```bash
   # Terminal 1 - Start both servers
   npm run dev
   ```

3. **Create tunnels** (in separate terminals):
   ```bash
   # Terminal 2 - Tunnel for React frontend (port 3000)
   cloudflared tunnel --url http://localhost:3000
   # Copy the URL shown (e.g., https://random-name-1234.trycloudflare.com)
   
   # Terminal 3 - Tunnel for Node.js backend (port 5001)
   cloudflared tunnel --url http://localhost:5001
   # Copy the URL shown (e.g., https://another-name-5678.trycloudflare.com)
   ```

4. **Update CORS settings** in `server/index.js`:
   ```javascript
   origin: [
     'http://localhost:3000', 
     'http://localhost:3001',
     'https://YOUR-FRONTEND-CLOUDFLARE-URL.trycloudflare.com'  // Add this
   ]
   ```
   Replace with your actual frontend tunnel URL from Terminal 2.
   
   **Important:** Restart your development server after updating CORS.

5. **Configure API URL for React app:**
   
   Create a `.env` file in the `client/` directory:
   
   **Windows (PowerShell):**
   ```powershell
   cd client
   echo REACT_APP_API_BASE_URL=https://YOUR-BACKEND-CLOUDFLARE-URL.trycloudflare.com > .env
   ```
   
   **Windows (CMD) or Mac/Linux:**
   ```bash
   cd client
   echo REACT_APP_API_BASE_URL=https://YOUR-BACKEND-CLOUDFLARE-URL.trycloudflare.com > .env
   ```
   
   Replace `YOUR-BACKEND-CLOUDFLARE-URL` with your actual backend tunnel URL from Terminal 3.
   
   **Important:** Restart your React development server after creating/updating the `.env` file.

6. **Share the frontend URL** (from Terminal 2) with others!

**See `CLOUDFLARE_TUNNEL_GUIDE.md` for detailed step-by-step instructions.**

### Quick Setup Script

You can also create a simple script to automate tunneling. Add this to your `package.json`:

```json
"tunnel:frontend": "lt --port 3000",
"tunnel:backend": "lt --port 5001"
```

Then run:
```bash
npm run tunnel:frontend
npm run tunnel:backend
```

### Important Notes:

- ⚠️ **Security**: Tunnels expose your local server to the internet. Only use during development/testing.
- ⚠️ **CORS**: Remember to update CORS settings in `server/index.js` to allow your tunnel URLs.
- ⚠️ **API Configuration**: The React app uses environment variables to configure the API base URL. Create a `.env` file in the `client/` directory with `REACT_APP_API_BASE_URL` set to your backend tunnel URL.
- ⚠️ **Restart Required**: After creating or updating the `.env` file, you must restart your React development server for changes to take effect.
- ⚠️ **Local Development**: For local development without tunnels, leave `REACT_APP_API_BASE_URL` empty or unset - the app will use the proxy configured in `client/package.json`.

## Features

- ✅ Responsive design
- ✅ Image carousel with auto-rotation
- ✅ Scrolling mantra text
- ✅ Aarti schedule section
- ✅ Contact information and map
- ✅ Smooth scrolling navigation

## Technology Stack

- **Frontend**: React 18
- **Backend**: Node.js, Express
- **Styling**: CSS3 with CSS Variables
- **Fonts**: Poppins, Noto Sans Devanagari

## Next Steps

- MongoDB integration for dynamic content
- Individual page routes for each tab
- Backend API endpoints
- Database models and schemas

