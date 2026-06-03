/**
 * @jest-environment jsdom
 */

describe("Pruebas de integración - Mundo Mascota Local", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
    localStorage.clear();
    jest.resetModules();

    global.alert = jest.fn();
  });

  test("Prueba 1: registra un usuario y lo guarda en localStorage", () => {
    document.body.innerHTML = `
      <form id="registerForm">
        <input id="registerName" value="David Muñoz" />
        <input id="registerEmail" value="david@test.com" />
        <input id="registerPhone" value="3001234567" />
        <input id="registerPassword" value="123456" />

        <select id="registerRole">
          <option value="">Selecciona una opción</option>
          <option value="cliente" selected>Cliente</option>
          <option value="comercio">Comercio</option>
        </select>

        <button type="submit">Crear cuenta</button>
      </form>
    `;

    require("../js/registro.js");

    const form = document.querySelector("#registerForm");

    form.dispatchEvent(
      new Event("submit", {
        bubbles: true,
        cancelable: true,
      })
    );

    const usuariosGuardados = JSON.parse(
      localStorage.getItem("mundoMascotaUsuarios")
    );

    expect(usuariosGuardados).toHaveLength(1);

    expect(usuariosGuardados[0].name).toBe("David Muñoz");
    expect(usuariosGuardados[0].email).toBe("david@test.com");
    expect(usuariosGuardados[0].phone).toBe("3001234567");
    expect(usuariosGuardados[0].password).toBe("123456");
    expect(usuariosGuardados[0].role).toBe("cliente");

    expect(global.alert).toHaveBeenCalledWith(
      "Registro exitoso. Ahora puedes iniciar sesión."
    );
  });

  test("Prueba 2: guarda la selección de servicio en localStorage para agendar cita", () => {
    document.body.innerHTML = `
      <div class="service-modal" id="modal-peluqueria">
        <div class="service-modal__header">
          <span class="eyebrow">Peluquería y baño</span>
          <h2>Personaliza el servicio para tu mascota</h2>
        </div>

        <label class="business-option">
          <input
            type="radio"
            name="peluqueria-comercio"
            value="Peluquería Huellitas"
            checked
          />
          <div>
            <strong>Peluquería Huellitas</strong>
            <span>800 m · Disponible hoy · ★★★★☆ 4.6</span>
          </div>
        </label>

        <label class="priced-service-card">
          <input
            type="checkbox"
            class="service-price-check"
            data-price="35000"
            checked
          />
          <div>
            <strong>Baño general</strong>
            <span>Limpieza completa, secado y cuidado básico.</span>
          </div>
        </label>

        <strong class="modal-total-value">$35.000</strong>

        <button class="btn btn--primary schedule-service-btn" type="button">
          Agendar cita
        </button>
      </div>
    `;

    require("../js/servicios.js");

    const botonAgendar = document.querySelector(".schedule-service-btn");

    botonAgendar.click();

    const servicioGuardado = JSON.parse(
      localStorage.getItem("mundoMascotaCita")
    );

    expect(servicioGuardado).not.toBeNull();

    expect(servicioGuardado.category).toBe("Peluquería y baño");
    expect(servicioGuardado.title).toBe(
      "Personaliza el servicio para tu mascota"
    );
    expect(servicioGuardado.businessName).toBe("Peluquería Huellitas");
    expect(servicioGuardado.businessInfo).toBe(
      "800 m · Disponible hoy · ★★★★☆ 4.6"
    );
    expect(servicioGuardado.total).toBe("$35.000");

    expect(servicioGuardado.services).toHaveLength(1);
    expect(servicioGuardado.services[0].name).toBe("Baño general");
    expect(servicioGuardado.services[0].description).toBe(
      "Limpieza completa, secado y cuidado básico."
    );
    expect(servicioGuardado.services[0].price).toBe(35000);
  });
  test("Prueba 3: confirma una cita y la guarda en el historial de localStorage", () => {
  localStorage.setItem(
    "mundoMascotaCita",
    JSON.stringify({
      category: "Peluquería y baño",
      title: "Personaliza el servicio para tu mascota",
      businessName: "Peluquería Huellitas",
      businessInfo: "800 m · Disponible hoy · ★★★★☆ 4.6",
      services: [
        {
          name: "Baño general",
          description: "Limpieza completa, secado y cuidado básico.",
          price: 35000,
        },
      ],
      total: "$35.000",
    })
  );

  document.body.innerHTML = `
    <form class="appointment-form">
      <input id="petName" value="Luna" />

      <select id="petType">
        <option value="">Selecciona una opción</option>
        <option value="Perro" selected>Perro</option>
      </select>

      <input id="appointmentDate" value="2026-06-10" />
      
      <select id="appointmentTime">
        <option value="">Selecciona una hora</option>
        <option value="09:00 a.m." selected>09:00 a.m.</option>
      </select>

      <textarea id="notes">Mascota tranquila</textarea>

      <button type="submit">Confirmar cita</button>
    </form>

    <div id="appointmentConfirmation" class="appointment-confirmation">
      <p id="confirmationText"></p>
    </div>
  `;

  require("../js/agendar.js");

  const form = document.querySelector(".appointment-form");

  form.dispatchEvent(
    new Event("submit", {
      bubbles: true,
      cancelable: true,
    })
  );

  const historialCitas = JSON.parse(
    localStorage.getItem("mundoMascotaHistorialCitas")
  );

  expect(historialCitas).toHaveLength(1);

  expect(historialCitas[0].petName).toBe("Luna");
  expect(historialCitas[0].petType).toBe("Perro");
  expect(historialCitas[0].appointmentDate).toBe("2026-06-10");
  expect(historialCitas[0].appointmentTime).toBe("09:00 a.m.");
  expect(historialCitas[0].notes).toBe("Mascota tranquila");
  expect(historialCitas[0].status).toBe("confirmada");

  expect(historialCitas[0].businessName).toBe("Peluquería Huellitas");
  expect(historialCitas[0].services).toHaveLength(1);
  expect(historialCitas[0].total).toBe("$35.000");

  expect(form.style.display).toBe("none");

  const confirmationBox = document.querySelector("#appointmentConfirmation");
  expect(confirmationBox.classList.contains("is-visible")).toBe(true);

  const confirmationText = document.querySelector("#confirmationText").textContent;
  expect(confirmationText).toContain("Tu cita para Luna fue agendada");
  expect(confirmationText).toContain("Peluquería Huellitas");
});
});
