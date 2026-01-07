const contenedorPuestos = document.querySelector("#contenedor-puestos");

document.addEventListener("DOMContentLoaded", () => {
  const data = localStorage.getItem("trabajos");
  if (data) {
    const puestos = JSON.parse(data);
    crearHTML(puestos);
  }
});

export function crearHTML(puestos) {
  console.count("crearHTML ejecutado");

  eliminarHTML();
  puestos.forEach((puesto) => {
    const empleoCaja = document.createElement("article");
    empleoCaja.classList.add(
      "bg-white",
      "rounded-2xl",
      "shadow-sm",
      "hover:shadow-md",
      "transition",
      "p-6"
    );
    empleoCaja.innerHTML = `

            <!-- HEADER -->
            <div class="flex justify-between items-start">
                <div>
                    <h3 class="text-xl font-semibold text-slate-800">
                        ${puesto.tituloInput}
                    </h3>
                    <p class="text-sm text-slate-500 mt-1">
                       ${puesto.empresaInput}
                    </p>
                </div>

                <!-- Tipo de empleo -->
                <span class="text-xs font-medium bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full">
                    ${puesto.selectEmpleo}
                </span>
            </div>

            <!-- DESCRIPCIÓN -->
            <p class="text-slate-600 mt-4 leading-relaxed">
                ${puesto.descripcion}
            </p>

            <!-- INFO EXTRA -->
            <div class="flex flex-wrap items-center gap-4 text-sm text-slate-500 mt-5">

                <!-- Ubicación -->
                <span class="flex items-center gap-1">
                    📍 <span>${puesto.ubicacionInput}</span>
                </span>

                <!-- Modalidad -->
                <span class="flex items-center gap-1">
                    🏠 <span>${puesto.selectModalidad}</span>
                </span>

                <!-- Fecha -->
                <span class="flex items-center gap-1">
                    🕒 <span>${new Date().getDay()}</span>
                </span>

            </div>

            <!-- FOOTER -->
            <div class="flex justify-between items-center mt-6">

                <!-- Salario -->
                <span class="font-semibold text-emerald-600 text-lg">
                    $${puesto.salarioInput} USD
                </span>

                <!-- Acciones -->
                <div class="flex gap-3">
                    <button class="text-indigo-600 font-medium hover:underline">
                        Ver detalles
                    </button>
                    <button class="text-slate-400 hover:text-red-500 transition">
                        Eliminar
                    </button>
                </div>

            </div>
        `;
    contenedorPuestos.appendChild(empleoCaja);
  });
}

function eliminarHTML() {
  while (contenedorPuestos.firstChild) {
    contenedorPuestos.removeChild(contenedorPuestos.firstChild);
  }
}
