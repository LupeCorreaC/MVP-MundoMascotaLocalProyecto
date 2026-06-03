/**
 * Obtiene el contenedor de la lista de citas en la interfaz.
 */
const list = document.querySelector("#appointmentsList");

/**
 * Elemento que se muestra cuando no hay citas registradas.
 */
const empty = document.querySelector("#emptyState");

/**
 * Recupera el historial de citas almacenado en localStorage.
 * Si no existen citas, retorna un arreglo vacío.
 * @type {Array}
 */
const citas =
  JSON.parse(localStorage.getItem("mundoMascotaHistorialCitas")) || [];

/**
 * Verifica si existen citas registradas.
 * Si no hay citas, muestra el estado vacío.
 * Si hay citas, las renderiza en pantalla.
 */
if (citas.length === 0) {
  empty.style.display = "block";
  list.style.display = "none";
} else {
  empty.style.display = "none";
  list.style.display = "grid";

  /**
   * Recorre cada cita registrada y la muestra en pantalla
   */
  citas.forEach((cita) => {
    const div = document.createElement("div");
    div.classList.add("appointment-card");

    /**
     * Genera el HTML de la lista de servicios asociados a la cita
     */
    const serviciosHTML = (cita.services || [])
      .map((s) => `<li>${s.name}</li>`)
      .join("");

    div.innerHTML = `
      <h3>${cita.businessName || "Servicio agendado"}</h3>
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