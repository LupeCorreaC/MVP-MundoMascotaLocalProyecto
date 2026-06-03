import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('Pruebas unitarias - Mundo Mascota Local', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = '';
    vi.restoreAllMocks();

    Object.defineProperty(window, 'alert', {
      value: vi.fn(),
      writable: true
    });
  });

  it('debe registrar un usuario correctamente', async () => {
    document.body.innerHTML = `
      <form id="registerForm">
        <input id="registerName" value="Juan Perez">
        <input id="registerEmail" value="juan@test.com">
        <input id="registerPhone" value="3001234567">
        <input id="registerPassword" value="123456">
        <select id="registerRole">
          <option value="cliente" selected>Cliente</option>
        </select>
      </form>
    `;

    await import('../js/registro.js?registro-ok');

    document.querySelector('#registerForm').dispatchEvent(
      new Event('submit', { bubbles: true, cancelable: true })
    );

    const usuarios = JSON.parse(localStorage.getItem('mundoMascotaUsuarios'));

    expect(usuarios).toHaveLength(1);
    expect(usuarios[0].email).toBe('juan@test.com');
  });

  it('debe validar campos obligatorios en registro', async () => {
    document.body.innerHTML = `
      <form id="registerForm">
        <input id="registerName" value="">
        <input id="registerEmail" value="">
        <input id="registerPhone" value="">
        <input id="registerPassword" value="">
        <select id="registerRole">
          <option value="" selected></option>
        </select>
      </form>
    `;

    await import('../js/registro.js?registro-vacio');

    document.querySelector('#registerForm').dispatchEvent(
      new Event('submit', { bubbles: true, cancelable: true })
    );

    expect(window.alert).toHaveBeenCalled();
    expect(localStorage.getItem('mundoMascotaUsuarios')).toBeNull();
  });

  it('debe impedir correos duplicados', async () => {
    localStorage.setItem(
      'mundoMascotaUsuarios',
      JSON.stringify([{ email: 'juan@test.com' }])
    );

    document.body.innerHTML = `
      <form id="registerForm">
        <input id="registerName" value="Juan">
        <input id="registerEmail" value="juan@test.com">
        <input id="registerPhone" value="3001234567">
        <input id="registerPassword" value="123456">
        <select id="registerRole">
          <option value="cliente" selected>Cliente</option>
        </select>
      </form>
    `;

    await import('../js/registro.js?registro-duplicado');

    document.querySelector('#registerForm').dispatchEvent(
      new Event('submit', { bubbles: true, cancelable: true })
    );

    const usuarios = JSON.parse(localStorage.getItem('mundoMascotaUsuarios'));

    expect(window.alert).toHaveBeenCalled();
    expect(usuarios).toHaveLength(1);
  });

  it('debe iniciar sesión correctamente', async () => {
    localStorage.setItem(
      'mundoMascotaUsuarios',
      JSON.stringify([
        {
          name: 'Juan',
          email: 'juan@test.com',
          password: '123456'
        }
      ])
    );

    document.body.innerHTML = `
      <form id="loginForm">
        <input id="loginEmail" value="juan@test.com">
        <input id="loginPassword" value="123456">
      </form>
    `;

    await import('../js/login.js?login-ok');

    document.querySelector('#loginForm').dispatchEvent(
      new Event('submit', { bubbles: true, cancelable: true })
    );

    const usuarioActivo = JSON.parse(localStorage.getItem('mundoMascotaUsuarioActivo'));

    expect(usuarioActivo.email).toBe('juan@test.com');
  });

  it('debe rechazar credenciales incorrectas', async () => {
    localStorage.setItem(
      'mundoMascotaUsuarios',
      JSON.stringify([
        {
          email: 'juan@test.com',
          password: '123456'
        }
      ])
    );

    document.body.innerHTML = `
      <form id="loginForm">
        <input id="loginEmail" value="juan@test.com">
        <input id="loginPassword" value="000000">
      </form>
    `;

    await import('../js/login.js?login-error');

    document.querySelector('#loginForm').dispatchEvent(
      new Event('submit', { bubbles: true, cancelable: true })
    );

    expect(window.alert).toHaveBeenCalled();
    expect(localStorage.getItem('mundoMascotaUsuarioActivo')).toBeNull();
  });

  it('debe agendar una cita correctamente', async () => {
    localStorage.setItem(
      'mundoMascotaCita',
      JSON.stringify({
        category: 'Veterinaria',
        businessName: 'Mundo Mascota',
        services: [
          {
            name: 'Consulta',
            price: 50000
          }
        ],
        total: '$50.000'
      })
    );

    document.body.innerHTML = `
      <span id="summary-category"></span>
      <span id="summary-business"></span>
      <ul id="summary-services"></ul>
      <span id="summary-total"></span>

      <form class="appointment-form">
        <input id="petName" value="Luna">
        <select id="petType">
          <option value="Perro" selected>Perro</option>
        </select>
        <input id="appointmentDate" value="2026-06-10">
        <select id="appointmentTime">
          <option value="10:00 a.m." selected>10:00 a.m.</option>
        </select>
        <textarea id="notes">Mascota saludable</textarea>
        <button type="submit">Agendar</button>
      </form>

      <div id="appointmentConfirmation"></div>
    `;

    await import('../js/agendar.js?agendar-test');

    document.dispatchEvent(new Event('DOMContentLoaded'));

    document.querySelector('.appointment-form').dispatchEvent(
      new Event('submit', { bubbles: true, cancelable: true })
    );

    const citas = JSON.parse(localStorage.getItem('mundoMascotaHistorialCitas'));

    expect(citas).not.toBeNull();
    expect(citas).toHaveLength(1);
    expect(citas[0].petName).toBe('Luna');
    expect(citas[0].petType).toBe('Perro');
    expect(citas[0].appointmentDate).toBe('2026-06-10');
    expect(citas[0].appointmentTime).toBe('10:00 a.m.');
  });
});
