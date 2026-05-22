export const AgenteAlmacenamiento = {
  clave: "punteral_igtf",

  guardar(data) {
    localStorage.setItem(this.clave, JSON.stringify(data));
  },

  cargar() {
    const d = localStorage.getItem(this.clave);
    return d ? JSON.parse(d) : null;
  },

  limpiar() {
    localStorage.removeItem(this.clave);
  },
};
