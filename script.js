document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('user-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const correo = document.getElementById('correo').value;
        const password1 = document.getElementById('password1').value;
        const password2 = document.getElementById('password2').value;

        if (!nombre || !correo || !password1 || !password2) {
            showAlert('Por favor, complete todos los campos.', 'danger');
        } else if (!validateEmail(correo)) {
            showAlert('Correo electrónico no válido.', 'danger');
        } else if (password1 !== password2) {
            showAlert('Las contraseñas no coinciden.', 'danger');
        } else if (password1.length < 6) {
            showAlert('La contraseña debe tener al menos 6 caracteres.', 'danger');
        } else {
            const user = { nombre, correo };
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));

            showAlert('Usuario creado correctamente.', 'success');
            setTimeout(function () {
                window.location.href = '#usuarios';
                showUserList();
            }, 3000);
        }
    });

    function showUserList() {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userListContainer = document.getElementById('user-list');
        userListContainer.innerHTML = '';
        users.forEach(user => {
            const card = document.createElement('div');
            card.className = 'col-md-4 mb-3';
            card.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${user.nombre}</h5>
                        <p class="card-text">${user.correo}</p>
                    </div>
                </div>
            `;
            userListContainer.appendChild(card);
        });
        document.getElementById('usuarios').style.display = 'block';
    }

    function showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.textContent = message;
        document.querySelector('.container').insertBefore(alertDiv, document.querySelector('.container').firstChild);
        setTimeout(function () {
            alertDiv.remove();
        }, 3000);
    }

    function validateEmail(email) {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    window.location.href = '#crear-usuario';
});