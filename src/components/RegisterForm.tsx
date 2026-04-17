import { useState } from "react";

export default function RegisterForm() {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    comentario: "",
  });

  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState("");

  const validate = () => {
    const newErrors: { [k: string]: string } = {};

    if (!form.nombre.trim()) newErrors.nombre = "Nombre requerido";
    if (!form.correo.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.correo = "Correo inválido";
    if (!form.comentario.trim()) newErrors.comentario = "Comentario requerido";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setSuccess(false);
    setApiError("");

    try {
      const res = await fetch("https://api.netzahualcoyotl.site/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.nombre,
          email: form.correo,
          message: form.comentario,
        }),
      });

      if (!res.ok) {
        throw new Error("Error en el servidor. Intente más tarde.");
      }

      setSuccess(true);
      setForm({ nombre: "", correo: "", comentario: "" });

      // Opcional: Quitar el mensaje de éxito después de 5 segundos
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error(err);
      setApiError(
        "Hubo un problema al enviar su solicitud. Por favor, reintente.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div
      id="comentario"
      className="bg-gray-50 text-gray-900 flex flex-col md:flex-row items-center justify-center gap-16 min-h-screen"
    >
      {/* Sección de Texto Formal */}
      <div className="">
        <h1 className="text-4xl font-bold mb-4 text-red-700">
          Atención al Alumnado
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed mb-6">
          Bienvenido al portal de comunicación de la institución. Si tiene
          alguna{" "}
          <span className="font-semibold text-gray-800">
            duda académica o consulta administrativa
          </span>{" "}
          por favor complete el formulario adjunto.
        </p>
        <div className="border-l-4 border-red-600 pl-4 py-2 text-sm text-gray-500 italic">
          "Comprometidos con la excelencia educativa y el desarrollo integral de
          nuestros estudiantes."
        </div>
      </div>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl border border-gray-200"
      >
        <h2 className="text-2xl font-bold mb-6 tracking-tight text-center text-gray-800 border-b pb-4">
          Formulario de Registro
        </h2>

        {/* Mensajes de Estado Post-Envío */}
        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm font-medium border border-green-200">
            ✓ Solicitud enviada correctamente. Nos pondremos en contacto pronto.
          </div>
        )}
        {apiError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm font-medium border border-red-200">
            {apiError}
          </div>
        )}

        {/* Nombre */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">
            Nombre Completo
          </label>
          <input
            name="nombre"
            placeholder="Ej. Juan Pérez"
            value={form.nombre}
            onChange={handleChange}
            disabled={loading}
            className="w-full mt-1 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all disabled:opacity-50"
          />
          {errors.nombre && (
            <p className="text-red-600 text-xs mt-1 font-medium">
              {errors.nombre}
            </p>
          )}
        </div>

        {/* Correo */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">
            Correo Institucional
          </label>
          <input
            name="correo"
            type="email"
            placeholder="usuario@escuela.edu"
            value={form.correo}
            onChange={handleChange}
            disabled={loading}
            className="w-full mt-1 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all disabled:opacity-50"
          />
          {errors.correo && (
            <p className="text-red-600 text-xs mt-1 font-medium">
              {errors.correo}
            </p>
          )}
        </div>

        {/* Comentario */}
        <div className="mb-6">
          <label className="text-sm font-medium text-gray-700">
            Asunto o Comentarios
          </label>
          <textarea
            name="comentario"
            value={form.comentario}
            onChange={handleChange}
            rows={4}
            disabled={loading}
            placeholder="Describa su solicitud..."
            className="w-full mt-1 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none transition-all disabled:opacity-50"
          />
          {errors.comentario && (
            <p className="text-red-600 text-xs mt-1 font-medium">
              {errors.comentario}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-700 hover:bg-red-800 text-white transition-all py-3 rounded-lg font-semibold shadow-md active:transform active:scale-[0.98] disabled:bg-gray-400 flex justify-center items-center"
        >
          {loading ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Enviando...
            </span>
          ) : (
            "Enviar Solicitud"
          )}
        </button>
      </form>
    </div>
  );
}
