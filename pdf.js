export class AgentePDF {
  static async exportar(formData, calculo) {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF("p", "mm", "a4");

    const logoUrl = "logo.png";
    const img = new Image();
    img.src = logoUrl;
    await new Promise((resolve) => {
      img.onload = resolve;
      img.onerror = resolve;
    });

    pdf.setFillColor(15, 58, 104);
    pdf.rect(0, 0, 210, 55, "F");

    if (img.complete && img.naturalHeight > 0) {
      pdf.addImage(img, "PNG", 15, 10, 35, 35);
    } else {
      pdf.setFontSize(40);
      pdf.setTextColor(255, 215, 0);
      pdf.text("GP", 22, 38);
    }

    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(22);
    pdf.text("GRUPO PUNTERAL", 65, 28);
    pdf.setFontSize(10);
    pdf.text(
      "Herramientas y suministros para la rectificación de motores",
      65,
      38,
    );

    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(16);
    pdf.text("Cálculo IGTF + IVA", 20, 75);

    let y = 90;
    pdf.setFontSize(11);
    pdf.text(`Orden: ${formData.orden}`, 20, y);
    y += 8;
    pdf.text(`Cliente: ${formData.nombre}`, 20, y);
    y += 8;
    pdf.text(`RIF: ${formData.rif}`, 20, y);
    y += 8;
    pdf.text(`Fecha: ${formData.fecha}`, 20, y);
    y += 8;
    pdf.text(`Vendedor: ${formData.vendedor || "—"}`, 20, y);
    y += 12;

    pdf.setFillColor(245, 245, 245);
    pdf.rect(20, y - 8, 170, 12, "F");
    pdf.setFontSize(14);
    pdf.text("DESGLOSE DE CÁLCULO", 25, y);
    y += 18;

    pdf.setFontSize(12);
    pdf.text("Base Imponible", 25, y);
    pdf.text(`Bs ${calculo.baseImponible.toFixed(2)}`, 145, y, {
      align: "right",
    });
    y += 10;
    pdf.text("IGTF (3%)", 25, y);
    pdf.text(`Bs ${calculo.igtf.toFixed(2)}`, 145, y, { align: "right" });
    y += 10;
    pdf.text("IVA (16%)", 25, y);
    pdf.text(`Bs ${calculo.iva.toFixed(2)}`, 145, y, { align: "right" });
    y += 14;

    pdf.setLineWidth(0.5);
    pdf.line(20, y, 190, y);
    y += 14;

    pdf.setFontSize(16);
    pdf.setFont(undefined, "bold");
    pdf.text("TOTAL A PAGAR", 25, y);
    pdf.setTextColor(215, 141, 37);
    pdf.text(`Bs ${calculo.total.toFixed(2)}`, 145, y, { align: "right" });

    pdf.setFont(undefined, "normal");
    pdf.setTextColor(100, 100, 100);
    pdf.setFontSize(8);
    pdf.text("Grupo Punteral - Todos los derechos reservados", 105, 280, {
      align: "center",
    });

    pdf.save(`PUNTERAL_${formData.orden}.pdf`);
  }
}
