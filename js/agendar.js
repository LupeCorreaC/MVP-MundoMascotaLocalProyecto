const appointmentData = JSON.parse(localStorage.getItem("mundoMascotaCita"));

if (appointmentData) {
  document.querySelector("#summary-category").textContent = appointmentData.category;
  document.querySelector("#summary-business").textContent = appointmentData.businessName;

  const list = document.querySelector("#summary-services");
  list.innerHTML = "";

  appointmentData.services.forEach(service => {
  const li = document.createElement("li");

  const priceFormatted = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(service.price);

  li.innerHTML = `
    <strong>${service.name}</strong>
    <span>${priceFormatted}</span>
  `;

  list.appendChild(li);
});

  document.querySelector("#summary-total").textContent = appointmentData.total;
}
const form = document.querySelector(".appointment-form");
const confirmation = document.querySelector("#appointmentConfirmation");

if (form) {
  form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!appointmentData) {
    alert("No hay un servicio seleccionado. Primero elige un servicio.");
    window.location.href = "./servicios.html";
    return;
  }

  const petName = document.querySelector("#petName").value.trim();
  const petType = document.querySelector("#petType").value;
  const appointmentDate = document.querySelector("#appointmentDate").value;
  const appointmentTime = document.querySelector("#appointmentTime").value;
  const notes = document.querySelector("#notes").value.trim();

  const nuevaCita = {
    businessName: appointmentData.businessName,
    services: appointmentData.services,
    total: appointmentData.total,
    petName,
    petType,
    appointmentDate,
    appointmentTime,
    notes,
    status: "confirmada",
    createdAt: new Date().toISOString(),
  };

  const citas =
    JSON.parse(localStorage.getItem("mundoMascotaHistorialCitas")) || [];

  citas.push(nuevaCita);

  localStorage.setItem("mundoMascotaHistorialCitas", JSON.stringify(citas));

  form.style.display = "none";
  confirmation.classList.add("is-visible");
});
}
