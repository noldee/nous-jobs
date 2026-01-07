const contenedorPuestos = document.querySelector("#contenedor-puestos");
const inputPuesto = document.querySelector("#puesto-clave");
const inputCiudad = document.querySelector("#ciudad-remoto");
const selectModalidad = document.querySelector("#modalidad-search");
const btnBuscar = document.querySelector("button");
btnBuscar.addEventListener("click", filtrarTrabajos);

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
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
</svg>
<span>${puesto.ubicacionInput}</span>
                </span>

                <!-- Modalidad -->
                <span class="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
</svg>
<span>${puesto.selectModalidad}</span>
                </span>

                <!-- Fecha -->
                <span class="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
<span>${moment().format("MMM Do YY")}</span>
                </span>

            </div>

            <!-- FOOTER -->
            <div class="flex justify-between items-center mt-6">

                <!-- Salario -->
                <span class="font-semibold text-green-600/90 text-lg poppins-black ">
                    ${puesto.salarioInput} USD
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

function filtrarTrabajos() {
  const trabajos = JSON.parse(localStorage.getItem("trabajos")) || [];

  const puestoValor = inputPuesto.value.toLowerCase();
  const ciudadValor = inputCiudad.value.toLowerCase();
  const modalidadValor = selectModalidad.value.toLowerCase();

  // Filtrar según los valores ingresados
  const trabajosFiltrados = trabajos.filter((trabajo) => {
    const titulo = trabajo.tituloInput.toLowerCase();
    const ciudad = trabajo.ubicacionInput.toLowerCase();
    const modalidad = trabajo.selectModalidad.toLowerCase();

    const coincidePuesto = puestoValor ? titulo.includes(puestoValor) : true;
    const coincideCiudad = ciudadValor ? ciudad.includes(ciudadValor) : true;
    const coincideModalidad =
      modalidadValor && modalidadValor !== "modalidad"
        ? modalidad === modalidadValor
        : true;

    return coincidePuesto && coincideCiudad && coincideModalidad;
  });

  crearHTML(trabajosFiltrados);
}

function eliminarHTML() {
  while (contenedorPuestos.firstChild) {
    contenedorPuestos.removeChild(contenedorPuestos.firstChild);
  }
}
