export const AgenteCalculador = {
  calcular(montoDivisa, tasa, retencionIvaPorcentaje = 0) {
    const baseImponible = montoDivisa * tasa;
    const igtf = baseImponible * 0.03;
    const iva = (baseImponible + igtf) * 0.16;
    const retencionIva = iva * (retencionIvaPorcentaje / 100);
    const total = baseImponible + igtf + iva - retencionIva;
    return { baseImponible, igtf, iva, retencionIva, total };
  },
};
