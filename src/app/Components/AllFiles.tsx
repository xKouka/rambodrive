"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { client } from "../supabase-client";
import { useUser } from "../contexts/UserContext";
import { showConfirmAlert, showErrorAlert, showSuccessAlert } from '../../utils/alerts';

interface FileRow {
  id: number;
  file_name: string;
  created_at: string;
  file_size: number;
  storage_path: string;
}

type FileType = "doc" | "excel" | "pdf" | "ppt" | "generic";

export default function AllFilesTable() {
  const { user } = useUser();
  const [allFiles, setAllFiles] = useState<FileRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const fetchFiles = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);

    const { data, error } = await client
      .from("files")
      .select("id, file_name, created_at, file_size, storage_path")
      .eq("user_id", user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error al obtener archivos de la BD:", error);
      showErrorAlert("Error de Carga", "No se pudieron cargar tus archivos. Inténtalo de nuevo más tarde.");
      setAllFiles([]);
    } else {
      setAllFiles(data || []);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchFiles();
    }
  }, [user, fetchFiles]);

  useEffect(() => {
    if (!user?.id) return;

    const channel = client
      .channel(`public:files:user_id=eq.${user.id}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'files', filter: `user_id=eq.${user.id}` },
        (payload) => {
          console.log('¡Nuevo archivo detectado!', payload.new);
          setAllFiles((currentFiles) => [payload.new as FileRow, ...currentFiles]);
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'files', filter: `user_id=eq.${user.id}` },
        (payload) => {
          console.log('¡Archivo eliminado detectado!', payload.old);
          setAllFiles((currentFiles) =>
            currentFiles.filter(file => file.id !== (payload.old as { id: number }).id)
          );
        }
      )
      .subscribe();

    return () => {
      client.removeChannel(channel);
    };
  }, [user]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDelete = async (file: FileRow) => {
    setMenuOpen(null);

    const isConfirmed = await showConfirmAlert(
      '¿Estás seguro?',
      `Esta acción eliminará "${file.file_name}" permanentemente.`,
      'Sí, eliminar'
    );

    if (!isConfirmed) {
      return;
    }

    try {
      const { error: dbError } = await client.from("files").delete().eq("id", file.id);
      if (dbError) throw dbError;

      const { error: storageError } = await client.storage.from("rambodrive").remove([file.storage_path]);
      if (storageError) throw storageError;

      showSuccessAlert('Eliminado', `El archivo "${file.file_name}" ha sido eliminado.`);

    } catch (error) {
      console.error("Error al eliminar el archivo:", error);
      showErrorAlert('Error', 'No se pudo eliminar el archivo. Por favor, inténtalo de nuevo.');
    }
  };

  const handleDownload = async (storagePath: string) => {
    setMenuOpen(null);
    try {
      const { data, error } = await client.storage.from("rambodrive").createSignedUrl(storagePath, 60); // 60 segundos de validez
      if (error) throw error;

      window.open(data.signedUrl, "_blank");
    } catch (error) {
      console.error("Error al generar enlace de descarga:", error);
      // 4. Reemplazamos el alert() por nuestra alerta de error
      showErrorAlert("Error de Descarga", "No se pudo generar el enlace. Inténtalo de nuevo.");
    }
  };

  const getFileType = (fileName: string): FileType => {
    const ext = fileName.split(".").pop()?.toLowerCase();
    if (ext === "doc" || ext === "docx" || ext === "odt") return "doc";
    if (ext === "xls" || ext === "xlsx" || ext === "ods") return "excel";
    if (ext === "pdf") return "pdf";
    if (ext === "ppt" || ext === "pptx" || ext === "odp") return "ppt";
    return "generic";
  };

  const getFileIconProps = (type: FileType) => {
    switch (type) {
      case 'doc': return { iconPath: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", bgColor: "bg-blue-100", textColor: "text-blue-600" };
      case 'excel': return { iconPath: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", bgColor: "bg-green-100", textColor: "text-green-600" };
      case 'pdf': return { iconPath: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z", bgColor: "bg-red-100", textColor: "text-red-600" };
      case 'ppt': return { iconPath: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", bgColor: "bg-yellow-100", textColor: "text-yellow-600" };
      default: return { iconPath: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z", bgColor: "bg-gray-100", textColor: "text-gray-600" };
    }
  };

  return (
    <div>
      <h2 className="text-xl font-medium text-white mb-4">Todos los archivos</h2>
      {loading ? (
        <p className="text-center py-8 text-gray-400">Cargando archivos...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
          {allFiles.length > 0 ? allFiles.map((file) => {
            const fileType = getFileType(file.file_name);
            const { iconPath, bgColor, textColor } = getFileIconProps(fileType);

            return (
              <div key={file.id} className="bg-gray-800 rounded-lg shadow-lg hover:shadow-blue-500/20 transition-shadow duration-300 group">
                <div className={`h-32 flex items-center justify-center ${bgColor} rounded-t-lg`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-16 w-16 ${textColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={iconPath}></path>
                  </svg>
                </div>
                <div className="p-3 relative">
                  <h3 className="font-medium text-white text-sm whitespace-nowrap overflow-hidden text-ellipsis" title={file.file_name}>
                    {file.file_name}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {new Date(file.created_at).toLocaleDateString()}
                  </p>

                  <div className="absolute top-2 right-2">
                    <button onClick={() => setMenuOpen(menuOpen === file.id ? null : file.id)} className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
                    </button>
                    {menuOpen === file.id && (
                      <div ref={menuRef} className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                        <button onClick={() => handleDownload(file.storage_path)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Descargar</button>
                        <button onClick={() => handleDelete(file)} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Eliminar</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          }) : (
            <p className="col-span-full text-center py-8 text-gray-500">No tienes archivos. ¡Sube el primero!</p>
          )}
        </div>
      )}
    </div>
  );
}
