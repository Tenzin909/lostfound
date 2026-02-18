# Quick Start Guide - Lost & Found Application

## 🚀 Local Development Setup (5 minutes)

### 1. Clone/Navigate to project
```bash
cd /Users/tenzindargyal/lostfound
```

### 2. Setup Backend
```bash
cd server
npm install
cp .env.example .env
```

Edit `.env` and add your MongoDB URI:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lostfound?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=dev_secret_key_change_in_production
```

Start backend:
```bash
npm run dev
```
✅ Backend runs at http://localhost:5000

### 3. Setup Frontend (New Terminal)
```bash
cd client
npm install
cp .env.example .env
```

Start frontend:
```bash
npm run dev
```
✅ Frontend runs at http://localhost:3000

---

## 📝 Testing the Application

1. **Open** http://localhost:3000
2. **Register** a new account
3. **Post** a Lost or Found item
4. **Browse** items with filters
5. **View** item details
6. **Claim** found items

---

## 🌐 Deploy to Render (20 minutes)

### Prerequisites
- GitHub repository (push your code)
- Render account (render.com)
- MongoDB Atlas account

### Step 1: MongoDB Atlas
1. Go to https://www.mongodb.com/cloud/atlas
2. Create cluster (Free M0)
3. Create database user
4. Get connection string
5. Add IP: 0.0.0.0/0 to Network Access

### Step 2: Deploy Backend

1. Push code to GitHub:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. On Render:
   - Click "New Web Service"
   - Select GitHub repo
   - **Name**: `lost-found-api`
   - **Build**: `npm install`
   - **Start**: `npm start`
   
3. Add environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Strong random string
   - `NODE_ENV`: `production`

4. Deploy and copy the URL (e.g., `https://lost-found-api.onrender.com`)

### Step 3: Deploy Frontend

1. On Render:
   - Click "New Static Site"
   - Select GitHub repo
   - **Build**: `cd client && npm install && npm run build`
   - **Publish**: `client/dist`

2. Add environment variables:
   - `VITE_API_URL`: `https://lost-found-api.onrender.com/api`

3. Deploy

✅ Your app is live!

---

## 📁 Project Structure

```
lostfound/
├── server/
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth middleware
│   └── server.js        # Express app
├── client/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── api/         # API client
│   │   ├── context/     # Auth context
│   │   └── styles/      # CSS
│   └── vite.config.js
└── README.md
```

---

## 🔑 Environment Variables

**Backend (.env)**
```
MONGODB_URI=mongodb+srv://...
PORT=5000
JWT_SECRET=your_secret_key
NODE_ENV=development
```

**Frontend (.env)**
```
VITE_API_URL=http://localhost:5000/api
```

---

## 🐛 Troubleshooting

### Backend won't start
- Check MongoDB URI is correct
- Ensure port 5000 is available
- Run `npm install` again

### Frontend can't connect to backend
- Check `VITE_API_URL` is correct
- Verify backend is running
- Check browser console for errors

### MongoDB connection fails
- Verify credentials in URI
- Check IP whitelist (0.0.0.0/0)
- Ensure database exists

---

## 📚 API Documentation

### Authentication
```bash
# Register
POST /api/users/register
{ name, email, password, phone }

# Login
POST /api/users/login
{ email, password }
```

### Items
```bash
# Get all items (with filters)
GET /api/items?type=Lost&category=Electronics

# Get item details
GET /api/items/:id

# Create item (requires auth)
POST /api/items
{ title, description, category, type, location, contact, image }

# Claim item (requires auth)
POST /api/items/:id/claim
```

---

## ✨ Features

✅ Browse lost/found items
✅ Search & filter
✅ User authentication
✅ Post items
✅ Claim items
✅ Delete items
✅ Responsive design
✅ MongoDB Atlas integration
✅ JWT authentication
✅ Ready for Render deployment

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, React Router, Axios
- **Backend**: Node.js, Express, JWT
- **Database**: MongoDB Atlas
- **Deployment**: Render
- **Styling**: CSS3

---

## 📞 Support

For issues or questions, check:
1. README.md
2. RENDER_DEPLOYMENT.md
3. Backend console logs
4. Browser developer console

---

## 🎉 You're Ready!

Your Lost & Found application is ready to use! 
- Develop locally
- Deploy to Render
- Share with others
