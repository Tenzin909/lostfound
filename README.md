# Lost & Found Web Application

A full-stack web application for posting and finding lost and found items. Built with React, Node.js, Express, and MongoDB.

## Project Structure

```
lostfound/
├── server/                 # Node.js backend
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── middleware/        # Authentication middleware
│   ├── server.js          # Express server
│   └── package.json
├── client/                # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── api/           # API client
│   │   ├── context/       # Auth context
│   │   ├── styles/        # CSS files
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## Tech Stack

- **Frontend**: React 18, Vite, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT
- **Deployment**: Render

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn
- MongoDB Atlas account

### Backend Setup

1. Navigate to server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your MongoDB URI and JWT secret:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lostfound?retryWrites=true&w=majority
   PORT=5000
   JWT_SECRET=your_secret_key_here
   ```

5. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with API URL:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

5. Start development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`

## Features

### User Features
- **Browse Items**: View all lost and found items
- **Search & Filter**: Filter by type (Lost/Found), category, and search terms
- **Post Items**: Create new lost or found item postings
- **User Authentication**: Secure login and registration
- **Claim Items**: Users can claim found items
- **User Profile**: View posted items and profile information

### Item Categories
- Electronics
- Clothing
- Accessories
- Documents
- Keys
- Other

### Item Types
- Lost
- Found

### Item Status
- Active
- Claimed
- Resolved

## API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (protected)

### Items
- `GET /api/items` - Get all items (with filters)
- `GET /api/items/:id` - Get single item details
- `POST /api/items` - Create new item (protected)
- `PUT /api/items/:id` - Update item (protected)
- `DELETE /api/items/:id` - Delete item (protected)
- `POST /api/items/:id/claim` - Claim an item (protected)

## Deployment on Render

### Backend Deployment

1. Push code to GitHub
2. Go to [render.com](https://render.com)
3. Click "New Web Service"
4. Connect your GitHub repository
5. Configure:
   - Name: `lost-found-api`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Add environment variables from `.env`
6. Deploy

### Frontend Deployment

1. Go to [render.com](https://render.com)
2. Click "New Static Site"
3. Connect your GitHub repository
4. Configure:
   - Name: `lost-found-client`
   - Build Command: `npm run build`
   - Publish Directory: `dist`
   - Environment: Add `VITE_API_URL` pointing to your backend URL
5. Deploy

### Environment Variables for Render

**Backend (.env)**
```
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

**Frontend (.env)**
```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

## MongoDB Atlas Setup

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create a new cluster
4. Set up database user with username/password
5. Get connection string
6. Add IP address to whitelist (0.0.0.0/0 for development)
7. Update `.env` with connection string

## Development

### Local Testing

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

### Build for Production

```bash
# Backend
cd server
npm run build (if applicable)

# Frontend
cd client
npm run build
```

## Contributing

Feel free to fork, submit issues, and create pull requests.

## License

ISC
