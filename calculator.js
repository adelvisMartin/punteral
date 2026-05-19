export const AgenteCalculador = {
  calcular(montoDivisa, tasa) {
    const baseImponible = montoDivisa * tasa;
    const igtf = baseImponible * 0.03;
    const iva = (baseImponible + igtf) * 0.16;
    const total = baseImponible + igtf + iva;
    return { baseImponible, igtf, iva, total };
  },
};
