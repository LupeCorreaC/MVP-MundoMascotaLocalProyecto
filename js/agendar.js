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

    const nuevaCita = {
  businessName: appointmentData.businessName,
  services: appointmentData.services,
  total: appointmentData.total,

  petName: petName,
  petType: petType,
  appointmentDate: date,
  appointmentTime: time,

  notes: document.querySelector("#notes").value.trim(),
  status: "confirmada",
  createdAt: new Date().toISOString(),
};

    const citas =
      JSON.parse(localStorage.getItem("mundoMascotaHistorialCitas")) || [];

    citas.push(nuevaCita);

    localStorage.setItem("mundoMascotaHistorialCitas", JSON.stringify(citas));

    console.log("Cita guardada:", nuevaCita);
    console.log(
      "Historial completo:",
      localStorage.getItem("mundoMascotaHistorialCitas")
    );

    form.style.display = "none";
    confirmation.classList.add("is-visible");
  });
}
