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

    const citas = JSON.parse(localStorage.getItem("mundoMascotaHistorialCitas")) || [];

    citas.push({
      ...appointmentData,
      petName: document.querySelector("#petName").value
    });

    localStorage.setItem("mundoMascotaHistorialCitas", JSON.stringify(citas));

    form.style.display = "none";
    confirmation.classList.add("is-visible");
  });
}
