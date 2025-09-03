# Notes App

A modern note-taking application built with React that allows users to create, organize, and manage their personal notes with authentication and theme switching capabilities.

## Features

### Core Functionality
- **User Authentication**: Complete registration and login system
- **Note Management**: Create, delete, archive, and unarchive notes
- **Real-time Sync**: All data synchronized with RESTful API
- **Protected Routes**: Notes accessible only to authenticated users

### User Experience
- **Theme Switcher**: Toggle between light and dark modes
- **Responsive Design**: Optimized for desktop and mobile devices
- **Loading Indicators**: Visual feedback for all async operations
- **Form Validation**: Input validation with error messages

### Technical Features
- **React Context**: State management for theme and authentication
- **Custom Hooks**: Reusable logic for forms and API operations
- **RESTful API Integration**: Dicoding Notes API integration
- **Persistent Storage**: Theme and authentication state persistence

## Technologies Used

- **Frontend**: React 18, JavaScript (ES6+)
- **State Management**: React Context API, useState, useEffect
- **Styling**: CSS3 with CSS Variables for theming
- **API**: RESTful API integration with fetch
- **Build Tool**: Create React App
- **Authentication**: JWT Token-based authentication

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/notes-app.git
   cd notes-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## Usage

### Getting Started
1. **Register**: Create a new account with name, email, and password
2. **Login**: Sign in with your credentials
3. **Create Notes**: Add new notes with title and content
4. **Organize**: Archive important notes or delete unwanted ones
5. **Customize**: Switch between light and dark themes

### API Integration
This app connects to the Dicoding Notes API:
- **Base URL**: `https://notes-api.dicoding.dev/v1`
- **Authentication**: Bearer Token
- **Endpoints**: Users, Notes, Archive operations

## Project Structure

```
src/
├── components/
│   ├── Auth/
│   │   ├── AuthPage.jsx
│   │   ├── LoginForm.jsx
│   │   └── RegisterForm.jsx
│   ├── Common/
│   │   ├── LoadingSpinner.jsx
│   │   └── PrivateRoute.jsx
│   ├── Layout/
│   │   └── Header.jsx
│   └── Notes/
│       ├── AddNoteForm.jsx
│       ├── NoteItem.jsx
│       ├── NoteList.jsx
│       └── NotesPage.jsx
├── contexts/
│   ├── AuthContext.js
│   └── ThemeContext.js
├── hooks/
│   ├── useInput.js
│   └── useNote.js
├── styles/
│   ├── components.css
│   ├── index.css
│   └── theme.css
├── utils/
│   └── network-data.js
├── App.jsx
└── index.js
```

## Key Components

### Custom Hooks
- **useInput**: Manages form input state and handlers
- **useNote**: Handles all note-related API operations

### Context Providers
- **AuthContext**: User authentication state management
- **ThemeContext**: Theme switching and persistence

### Protected Routes
- **PrivateRoute**: Ensures only authenticated users can access notes

## API Documentation

### Authentication Endpoints
- `POST /login` - User login
- `POST /register` - User registration
- `GET /users/me` - Get current user

### Notes Endpoints
- `GET /notes` - Get active notes
- `GET /notes/archived` - Get archived notes
- `POST /notes` - Create new note
- `POST /notes/:id/archive` - Archive note
- `POST /notes/:id/unarchive` - Unarchive note
- `DELETE /notes/:id` - Delete note

## Development

### Available Scripts
- `npm start` - Run development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

### Code Style
- Component naming: PascalCase for components, camelCase for functions
- File structure: Organized by feature and functionality
- CSS: BEM-like methodology with CSS variables

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Future Enhancements

- [ ] Search functionality for notes
- [ ] Categories and tags for notes
- [ ] Rich text editor
- [ ] Export notes to PDF/Markdown
- [ ] Collaborative notes sharing
- [ ] Offline support with PWA

## License

This project is created for educational purposes as part of Dicoding's React path.

---

**Built with ❤️ using React**
