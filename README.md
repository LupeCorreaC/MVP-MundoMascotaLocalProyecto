# Mundo Mascota Local

## Descripción del proyecto

Mundo Mascota Local es una aplicación web desarrollada para facilitar la búsqueda y gestión de servicios para mascotas. El sistema permite a los usuarios registrarse, iniciar sesión, consultar servicios disponibles, agendar citas para sus mascotas y visualizar el historial de citas programadas.

La aplicación busca mejorar la experiencia de los propietarios de mascotas al centralizar la información de servicios y permitir la gestión de citas de forma sencilla e intuitiva. El proyecto fue desarrollado como un Producto Mínimo Viable (MVP), aplicando buenas prácticas de desarrollo de software, control de versiones con Git y GitHub, y pruebas unitarias para garantizar la calidad del sistema.

## Guía de instalación del sistema

### Requisitos previos

Antes de instalar el proyecto, es necesario tener instalado:

* Node.js
* Git
* Visual Studio Code (recomendado)

### Clonar el repositorio

Abrir una terminal y ejecutar:

```bash
git clone https://github.com/LupeCorreaC/MVP-MundoMascotaLocalProyecto.git
```

### Ingresar a la carpeta del proyecto

```bash
cd MVP-MundoMascotaLocalProyecto
```

### Instalar dependencias

```bash
npm install
```

Este comando descargará automáticamente todas las dependencias necesarias definidas en el archivo package.json.
## Arquitectura general del sistema

El sistema sigue una arquitectura de aplicación web del lado del cliente (Frontend), donde la interacción del usuario se realiza mediante páginas web desarrolladas con HTML, CSS y JavaScript.

### Componentes principales

#### Interfaz de usuario (Frontend)

Permite a los usuarios interactuar con el sistema mediante formularios, páginas de servicios, registro, inicio de sesión, agendamiento de citas y consulta de historial.

#### Lógica de negocio

Implementada en JavaScript, se encarga de procesar la información ingresada por el usuario, validar datos y gestionar las funcionalidades principales del sistema.

#### Almacenamiento local

La información se almacena utilizando Local Storage del navegador, permitiendo conservar datos de usuarios y citas durante el uso de la aplicación.

### Estructura general

```text
Mundo Mascota Local
│
├── HTML
│   ├── Registro
│   ├── Inicio de sesión
│   ├── Servicios
│   ├── Agendamiento
│   └── Historial de citas
│
├── CSS
│   └── Estilos visuales
│
├── JavaScript
│   ├── Registro
│   ├── Login
│   ├── Servicios
│   ├── Agendar citas
│   └── Gestión de historial
│
└── Local Storage
    ├── Usuarios
    └── Citas
```
## Tecnologías utilizadas

El proyecto Mundo Mascota Local fue desarrollado utilizando las siguientes tecnologías:

| Tecnología         | Descripción                                                       |
| ------------------ | ----------------------------------------------------------------- |
| HTML5              | Estructura y contenido de las páginas web                         |
| CSS3               | Diseño y estilos visuales de la aplicación                        |
| JavaScript (ES6)   | Implementación de la lógica de negocio                            |
| Local Storage      | Almacenamiento local de datos en el navegador                     |
| Node.js            | Entorno utilizado para ejecutar herramientas y dependencias       |
| Jest               | Framework utilizado para la ejecución de pruebas unitarias        |
| Git                | Control de versiones del proyecto                                 |
| GitHub             | Repositorio remoto y trabajo colaborativo                         |
| Visual Studio Code | Entorno de desarrollo utilizado para la construcción del proyecto |

## Instrucciones para ejecutar el proyecto localmente

### 1. Clonar el repositorio

```bash
git clone https://github.com/LupeCorreaC/MVP-MundoMascotaLocalProyecto.git
```

### 2. Ingresar al directorio del proyecto

```bash
cd MVP-MundoMascotaLocalProyecto
```

### 3. Instalar las dependencias

```bash
npm install
```

### 4. Ejecutar las pruebas unitarias

```bash
npm test
```

### 5. Abrir la aplicación

Abrir el archivo `index.html` en un navegador web o utilizar la extensión **Live Server** de Visual Studio Code para ejecutar el proyecto localmente.

### 6. Verificar el funcionamiento

Una vez abierta la aplicación, el usuario podrá:

* Registrarse en el sistema.
* Iniciar sesión.
