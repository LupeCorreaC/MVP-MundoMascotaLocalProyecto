# Mundo Mascota Local

## Descripción del Proyecto

Mundo Mascota Local es una aplicación web desarrollada como una solución tecnológica orientada a la economía hiperlocal, permitiendo a los propietarios de mascotas acceder de manera rápida y organizada a diferentes servicios disponibles en su comunidad.

La plataforma centraliza servicios como:

- Veterinaria
- Peluquería
- Guardería
- Transporte para mascotas
- Acompañamiento y cuidado

El sistema permite consultar servicios, agendar citas y gestionar la información relacionada con las reservas realizadas por los usuarios.

---

## Problema que resuelve

Actualmente muchos servicios para mascotas se encuentran dispersos en diferentes canales informales, dificultando a los usuarios encontrar opciones confiables y organizar sus citas.

Mundo Mascota Local centraliza la oferta de servicios en una única plataforma digital, facilitando la búsqueda, selección y agendamiento de servicios para mascotas.

---

## Funcionalidades Implementadas

### Gestión de Usuarios

- Registro de usuarios.
- Inicio de sesión.
- Validación de credenciales.
- Control de usuarios duplicados.

### Gestión de Servicios

- Visualización de servicios disponibles.
- Consulta de información detallada.
- Navegación por categorías.

### Gestión de Citas

- Agendamiento de citas.
- Consulta de citas registradas.
- Almacenamiento de información mediante LocalStorage.

### Calidad de Software

- Pruebas unitarias.
- Pruebas de integración.
- Pruebas EndToEnd.
- Cobertura superior al 85%.

---

## Arquitectura General

La solución se implementó bajo una arquitectura web basada en frontend.

```text
Usuario
   │
   ▼
Interfaz Web (HTML + CSS)
   │
   ▼
Lógica de Negocio (JavaScript)
   │
   ▼
Persistencia (LocalStorage)
```

---

## Tecnologías Utilizadas

### Frontend

- HTML5
- CSS3
- JavaScript ES6

### Herramientas de Desarrollo

- Node.js
- NPM
- Git
- GitHub

### Pruebas

- Vitest
- Playwright

### Integración Continua

- GitHub Actions

### Despliegue

- Vercel

---

## Instalación del Proyecto

### Clonar el repositorio

```bash
git clone https://github.com/USUARIO/REPOSITORIO.git
```

### Ingresar al proyecto

```bash
cd MVP-MundoMascotaLocalProyecto
```

### Instalar dependencias

```bash
npm install
```

### Ejecutar el proyecto

```bash
npm run dev
```

---

## Ejecución de Pruebas

### Pruebas Unitarias

```bash
npm run test:unit
```

### Cobertura

```bash
npm run test:unit -- --coverage
```

### Pruebas EndToEnd

```bash
npm run test:e2e
```

---

## CI/CD

El proyecto implementa un pipeline de Integración Continua mediante GitHub Actions.

El pipeline ejecuta automáticamente:

- Instalación de dependencias.
- Análisis de calidad del código.
- Build del proyecto.
- Pruebas automatizadas.
- Validación antes de realizar merge.

---

## Despliegue en Producción

Aplicación desplegada en:

https://AQUI-LA-URL-DE-VERCEL

---

## Estructura del Proyecto

```text
MVP-MundoMascotaLocalProyecto
│
├── css
├── img
├── js
├── tests
├── unit-tests
├── index.html
├── login.html
├── registro.html
├── servicios.html
├── agendar.html
├── mis-citas.html
├── package.json
└── README.md
```

---

## Equipo de Desarrollo

- David Muñoz Jaramillo
- Guadalupe Correa
- Yilmar Andrés Ardila

---

## Licencia

Proyecto académico desarrollado para la asignatura Proyecto de Software de la Corporación Universitaria Iberoamericana.