document.addEventListener('DOMContentLoaded', () => {
    // Load initial page
    loadPage('/pages/login.html');

    // Handle navigation
    setupNavLinks();
});

function setupNavLinks() {
    document.querySelectorAll('a[data-link]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const url = link.getAttribute('data-link');
            navigateTo(url);
        });
    });
}

async function loadPage(url) {
    try {
        const res = await fetch(url);
        const content = await res.text();
        document.getElementById('content').innerHTML = content;

        // Rebind the navigation links and form event listeners
        setupNavLinks();
        setupFormListeners();
    } catch (error) {
        console.error('Error loading page:', error);
    }
}

function navigateTo(url) {
    history.pushState(null, null, url);
    loadPage(url);
}

window.addEventListener('popstate', () => {
    loadPage(location.pathname);
});

function setupFormListeners() {
    document.getElementById('registerForm')?.addEventListener('submit', async (event) => {
        event.preventDefault();
        await handleRegisterForm(event.target);
    });

    document.getElementById('loginForm')?.addEventListener('submit', async (event) => {
        event.preventDefault();
        await handleLoginForm(event.target);
    });
}

async function handleRegisterForm(form) {
    const userName = form.userName.value;
    const address = form.address.value;
    const password = form.password.value;
    const confirm_password = form.confirm_password.value;

    try {
        const res = await fetch('http://localhost:3001/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userName, address, password, confirm_password }),
        });
        const data = await res.json();
        if (res.ok) {
            alert('Registration successful.');
            localStorage.setItem('user', JSON.stringify(data));
            navigateTo('/pages/home.html');
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error('Registration error:', error);
        alert('Registration failed. ' + error.message);
    }
}

// async function handleLoginForm(form) {
//     const username = form.username.value;
//     const password = form.password.value;

//     try {
//         const res = await fetch('http://localhost:3001/api/login', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ userName: username, password }),
//         });

//         let data;
//         try {
//             data = await res.json();
//         } catch (jsonError) {
//             // Handle non-JSON response
//             console.error('Failed to parse JSON response:', jsonError);
//             throw new Error('Unexpected server response');
//         }

//         if (res.ok) {
//             data.password = '*******';
//             localStorage.setItem('user', JSON.stringify(data));
//             navigateTo('/pages/home.html');
//         } else {
//             throw new Error(data.message || 'Login failed');
//         }
//     } catch (error) {
//         console.error('Login error:', error);
//         alert('Login failed. Please check your credentials.');
//     }
// }

async function handleLoginForm(form) {
    const username = form.username.value;
    const password = form.password.value;

    try {
        const res = await fetch('http://localhost:3001/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userName: username, password }),
        });

        let data;
        try {
            data = await res.json();
        } catch (jsonError) {
            console.error('Failed to parse JSON response:', jsonError);
            const text = await res.text();
            throw new Error(text);
        }

        if (res.ok) {
            data.password = '*******';
            localStorage.setItem('user', JSON.stringify(data));
            navigateTo('/pages/home.html');
        } else {
            throw new Error(data.message || 'Login failed');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert(error.message || 'Login failed. Please check your credentials.');
    }
}

function logout() {
    localStorage.removeItem('user');
    navigateTo('/pages/login.html');
}
