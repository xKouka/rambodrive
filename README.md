# Descripción

# 🗂️ RamboDrive

**RamboDrive** es una aplicación web estilo "cloud drive" desarrollada con tecnologías modernas como **Next.js** y **Supabase**. Permite a los usuarios autenticarse, subir, organizar y gestionar archivos en la nube a través de una interfaz intuitiva. Utiliza Supabase como backend sin servidor para autenticación, base de datos y almacenamiento.

---

## 🚀 Tecnologías utilizadas

- ⚛️ [Next.js](https://nextjs.org/) – Framework basado en React (App Router, SSR).
- 🟢 [Supabase](https://supabase.io/) – Backend como servicio (Auth, Storage, PostgreSQL).
- 💅 Tailwind CSS – (si está implementado) para estilos utilitarios.
- 📦 `@supabase/supabase-js`, `@supabase/ssr` – SDKs para interactuar con Supabase.
- ☁️ Vercel / Netlify – (opcional) para despliegue.

---

## 📦 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/xKouka/rambodrive.git
cd rambodrive
```
## 2. Instalar dependencias

```bash
npm install
```
## 3. Crear archivo .env.local

```bash
NEXT_PUBLIC_SUPABASE_URL=tu_url

NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima
```

## 4. Ejecutar en desarrollo

```bash
npm run dev
```
---

# ⚙️ Configuración de Supabase
Requisitos:
- Crear un proyecto en https://supabase.io

- Crear un bucket de almacenamiento llamado rambodrive

- Importar el archivo schema.sql incluido en la raíz para crear las tablas necesarias (users, files, etc.)

- Activar Row Level Security (RLS) para las tablas con políticas que limiten el acceso por usuario autenticado

- (Puedes extender esta sección con comandos SQL si los defines en el archivo schema.sql.)

---

# 🎯 Funcionalidades principales
✅ Registro e inicio de sesión

✅ Subida de archivos

✅ Visualización en vista de carpeta

✅ Descarga y eliminación de archivos

✅ Vista adaptada por tipo de archivo (PDF, imagen, texto, etc.)

🚧 Compartición de enlaces públicos (en desarrollo)

---

# 🔐 Seguridad
Este proyecto utiliza autenticación de Supabase y políticas RLS para garantizar que cada usuario solo pueda acceder a sus propios archivos.

- Ejemplo básico de política:
sql

 CREATE POLICY "Solo dueño puede leer" ON files

 FOR SELECT USING (auth.uid() = user_id);

---

# ☁️ Despliegue
Puedes desplegar el proyecto en:

- Vercel

- Netlify

Pasos:

- Sube el repo.

- Configura las variables de entorno en el panel del host.

- Activa RLS y crea tablas en Supabase.

- Conecta bucket de almacenamiento.

---

# 🤝 Contribuciones

¿Quieres ayudar? Puedes contribuir así:

- Haz un fork del proyecto.

- Crea una nueva rama.

- Haz tus cambios y pruebas.

- Abre un Pull Request explicando tus mejoras.

---

# 📝 Licencias
Este proyecto y sus dependencias están cubiertos bajo la licencia MIT. 

Ver los documentos consolidados [LICENSE](./LICENSE) y [LICENSES.txt](./LICENSES.txt).

---

# 👤 Autor
@xKouka – Autor del repositorio original.

---
