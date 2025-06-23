// src/app/Components/UploadModal.tsx
'use client';

import { useState, useEffect } from "react"; // Importa useEffect
import { client } from "../supabase-client";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UploadModal({ isOpen, onClose }: UploadModalProps) {
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null); // Nuevo estado para almacenar el email del usuario

  // Usa useEffect para obtener la sesión del usuario cuando el modal se abre
  useEffect(() => {
    const getSession = async () => {
      const { data: { user } } = await client.auth.getUser();
      if (user && user.email) {
        setUserEmail(user.email);
      } else {
        console.error("No hay usuario autenticado o el email no está disponible.");
      }
    };

    if (isOpen) {
      getSession();
    }
  }, [isOpen]);

  const subirArchivo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userEmail) {
      setMensaje("❌ No se pudo obtener el correo del usuario para subir el archivo.");
      return;
    }

    const input = e.currentTarget.elements.namedItem("archivo") as HTMLInputElement;
    const archivo = input?.files?.[0];

    if (!archivo) {
      setMensaje("Por favor, selecciona un archivo.");
      return;
    }

    setLoading(true);
    setMensaje(""); // Limpiar mensaje anterior

    const nombreLimpio = archivo.name.replace(/\s+/g, "_");
    const filePath = `${userEmail}/${Date.now()}-${nombreLimpio}`;

    const { error } = await client.storage.from("rambodrive").upload(filePath, archivo, {
      upsert: true,
    });

    setLoading(false);

    if (error) {
      console.error("Error Supabase:", error);
      setMensaje(`❌ Error al subir archivo: ${error.message}`);
    } else {
      setMensaje("✅ Archivo subido correctamente.");
      e.currentTarget.reset();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-gray-900 rounded-xl p-6 w-full max-w-md text-white shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white text-xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4">Subir Archivo</h2>

        <form onSubmit={subirArchivo} className="space-y-4">
          <input
            type="file"
            name="archivo"
            className="text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          />
          <button
            type="submit"
            disabled={loading || !userEmail} // Deshabilita si no hay email o si está cargando
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white w-full"
          >
            {loading ? "Subiendo..." : "Subir Archivo"}
          </button>
        </form>

        {mensaje && <p className="mt-4 text-green-400">{mensaje}</p>}
        {!userEmail && isOpen && <p className="mt-4 text-yellow-500">Cargando datos del usuario...</p>}
      </div>
    </div>
  );
}