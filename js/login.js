const loginForm = document.querySelector("#loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.querySelector("#loginEmail").value.trim();
    const password = document.querySelector("#loginPassword").value.trim();

    const users =
      JSON.parse(localStorage.getItem("mundoMascotaUsuarios")) || [];

    const user = users.find(
      (item) => item.email === email && item.password === password,
    );

    if (!user) {
      alert("Correo o contraseña incorrectos.");
      return;
    }

    localStorage.setItem("mundoMascotaUsuarioActivo", JSON.stringify(user));

    alert(`Bienvenido, ${user.name}`);

    window.location.href = "servicios.html";
  });
}
