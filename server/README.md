# Lost & Found Backend

Backend API for the Lost and Found application.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

3. Update `.env` with your MongoDB Atlas credentials

4. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Users
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (protected)

### Items
- `GET /api/items` - Get all items
- `POST /api/items` - Create new item (protected)
- `GET /api/items/:id` - Get item details
- `PUT /api/items/:id` - Update item (protected)
- `DELETE /api/items/:id` - Delete item (protected)
- `POST /api/items/:id/claim` - Claim an item (protected)
