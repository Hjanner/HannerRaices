# HannerRaices

## Descripción del Proyecto

**HannerRaices** es un proyecto de un portal web de bienes raíces. Este sistema permite a los visitantes registrarse, confirmar su cuenta y comenzar a publicar sus propiedades. Los usuarios pueden agregar descripciones detalladas, información relevante sobre la propiedad, mapas interactivos y fotografías. Además, se incluye un formulario de contacto para que los clientes interesados puedan enviar mensajes directamente a los propietarios.

### Características Principales

- **Registro de Usuarios**: Los visitantes pueden crear una cuenta y confirmar su registro a través de un correo electrónico.
- **Publicación de Propiedades**: Los usuarios pueden publicar propiedades con descripciones, información detallada, imágenes y ubicación en un mapa.
- **Interacción con Clientes**: Los interesados pueden enviar mensajes a los propietarios a través de un formulario de contacto.
- **Interfaz Amigable**: Utiliza Pug para la generación de vistas, ofreciendo una experiencia de usuario intuitiva y atractiva.
- **Estilo Moderno**: Implementa TailwindCSS para un diseño responsivo y moderno.
- **Carga de Archivos**: Utiliza Dropzone para facilitar la carga de imágenes de las propiedades.
- **Mapas Interactivos**: Integración de Leaflet para mostrar la ubicación de las propiedades en un mapa.
- **Autenticación Segura**: Implementación de JWT (JSON Web Token) para la autenticación de usuarios.
- **Base de Datos Relacional**: Utiliza MySQL junto con Sequelize para la gestión de datos de manera eficiente.
- **Arquitectura MVC**: Sigue el patrón de diseño Modelo-Vista-Controlador (MVC) para una mejor organización del código.
- **Herramientas de Desarrollo**: Utiliza Webpack para la gestión de módulos y optimización de recursos.

### Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express**: Framework web para Node.js que facilita la creación de aplicaciones web.
- **Pug**: Motor de plantillas para generar HTML dinámico.
- **MySQL**: Sistema de gestión de bases de datos relacional.
- **Sequelize**: ORM (Object-Relational Mapping) para interactuar con la base de datos.
- **TailwindCSS**: Framework CSS para un diseño moderno y responsivo.
- **Dropzone**: Biblioteca para la carga de archivos.
- **Leaflet**: Biblioteca de JavaScript para mapas interactivos.
- **JWT**: Método de autenticación basado en tokens.

### Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/HannerRaices.git

2. Navega al directorio del proyecto:
   ```bash
   cd HannerRaices

3. Instala las dependencias:
   ```bash
   npm install

4. Configura la base de datos en config/config.json (asegúrate de tener MySQL instalado y en funcionamiento):
  
5. Ejecuta las migraciones para crear las tablas necesarias:
   ```bash
   npx sequelize-cli db:migrate

6. Inicia el servidor
   ```bash
   npm run start
   
