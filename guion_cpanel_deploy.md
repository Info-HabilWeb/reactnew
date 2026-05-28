# Guión de Video: Cómo Subir tu App de React a cPanel (Paso a Paso)

Este guión está estructurado para un videotutorial dinámico y profesional. Incluye indicaciones de **Cámara/Pantalla (lo que se muestra)** y el **Locutor (lo que se dice)**.

---

## 🎬 Introducción: El Gancho (0:00 - 0:45)

*   **Pantalla:** Mostrar la aplicación de React funcionando de forma local (`http://localhost:5173` o similar) y luego cambiar a la pestaña del dominio real ya funcionando en internet.
*   **Locutor:**
    > "¡Hola a todos! Tienes tu aplicación de React terminada, funciona de maravilla en tu computadora local, pero ahora viene la pregunta del millón: **¿Cómo la subo a internet usando un hosting con cPanel?**
    > 
    > En este video te voy a enseñar el paso a paso exacto para desplegar tu aplicación React en cPanel en menos de 5 minutos, y lo más importante: **cómo evitar el típico error 404 al recargar la página** si estás usando rutas en tu app (React Router). ¡Vamos a empezar!"

---

## 📂 Paso 1: Preparar los archivos en React (0:45 - 1:45)

*   **Pantalla:** Abrir el editor de código (VS Code) con el proyecto de React. Mostrar el archivo `package.json` y hacer zoom en el bloque de `scripts`.
*   **Locutor:**
    > "Lo primero que debemos entender es que los navegadores web no pueden ejecutar el código de React directamente tal como lo escribimos con JSX, componentes e imports. Necesitamos 'compilar' el proyecto para convertirlo en HTML, CSS y JavaScript puro.
    >
    > Para esto, abrimos nuestro proyecto en el editor. Si nos fijamos en el archivo `package.json`, bajo la sección de `scripts`, veremos el comando `build`. En proyectos creados con **Vite** dirá `"build": "vite build"`, y en proyectos tradicionales con **Create React App** dirá `"build": "react-scripts build"`. Este comando es la clave."

### 🛠️ Configuración Crucial: El archivo `.htaccess` (Evitar Error 404)
*   **Pantalla:** Mostrar la carpeta `public` del proyecto en VS Code. Crear un nuevo archivo dentro de `public` llamado `.htaccess`. Escribir el código de redirección.
*   **Locutor:**
    > "Antes de compilar, hay un truco fundamental que casi nadie te dice. Si tu aplicación tiene varias rutas (como `/contacto` o `/dashboard`), al subirla a cPanel y recargar la página te dará un **Error 404 (Not Found)**. Esto pasa porque cPanel busca una carpeta real llamada 'contacto' y no la encuentra.
    >
    > Para solucionarlo, vamos a la carpeta `public` de nuestro proyecto de React. Creamos un nuevo archivo llamado exactamente `.htaccess` (con un punto al inicio). Y dentro de él, pegamos este código de redirección:"

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
```

*   **Locutor:**
    > "Este archivo le dice a cPanel: *'Si el usuario pide cualquier ruta que no sea un archivo físico real (como una imagen o estilo), mándalo a index.html y deja que React Router maneje la navegación'.* Al ponerlo en la carpeta `public`, se copiará automáticamente a la versión final de producción."

---

## 🏗️ Paso 2: Generar y comprimir la versión de producción (1:45 - 2:45)

*   **Pantalla:** Abrir la terminal integrada del editor y ejecutar el comando de build.
*   **Locutor:**
    > "Ahora abrimos la terminal y ejecutamos el comando:
    > `npm run build`
    > 
    > Esperamos unos segundos. Esto optimizará todo nuestro código, minificará el CSS y JavaScript, y creará una carpeta optimizada para producción."

*   **Pantalla:** Mostrar en el explorador de archivos la nueva carpeta generada (`dist` para Vite, o `build` para Create React App). Entrar en ella y seleccionar todos los elementos.
*   **Locutor:**
    > "Una vez terminado el proceso, verás que se ha creado una nueva carpeta. Si usas Vite se llamará **`dist`**; si usas Create React App se llamará **`build`**.
    >
    > Entramos a esta carpeta. **¡Ojo aquí!** No debes comprimir la carpeta entera desde afuera. Debes entrar a ella, seleccionar todos los archivos y carpetas que están adentro (incluyendo el `index.html`, la carpeta `assets`, y nuestro `.htaccess`), hacer clic derecho y comprimirlos en un archivo **`.zip`**. Lo llamaremos `proyecto.zip`. De esta manera, al extraerlo en cPanel, los archivos quedarán directamente en la raíz de nuestro dominio."

---

## 🌐 Paso 3: Subir los archivos a cPanel (2:45 - 4:15)

*   **Pantalla:** Mostrar el navegador en el portal de acceso a cPanel e iniciar sesión. Ir al menú principal y abrir el **Administrador de Archivos (File Manager)**.
*   **Locutor:**
    > "Con nuestro archivo zip listo, nos vamos al navegador y accedemos a nuestro panel de control de cPanel.
    > 
    > Buscamos la sección de **Archivos** y abrimos el **Administrador de Archivos**. Esta herramienta nos permite gestionar todo el almacenamiento de nuestra web."

*   **Pantalla:** En el Administrador de Archivos, navegar a `public_html`. (O a la carpeta del subdominio si aplica).
*   **Locutor:**
    > "Una vez dentro del Administrador de archivos, buscamos la carpeta llamada **`public_html`**. Esta es la carpeta pública raíz de tu dominio principal. Todo lo que pongas aquí se verá al escribir tu dirección web.
    > *(Nota para el video: Si vas a subir el sitio a un subdominio o una carpeta secundaria, navega a la carpeta correspondiente)*."

*   **Pantalla:** Hacer clic en el botón de **Cargar (Upload)** en la barra superior. Arrastrar y soltar el archivo `proyecto.zip`. Mostrar la barra de carga completándose al 100% (ponerse verde).
*   **Locutor:**
    > "Hacemos clic en el botón superior que dice **Cargar**. Se abrirá una nueva pestaña. Aquí simplemente arrastramos y soltamos nuestro archivo `proyecto.zip`. 
    > Esperamos a que la barra llegue al 100% y cambie a color verde. Esto nos indica que el archivo se subió correctamente."

*   **Pantalla:** Volver a la pestaña anterior del Administrador de Archivos, presionar el botón **Recargar (Reload)**, seleccionar el archivo `.zip`, hacer clic derecho y seleccionar **Extraer (Extract)**.
*   **Locutor:**
    > "Regresamos al Administrador de Archivos y pulsamos **Recargar**. Seleccionamos nuestro archivo zip, hacemos clic derecho y elegimos la opción **Extraer**. Nos preguntará la ruta, nos aseguramos de que sea `/public_html` y confirmamos.
    > 
    > Una vez extraído, eliminamos el archivo `.zip` para no ocupar espacio innecesario en nuestro hosting."

---

## ⚡ Paso 4: Comprobación Final (4:15 - 5:00)

*   **Pantalla:** Abrir una nueva pestaña en el navegador, escribir el dominio de prueba y navegar por la aplicación web. Hacer clic en los enlaces, recargar la página (`F5` o botón refrescar) para demostrar que no sale el error 404.
*   **Locutor:**
    > "¡Y listo! Ahora abrimos una nueva pestaña del navegador, escribimos nuestro dominio y... ¡Voilà! Tu aplicación de React está en línea y es 100% funcional. 
    > 
    > Vamos a probar la navegación interna... todo funciona bien. Y si recargamos la página... gracias al archivo `.htaccess` que configuramos al inicio, el sitio se recarga perfectamente sin mostrar ningún error 404.
    > 
    > Si te sirvió este tutorial rápido, no olvides darle un buen 'Me Gusta', suscribirte al canal para más contenido de programación y desarrollo web, y dejar tus dudas en los comentarios. ¡Nos vemos en el próximo video!"

---

## 💡 Consejos para la Grabación del Video

1.  **Zoom en pantalla:** Haz zoom en la terminal de VS Code al escribir `npm run build` y en la parte superior de cPanel para que los textos sean legibles en pantallas pequeñas o celulares.
2.  **Archivos Ocultos en cPanel:** Si por alguna razón no ves el archivo `.htaccess` después de extraer el zip en cPanel, recuérdale a tu audiencia que deben ir a la rueda dentada de **Configuración** en la esquina superior derecha del Administrador de Archivos de cPanel y activar la opción **"Mostrar archivos ocultos (dotfiles)"**. Puedes mencionarlo como un tip rápido al final del Paso 3.
3.  **Mantén un ritmo fluido:** Edita los tiempos de carga del build de React y de la subida a cPanel en postproducción para mantener al espectador enganchado.
