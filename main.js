const grid = new Muuri(".grid", {
  layout: {
    rounding: false,
  },
});

window.addEventListener("load", () => {
  grid.refreshItems().layout();
  document.getElementById("grid").classList.add("loaded-images");

  //Agregamos los listener de los enlaces para filtrar por categorias
  const links = document.querySelectorAll("#categories a"); //esto selecciona todos los enlaces que están dentro del id categories
  links.forEach((element) => {
    element.addEventListener("click", (event) => {
      event.preventDefault();
      links.forEach((link) => link.classList.remove("active"));
      event.target.classList.add("active");

      const category = event.target.innerHTML.toLowerCase();
      category === "all"
        ? grid.filter("[data-category]")
        : grid.filter(`[data-category="${category}"]`);
    });
  });

  //Agregamos los listener de los enlaces para filtrar por barra de búsqueda
  document.querySelector("#search-bar").addEventListener("input", (event) => {
    const search = event.target.value;
    grid.filter((item) => item.getElement().dataset.label.includes(search));
  });

  //Agregamos listener para  las imágenes

  const overlay = document.getElementById("overlay");
  document.querySelectorAll(".grid .item img").forEach((element) => {
    element.addEventListener("click", () => {
      const route = element.getAttribute("src");
      const description = element.parentNode.parentNode.dataset.description;

      overlay.classList.add("active");
      document.querySelector("#overlay img").src = route;
      document.querySelector("#overlay .description").innerHTML = description;
    });
  });

  //EventListener del boton de cerrar

  document.querySelector("#btn-close-popup").addEventListener("click", () => {
    overlay.classList.remove("active");
  });

  //EventListener del overlay

  overlay.addEventListener("click", (event) => {
    event.target.id === "overlay" ? overlay.classList.remove("active") : "";
  });
});

//A
