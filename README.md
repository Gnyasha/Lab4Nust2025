# Student Registration System

A web application for managing student registrations that has profile cards and a summary table. The application features form validation, dark mode support, and local storage persistence.

## Features

- **Registration Form**: Collect student information with validation
- **Profile Cards**: Visual display of registered students
- **Summary Table**: Tabular view of student registrations
- **Dark/Light Theme**: Toggle between visual themes
- **Responsive Design**: Adapts to various screen sizes
- **Data Persistence**: Stores data in browser local storage

## Technologies Used

- HTML5
- CSS3 (with Flexbox and CSS Grid)
- Vanilla JavaScript
- Local Storage API
- Responsive design principles

## Implementation Details

### HTML Structure

The `index.html` file contains:
- Registration form with various input fields
- Cards container for student profiles
- Summary table for registered students
- Theme toggle button

### JavaScript Functionality

The `script.js` file implements:
- Form validation for required fields
- Local storage management for persistence
- Dynamic creation of profile cards and table rows
- Theme toggling with state persistence
- Profile management (adding and removing)

### Styling

The `styles.css` file provides:
- Responsive layouts using CSS Grid and Flexbox
- Dark mode styling with smooth transitions
- Card and table styling with hover effects
- Form styling with validation indicators
- Media queries for mobile responsiveness

## Usage

1. Fill out the registration form with student details
2. Submit the form to create a new student profile
3. View the student in both card and table views
4. Toggle between light and dark themes as needed
5. Remove profiles using the "Remove" button

All data persists between sessions using the browser's local storage cache.

## Dependencies

- Google Fonts (Roboto)
- Unsplash background image