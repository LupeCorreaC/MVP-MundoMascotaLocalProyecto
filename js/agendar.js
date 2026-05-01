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
      ...appointmentData,
      petName: document.querySelector("#petName").value.trim(),
      petType: document.querySelector("#petType").value,
      appointmentDate: document.querySelector("#appointmentDate").value,
      appointmentTime: document.querySelector("#appointmentTime").value,
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
