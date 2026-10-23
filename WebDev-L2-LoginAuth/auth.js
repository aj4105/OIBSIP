// ===== Password Hashing (SHA-256) =====
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// ===== Helpers =====
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function setSession(email) {
    sessionStorage.setItem('loggedInUser', email);
}

function getSession() {
    return sessionStorage.getItem('loggedInUser');
}

function clearSession() {
    sessionStorage.removeItem('loggedInUser');
}

function validatePassword(password) {
    // Minimum 8 characters, at least 1 number
    const hasMinLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    return hasMinLength && hasNumber;
}

function showError(elementId, message) {
    const el = document.getElementById(elementId);
    if (el) el.textContent = message;
}

function clearErrors(ids) {
    ids.forEach(id => showError(id, ''));
}

// ===== REGISTER PAGE LOGIC =====
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('regEmail').value.trim();
        const password = document.getElementById('regPassword').value;
        const confirm = document.getElementById('regConfirm').value;

        clearErrors(['regEmailError', 'regPasswordError', 'regConfirmError']);
        document.getElementById('registerSuccess').textContent = '';

        let hasError = false;

        if (email === '') {
            showError('regEmailError', 'Email/username is required.');
            hasError = true;
        }

        if (!validatePassword(password)) {
            showError('regPasswordError', 'Password must be at least 8 characters and include a number.');
            hasError = true;
        }

        if (password !== confirm) {
            showError('regConfirmError', 'Passwords do not match.');
            hasError = true;
        }

        if (hasError) return;

        const users = getUsers();
        const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (existingUser) {
            showError('regEmailError', 'An account with this email/username already exists.');
            return;
        }

        const hashedPassword = await hashPassword(password);
        users.push({ email, password: hashedPassword });
        saveUsers(users);

        document.getElementById('registerSuccess').textContent = 'Account created! Redirecting to login...';
        registerForm.reset();

        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
    });
}

// ===== LOGIN PAGE LOGIC =====
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        const errorEl = document.getElementById('loginError');
        errorEl.textContent = '';

        if (email === '' || password === '') {
            errorEl.textContent = 'Please fill in both fields.';
            return;
        }

        const users = getUsers();
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        const hashedPassword = await hashPassword(password);

        if (!user || user.password !== hashedPassword) {
            errorEl.textContent = 'Invalid email or password.';
            return;
        }

        setSession(user.email);
        window.location.href = 'dashboard.html';
    });
}

// ===== DASHBOARD PAGE LOGIC (Protected) =====
const dashboardContainer = document.querySelector('.dashboard-container');
if (dashboardContainer) {
    const currentUser = getSession();

    if (!currentUser) {
        window.location.href = 'login.html';
    } else {
        document.getElementById('userEmail').textContent = currentUser;
    }

    document.getElementById('logoutBtn').addEventListener('click', () => {
        clearSession();
        window.location.href = 'login.html';
    });
}