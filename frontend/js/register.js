const form = document.getElementById('register-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const message = document.getElementById('mensagem');
const submitButton = document.querySelector('.btn');

function showMessage(text, type) {
    message.textContent = text;
    message.classList.remove('mensagem-erro', 'mensagem-sucesso');
    if (type === 'error') message.classList.add('mensagem-erro');
    if (type === 'success') message.classList.add('mensagem-sucesso');
}

function clearMessage() {
    message.textContent = '';
    message.classList.remove('mensagem-erro', 'mensagem-sucesso');
}

function setInputError(input) { input.classList.add('input-error'); }
function removeInputError(input) { input.classList.remove('input-error'); }

// validação visual em tempo real
passwordInput.addEventListener('input', () => {
    const val = passwordInput.value;

    toggleRule('rule-length', val.length >= 8);
    toggleRule('rule-upper', /[A-Z]/.test(val));
    toggleRule('rule-lower', /[a-z]/.test(val));
    toggleRule('rule-special', /[^a-zA-Z0-9]/.test(val));
});

function toggleRule(id, valid) {
    const el = document.getElementById(id);
    el.classList.toggle('rule-ok', valid);
    el.classList.toggle('rule-fail', !valid);
}

emailInput.addEventListener('input', () => {
    removeInputError(emailInput);
    clearMessage();
});

passwordInput.addEventListener('input', () => {
    removeInputError(passwordInput);
    clearMessage();
});

form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    removeInputError(emailInput);
    removeInputError(passwordInput);

    if (!email || !password) {
        showMessage('Preencha todos os campos.', 'error');
        if (!email) setInputError(emailInput);
        if (!password) setInputError(passwordInput);
        return;
    }

    const senhaValida = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/.test(password);
    if (!senhaValida) {
        showMessage('A senha não atende aos requisitos.', 'error');
        setInputError(passwordInput);
        return;
    }

    submitButton.textContent = 'Criando conta...';
    submitButton.disabled = true;

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            showMessage(data.message || 'Erro ao criar conta.', 'error');
            submitButton.textContent = 'Criar conta';
            submitButton.disabled = false;
            return;
        }

        showMessage('Conta criada com sucesso!', 'success');

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);

    } catch (error) {
        console.error('Erro ao conectar com o backend:', error);
        showMessage('Erro de conexão com o servidor.', 'error');
        submitButton.textContent = 'Criar conta';
        submitButton.disabled = false;
    }
});