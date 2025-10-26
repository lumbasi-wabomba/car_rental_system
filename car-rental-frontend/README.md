# Car Rental System - React Frontend

A modern, responsive React application for car rental services built with Vite.

## Features

- 🚗 **Car Browsing**: Browse available cars with advanced filtering
- 🔍 **Search & Filter**: Filter by location, price, car type, and dates
- 👤 **User Authentication**: Login, register, and profile management
- 📱 **Responsive Design**: Mobile-first responsive design
- 🎨 **Modern UI**: Clean and intuitive user interface
- 📊 **Admin Dashboard**: Admin panel for car and booking management
- 💳 **Booking System**: Complete booking flow with payment integration

## Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Styling**: CSS3 with custom properties
- **State Management**: React Context API

## Project Structure

```
src/
├── components/          # Reusable components
│   └── layout/         # Layout components (Navbar, Footer)
├── context/            # React Context providers
├── pages/              # Page components
├── services/           # API service layers
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
└── assets/             # Static assets
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd car-rental-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_API_URL=http://localhost:8000/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Core Components

### Context Providers

- **UserContext**: Manages user authentication and profile data
- **CarContext**: Manages car data, filtering, and search functionality

### Pages

- **Home**: Landing page with hero section and featured cars
- **Cars**: Car listing page with advanced filtering
- **CarDetails**: Individual car details and booking
- **Login/Register**: User authentication
- **Profile**: User profile management
- **Admin**: Administrative dashboard
- **Booking**: Booking flow and payment

### Services

- **authService**: Authentication API calls
- **carService**: Car-related API calls
- **bookingService**: Booking and payment API calls

## API Integration

The application is designed to work with a REST API backend. Key endpoints:

- `GET /api/cars/` - Fetch available cars
- `POST /api/auth/login/` - User authentication
- `POST /api/bookings/` - Create booking
- `GET /api/bookings/` - Fetch user bookings

## Styling Approach

- **CSS Custom Properties**: For consistent theming
- **Mobile-First**: Responsive design starting from mobile
- **Component-Scoped**: CSS modules for component isolation
- **Utility Classes**: Common utility classes for spacing and layout

## Key Features Implementation

### Car Filtering
- Location-based filtering
- Date range availability
- Price range slider
- Car type categories
- Real-time filter updates

### User Authentication
- JWT token-based authentication
- Persistent login state
- Protected routes
- Role-based access control

### Responsive Design
- Mobile navigation menu
- Flexible grid layouts
- Touch-friendly interfaces
- Optimized for all screen sizes

## Development Guidelines

### Code Organization
- Keep components small and focused
- Use custom hooks for shared logic
- Implement proper error boundaries
- Follow React best practices

### State Management
- Use Context API for global state
- Local state for component-specific data
- Proper error handling and loading states

### API Integration
- Centralized API configuration
- Request/response interceptors
- Error handling middleware
- Token refresh logic

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@carrental.com or create an issue in the repository.
