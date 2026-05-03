const formatCOP = (value) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
};

const openModalButtons = document.querySelectorAll(".open-service-modal");
const closeModalButtons = document.querySelectorAll(".close-service-modal");
const modals = document.querySelectorAll(".service-modal");

const openModal = (modalId) => {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  showModalStep(modal, 1);
  updateModalTotal(modal);
};

const closeModal = (modal) => {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
};

const showModalStep = (modal, stepNumber) => {
  modal.querySelectorAll(".modal-step-panel").forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.step === String(stepNumber));
  });

  modal.querySelectorAll(".modal-step").forEach((indicator) => {
    indicator.classList.toggle("is-active", indicator.dataset.stepIndicator === String(stepNumber));
  });
};

const updateModalTotal = (modal) => {
  let total = 0;

  modal.querySelectorAll(".service-price-check:checked").forEach((check) => {
    total += Number(check.dataset.price);
  });

  const totalBox = modal.querySelector(".modal-total-value");
  if (totalBox) totalBox.textContent = formatCOP(total);
};

// eventos
openModalButtons.forEach(btn => {
  btn.addEventListener("click", () => openModal(btn.dataset.modal));
});

closeModalButtons.forEach(btn => {
  btn.addEventListener("click", () => closeModal(btn.closest(".service-modal")));
});

modals.forEach((modal) => {
  modal.querySelector(".modal-next-step")?.addEventListener("click", () => showModalStep(modal, 2));
  modal.querySelector(".modal-prev-step")?.addEventListener("click", () => showModalStep(modal, 1));

  modal.querySelectorAll(".service-price-check").forEach((check) => {
    check.addEventListener("change", () => updateModalTotal(modal));
  });

  updateModalTotal(modal);
});

// guardar y redirigir
document.querySelectorAll(".schedule-service-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".service-modal");

    const checkedBusiness = modal.querySelector(".business-option input:checked");
    const businessCard = checkedBusiness.closest(".business-option");

    const selectedServices = [];

    modal.querySelectorAll(".service-price-check:checked").forEach((check) => {
      const card = check.closest(".priced-service-card");

      selectedServices.push({
        name: card.querySelector("strong").textContent.trim(),
        price: Number(check.dataset.price),
      });
    });

    if (selectedServices.length === 0) {
      alert("Selecciona al menos un servicio.");
      return;
    }

    const data = {
      category: modal.querySelector(".eyebrow").textContent.trim(),
      businessName: businessCard.querySelector("strong").textContent.trim(),
      services: selectedServices,
      total: modal.querySelector(".modal-total-value").textContent.trim(),
    };

    localStorage.setItem("mundoMascotaCita", JSON.stringify(data));

    console.log("Servicio guardado:", data);

    window.location.href = "./agendar.html";
  });
});
