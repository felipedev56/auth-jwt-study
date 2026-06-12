const token = localStorage.getItem('token');

if (!token) {
    window.location.href = 'index.html';
}

fetch('http://localhost:3000/profile', {
    headers: {
        Authorization: `Bearer ${token}`
    }
})
.then(response => {
    if (!response.ok) {
        localStorage.clear();
        window.location.href = 'index.html';
    }
    return response.json();
})
.then(data => {
    const userEmail = document.getElementById('user-email');
    userEmail.textContent = data.user.email;
});

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    localStorage.clear();
    window.location.href = 'index.html';
});