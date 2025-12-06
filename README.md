# Form Validation and Authentication System

This project is a front-end authentication and form validation application built using React. It provides user signup and login functionality with secure password handling, validation rules, and protected routing. All user data is stored in the browser using localStorage, and passwords are encrypted with bcryptjs to ensure better security.

---

## Features

- User Signup and Login
- Form validation for all fields
- Password hashing using bcryptjs
- Protected routes using React Router
- Persistent authentication using localStorage
- Error and success notifications using react-toastify
- Password visibility toggle
- User-friendly UI transitions between login and signup

---

## Technology Stack

| Technology | Purpose |
|-----------|---------|
| React | Front-end UI |
| React Router DOM | Routing and protected pages |
| bcryptjs | Password hashing |
| localStorage API | Client-side user persistence |
| react-toastify | Notification system |

---

## Validation Rules

### Name (Signup Only)
- Must contain only alphabetic characters (A–Z)
- Minimum length: 3 characters

### Email
- Must follow valid email format
- Example: username@example.com

### Password
- At least 8 characters long
- Must include letters and numbers

---

## Project Structure

```
src/
 ├── components/
 │   └── ProtectedRoute.jsx
 ├── pages/
 │   ├── Auth.jsx
 │   └── Home.jsx
 ├── Router.jsx
 ├── App.jsx
 └── index.js
```

---

## Installation

1. Clone the repository:

```
git clone https://github.com/Priyam7302/Form_validation_assignment.git
```

2. Navigate into the project directory:

```
cd form-validation-auth
```

3. Install dependencies:

```
npm install
```

4. Start the development server:

```
npm start
```

The project will run on:  
`http://localhost:5173` (or based on your setup)

---

## How Authentication Works

1. When a user signs up, their password is hashed using bcryptjs and stored in localStorage along with name and email.
2. During login, the entered password is compared against the stored hashed password.
3. If login succeeds, the user is marked as logged in and allowed to access protected routes.
4. If not authenticated, attempted access to protected routes redirects the user back to the login page.

---


## Future Enhancements

- Integration with backend authentication (Node.js, Firebase, or JWT)
- Forgot password and email verification
- UI redesign with responsive layout improvements
- Validation using libraries such as Yup or React Hook Form

---



