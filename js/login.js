/**
 * Referencia al formulario de inicio de sesión.
 */
const loginForm = document.querySelector("#loginForm");

/**
 * Verifica si el formulario de login existe en la página
 * y asigna el evento de envío.
 */
if (loginForm) {
  /**
   * Maneja el proceso de inicio de sesión del usuario.
   * Valida credenciales contra datos almacenados en localStorage.
   */
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.querySelector("#loginEmail").value.trim();
    const password = document.querySelector("#loginPassword").value.trim();

    /**
     * Lista de usuarios registrados almacenados en localStorage.
     * @type {Array}
     */
    const users =
      JSON.parse(localStorage.getItem("mundoMascotaUsuarios")) || [];

    /**
     * Usuario encontrado que coincide con email y contraseña.
     */
    const user = users.find(
      (item) => item.email === email && item.password === password,
    );

    if (!user) {
      alert("Correo o contraseña incorrectos.");
      return;
    }

    /**
     * Guarda el usuario activo en localStorage.
     */
    localStorage.setItem("mundoMascotaUsuarioActivo", JSON.stringify(user));

    alert(`Bienvenido, ${user.name}`);

    window.location.href = "./servicios.html";
  });
}