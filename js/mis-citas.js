const list = document.querySelector("#appointmentsList");
const empty = document.querySelector("#emptyState");

const citas = JSON.parse(localStorage.getItem("mundoMascotaHistorialCitas")) || [];

if (citas.length === 0) {
  empty.style.display = "block";
} else {
  empty.style.display = "none";

  citas.forEach(cita => {
    const div = document.createElement("div");
    div.classList.add("appointment-card");

    const serviciosHTML = (cita.services || [])
      .map(s => <li>${s.name}</li>)
      .join("");

    div.innerHTML = `
      <h3>${cita.businessName}</h3>
      <p><strong>Mascota:</strong> ${cita.petName || ""} (${cita.petType || ""})</p>
      <p><strong>Fecha:</strong> ${cita.appointmentDate || ""}</p>
      <p><strong>Hora:</strong> ${cita.appointmentTime || ""}</p>
      <p><strong>Servicios:</strong></p>
      <ul>${serviciosHTML}</ul>
      <p><strong>Total:</strong> ${cita.total || ""}</p>
      <p><strong>Estado:</strong> ${cita.status || "confirmada"}</p>
    `;

    list.appendChild(div);
  });
}