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
    this.actualizarVisibilidadRetencion();
  }

  render() {
    this.app.innerHTML = `
      <header class="bg-[#0f3a68] text-white py-4 shadow-xl flex-shrink-0">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-3">
          <div class="flex items-center gap-3 min-w-0">
            <img src="logo.png" alt="Grupo Punteral" class="h-12 sm:h-16 w-auto flex-shrink-0">
            <div class="min-w-0">
              <h1 class="text-xl sm:text-4xl font-bold leading-tight">GRUPO PUNTERAL</h1>
              <p class="text-blue-200 text-xs sm:text-base leading-snug">Herramientas y suministros para la rectificación de motores</p>
            </div>
          </div>
          <button id="btnTema" class="p-3 sm:p-4 rounded-2xl hover:bg-white/20 transition-colors flex-shrink-0" aria-label="Cambiar tema">
            <i class="fas fa-moon text-xl sm:text-2xl"></i>
          </button>
        </div>
      </header>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 flex-grow w-full">
        <div class="grid lg:grid-cols-12 gap-6 lg:gap-8">
          <div class="lg:col-span-7">
            <div class="glass rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-8 lg:p-10">
              <h2 class="text-2xl sm:text-3xl font-bold text-[#0f3a68] dark:text-blue-400 mb-6 sm:mb-8">Sistema para cálculo de IGTF - IVA</h2>
              <form id="formIgtf" class="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                <div class="md:col-span-2">
                  <label class="block text-sm font-semibold mb-2 text-gray-dark">Nombre / Razón Social *</label>
                  <input name="nombre" required class="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-2xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#0f3a68]">
                </div>
                <div>
                  <label class="block text-sm font-semibold mb-2 text-gray-dark">RIF *</label>
                  <input name="rif" placeholder="J-12345678-9" required class="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-2xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#0f3a68]">
                </div>
                <div>
                  <label class="block text-sm font-semibold mb-2 text-gray-dark">Teléfono *</label>
                  <input name="telefono" placeholder="0412-1234567" required class="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-2xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#0f3a68]">
                </div>
                <div>
                  <label class="block text-sm font-semibold mb-2 text-gray-dark">Fecha *</label>
                  <input type="date" name="fecha" required class="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-2xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#0f3a68]">
                </div>
                <div class="md:col-span-2">
                  <label class="block text-sm font-semibold mb-2 text-gray-dark">Dirección Fiscal *</label>
                  <input name="direccion" required class="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-2xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#0f3a68]">
                </div>
                <div>
                  <label class="block text-sm font-semibold mb-2 text-gray-dark">Tasa BCV (Bs/USD) *</label>
                  <div class="grid grid-cols-[1fr_auto] gap-2">
                    <input type="number" step="0.01" name="tasa" id="tasaInput" required class="min-w-0 w-full px-4 sm:px-5 py-3 sm:py-4 rounded-2xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#0f3a68]">
                    <button type="button" id="btnActualizarTasa" class="px-4 sm:px-6 bg-[#0f3a68] hover:bg-[#1f5f96] text-white rounded-2xl text-sm font-medium">BCV</button>
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-semibold mb-2 text-gray-dark">Monto en Dólares ($) *</label>
                  <input type="number" step="0.01" name="montoDivisa" id="montoDivisa" placeholder="0.00" required class="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-2xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#0f3a68]">
                </div>
                <div>
                  <label class="block text-sm font-semibold mb-2 text-gray-dark">Vendedor</label>
                  <input name="vendedor" class="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-2xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#0f3a68]">
                </div>
                <div>
                  <label class="block text-sm font-semibold mb-2 text-gray-dark">N° Orden</label>
                  <input name="orden" id="orden" readonly class="badge-orden w-full px-4 sm:px-5 py-3 sm:py-4 rounded-2xl">
                </div>
                <div class="md:col-span-2 rounded-2xl border border-gray-200 dark:border-gray-700 p-4">
                  <label class="flex items-center gap-3 text-sm font-semibold text-gray-dark">
                    <input type="checkbox" name="contribuyenteEspecial" id="contribuyenteEspecial" class="h-5 w-5 accent-[#0f3a68]">
                    Cliente es contribuyente especial / agente de retención de IVA
                  </label>
                  <div id="retencionWrapper" class="mt-4 hidden">
                    <label class="block text-sm font-semibold mb-2 text-gray-dark">Retención de IVA aplicable</label>
                    <select name="retencionIva" id="retencionIva" class="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-2xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#0f3a68]">
                      <option value="75">75% del IVA causado</option>
                      <option value="100">100% del IVA causado</option>
                    </select>
                  </div>
                </div>
                <div class="md:col-span-2">
                  <label class="block text-sm font-semibold mb-2 text-gray-dark">Comentario / Observación</label>
                  <textarea name="comentario" class="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-3xl border border-gray-300 dark:border-gray-600 h-28"></textarea>
                </div>
              </form>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-8 sm:mt-10">
                <button id="btnPDF" class="py-4 rounded-2xl bg-[#0f3a68] hover:bg-[#1f5f96] text-white font-semibold transition-all">Exportar PDF</button>
                <button id="btnLimpiar" class="py-4 rounded-2xl bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white font-semibold transition-all">Limpiar</button>
              </div>
            </div>
          </div>

          <div class="lg:col-span-5">
            <div class="glass rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-8 h-full lg:min-h-[620px]">
              <h2 class="text-2xl font-bold text-[#0f3a68] dark:text-blue-400 mb-8">Resumen en Tiempo Real</h2>
              <div class="space-y-5 sm:space-y-6 text-base sm:text-lg" id="resumen">
                <div class="flex justify-between gap-4"><span class="text-gray-dark">Monto en divisa</span><strong id="montoDivisaResumen" class="text-gray-dark">$ 0,00</strong></div>
                <div class="flex justify-between gap-4"><span class="text-gray-dark">Base Imponible</span><strong id="baseImponible" class="text-gray-dark">Bs 0,00</strong></div>
                <div class="flex justify-between gap-4"><span class="text-gray-dark">IGTF (3%)</span><strong id="igtf" class="text-gray-dark">Bs 0,00</strong></div>
                <div class="flex justify-between gap-4"><span class="text-gray-dark">IVA (16%)</span><strong id="iva" class="text-gray-dark">Bs 0,00</strong></div>
                <div id="retencionResumen" class="hidden flex justify-between gap-4"><span class="text-gray-dark">Retención IVA</span><strong id="retencionIvaResumen" class="text-gray-dark">Bs 0,00</strong></div>
                <hr class="dark:border-gray-600">
                <div class="flex justify-between gap-4 text-2xl sm:text-3xl font-bold"><span class="text-gray-dark">Total a pagar</span><strong id="total" class="text-naranja">Bs 0,00</strong></div>
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
    this.form.contribuyenteEspecial.addEventListener("change", () => {
      this.actualizarVisibilidadRetencion();
      this.calculoEnVivo();
    });
    this.form.retencionIva.addEventListener("change", () => this.calculoEnVivo());

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

    document.getElementById("btnPDF").addEventListener("click", () => this.exportarPDF());
    document.getElementById("btnLimpiar").addEventListener("click", () => this.limpiar());
    document.getElementById("btnActualizarTasa").addEventListener("click", () => this.cargarTasaBCV());
  }

  async cargarTasaBCV() {
    const tasaInput = document.getElementById("tasaInput");
    const boton = document.getElementById("btnActualizarTasa");
    const textoOriginal = boton.textContent;

    boton.textContent = "...";
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
    } else if (!tasaInput.value || tasaInput.value === "0") {
      tasaInput.value = "60.00";
      this.calculoEnVivo();
      console.warn("Usando tasa por defecto");
    }

    boton.textContent = textoOriginal;
    boton.disabled = false;
  }

  calculoEnVivo() {
    const monto = parseFloat(this.form.montoDivisa.value) || 0;
    const tasa = parseFloat(this.form.tasa.value) || 0;
    const retencionIvaPorcentaje = this.form.contribuyenteEspecial.checked
      ? parseFloat(this.form.retencionIva.value) || 75
      : 0;
    this.ultimoCalculo = AgenteCalculador.calcular(monto, tasa, retencionIvaPorcentaje);
    this.actualizarResumen(this.ultimoCalculo, monto, retencionIvaPorcentaje);

    AgenteAlmacenamiento.guardar({
      nombre: this.form.nombre.value,
      rif: this.form.rif.value,
      telefono: this.form.telefono.value,
      direccion: this.form.direccion.value,
      vendedor: this.form.vendedor.value,
      comentario: this.form.comentario.value,
      tasa: this.form.tasa.value,
      contribuyenteEspecial: this.form.contribuyenteEspecial.checked,
      retencionIva: this.form.retencionIva.value,
    });
  }

  actualizarResumen(calc, montoDivisa = 0, retencionIvaPorcentaje = 0) {
    const format = (val) =>
      `Bs ${val.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    const formatUsd = (val) =>
      `$ ${val.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    document.getElementById("montoDivisaResumen").textContent = formatUsd(montoDivisa);
    document.getElementById("baseImponible").textContent = format(calc.baseImponible);
    document.getElementById("igtf").textContent = format(calc.igtf);
    document.getElementById("iva").textContent = format(calc.iva);
    document.getElementById("retencionIvaResumen").textContent = `${format(calc.retencionIva)} (${retencionIvaPorcentaje}%)`;
    document.getElementById("retencionResumen").classList.toggle("hidden", retencionIvaPorcentaje <= 0);
    document.getElementById("total").textContent = format(calc.total);
  }

  actualizarVisibilidadRetencion() {
    document
      .getElementById("retencionWrapper")
      .classList.toggle("hidden", !this.form.contribuyenteEspecial.checked);
  }

  async exportarPDF() {
    if (!this.validador.validarTodo()) return alert("Complete todos los campos obligatorios");
    if (!this.ultimoCalculo || this.ultimoCalculo.total <= 0) return alert("Realice un cálculo primero");

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
      contribuyenteEspecial: this.form.contribuyenteEspecial.checked,
      retencionIva: this.form.contribuyenteEspecial.checked ? this.form.retencionIva.value : "0",
    };
    await AgentePDF.exportar(formData, this.ultimoCalculo);
  }

  limpiar() {
    this.form.reset();
    this.form.orden.value = AgenteOrden.generar();
    this.form.fecha.value = new Date().toISOString().split("T")[0];
    this.actualizarResumen({ baseImponible: 0, igtf: 0, iva: 0, retencionIva: 0, total: 0 });
    this.actualizarVisibilidadRetencion();
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
      this.form.contribuyenteEspecial.checked = Boolean(data.contribuyenteEspecial);
      if (data.retencionIva) this.form.retencionIva.value = data.retencionIva;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => new App().init());
