const form = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const message = document.getElementById('mensagem');
const submitButton = document.querySelector('.btn');
const originalButtonText = submitButton.textContent;

const token = localStorage.getItem('token');

if (token) {
    window.location.href = 'home.html';
}

function showMessage(text, type) {
    message.textContent = text;
    message.classList.remove('mensagem-erro', 'mensagem-sucesso');

    if (type === 'error') {
        message.classList.add('mensagem-erro');
    }

    if (type === 'success') {
        message.classList.add('mensagem-sucesso');
    }
}

function clearMessage() {
    message.textContent = '';
    message.classList.remove('mensagem-erro', 'mensagem-sucesso');
}

function setInputError(input) {
    input.classList.add('input-error');
}

function removeInputError(input) {
    input.classList.remove('input-error');
}

emailInput.addEventListener('input', handleInputChange);
passwordInput.addEventListener('input', handleInputChange);

function handleInputChange(event) {
    removeInputError(event.target);
    clearMessage();
    enableButton();
}

function handleLoginSuccess(email) {
    showMessage('Login realizado com sucesso!', 'success');

    setTimeout(() => {
        window.location.href = 'home.html';
    }, 1000);
}

function handleLoginError() {
    showMessage('E-mail ou senha inválidos.', 'error');
    setInputError(emailInput);
    setInputError(passwordInput);
}

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    removeInputError(emailInput);
    removeInputError(passwordInput);

    if (!email || !password) {
        showMessage('Preencha todos os campos.', 'error');
        if (!email) setInputError(emailInput);
        if (!password) setInputError(passwordInput);
        disableButton();
        return;
    }

    startLoading();

    setTimeout(async () => {
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            if (!response.ok) {
                handleLoginError();
                stopLoading();
                return;
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
                handleLoginSuccess(email);
        

        } catch (error) {
            console.error('Erro ao conectar com o backend:', error);
            showMessage('Erro de conexão com o servidor.', 'error');
            stopLoading();
        }
    }, 1500);

});
// Controle do botão
function disableButton() {
    submitButton.disabled = true;
}

function enableButton() {
    submitButton.disabled = false;
}

function startLoading() {
    submitButton.textContent = 'Entrando...';
    submitButton.disabled = true;
}

function stopLoading() {
    submitButton.textContent = originalButtonText;
    submitButton.disabled = false;
}
