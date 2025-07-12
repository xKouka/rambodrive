🗂️ RamboDrive
📘 Descripción
RamboDrive es una aplicación web tipo “cloud drive” desarrollada con tecnologías modernas como Next.js y Supabase. Permite a los usuarios registrarse, subir archivos, organizarlos por carpetas y gestionarlos desde una interfaz minimalista. El backend sin servidor se basa completamente en servicios de Supabase: autenticación, almacenamiento, y base de datos PostgreSQL con reglas RLS.

🚀 Tecnologías utilizadas
⚛️ Next.js 13+ – Framework de React con App Router.

🟢 Supabase – Base de datos, autenticación y almacenamiento.

📦 supabase-js / @supabase/ssr – Cliente para manejar Supabase desde frontend y backend.

🎨 Tailwind CSS – Para estilos rápidos (si está presente).

💡 TypeScript – Tipado moderno (si se usa).

🖼️ Captura de pantalla / Demo
md
Copiar
Editar
![Captura del explorador de archivos](./public/preview-drive-ui.png)
(Agrega aquí una imagen real de la UI o un link a una demo en línea si existe).

📦 Instalación
1. Clonar el repositorio
bash
Copiar
Editar
git clone https://github.com/xKouka/rambodrive.git
cd rambodrive
2. Instalar dependencias
bash
Copiar
Editar
npm install
3. Crear archivo .env.local
env
Copiar
Editar
NEXT_PUBLIC_SUPABASE_URL=tu_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima
4. Ejecutar en desarrollo
bash
Copiar
Editar
npm run dev
Abre http://localhost:3000 para ver el proyecto en tu navegador.

⚙️ Configuración de Supabase
Requisitos:
Crear un proyecto en https://supabase.io

Crear un bucket de almacenamiento llamado rambodrive

Importar el archivo schema.sql incluido en la raíz para crear las tablas necesarias (users, files, etc.)

Activar Row Level Security (RLS) para las tablas con políticas que limiten el acceso por usuario autenticado

(Puedes extender esta sección con comandos SQL si los defines en el archivo schema.sql.)

📁 Estructura del proyecto
csharp
Copiar
Editar
rambodrive/
├── app/                    # Rutas de Next.js (App Router)
│   ├── drive/              # Página principal tipo explorador
│   └── upload/             # Página para subir archivos
├── components/             # UI: botones, menús, contenedores
├── lib/                    # Funciones auxiliares
│   └── supabase.ts         # Cliente Supabase SSR/browser
├── public/                 # Archivos estáticos (iconos, logos)
├── styles/                 # Archivos CSS globales
├── .env.local.example      # Variables de entorno
├── schema.sql              # Estructura de base de datos
└── README.md
🎯 Funcionalidades principales
✅ Registro e inicio de sesión

✅ Subida de archivos

✅ Visualización en vista de carpeta

✅ Descarga y eliminación de archivos

✅ Vista adaptada por tipo de archivo (PDF, imagen, texto, etc.)

🚧 Compartición de enlaces públicos (en desarrollo)

🔐 Seguridad
Este proyecto utiliza autenticación de Supabase y políticas RLS para garantizar que cada usuario solo pueda acceder a sus propios archivos.

Ejemplo básico de política:

sql
Copiar
Editar
CREATE POLICY "Solo dueño puede leer" ON files
FOR SELECT USING (auth.uid() = user_id);
☁️ Despliegue
Puedes desplegar el proyecto en:

Vercel

Netlify

Pasos:

Sube el repo.

Configura las variables de entorno en el panel del host.

Activa RLS y crea tablas en Supabase.

Conecta bucket de almacenamiento.

🤝 Contribuciones
¿Quieres ayudar? Puedes contribuir así:

Haz un fork del proyecto.

Crea una nueva rama.

Haz tus cambios y pruebas.

Abre un Pull Request explicando tus mejoras.

También puedes colaborar traduciendo la documentación para otros idiomas (por ejemplo, LEEME.md en español).

📝 Licencia
Este proyecto está licenciado bajo la licencia MIT.
