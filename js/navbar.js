/**
 * Maneja toda la funcionalidad del navbar del sistema Mundo Mascota.
 *
 * Incluye:
 * - Menú responsive (abrir/cerrar en móviles)
 * - Marcar enlace activo según la página actual
 * - Gestión de usuario autenticado desde localStorage
 * - Modificación dinámica del menú según sesión
 * - Cierre de sesión del usuario
 */

document.addEventListener("DOMContentLoaded", () => {
  const navbarToggle = document.querySelector(".navbar__toggle");
  const navbarMenu = document.querySelector(".navbar__menu");

  /**
   * Activa el comportamiento del menú hamburguesa:
   * - Abre/cierra el menú en dispositivos móviles
   * - Cierra el menú al seleccionar una opción
   */
  if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener("click", () => {
      navbarMenu.classList.toggle("is-open");
    });

    navbarMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navbarMenu.classList.remove("is-open");
      });
    });
  }

  /**
   * Obtiene la página actual para marcar el enlace activo en el navbar
   */
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  /**
   * Resalta el enlace activo según la página actual
   */
  document.querySelectorAll(".navbar__link").forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === currentPage);
  });

  /**
   * Obtiene el usuario activo desde localStorage
   */
  const activeUser = JSON.parse(
    localStorage.getItem("mundoMascotaUsuarioActivo"),
  );

  /**
   * Si hay usuario activo:
   * - Elimina opciones de login/registro
   * - Agrega acceso a "Mis citas"
   * - Muestra el usuario logueado con opción de logout
   */
  if (navbarMenu && activeUser) {
    navbarMenu
      .querySelectorAll('a[href="login.html"], a[href="registro.html"]')
      .forEach((el) => el.parentElement.remove());

    const alreadyHasCitas = navbarMenu.querySelector(
      'a[href="mis-citas.html"]',
    );

    if (!alreadyHasCitas) {
      const citasItem = document.createElement("li");
      citasItem.innerHTML = `<a href="mis-citas.html" class="navbar__link">Mis citas</a>`;
      navbarMenu.appendChild(citasItem);
    }

    const userItem = document.createElement("li");
    userItem.innerHTML = `
      <div class="navbar-user">
        <span>👤 ${activeUser.name}</span>
        <button class="logout-btn">Salir</button>
      </div>
    `;
    navbarMenu.appendChild(userItem);
  }

  /**
   * Maneja el cierre de sesión del usuario:
   * - Elimina datos del localStorage
   * - Redirige al inicio
   */
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("logout-btn")) {
      localStorage.removeItem("mundoMascotaUsuarioActivo");
      window.location.href = "index.html";
    }
  });
});