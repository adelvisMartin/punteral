<<<<<<< HEAD
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
=======
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
>>>>>>> f2192c34675b604efcec2ed7531704f823268a5e
