document.addEventListener("DOMContentLoaded", () => {
  const appointmentData =
    JSON.parse(localStorage.getItem("mundoMascotaCita")) || null;

  const form = document.querySelector(".appointment-form");
  const confirmation = document.querySelector("#appointmentConfirmation");

  const summaryCategory = document.querySelector("#summary-category");
  const summaryBusiness = document.querySelector("#summary-business");
  const summaryServices = document.querySelector("#summary-services");
  const summaryTotal = document.querySelector("#summary-total");

  if (appointmentData) {
    summaryCategory.textContent =
      appointmentData.category || "Servicio seleccionado";

    summaryBusiness.textContent =
      appointmentData.businessName || "Comercio seleccionado";

    summaryServices.innerHTML = "";

    const services = appointmentData.services || [];

    services.forEach((service) => {
      const li = document.createElement("li");

      const priceFormatted = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0,
      }).format(service.price || 0);

      li.innerHTML = `
        <strong>${service.name || "Servicio"}</strong>
        <span>${priceFormatted}</span>
      `;

      summaryServices.appendChild(li);
    });

    summaryTotal.textContent = appointmentData.total || "$0";
  }

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

      if (!petName || !petType || !appointmentDate || !appointmentTime) {
        alert("Por favor completa todos los campos obligatorios.");
        return;
      }

      const nuevaCita = {
        businessName: appointmentData.businessName || "Comercio seleccionado",
        services: appointmentData.services || [],
        total: appointmentData.total || "$0",
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

      localStorage.setItem(
        "mundoMascotaHistorialCitas",
        JSON.stringify(citas)
      );

      alert("Cita agendada correctamente.");

      window.location.href = "./mis-citas.html";
    });
  }
});
