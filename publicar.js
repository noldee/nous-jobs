// Variables
const formulario = document.querySelector("#formulario");
const limpiarFormulario = document.querySelector("#limpiar-formulario");

let puestosdeTrabajo = JSON.parse(localStorage.getItem("trabajos")) || [];

eventListeners();
function eventListeners() {
  formulario.addEventListener("submit", agregarPuestos);
  limpiarFormulario.addEventListener("click", resetFormulario);
}

function agregarPuestos(e) {
  e.preventDefault();

  const tituloInput = document.querySelector("#puesto").value;
  const empresaInput = document.querySelector("#empresa").value;
  const salarioInput = document.querySelector("#salario").value;
  const ubicacionInput = document.querySelector("#ubicacion").value;
  const selectModalidad = document.querySelector("#modalidad").value;
  const selectEmpleo = document.querySelector("#empleo").value;
  const descripcion = document.querySelector("#descripcion").value;

  if (
    tituloInput === "" ||
    empresaInput === "" ||
    salarioInput === "" ||
    ubicacionInput === "" ||
    selectModalidad === "" ||
    selectEmpleo === "" ||
    descripcion === ""
  ) {
    mostrarAlerta("Complete los campos...", "error");
    return;
  }
  mostrarAlerta("Se publico el empleo correctamente", "success");

  const puestosOBJ = {
    id: Date.now(),
    tituloInput: tituloInput,
    empresaInput: empresaInput,
    salarioInput: salarioInput,
    ubicacionInput: ubicacionInput,
    selectModalidad: selectModalidad,
    selectEmpleo: selectEmpleo,
    descripcion: descripcion,
  };

  puestosdeTrabajo = [...puestosdeTrabajo, puestosOBJ];

  localStorage.setItem("trabajos", JSON.stringify(puestosdeTrabajo));

  resetFormulario();
}

function mostrarAlerta(mensaje, tipo) {
  const alertaAnterior = document.querySelector(".toast-alert");
  if (alertaAnterior) alertaAnterior.remove();

  const toast = document.createElement("div");
  toast.classList.add("toast-alert", "mt-5");

  const esError = tipo === "error";

  toast.innerHTML = `
    <div class="${
      esError
        ? "bg-red-50 border-s-4 border-red-500"
        : "bg-teal-50 border-t-2 border-teal-500"
    } p-4 rounded-lg">
      <div class="flex items-start gap-3">
        <span class="inline-flex justify-center items-center size-8 rounded-full 
          ${esError ? "bg-red-200 text-red-800" : "bg-teal-200 text-teal-800"}">
          ${
            esError
              ? `
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>

            `
              : `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
</svg>
 `
          }
        </span>

        <div>
          <h3 class="font-semibold text-gray-800">
            ${esError ? "Error" : "Éxito"}
          </h3>
          <p class="text-sm text-gray-700">${mensaje}</p>
        </div>
      </div>
    </div>
  `;

  const card = document.querySelector("#card");

  formulario.insertBefore(toast, card);

  setTimeout(() => toast.remove(), 3000);
}

function resetFormulario() {
  formulario.reset();
}
