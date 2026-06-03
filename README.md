# ProyectoWebMovil

Integrantes:
- Milovan Fuentes
- Amaro Fibla
- Marcos Cadiz

# Descripción del problema

El repositorio contiene nuestro proyecto de la asignatura INGENIERIA WEB Y MOVIL (ICI4247-1), en el cual está la propuesta de una web que resuelve una de las problemáticas de la comuna de Santo Domingo. Las Direcciones de Obras Municipales (DOM) están sobrepasadas porque revisan todo el papeleo y las leyes a mano, una por una. Esto las vuelve lentas, facilita errores y las obliga a mantener sus archivos de forma manual.

Nuestros objetivos con este proyecto son:

-  Digitalizar la revisión de las normas.
-  Hacer el proceso más rápido y confiable.
-  Ayudar a los funcionarios y usuarios con una interfaz simple y dinámica.
-  Mejora la trazabilidad.
-  Mantener al usuario informado del estado de su solicitud.
  
# Pasos para la ejecución

A continuación se detallan los pasos para configurar y ejecutar el proyecto en un entorno de desarrollo local.

## Prerrequisitos

Antes de comenzar, asegúrate de tener instalado el siguiente software:

1.  **Node.js**: Es un entorno de ejecución para JavaScript que nos permite correr el proyecto.
    -   **Instalación**:
        -   Ve al sitio web oficial de [Node.js](https://nodejs.org/).
        -   Descarga la versión **LTS** (Long Term Support), que es la más estable para la mayoría de los usuarios.
        -   Ejecuta el instalador y sigue los pasos. Esto también instalará `npm` (Node Package Manager), que usaremos para manejar las dependencias del proyecto.
        -   Para verificar que se instaló correctamente, abre una terminal y ejecuta: `node -v` y `npm -v`. Deberías ver las versiones de cada uno.

2.  **Visual Studio Code (Recomendado)**: Un editor de código.
    -   **Extensión recomendada**: Para una mejor experiencia de desarrollo, instala la siguiente extensión desde el marketplace de VS Code:
        -   `ES7+ React/Redux/React-Native snippets`

## Instalación y Ejecución

1.  **Clona o descarga el repositorio** en tu máquina local.

2.  **Abre una terminal** en la carpeta raíz del proyecto.

3.  **Instala las dependencias**. Al descargar un proyecto, la carpeta `node_modules` no suele estar incluida porque es muy pesada. Debes regenerarla usando el siguiente comando:
    ```bash
    npm install
    ```

4.  **Inicia el servidor de desarrollo**. Este comando compila el código y abre un puerto local (usualmente `http://localhost:5173`) para que puedas ver tu aplicación en el navegador.
    ```bash
    npm run dev
    ```

