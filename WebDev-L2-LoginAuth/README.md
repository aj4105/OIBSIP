# Login Authentication System — Web Development & Designing (Level 2, Task 4)

## Objective
A client-side authentication system featuring user registration, login validation, and a protected dashboard page. Built with HTML, CSS, and vanilla JavaScript using localStorage/sessionStorage for data persistence.

## Tech Stack
- HTML5
- CSS3 (responsive design, gradients, animations)
- JavaScript (Vanilla, Web Crypto API for hashing)
- Browser Storage: localStorage (user accounts), sessionStorage (active session)

## Features
- **Registration page**: email/username + password + confirm password fields
- Password validation: minimum 8 characters, at least 1 number required
- Duplicate email/username detection with clear error messaging
- **Login page**: email/username + password fields with validation
- Generic error message on incorrect credentials (does not reveal which field is wrong, per security best practice)
- **Protected dashboard**: only accessible after successful login; redirects to login page if accessed directly without an active session
- **Logout**: clears the session and redirects back to login
- Passwords are never stored in plain text — hashed using SHA-256 via the Web Crypto API
- Full form validation — no empty submissions allowed
- Classy blue-purple-white themed UI, consistent with other tasks in this track
- Fully responsive across screen sizes

## How It Works (Security Note)
- User accounts (email + hashed password) are stored in `localStorage`, persisting across browser sessions
- The active login session is stored in `sessionStorage`, which clears automatically when the browser tab is closed — this is what "protects" the dashboard route
- Passwords are hashed client-side using SHA-256 before being stored — the plain-text password is never saved anywhere
- **Note**: This is a front-end-only demonstration for learning purposes. A production system would handle authentication server-side with additional protections (salting, rate-limiting, HTTPS, etc.)

## How to Run
1. Clone this repository
2. Navigate to the `WebDev-L2-LoginAuth` folder
3. Open `register.html` in any browser to create an account
4. Log in via `login.html`
5. You'll be redirected to the protected `dashboard.html`

## Screenshots
![Register page ](<Screenshot 2026-10-23 181829.png>)
![login page](<Screenshot 2026-10-23 181850.png>)
![dashboard](<Screenshot 2026-10-23 181902.png>)

## Author
Anjali Shah — Web Development & Designing Intern, Oasis Infobyte