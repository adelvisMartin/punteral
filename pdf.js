<<<<<<< HEAD
export class AgentePDF {
  static async exportar(formData, calculo) {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF("p", "mm", "a4", true);
    const logo = await this.cargarLogoComprimido("logo.png");

    pdf.setFillColor(15, 58, 104);
    pdf.rect(0, 0, 210, 55, "F");

    if (logo) {
      pdf.addImage(logo, "JPEG", 15, 10, 35, 35, undefined, "FAST");
    } else {
      pdf.setFontSize(40);
      pdf.setTextColor(255, 215, 0);
      pdf.text("GP", 22, 38);
    }

    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(22);
    pdf.text("GRUPO PUNTERAL", 65, 28);
    pdf.setFontSize(10);
    pdf.text("Herramientas y suministros para la rectificación de motores", 65, 38);

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
    pdf.text(`Vendedor: ${formData.vendedor || "-"}`, 20, y);
    y += 8;
    pdf.text(
      `Contribuyente especial: ${formData.contribuyenteEspecial ? `Sí, retención IVA ${formData.retencionIva}%` : "No"}`,
      20,
      y,
    );
    y += 12;

    pdf.setFillColor(245, 245, 245);
    pdf.roundedRect(20, y - 8, 170, 12, 2, 2, "F");
    pdf.setFontSize(14);
    pdf.text("DESGLOSE DE CÁLCULO", 25, y);
    y += 18;

    pdf.setFontSize(12);
    pdf.text("Base Imponible", 25, y);
    pdf.text(this.formatoBs(calculo.baseImponible), 165, y, { align: "right" });
    y += 10;
    pdf.text("IGTF (3%)", 25, y);
    pdf.text(this.formatoBs(calculo.igtf), 165, y, { align: "right" });
    y += 10;
    pdf.text("IVA (16%)", 25, y);
    pdf.text(this.formatoBs(calculo.iva), 165, y, { align: "right" });
    y += 10;

    if (formData.contribuyenteEspecial && calculo.retencionIva > 0) {
      pdf.text(`Retención IVA (${formData.retencionIva}%)`, 25, y);
      pdf.text(`- ${this.formatoBs(calculo.retencionIva)}`, 165, y, { align: "right" });
      y += 10;
    }

    pdf.setLineWidth(0.5);
    pdf.line(20, y, 190, y);
    y += 14;

    pdf.setFontSize(16);
    pdf.setFont(undefined, "bold");
    pdf.text("TOTAL A PAGAR", 25, y);
    pdf.setTextColor(215, 141, 37);
    pdf.text(this.formatoBs(calculo.total), 165, y, { align: "right" });

    pdf.setFont(undefined, "normal");
    pdf.setTextColor(100, 100, 100);
    pdf.setFontSize(8);
    pdf.text("Grupo Punteral - Todos los derechos reservados", 105, 280, {
      align: "center",
    });

    pdf.save(`factura_IGTF_${formData.orden}.pdf`);
  }

  static formatoBs(valor) {
    return `Bs ${Number(valor).toLocaleString("es-VE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

  static async cargarLogoComprimido(url) {
    const img = new Image();
    img.src = url;
    await new Promise((resolve) => {
      img.onload = resolve;
      img.onerror = resolve;
    });

    if (!img.complete || img.naturalHeight === 0) return null;

    const canvas = document.createElement("canvas");
    const maxSize = 320;
    const scale = Math.min(maxSize / img.naturalWidth, maxSize / img.naturalHeight, 1);
    canvas.width = Math.max(1, Math.round(img.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(img.naturalHeight * scale));

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    return canvas.toDataURL("image/jpeg", 0.72);
  }
}
=======
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
>>>>>>> f2192c34675b604efcec2ed7531704f823268a5e
