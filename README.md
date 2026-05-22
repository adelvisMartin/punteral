# Calculadora IGTF e IVA - Grupo Punteral

Aplicación web profesional para cálculo de IGTF (3%), IVA (16%), retención de IVA para contribuyentes especiales, tasa BCV y generación de PDF.

## Características

- Cálculo instantáneo en JavaScript modular.
- Modo claro/oscuro con persistencia.
- Tasa del BCV con APIs públicas y fallback manual.
- Persistencia del formulario en `localStorage`.
- Soporte para retención de IVA del 75% o 100% sobre el IVA causado.
- Resumen en pantalla con monto en divisa, sin incluirlo en el PDF.
- PDF optimizado con logo comprimido.
- Diseño responsive orientado a móvil.

## Tecnologías

- HTML estático
- Tailwind CSS por CDN
- jsPDF
- JavaScript ES Modules
- localStorage API
- Fetch API

## Estructura

```text
/
├── index.html
├── main.js
├── calculator.js
├── validator.js
├── storage.js
├── order.js
├── pdf.js
├── logo.png
├── LICENSE
├── README.md
└── agents.md
```
