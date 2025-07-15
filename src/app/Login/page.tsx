// app/page.tsx
"use client"; // This directive is correct for using client-side features like useState

import React, { useState } from "react";
import { client } from "../supabase-client";

export default function Login() {
  // Estado para controlar qué formulario está activo: 'login' o 'register'
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [Name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const { data, error } = await client.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: Name,
          last_name: lastName,
        },
      },
    });

    if (error) {
      alert(`Error al registrar: ${error.message}`);
    } else {
      alert("¡Registro exitoso! Verifica tu correo electrónico.");
      console.log("Usuario registrado:", data);

      // Inserción adicional de perfil (opcional si se usa options.data arriba)
      if (data.user) {
        await client.from("profiles").insert({
          id: data.user.id,
          name: Name,
          last_name: lastName,
        });
      }
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await client.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(`Error al iniciar sesión: ${error.message}`);
    } else {
      alert("¡Inicio de sesión exitoso!");
      console.log("Sesión iniciada:", data);
      window.location.href = "/Dashboard"; // Redirigir al dashboard después del inicio de sesión exitoso
    }
  };

  return (
    <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full">
        <div className="flex flex-col lg:flex-row form-container bg-white rounded-xl overflow-hidden shadow-xl">
          {/* Lado Izquierdo - Imagen/Información con gradiente */}
          <div className="lg:w-1/2 gradient-bg text-white p-8 lg:p-12 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Bienvenido a RamboDrive
              </h2>
              <p className="text-lg mb-8">
                Tu plataforma segura para almacenar, compartir y acceder a tus
                archivos desde cualquier lugar.
              </p>

              <div className="space-y-6">

                {/* Velocidad ultrarrápida */}
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      ></path>
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-xl">
                      Velocidad ultrarrápida
                    </h3>
                    <p className="text-sm opacity-90">
                      Accede a tus archivos al instante desde cualquier
                      dispositivo
                    </p>
                  </div>
                </div>

                {/* Acceso 24/7 */}
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-xl">Acceso 24/7</h3>
                    <p className="text-sm opacity-90">
                      Disponibilidad garantizada en todo momento
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lado Derecho - Formularios de Autenticación */}
          <div className="lg:w-1/2 p-8 lg:p-12">
            {/* Pestañas de Autenticación */}
            <div className="flex rounded-lg bg-gray-100 p-1 mb-8 shadow-sm">
              <button
                onClick={() => setActiveTab("login")}
                className={`flex-1 py-2 px-4 text-center font-semibold rounded-lg transition-all duration-300 ${activeTab === "login"
                  ? "bg-white text-blue-600 shadow"
                  : "text-gray-700 hover:bg-gray-200"
                  }`}
              >
                Iniciar sesión
              </button>
              <button
                onClick={() => setActiveTab("register")}
                className={`flex-1 py-2 px-4 text-center font-semibold rounded-lg transition-all duration-300 ${activeTab === "register"
                  ? "bg-white text-blue-600 shadow"
                  : "text-gray-700 hover:bg-gray-200"
                  }`}
              >
                Registrarse
              </button>
            </div>

            {/* Contenido del formulario activo */}
            {activeTab === "login" ? (
              // Formulario de Inicio de Sesión
              <form
                id="loginForm"
                onSubmit={handleLogin}
                className="auth-form animate-fade-in"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Inicia sesión en tu cuenta
                </h3>

                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="tu@email.com"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Contraseña
                    </label>
                    <input
                    
                      type="password"
                      id="password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="••••••••"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                  >
                    Iniciar sesión
                  </button>
                </div>
              </form>
            ) : (
              // Formulario de Registro
              <form
                id="registerForm"
                onSubmit={handleRegister}
                className="auth-form animate-fade-in"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Crea una cuenta nueva
                </h3>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Nombre
                      </label>
                      <input
                        type="text"
                        id="first-name"
                        value={Name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                        placeholder="Juan"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Apellido
                      </label>
                      <input
                        type="text"
                        id="last-name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                        placeholder="Pérez"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="register-email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      id="register-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      placeholder="tu@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="register-password"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Contraseña
                    </label>
                    <input
                      type="password"
                      id="register-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      placeholder="Mínimo 8 caracteres"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="confirm-password"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Confirmar contraseña
                    </label>
                    <input
                      type="password"
                      id="confirm-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      placeholder="Confirma tu contraseña"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-lg"
                  >
                    Crear cuenta
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
