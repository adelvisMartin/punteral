<<<<<<< HEAD
# PROMPT: OPTIMIZACIÓN COMPLETA CALCULADORA IGTF + IVA - GRUPO PUNTERAL

## OBJETIVO

Refactorizar y optimizar una aplicación vanilla JS de cálculo de IGTF (3%) e IVA (16%) para convertirla en una PWA moderna, accesible, segura y con identidad corporativa sólida.

## REQUISITOS ESTRICTOS

### 1. IDENTIDAD VISUAL (CORREGIR CONTRASTES)

- **Color Primario:** Azul corporativo `#0f3a68` (nunca celeste o azul claro).
- **Color Secundario:** Naranja `#d78d25` (totales, acentos).
- **Modo Claro:** Textos principales **siempre negros (#1e293b)** sobre fondos blancos/transparentes. NUNCA texto blanco sobre fondo claro.
- **Modo Oscuro:** Textos grises claros (#e5e7eb) sobre fondos oscuros (#0f172a).
- **Botón "Limpiar":** Debe ser coherente (gris claro en modo claro, gris oscuro en modo oscuro), no inventar colores.
- **Campo "N° Orden":** Debe ser de fondo azul con texto blanco SIEMPRE (estilo badge), no perder su estilo.

### 2. FUNCIONALIDADES MEJORADAS

- **Tasa BCV:** Implementar API real `https://pydolarve.org/api/v1/dollar?page=bcv` (CORS permitido). Fallback a entrada manual.
- **Framework/Librería:** Integrar **Alpine.js CDN** para reactividad sin peso extra, manteniendo vanilla donde sea crítico.
- **Persistencia:** Guardar automáticamente todos los campos del formulario en `localStorage` al escribir.

### 3. SEO Y SEGURIDAD

- Meta tags completos (description, keywords, author, viewport).
- Favicon real (usar emoji o DataURI si no hay logo real).
- Política de seguridad: Agregar `meta http-equiv="Content-Security-Policy"` básica.
- Footer fijo con: "Desarrollado por [Equipo Frontend Elite] - Grupo Punteral © 2026".

### 4. PDF CORREGIDO

- Incluir el `logo.png` en el PDF usando `addImage` desde un canvas o URL base64.
- Mejorar diseño: bordes redondeados, tabla de desglose, datos completos del cliente.
- Que el PDF se llame: `factura_IGTF_{orden}.pdf`

### 5. ARCHIVOS ESPERADOS (SOBREESCRIBIR)

- `index.html` (completo, con Alpine.js y Tailwind)
- `main.js` (optimizado, con lógica de persistencia y tasa BCV real)
- `pdf.js` (con logo incluido)
- `calculator.js` (igual pero validado)
- `validator.js` (mejorado)
- `storage.js` (mejorado)
- `order.js` (igual)
- `README.md` (actualizado)
- `agents.md` (este archivo)

## RESTRICCIONES

- No usar `localStorage` para datos sensibles (no hay, solo comerciales).
- Mantener modo oscuro/claro con `localStorage` para recordar preferencia.
- Código limpio, sin comentarios, funciones puras.
- Usar `async/await` para la tasa.
- El diseño debe ser 100% responsivo (Tailwind).
=======
# PROMPT: OPTIMIZACIÓN COMPLETA CALCULADORA IGTF + IVA - GRUPO PUNTERAL

## OBJETIVO

Refactorizar y optimizar una aplicación vanilla JS de cálculo de IGTF (3%) e IVA (16%) para convertirla en una PWA moderna, accesible, segura y con identidad corporativa sólida.

## REQUISITOS ESTRICTOS

### 1. IDENTIDAD VISUAL (CORREGIR CONTRASTES)

- **Color Primario:** Azul corporativo `#0f3a68` (nunca celeste o azul claro).
- **Color Secundario:** Naranja `#d78d25` (totales, acentos).
- **Modo Claro:** Textos principales **siempre negros (#1e293b)** sobre fondos blancos/transparentes. NUNCA texto blanco sobre fondo claro.
- **Modo Oscuro:** Textos grises claros (#e5e7eb) sobre fondos oscuros (#0f172a).
- **Botón "Limpiar":** Debe ser coherente (gris claro en modo claro, gris oscuro en modo oscuro), no inventar colores.
- **Campo "N° Orden":** Debe ser de fondo azul con texto blanco SIEMPRE (estilo badge), no perder su estilo.

### 2. FUNCIONALIDADES MEJORADAS

- **Tasa BCV:** Implementar API real `https://pydolarve.org/api/v1/dollar?page=bcv` (CORS permitido). Fallback a entrada manual.
- **Framework/Librería:** Integrar **Alpine.js CDN** para reactividad sin peso extra, manteniendo vanilla donde sea crítico.
- **Persistencia:** Guardar automáticamente todos los campos del formulario en `localStorage` al escribir.

### 3. SEO Y SEGURIDAD

- Meta tags completos (description, keywords, author, viewport).
- Favicon real (usar emoji o DataURI si no hay logo real).
- Política de seguridad: Agregar `meta http-equiv="Content-Security-Policy"` básica.
- Footer fijo con: "Desarrollado por [Equipo Frontend Elite] - Grupo Punteral © 2026".

### 4. PDF CORREGIDO

- Incluir el `logo.png` en el PDF usando `addImage` desde un canvas o URL base64.
- Mejorar diseño: bordes redondeados, tabla de desglose, datos completos del cliente.
- Que el PDF se llame: `factura_IGTF_{orden}.pdf`

### 5. ARCHIVOS ESPERADOS (SOBREESCRIBIR)

- `index.html` (completo, con Alpine.js y Tailwind)
- `main.js` (optimizado, con lógica de persistencia y tasa BCV real)
- `pdf.js` (con logo incluido)
- `calculator.js` (igual pero validado)
- `validator.js` (mejorado)
- `storage.js` (mejorado)
- `order.js` (igual)
- `README.md` (actualizado)
- `agents.md` (este archivo)

## RESTRICCIONES

- No usar `localStorage` para datos sensibles (no hay, solo comerciales).
- Mantener modo oscuro/claro con `localStorage` para recordar preferencia.
- Código limpio, sin comentarios, funciones puras.
- Usar `async/await` para la tasa.
- El diseño debe ser 100% responsivo (Tailwind).
>>>>>>> f2192c34675b604efcec2ed7531704f823268a5e
