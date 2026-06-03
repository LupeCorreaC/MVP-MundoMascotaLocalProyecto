/**
 * Maneja el proceso de registro de usuarios en el sistema.
 * Captura los datos del formulario, valida que todos los campos estén completos
 * y prepara la información del usuario para su posterior almacenamiento.
 *
 * Flujo del proceso:
 * 1. Detecta el envío del formulario de registro
 * 2. Previene el comportamiento por defecto del formulario
 * 3. Captura y limpia los datos ingresados por el usuario
 * 4. Valida que todos los campos estén completos
 * 5. Si falta información, muestra una alerta y detiene el proceso
 */

const registerForm = document.querySelector("#registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.querySelector("#registerName").value.trim();
    const email = document.querySelector("#registerEmail").value.trim();
    const phone = document.querySelector("#registerPhone").value.trim();
    const password = document.querySelector("#registerPassword").value.trim();
    const role = document.querySelector("#registerRole").value;

    if (!name || !email || !phone || !password || !role) {
      alert("Por favor completa todos los campos.");
      return;
    }
    const users =
      JSON.parse(localStorage.getItem("mundoMascotaUsuarios")) || [];

    const userExists = users.some((user) => user.email === email);

    if (userExists) {
      alert("Este correo ya está registrado.");
      return;
    }

    const newUser = {
      name,
      email,
      phone,
      password,
      role,
    };

    users.push(newUser);

    localStorage.setItem("mundoMascotaUsuarios", JSON.stringify(users));

    alert("Registro exitoso. Ahora puedes iniciar sesión.");

    window.location.href = "login.html";
  });
}