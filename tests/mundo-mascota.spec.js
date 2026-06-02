const { test, expect } = require('@playwright/test');

const ruta = 'file:///C:/Users/andre/OneDrive/Desktop/Mundo%20Mascota%20Local%202.0';

test('Prueba 1 - Registro de usuario', async ({ page }) => {
  await page.goto(`${ruta}/registro.html`);

  await page.fill('#registerName', 'Usuario Prueba');
  await page.fill('#registerEmail', 'usuario@test.com');
  await page.fill('#registerPhone', '3001234567');
  await page.fill('#registerPassword', '123456');
  await page.selectOption('#registerRole', 'cliente');

  page.once('dialog', async dialog => {
    expect(dialog.message()).toContain('Registro exitoso');
    await dialog.accept();
  });

  await page.click('button[type="submit"]');

  await expect(page).toHaveURL(/login.html/);
});

test('Prueba 2 - Inicio de sesión', async ({ page }) => {
  await page.goto(`${ruta}/login.html`);

  await page.evaluate(() => {
    localStorage.setItem('mundoMascotaUsuarios', JSON.stringify([
      {
        name: 'Usuario Prueba',
        email: 'usuario@test.com',
        phone: '3001234567',
        password: '123456',
        role: 'cliente'
      }
    ]));
  });

  await page.fill('#loginEmail', 'usuario@test.com');
  await page.fill('#loginPassword', '123456');

  page.once('dialog', async dialog => {
    expect(dialog.message()).toContain('Bienvenido');
    await dialog.accept();
  });

  await page.click('button[type="submit"]');

  await expect(page).toHaveURL(/servicios.html/);
});

test('Prueba 3 - Agendamiento de cita', async ({ page }) => {
  await page.goto(`${ruta}/agendar.html`);

  await page.evaluate(() => {
    localStorage.setItem('mundoMascotaCita', JSON.stringify({
      category: 'Veterinaria',
      businessName: 'Mundo Mascota Local',
      services: [
        {
          name: 'Consulta veterinaria',
          price: 50000
        }
      ],
      total: '$50.000'
    }));
  });

  await page.reload();

  await page.fill('#petName', 'Luna');
  await page.selectOption('#petType', 'Perro');
  await page.fill('#appointmentDate', '2026-06-10');
  await page.selectOption('#appointmentTime', '10:00 a.m.');
  await page.fill('#notes', 'Mascota en buen estado');

  await page.click('button[type="submit"]');

  await expect(page.locator('#appointmentConfirmation')).toContainText('Cita agendada correctamente');

  const citas = await page.evaluate(() => {
    return JSON.parse(localStorage.getItem('mundoMascotaHistorialCitas'));
  });

  expect(citas.length).toBeGreaterThan(0);
  expect(citas[0].petName).toBe('Luna');
});