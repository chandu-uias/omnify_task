# Blog Application

## Overview
This is a full-stack Blog Application that allows users to create, view, and manage blog posts. The application includes user authentication, blog creation, public blog listing with pagination, and blog management features.

## Features
- User authentication (Signup/Login) using email and password.
- Only authenticated users can create, edit, and delete their blogs.
- Public blog listing page with pagination.
- Blog detail page displaying full content.
- Responsive design for both desktop and mobile devices.
- Backend API with RESTful endpoints for authentication and blog CRUD operations.
- Data storage using a SQL/NoSQL database.
- Deployed on a cloud-based platform.

## Tech Stack
### Frontend:
- React 
- React Router for navigation
- Axios for API requests

### Backend:
- Node.js with Express.js
- MongoDB with Mongoose 
- bcrypt for password hashing

### Deployment:
-Hosted on Vercel/Netlify


## Installation and Setup
### Prerequisites:
- Node.js and npm installed
- MongoDB installed or cloud database access

### Clone the repository:
```sh
https://github.com/chandu-uias/omnify_task.git
cd omnify_task
```

### Backend Setup:
```sh
cd server
npm install
```
Create a `.env` file in the backend folder and add:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string

```
Run the backend:
```sh
npm start
```

### Frontend Setup:
```sh
cd cilent
npm install
```
Run the frontend:
```sh
npm start
```

## API Endpoints
### Authentication:
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user and get a token

### Blogs:
- `GET /api/blogs` - Fetch all blogs with pagination
- `GET /api/blogs/:id` - Get blog details
- `POST /api/blogs` - Create a new blog (Authenticated users only)
- `PUT /api/blogs/:id` - Update blog (Only blog author)
- `DELETE /api/blogs/:id` - Delete blog (Only blog author)

## Deployment Links
- **Live:** https://omnify-task-pnin.vercel.app/







