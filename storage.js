<<<<<<< HEAD
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
=======
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
>>>>>>> f2192c34675b604efcec2ed7531704f823268a5e
