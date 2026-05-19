export class AgenteValidador {
  constructor(form) {
    this.form = form;
  }

  validarTodo() {
    let ok = true;
    this.form.querySelectorAll("[required]").forEach((f) => {
      if (!f.value.trim()) {
        f.classList.add("ring-2", "ring-red-500");
        ok = false;
      } else {
        f.classList.remove("ring-2", "ring-red-500");
      }
    });
    return ok;
  }
}
