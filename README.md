# Proyecto Track-Care: Administración de Usuarios y Smartwatches

Este repositorio contiene el código fuente de un proyecto de aplicación web administrativa desarrollada con Angular y Nest. El objetivo principal de esta aplicación es permitir a los administradores gestionar los usuarios y smartwatches del sistema. La parte frontend está construida utilizando Angular 15.2.2, mientras que la parte backend se ha desarrollado con Nest.

## Características principales

- Administración de usuarios: Los administradores pueden crear, actualizar y eliminar usuarios del sistema. Cada usuario tiene información personal y detalles de contacto asociados.

- Administración de smartwatches: Los administradores pueden gestionar los smartwatches disponibles en el sistema. Pueden asignar un smartwatch a un usuario específico o liberarlo para que esté disponible para otro usuario.

- Recepción de posiciones: El backend está preparado para recibir las posiciones que envían los smartwatches a través de HTTP. Estas posiciones se almacenan en una base de datos para que puedan ser visualizadas en la parte web mediante un mapa interactivo.

- Envío de notificaciones por correo: Cuando un smartwatch envía una posición de tipo emergencia o retirada de smartwatch, se envía un correo electrónico a los administradores para informarles sobre la situación. Esto permite una respuesta rápida y adecuada a los eventos importantes.

- Autenticación JWT: La aplicación utiliza autenticación JWT (JSON Web Tokens) con tokens de actualización. Esto garantiza la seguridad de las transacciones y permite a los usuarios mantener su sesión activa durante un período de tiempo determinado.

## Requisitos del sistema

- Node.js (versión lts-gallium)
- Angular CLI (versión 15.2.2)
- Docker

## Instalación

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local:

1. Clona este repositorio en tu máquina local:

```shell
git clone https://github.com/tu-usuario/track-care.git
```

2. Navega hasta el directorio raíz del proyecto:
shell
Copy code
```
cd track-care
```
3. Configuración del archivo docker-compose.yml:

Modifica el archivo docker-compose.yml con las variables de entorno deseadas:

```yaml
MONGODB_URI: mongodb://mongodb:27017/nestjs
JWT_ACCESS_SECRET: your_access_secret
JWT_REFRESH_SECRET: your_refresh_secret
MAIL_HOST: your_smpt_host
MAIL_USER: your_sender_email
MAIL_PASSWORD: your_sender_password
MAIL_FROM: your_sender_email
```

4. Inicia la aplicación utilizando Docker Compose:

```bash
docker-compose up
```
Esto lanzará el frontend, backend y la base de datos simultáneamente.

Accede a la aplicación en tu navegador web:
```bash
http://localhost:4200
```

## Documentación Swagger

El proyecto contiene una documentación completa de la API en formato Swagger. Puedes acceder a ella en localhost a través de la siguiente URL:

- [Documentación Swagger](http://localhost:3000/api/docs)

La documentación Swagger proporciona una descripción detallada de los endpoints disponibles, los parámetros requeridos y las respuestas esperadas. Es una herramienta útil para comprender y utilizar la API de forma eficiente.
