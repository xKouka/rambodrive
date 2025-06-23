// src/app/Components/UploadModal.tsx
'use client';

import { useState } from "react";
import { client } from "../supabase-client";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UploadModal({ isOpen, onClose }: UploadModalProps) {
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const subirArchivo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem("archivo") as HTMLInputElement;
    const archivo = input?.files?.[0];

    if (!archivo) return;

    setLoading(true);

    const nombreLimpio = archivo.name.replace(/\s+/g, "_");
    const nombre = `${Date.now()}-${nombreLimpio}`;

    const { error } = await client.storage.from("rambodrive").upload(nombre, archivo, {
      upsert: true, // permite sobrescribir si ya existe
    });

    setLoading(false);

    if (error) {
      console.error("Error Supabase:", error);
      setMensaje("❌ Error al subir archivo.");
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
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white w-full"
          >
            {loading ? "Subiendo..." : "Subir Archivo"}
          </button>
        </form>

        {mensaje && <p className="mt-4 text-green-400">{mensaje}</p>}
      </div>
    </div>
  );
}