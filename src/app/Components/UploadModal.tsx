'use client';

import { useState } from "react";
import { client } from "../supabase-client"; // Asegúrate que la ruta sea correcta

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: () => void; // Función para refrescar la lista de archivos
}

export default function UploadModal({ isOpen, onClose, onUploadSuccess }: UploadModalProps) {
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setMensaje(""); // Limpiar mensaje si seleccionan un nuevo archivo
    }
  };

  const subirArchivo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedFile) {
      setMensaje("Por favor, selecciona un archivo.");
      return;
    }

    setLoading(true);
    setMensaje("Iniciando subida...");

    // 1. Obtener el usuario justo antes de la subida para asegurar sesión activa
    const { data: { user } } = await client.auth.getUser();
    if (!user) {
      setMensaje("❌ Error: Sesión no encontrada. Por favor, inicia sesión de nuevo.");
      setLoading(false);
      return;
    }

    // 2. Usar el ID del usuario para la ruta, no el email
    const filePath = `${user.id}/${Date.now()}-${selectedFile.name}`;

    // 3. Subir al Storage
    const { error: uploadError } = await client.storage
      .from("rambodrive") // Tu bucket
      .upload(filePath, selectedFile);

    if (uploadError) {
      setMensaje(`❌ Error al subir al storage: ${uploadError.message}`);
      setLoading(false);
      return;
    }

    setMensaje("Archivo en storage, guardando en base de datos...");

    // 4. ¡LA PARTE QUE FALTABA! Insertar en la base de datos
    const { error: insertError } = await client
      .from('files') // Tu tabla de archivos
      .insert({
        file_name: selectedFile.name,
        file_size: selectedFile.size,
        mime_type: selectedFile.type,
        storage_path: filePath,
        user_id: user.id // La clave para pasar la RLS
      });

    setLoading(false);

    if (insertError) {
      // Si la inserción en la BD falla, el trigger del límite de espacio se activa aquí
      setMensaje(`❌ Error al guardar: ${insertError.message}`);
      // Limpieza: Borra el archivo huérfano del storage
      await client.storage.from("rambodrive").remove([filePath]);
    } else {
      setMensaje("✅ ¡Archivo subido con éxito!");
      onUploadSuccess(); // Llama a la función para refrescar la UI
      setTimeout(() => {
        onClose(); // Cierra el modal después de un momento
      }, 1500);
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
            onChange={handleFileChange}
            className="text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          />
          {selectedFile && <p className="text-sm text-gray-400">Archivo: {selectedFile.name}</p>}
          <button
            type="submit"
            disabled={loading || !selectedFile}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 px-4 py-2 rounded text-white w-full"
          >
            {loading ? "Subiendo..." : "Subir Archivo"}
          </button>
        </form>

        {mensaje && <p className="mt-4 text-sm text-center">{mensaje}</p>}
      </div>
    </div>
  );
}