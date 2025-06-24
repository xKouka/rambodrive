"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { client } from "../supabase-client";
import { useUser } from "../contexts/UserContext";

interface FileRow {
  id: number;
  name: string;
  owner: string;
  modified: string;
  size: string;
  type: "doc" | "excel" | "pdf" | "ppt";
}

// --- Mover getFileType y formatBytes FUERA del componente ---
// Son funciones puras y no dependen del estado o props del componente.
const getFileType = (fileName: string): "doc" | "excel" | "pdf" | "ppt" => {
  const ext = fileName.split(".").pop()?.toLowerCase();
  if (ext === "doc" || ext === "docx") return "doc";
  if (ext === "xls" || ext === "xlsx") return "excel";
  if (ext === "pdf") return "pdf";
  if (ext === "ppt" || ext === "pptx") return "ppt";
  return "doc";
};

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};
// --- Fin de funciones auxiliares externas ---

export default function AllFilesTable() {
  const { user } = useUser();
  const [allFiles, setAllFiles] = useState<FileRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const fetchFiles = useCallback(async () => {
    if (!user?.email) {
      setLoading(false);
      return;
    }
    setLoading(true);

    const { data, error } = await client.storage
      .from("rambodrive")
      .list(user.email, { limit: 100, offset: 0 });

    if (error) {
      console.error("Error al listar archivos:", error);
      setLoading(false);
      return;
    }

    const files =
      data
        ?.filter((file) => file.metadata)
        .map((file, index) => ({
          id: index,
          name: file.name,
          owner: user.email || "Usuario Desconocido", // Tu corrección anterior
          modified: new Date(
            file.updated_at || Date.now()
          ).toLocaleDateString(),
          size: formatBytes(file.metadata?.size || 0), // Ahora accesible
          type: getFileType(file.name), // Ahora accesible
        })) || [];

    setAllFiles(files);
    setLoading(false);
  }, [user]); // No necesitas incluir `formatBytes` ni `getFileType` aquí si están fuera del componente

  useEffect(() => {
    fetchFiles();
  }, [user, fetchFiles]); // `fetchFiles` es una dependencia estable

  // Cierra el menú contextual al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []); // Sin dependencias reactivas aquí

  const handleDelete = async (fileName: string) => {
    if (!user?.email) return;

    const { error } = await client.storage
      .from("rambodrive")
      .remove([`${user.email}/${fileName}`]);

    if (error) {
      console.error("Error eliminando archivo:", error.message);
      alert("No se pudo eliminar el archivo");
    } else {
      setAllFiles((prev) => prev.filter((file) => file.name !== fileName));
      setMenuOpen(null);
    }
  };

  const handleDownload = (fileName: string) => {
    if (!user?.email) return;

    const { data } = client.storage
      .from("rambodrive")
      .getPublicUrl(`${user.email}/${fileName}`);

    if (data?.publicUrl) {
      window.open(data.publicUrl, "_blank");
    } else {
      alert("No se pudo obtener la URL de descarga");
    }

    setMenuOpen(null);
  };

  const getFileIcon = (type: string) => { // Esta función SÍ necesita quedarse aquí o ser `useCallback`
    const iconProps = "h-5 w-5 mr-3";
    const icons: { [key: string]: string } = {
      doc: "text-blue-600",
      excel: "text-green-600",
      pdf: "text-red-600",
      ppt: "text-yellow-600",
    };
    const color = icons[type] || "text-gray-500";
    return (
      <svg
        className={`${iconProps} ${color}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    );
  };

  return (
    <div>
      <h2 className="text-xl font-medium text-white mb-4">
        Todos los archivos
      </h2>
      <div className="bg-white rounded-xs shadow relative">
        {loading ? (
          <p className="text-center py-4 text-gray-600">Cargando archivos...</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Propietario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Última modificación
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Tamaño
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allFiles.map((file) => (
                <tr key={file.id} className="hover:bg-gray-50 relative">
                  <td className="px-6 py-4 whitespace-nowrap flex items-center">
                    {getFileIcon(file.type)}
                    <span className="text-sm font-medium text-gray-900">
                      {file.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {file.owner}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {file.modified}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {file.size}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative rounded-r-sm">
                    <button
                      onClick={() =>
                        setMenuOpen(menuOpen === file.id ? null : file.id)
                      }
                      className="text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 5v.01M12 12v.01M12 19v.01"
                        />
                      </svg>
                    </button>

                    {menuOpen === file.id && (
                      <div
                        ref={menuRef}
                        className="absolute right-0 top-full mt-2 w-36 bg-white border border-gray-200 rounded-sm shadow-lg z-50 flex flex-col"
                      >
                        <button
                          onClick={() => handleDownload(file.name)}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Descargar
                        </button>
                        <button
                          onClick={() => handleDelete(file.name)}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          Eliminar
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
