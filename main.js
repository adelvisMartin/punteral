import { AgenteOrden } from "./order.js";
import { AgenteCalculador } from "./calculator.js";
import { AgenteValidador } from "./validator.js";
import { AgenteAlmacenamiento } from "./storage.js";
import { AgentePDF } from "./pdf.js";

class App {
  constructor() {
    this.app = document.getElementById("app");
    this.ultimoCalculo = null;
  }

  init() {
    this.render();
    this.form = document.getElementById("formIgtf");
    this.validador = new AgenteValidador(this.form);
    this.setupListeners();
    this.form.orden.value = AgenteOrden.generar();
    this.cargarDatosGuardados();
    this.form.fecha.value = new Date().toISOString().split("T")[0];
    this.cargarTasaBCV();
  }

  render() {
    this.app.innerHTML = `
      <header class="bg-[#0f3a68] text-white py-6 shadow-xl flex-shrink-0">
        <div class="max-w-7xl mx-auto px-6 header-container">
          <div class="flex items-center gap-4">
            <img src="logo.png" alt="Grupo Punteral" class="h-16 w-auto">
            <div>
              <h1 class="text-4xl font-bold">GRUPO PUNTERAL</h1>
              <p class="text-blue-200">Herramientas y suministros para la rectificación de motores</p>
            </div>
          </div>
          <button id="btnTema" class="btn-tema p-4 rounded-2xl hover:bg-white/20 transition-colors">
            <i class="fas fa-moon text-2xl"></i>
          </button>
        </div>
      </header>

      <div class="max-w-7xl mx-auto px-6 py-10 flex-grow">
        <div class="grid lg:grid-cols-12 gap-8">
          <div class="lg:col-span-7">
            <div class="glass rounded-3xl shadow-2xl p-8 lg:p-10">
              <h2 class="text-3xl font-bold text-[#0f3a68] dark:text-blue-400 mb-8">Sistema para cálculo de IGTF - IVA</h2>
              <form id="formIgtf" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="md:col-span-2">
                  <label class="block text-sm font-semibold mb-2 text-gray-dark">Nombre / Razón Social *</label>
                  <input name="nombre" required class="w-full px-5 py-4 rounded-2xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#0f3a68]">
                </div>
                <div>
                  <label class="block text-sm font-semibold mb-2 text-gray-dark">RIF *</label>
                  <input name="rif" placeholder="J-12345678-9" required class="w-full px-5 py-4 rounded-2xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#0f3a68]">
                </div>
                <div>
                  <label class="block text-sm font-semibold mb-2 text-gray-dark">Teléfono *</label>
                  <input name="telefono" placeholder="0412-1234567" required class="w-full px-5 py-4 rounded-2xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#0f3a68]">
                </div>
                <div>
                  <label class="block text-sm font-semibold mb-2 text-gray-dark">Fecha *</label>
                  <input type="date" name="fecha" required class="w-full px-5 py-4 rounded-2xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#0f3a68]">
                </div>
                <div class="md:col-span-2">
                  <label class="block text-sm font-semibold mb-2 text-gray-dark">Dirección Fiscal *</label>
                  <input name="direccion" required class="w-full px-5 py-4 rounded-2xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#0f3a68]">
                </div>
                <div>
                  <label class="block text-sm font-semibold mb-2 text-gray-dark">Tasa BCV (Bs/USD) *</label>
                  <div class="flex gap-2">
                    <input type="number" step="0.01" name="tasa" id="tasaInput" required class="flex-1 px-5 py-4 rounded-2xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#0f3a68]">
                    <button type="button" id="btnActualizarTasa" class="px-6 bg-[#0f3a68] hover:bg-[#1f5f96] text-white rounded-2xl text-sm font-medium whitespace-nowrap">BCV</button>
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-semibold mb-2 text-gray-dark">Monto en Dólares ($) *</label>
                  <input type="number" step="0.01" name="montoDivisa" id="montoDivisa" placeholder="0.00" required class="w-full px-5 py-4 rounded-2xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#0f3a68]">
                </div>
                <div>
                  <label class="block text-sm font-semibold mb-2 text-gray-dark">Vendedor</label>
                  <input name="vendedor" class="w-full px-5 py-4 rounded-2xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#0f3a68]">
                </div>
                <div>
                  <label class="block text-sm font-semibold mb-2 text-gray-dark">N° Orden</label>
                  <input name="orden" id="orden" readonly class="badge-orden w-full px-5 py-4 rounded-2xl">
                </div>
                <div class="md:col-span-2">
                  <label class="block text-sm font-semibold mb-2 text-gray-dark">Comentario / Observación</label>
                  <textarea name="comentario" class="w-full px-5 py-4 rounded-3xl border border-gray-300 dark:border-gray-600 h-28"></textarea>
                </div>
              </form>

              <div class="flex gap-4 mt-10">
                <button id="btnPDF" class="flex-1 py-4 rounded-2xl bg-[#0f3a68] hover:bg-[#1f5f96] text-white font-semibold transition-all">Exportar PDF</button>
                <button id="btnLimpiar" class="flex-1 py-4 rounded-2xl bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white font-semibold transition-all">Limpiar</button>
              </div>
            </div>
          </div>

          <div class="lg:col-span-5">
            <div class="glass rounded-3xl shadow-2xl p-8 h-full lg:min-h-[620px]">
              <h2 class="text-2xl font-bold text-[#0f3a68] dark:text-blue-400 mb-8">Resumen en Tiempo Real</h2>
              <div class="space-y-6 text-lg" id="resumen">
                <div class="flex justify-between"><span class="text-gray-dark">Base Imponible</span><strong id="baseImponible" class="text-gray-dark">Bs 0,00</strong></div>
                <div class="flex justify-between"><span class="text-gray-dark">IGTF (3%)</span><strong id="igtf" class="text-gray-dark">Bs 0,00</strong></div>
                <div class="flex justify-between"><span class="text-gray-dark">IVA (16%)</span><strong id="iva" class="text-gray-dark">Bs 0,00</strong></div>
                <hr class="dark:border-gray-600">
                <div class="flex justify-between text-3xl font-bold"><span class="text-gray-dark">Total</span><strong id="total" class="text-naranja">Bs 0,00</strong></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer class="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 py-6 mt-12 flex-shrink-0">
        <div class="max-w-7xl mx-auto px-6 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>Desarrollado por <strong>PNF Contaduría Pública | Barquisimeto | Venezuela</strong> - Grupo Punteral © 2026</p>
        </div>
      </footer>
    `;
  }

  setupListeners() {
    this.form.addEventListener("input", () => this.calculoEnVivo());

    document.getElementById("btnTema").addEventListener("click", () => {
      document.documentElement.classList.toggle("dark");
      const icon = document.querySelector("#btnTema i");
      icon.classList.toggle("fa-moon");
      icon.classList.toggle("fa-sun");
      localStorage.setItem(
        "darkMode",
        document.documentElement.classList.contains("dark"),
      );
    });

    const darkModeSaved = localStorage.getItem("darkMode") === "true";
    if (darkModeSaved) {
      document.documentElement.classList.add("dark");
      const icon = document.querySelector("#btnTema i");
      if (icon) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
      }
    }

    document
      .getElementById("btnPDF")
      .addEventListener("click", () => this.exportarPDF());
    document
      .getElementById("btnLimpiar")
      .addEventListener("click", () => this.limpiar());
    document
      .getElementById("btnActualizarTasa")
      .addEventListener("click", () => this.cargarTasaBCV());
  }

  async cargarTasaBCV() {
    const tasaInput = document.getElementById("tasaInput");
    const boton = document.getElementById("btnActualizarTasa");
    const textoOriginal = boton.textContent;

    boton.textContent = "⏳";
    boton.disabled = true;

    const apis = [
      {
        url: "https://pydolarve.org/api/v1/dollar?page=bcv",
        selector: (d) => d?.monitors?.bcv?.price,
      },
      {
        url: "https://api.exchangerate-api.com/v4/latest/USD",
        selector: (d) => d?.rates?.VES,
      },
      {
        url: "https://ve.dolarapi.com/v1/dolares/bcv",
        selector: (d) => d?.precio,
      },
    ];

    let tasaObtenida = 0;

    for (const api of apis) {
      try {
        const res = await fetch(api.url);
        const data = await res.json();
        const tasa = api.selector(data);
        if (tasa && tasa > 0) {
          tasaObtenida = tasa;
          break;
        }
      } catch (e) {
        console.warn(`Error con API: ${api.url}`);
      }
    }

    if (tasaObtenida > 0) {
      tasaInput.value = tasaObtenida.toFixed(2);
      this.calculoEnVivo();
    } else {
      if (!tasaInput.value || tasaInput.value === "0") {
        tasaInput.value = "60.00";
        this.calculoEnVivo();
        console.warn("Usando tasa por defecto");
      }
    }

    boton.textContent = textoOriginal;
    boton.disabled = false;
  }

  calculoEnVivo() {
    const monto = parseFloat(this.form.montoDivisa.value) || 0;
    const tasa = parseFloat(this.form.tasa.value) || 0;
    this.ultimoCalculo = AgenteCalculador.calcular(monto, tasa);
    this.actualizarResumen(this.ultimoCalculo);

    AgenteAlmacenamiento.guardar({
      nombre: this.form.nombre.value,
      rif: this.form.rif.value,
      telefono: this.form.telefono.value,
      direccion: this.form.direccion.value,
      vendedor: this.form.vendedor.value,
      comentario: this.form.comentario.value,
      tasa: this.form.tasa.value,
    });
  }

  actualizarResumen(calc) {
    const format = (val) =>
      `Bs ${val.toLocaleString("es-VE", { minimumFractionDigits: 2 })}`;
    document.getElementById("baseImponible").textContent = format(
      calc.baseImponible,
    );
    document.getElementById("igtf").textContent = format(calc.igtf);
    document.getElementById("iva").textContent = format(calc.iva);
    document.getElementById("total").textContent = format(calc.total);
  }

  async exportarPDF() {
    if (!this.validador.validarTodo())
      return alert("Complete todos los campos obligatorios");
    if (!this.ultimoCalculo || this.ultimoCalculo.total <= 0)
      return alert("Realice un cálculo primero");

    const formData = {
      nombre: this.form.nombre.value,
      rif: this.form.rif.value,
      telefono: this.form.telefono.value,
      fecha: this.form.fecha.value,
      direccion: this.form.direccion.value,
      tasa: this.form.tasa.value,
      montoDivisa: this.form.montoDivisa.value,
      vendedor: this.form.vendedor.value,
      orden: this.form.orden.value,
      comentario: this.form.comentario.value,
    };
    await AgentePDF.exportar(formData, this.ultimoCalculo);
  }

  limpiar() {
    this.form.reset();
    this.form.orden.value = AgenteOrden.generar();
    this.form.fecha.value = new Date().toISOString().split("T")[0];
    this.actualizarResumen({ baseImponible: 0, igtf: 0, iva: 0, total: 0 });
    AgenteAlmacenamiento.limpiar();
    this.cargarTasaBCV();
  }

  cargarDatosGuardados() {
    const data = AgenteAlmacenamiento.cargar();
    if (data) {
      if (data.nombre) this.form.nombre.value = data.nombre;
      if (data.rif) this.form.rif.value = data.rif;
      if (data.telefono) this.form.telefono.value = data.telefono;
      if (data.direccion) this.form.direccion.value = data.direccion;
      if (data.vendedor) this.form.vendedor.value = data.vendedor;
      if (data.comentario) this.form.comentario.value = data.comentario;
      if (data.tasa) this.form.tasa.value = data.tasa;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => new App().init());
