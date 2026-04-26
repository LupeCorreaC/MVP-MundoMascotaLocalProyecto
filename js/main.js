document.addEventListener("DOMContentLoaded", () => {
  const navbarToggle = document.querySelector(".navbar__toggle");
  const navbarMenu = document.querySelector(".navbar__menu");

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

  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".navbar__link").forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === currentPage);
  });

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
    if (!modal) return;

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  };

  const closeAllModals = () => {
    modals.forEach((modal) => closeModal(modal));
  };

  openModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      openModal(button.dataset.modal);
    });
  });

  closeModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      closeModal(button.closest(".service-modal"));
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAllModals();
    }
  });

  const formatCOP = (value) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const showModalStep = (modal, stepNumber) => {
    modal.querySelectorAll(".modal-step-panel").forEach((panel) => {
      panel.classList.toggle(
        "is-active",
        panel.dataset.step === String(stepNumber),
      );
    });

    modal.querySelectorAll(".modal-step").forEach((indicator) => {
      indicator.classList.toggle(
        "is-active",
        indicator.dataset.stepIndicator === String(stepNumber),
      );
    });
  };

  const updateModalTotal = (modal) => {
    let total = 0;

    modal.querySelectorAll(".service-price-check:checked").forEach((check) => {
      total += Number(check.dataset.price);
    });

    const totalBox = modal.querySelector(".modal-total-value");

    if (totalBox) {
      totalBox.textContent = formatCOP(total);
    }
  };

  modals.forEach((modal) => {
    const nextButton = modal.querySelector(".modal-next-step");
    const prevButton = modal.querySelector(".modal-prev-step");

    if (nextButton) {
      nextButton.addEventListener("click", () => {
        showModalStep(modal, 2);
      });
    }

    if (prevButton) {
      prevButton.addEventListener("click", () => {
        showModalStep(modal, 1);
      });
    }

    modal.querySelectorAll(".service-price-check").forEach((check) => {
      check.addEventListener("change", () => {
        updateModalTotal(modal);
      });
    });

    updateModalTotal(modal);
  });
});
/* ==============================
   Guardar selección y pasar a agendar
   ============================== */

document.querySelectorAll(".schedule-service-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".service-modal");

    if (!modal) return;

    const modalTitle =
      modal.querySelector(".service-modal__header h2")?.textContent.trim() ||
      "";
    const modalCategory =
      modal
        .querySelector(".service-modal__header .eyebrow")
        ?.textContent.trim() || "";

    const selectedBusinessInput = modal.querySelector(
      ".business-option input[type='radio']:checked",
    );
    const selectedBusinessCard =
      selectedBusinessInput?.closest(".business-option");

    const businessName =
      selectedBusinessCard?.querySelector("strong")?.textContent.trim() || "";
    const businessInfo =
      selectedBusinessCard?.querySelector("span")?.textContent.trim() || "";

    const selectedServices = [];

    modal.querySelectorAll(".service-price-check:checked").forEach((check) => {
      const card = check.closest(".priced-service-card");

      selectedServices.push({
        name: card.querySelector("strong")?.textContent.trim() || "",
        description: card.querySelector("span")?.textContent.trim() || "",
        price: Number(check.dataset.price || 0),
      });
    });

    const total =
      modal.querySelector(".modal-total-value")?.textContent.trim() || "$0";

    const appointmentData = {
      category: modalCategory,
      title: modalTitle,
      businessName,
      businessInfo,
      services: selectedServices,
      total,
    };

    localStorage.setItem("mundoMascotaCita", JSON.stringify(appointmentData));

    window.location.href = "agendar.html";
  });
});
/* ==============================
   Cargar resumen en agendar.html
   ============================== */

const appointmentData = JSON.parse(localStorage.getItem("mundoMascotaCita"));

if (appointmentData) {
  const summaryCategory = document.querySelector("#summary-category");
  const summaryBusiness = document.querySelector("#summary-business");
  const summaryBusinessInfo = document.querySelector("#summary-business-info");
  const summaryServices = document.querySelector("#summary-services");
  const summaryTotal = document.querySelector("#summary-total");

  if (summaryCategory) {
    summaryCategory.textContent =
      appointmentData.category || "Servicio seleccionado";
  }

  if (summaryBusiness) {
    summaryBusiness.textContent =
      appointmentData.businessName || "Comercio no seleccionado";
  }

  if (summaryBusinessInfo) {
    summaryBusinessInfo.textContent = appointmentData.businessInfo || "";
  }

  if (summaryServices) {
    summaryServices.innerHTML = "";

    appointmentData.services.forEach((service) => {
      const li = document.createElement("li");

      li.innerHTML = `
        <strong>${service.name}</strong>
        <span>${new Intl.NumberFormat("es-CO", {
          style: "currency",
          currency: "COP",
          maximumFractionDigits: 0,
        }).format(service.price)}</span>
      `;

      summaryServices.appendChild(li);
    });
  }

  if (summaryTotal) {
    summaryTotal.textContent = appointmentData.total || "$0";
  }
}
/* ==============================
   Confirmar cita
   ============================== */

const appointmentForm = document.querySelector(".appointment-form");
const appointmentConfirmation = document.querySelector(
  "#appointmentConfirmation",
);

if (appointmentForm && appointmentConfirmation) {
  appointmentForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const petName = document.querySelector("#petName")?.value.trim();
    const petType = document.querySelector("#petType")?.value;
    const appointmentDate = document.querySelector("#appointmentDate")?.value;
    const appointmentTime = document.querySelector("#appointmentTime")?.value;
    const notes = document.querySelector("#notes")?.value.trim();

    if (!petName || !petType || !appointmentDate || !appointmentTime) {
      alert(
        "Por favor completa los campos obligatorios para confirmar la cita.",
      );
      return;
    }

    const appointmentData =
      JSON.parse(localStorage.getItem("mundoMascotaCita")) || {};

    const confirmedAppointment = {
      ...appointmentData,
      petName,
      petType,
      appointmentDate,
      appointmentTime,
      notes,
      status: "confirmada",
    };

    const citasGuardadas =
      JSON.parse(localStorage.getItem("mundoMascotaHistorialCitas")) || [];

    citasGuardadas.push(confirmedAppointment);

    localStorage.setItem(
      "mundoMascotaHistorialCitas",
      JSON.stringify(citasGuardadas),
    );
    localStorage.setItem(
      "mundoMascotaCitaConfirmada",
      JSON.stringify(confirmedAppointment),
    );

    const confirmationText = document.querySelector("#confirmationText");

    if (confirmationText) {
      confirmationText.textContent = `Tu cita para ${petName} fue agendada con ${appointmentData.businessName || "el comercio seleccionado"} el ${appointmentDate} a las ${appointmentTime}.`;
    }

    appointmentForm.style.display = "none";
    appointmentConfirmation.classList.add("is-visible");
  });
}

/* ==============================
   Mostrar historial de citas
   ============================== */

const appointmentsList = document.querySelector("#appointmentsList");
const emptyState = document.querySelector("#emptyState");

if (appointmentsList) {
  const citas =
    JSON.parse(localStorage.getItem("mundoMascotaHistorialCitas")) || [];

  if (citas.length === 0) {
    emptyState.style.display = "block";
  } else {
    emptyState.style.display = "none";

    citas.forEach((cita) => {
      const card = document.createElement("div");
      card.classList.add("appointment-card");

      const servicesHTML = cita.services
        .map(
          (service) => `
        <li>
          <span>${service.name}</span>
          <span>${new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            maximumFractionDigits: 0,
          }).format(service.price)}</span>
        </li>
      `,
        )
        .join("");

      card.innerHTML = `
        <h3>${cita.businessName}</h3>
        <span>${cita.category}</span>

        <strong>Mascota:</strong> ${cita.petName} (${cita.petType})<br/>
        <strong>Fecha:</strong> ${cita.appointmentDate}<br/>
        <strong>Hora:</strong> ${cita.appointmentTime}

        <ul class="appointment-services">
          ${servicesHTML}
        </ul>

        <div class="appointment-card-total">
         Total: ${cita.total}
        </div>
      `;

      appointmentsList.appendChild(card);
    });
  }
}
/* ==============================
   Registro de usuario
   ============================== */

const registerForm = document.querySelector("#registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.querySelector("#registerName").value.trim();
    const email = document.querySelector("#registerEmail").value.trim();
    const phone = document.querySelector("#registerPhone").value.trim();
    const password = document.querySelector("#registerPassword").value.trim();
    const role = document.querySelector("#registerRole").value;

    if (!name || !email || !phone || !password || !role) {
      alert("Por favor completa todos los campos.");
      return;
    }

    const users =
      JSON.parse(localStorage.getItem("mundoMascotaUsuarios")) || [];

    const userExists = users.some((user) => user.email === email);

    if (userExists) {
      alert("Este correo ya está registrado.");
      return;
    }

    const newUser = {
      name,
      email,
      phone,
      password,
      role,
    };

    users.push(newUser);

    localStorage.setItem("mundoMascotaUsuarios", JSON.stringify(users));

    alert("Registro exitoso. Ahora puedes iniciar sesión.");

    window.location.href = "login.html";
  });
}
/* ==============================
   Login de usuario
   ============================== */

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
/* ==============================
   Usuario activo en navbar
   ============================== */

const activeUser = JSON.parse(
  localStorage.getItem("mundoMascotaUsuarioActivo"),
);
const navbarMenu = document.querySelector(".navbar__menu");

if (navbarMenu) {
  if (activeUser) {
    // eliminar login y registro
    navbarMenu
      .querySelectorAll('a[href="login.html"], a[href="registro.html"]')
      .forEach((el) => el.parentElement.remove());

    // agregar MIS CITAS
    const alreadyHasCitas = navbarMenu.querySelector(
      'a[href="mis-citas.html"]',
    );

    if (!alreadyHasCitas) {
      const citasItem = document.createElement("li");
      citasItem.innerHTML = `<a href="mis-citas.html" class="navbar__link">Mis citas</a>`;
      navbarMenu.appendChild(citasItem);
    }

    // usuario + logout
    const userItem = document.createElement("li");
    userItem.innerHTML = `
      <div class="navbar-user">
        <span>👤 ${activeUser.name}</span>
        <button class="logout-btn">Salir</button>
      </div>
    `;
    navbarMenu.appendChild(userItem);
  }
}
/* ==============================
   Cerrar sesión
   ============================== */

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("logout-btn")) {
    localStorage.removeItem("mundoMascotaUsuarioActivo");
    window.location.href = "index.html";
  }
});
/* ==============================
   Protección de páginas
   ============================== */

const protectedPages = ["agendar.html", "mis-citas.html"];

const currentPagePath = window.location.pathname.split("/").pop();

if (protectedPages.includes(currentPagePath)) {
  const user = JSON.parse(localStorage.getItem("mundoMascotaUsuarioActivo"));

  if (!user) {
    window.location.href = "login.html";
  }
}
