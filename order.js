export const AgenteOrden = {
  generar() {
    const n = new Date();
    return `OP-${n.getFullYear().toString().slice(-2)}${String(n.getMonth() + 1).padStart(2, "0")}${String(n.getDate()).padStart(2, "0")}-${Math.floor(Math.random() * 9000 + 1000)}`;
  },
};
