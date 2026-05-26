# Rick & Morty Portal Explorer | React & Vite

Este proyecto es una aplicación frontend interactiva y responsiva desarrollada con React y Vite que permite explorar los personajes de la serie *Rick and Morty* consumiendo su API pública. El diseño y la estructura técnica han sido optimizados específicamente para facilitar su compilación y posterior despliegue en servidores compartidos de **cPanel**.

---

## 🚀 Tecnologías y Versiones Utilizadas

El proyecto utiliza un entorno de desarrollo moderno con las siguientes especificaciones:

| Tecnología / Herramienta | Versión | Tipo | Propósito |
| :--- | :--- | :--- | :--- |
| **Node.js** (Portable) | `v22.13.0` | Entorno | Entorno de ejecución de JavaScript local para compilar el proyecto. |
| **npm** | `10.9.2` | Gestor | Administrador de paquetes de dependencias de desarrollo y producción. |
| **React** | `^19.2.6` | Framework | Biblioteca principal para construir la interfaz de usuario modular. |
| **React DOM** | `^19.2.6` | Librería | Renderizador de componentes React en el DOM del navegador. |
| **Vite** | `^8.0.12` | Bundler / Herramienta | Compilador y servidor de desarrollo ultra-rápido de nueva generación (Vite 8). |
| **Lucide React** | `^1.16.0` | Iconografía | Conjunto de iconos vectoriales ligeros y escalables para la interfaz. |
| **Vanilla CSS** | CSS3 | Estilos | Diseño e interfaz con variables CSS, animaciones y glassmorphism personalizado. |

---

## 📂 Arquitectura del Proyecto

El código está estructurado bajo una arquitectura modular limpia para facilitar su mantenimiento y escalabilidad:

```text
react-app/
├── public/                 # Archivos estáticos servidos directamente sin procesar
│   └── .htaccess           # Redirección de rutas SPA. Crítico para evitar errores 404 en cPanel (Apache)
├── src/                    # Directorio principal del código fuente
│   ├── assets/             # Recursos gráficos (logos, favicons, vectores)
│   ├── components/         # Componentes reactivos reutilizables y modulares
│   │   ├── Navbar.jsx      # Barra de navegación principal y botón de visualización de favoritos
│   │   ├── Filters.jsx     # Buscador de texto y selectores dropdown (Estado, Género, Especie)
│   │   ├── CharacterCard.jsx # Tarjeta individual de cada personaje con detalles y favorito
│   │   └── CharacterModal.jsx # Panel modal superpuesto con la ficha técnica y lista de episodios
│   ├── App.jsx             # Componente raíz. Maneja la lógica de negocio, llamados a la API, paginación y localStorage
│   ├── App.css             # Estilos específicos de componentes (layouts, grids, responsividad)
│   ├── index.css           # Estilos de base global, fuentes de Google (Outfit), variables de color y animaciones
│   └── main.jsx            # Punto de entrada de React que monta la aplicación en el DOM
├── vite.config.js          # Configuración de compilación de Vite (configurado con base relativa "./" para cPanel)
├── eslint.config.js        # Reglas de linting y formateo para buenas prácticas de desarrollo
├── package.json            # Manifiesto del proyecto y scripts disponibles
└── package-lock.json       # Árbol de dependencias bloqueadas para garantizar builds idénticos
```

---

## 🛠️ Dependencias del Proyecto

### 💻 Dependencias de Frontend (Cliente)
Todas las dependencias instaladas son exclusivas del lado del cliente (Frontend) para la interfaz de usuario, control de estado y enrutamiento visual:
* **`react`** y **`react-dom`**: Gestión y renderizado de componentes reactivos.
* **`lucide-react`**: Proporciona iconos ligeros en formato SVG interactivo.
* **Dependencias de Desarrollo (devDependencies)**: Herramientas de transpilación y empaquetado (`vite`, `@vitejs/plugin-react`), herramientas de formateo de código (`eslint`, `globals`) y definiciones de tipos (`@types/react`, `@types/react-dom`).

### ⚙️ Dependencias de Backend
**No existen dependencias de backend** propias dentro de este proyecto. Al ser una **Single Page Application (SPA)** estática, el servidor web (como Apache en cPanel) simplemente distribuye los archivos HTML/JS/CSS construidos al navegador del cliente. 

Toda la lógica de consulta y base de datos se resuelve consumiendo una API pública externa:
* **API Externa**: `https://rickandmortyapi.com/api/character` (consultas dinámicas por query parameters).

---

## 💻 Comandos Disponibles para Ejecutar el Proyecto

Dado que el entorno utiliza una versión portátil de Node.js ubicada en el directorio raíz de la carpeta de trabajo (`..\node-portable`), puedes utilizar los siguientes comandos según tu caso:

### Caso A: Usando la versión de Node.js portable del proyecto (Recomendado)
Ejecuta estos comandos en una terminal de **PowerShell** en Windows estando dentro de la carpeta `react-app/`:

1. **Instalar Dependencias** (si se eliminara `node_modules`):
   ```powershell
   $env:Path = "..\node-portable;" + $env:Path; npm.cmd install
   ```
2. **Ejecutar el Servidor de Desarrollo** (con recarga rápida en tiempo real):
   ```powershell
   $env:Path = "..\node-portable;" + $env:Path; npm.cmd run dev
   ```
3. **Compilar para Producción** (genera la carpeta `dist/` optimizada para subir a cPanel):
   ```powershell
   $env:Path = "..\node-portable;" + $env:Path; npm.cmd run build
   ```
4. **Previsualizar localmente el Build de producción**:
   ```powershell
   $env:Path = "..\node-portable;" + $env:Path; npm.cmd run preview
   ```

### Caso B: Si tienes Node.js instalado globalmente en tu sistema
Puedes utilizar los comandos tradicionales de Node.js de forma directa dentro de `react-app/`:

1. **Instalar Dependencias**:
   ```bash
   npm install
   ```
2. **Ejecutar en Desarrollo**:
   ```bash
   npm run dev
   ```
3. **Compilar para cPanel**:
   ```bash
   npm run build
   ```
4. **Previsualizar Build**:
   ```bash
   npm run preview
   ```
