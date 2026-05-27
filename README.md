# EventDekho - Complete Event Management System

A full-stack event management platform with real-time updates, admin dashboard, and organizer approval system.

## 🚀 Features

### **For Users**
- Browse and discover events
- Real-time event updates
- Advanced filtering and search
- Event details and registration
- Responsive design

### **For Admins**
- Complete admin dashboard
- Event CRUD operations with image uploads
- User management
- Organizer approval system
- Real-time analytics
- Persistent authentication

### **For Organizers**
- Event creation and management
- Approval workflow system
- Real-time updates
- Image upload support

## 🛠️ Tech Stack

### **Frontend**
- React 18 with Vite
- Tailwind CSS for styling
- Framer Motion for animations
- Socket.IO Client for real-time updates
- React Router for navigation
- Axios for API calls

### **Backend**
- Node.js with Express
- MongoDB with Mongoose
- Socket.IO for real-time updates
- JWT authentication
- Multer for image uploads
- Nodemailer for emails

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## 🚀 Installation & Setup

### **1. Clone the Repository**
```bash
git clone https://github.com/aadarshBhai/apnaevents.git
cd apnaevents
```

### **2. Install Dependencies**
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### **3. Environment Setup**
Create a `.env` file in the `backend` directory:

```env
# Database
MONGO_URI=mongodb://localhost:27017/eventdekho

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-here

# Admin Credentials
ADMIN_EMAIL=aadarshgolucky@gmail.com
ADMIN_PASSWORD=Aadarsh@123

# Email Configuration (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Frontend URLs
FRONTEND_URLS=http://localhost:3000,http://localhost:3001
```

### **4. Start the Application**
```bash
# Start both frontend and backend concurrently
npm run dev
```

Or start them separately:

```bash
# Start backend (port 5000)
cd backend
npm run dev

# Start frontend (port 3000) - in another terminal
npm run dev
```

## 🌐 Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Admin Dashboard**: http://localhost:3000/admin/dashboard
- **Events Page**: http://localhost:3000/events

## 👤 Default Admin Credentials

- **Email**: aadarshgolucky@gmail.com
- **Password**: Aadarsh@123

## 📱 Usage Guide

### **For Admins**
1. Navigate to `/admin` and login with admin credentials
2. Access the dashboard to manage events and users
3. Approve organizer requests in the "Organizers" tab
4. Create, edit, and delete events with image uploads

### **For Organizers**
1. Register with role "organizer"
2. Wait for admin approval
3. Once approved, create and manage events
4. Events are visible to users in real-time

### **For Users**
1. Browse events on the events page
2. Filter by category, date, and search
3. View event details
4. Real-time updates when new events are added

## 🔄 Real-time Features

- **Live Event Updates**: New events appear instantly without refresh
- **Admin Dashboard**: Real-time statistics and activity monitoring
- **Cross-tab Sync**: Updates across all open browser tabs
- **Socket.IO Integration**: WebSocket connections with polling fallback

## 📁 Project Structure

```
apnaevents/
├── src/                          # Frontend React App
│   ├── components/              # Reusable Components
│   ├── pages/                   # Page Components
│   ├── context/                 # React Context
│   ├── api/                     # API Configuration
│   └── hooks/                   # Custom Hooks
├── backend/                      # Backend Node.js App
│   ├── models/                  # Mongoose Models
│   ├── routes/                  # API Routes
│   ├── middleware/              # Custom Middleware
│   ├── utils/                   # Utility Functions
│   └── uploads/                 # Image Upload Directory
├── public/                       # Static Assets
└── docs/                        # Documentation
```

## 🔧 API Endpoints

### **Authentication**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### **Events**
- `GET /api/events` - Get all events (with filtering)
- `GET /api/events/:id` - Get single event
- `POST /api/events` - Create event (protected)
- `PUT /api/events/:id` - Update event (protected)
- `DELETE /api/events/:id` - Delete event (protected)

### **Admin**
- `GET /api/admin/stats` - Get dashboard statistics
- `GET /api/admin/events` - Get all events (admin)
- `POST /api/admin/events` - Create event (admin)
- `PUT /api/admin/events/:id` - Update event (admin)
- `DELETE /api/admin/events/:id` - Delete event (admin)
- `GET /api/admin/organizers/pending` - Get pending organizers
- `PUT /api/admin/organizers/:id/approve` - Approve organizer

## 🎨 Features Details

### **Event Management**
- Create events with title, description, date, location
- Upload event images
- Category and tagging system
- Event status management (upcoming, ongoing, closed)
- Featured events support

### **User Management**
- Role-based access control (student, organizer, admin)
- Organizer approval workflow
- Persistent authentication
- Profile management

### **Real-time Updates**
- Socket.IO integration
- Live event creation/update/deletion
- Cross-browser synchronization
- Automatic dashboard updates

## 🛡️ Security Features

- JWT-based authentication
- Role-based authorization
- Protected API routes
- Input validation and sanitization
- CORS configuration
- HTTP-only cookies

## 📊 Performance Features

- Pagination for large datasets
- Image optimization
- Lazy loading
- Caching strategies
- Optimized database queries

## 🌟 Future Enhancements

- [ ] Event registration system
- [ ] Payment integration
- [ ] Email notifications
- [ ] Advanced analytics
- [ ] Mobile app
- [ ] Multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, please email aadarshgolucky@gmail.com or create an issue on GitHub.

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Socket.IO for real-time communication
- MongoDB for the database solution
- All contributors and users of this platform

---

**Built with ❤️ by Aadarsh Kumar**
