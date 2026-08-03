const catalogues = [
  {brand:"Spartherm", category:"bois", label:"Poêles à bois", docs:[["Catalogue","catalogues/spartherm.pdf"]]},
  {brand:"Romotop", category:"bois", label:"Poêles à bois", docs:[["Catalogue","catalogues/romotop.pdf"]]},
  {brand:"Lorflam", category:"bois", label:"Poêles à bois", docs:[["Catalogue","catalogues/lorflam-xbox.pdf"]]},
  {brand:"Seguin", category:"bois", label:"Poêles à bois", docs:[["Catalogue","catalogues/seguin.pdf"]]},
  {brand:"Hergom", category:"bois", label:"Poêles à bois", docs:[["Catalogue","catalogues/hergom.pdf"]]},
  {brand:"Fonte Flamme", category:"bois", label:"Poêles à bois", docs:[["Catalogue","catalogues/fonte-flamme.pdf"]]},
  {brand:"Olsberg", category:"bois", label:"Poêles à bois", docs:[["Catalogue","catalogues/olsberg.pdf"]]},
  {brand:"Wiking", category:"bois", label:"Poêles à bois", docs:[["Catalogue","catalogues/wiking.pdf"]]},
  {brand:"Storch", category:"bois", label:"Poêles à bois", docs:[["Catalogue","catalogues/storch.pdf"]]},
  {brand:"La Nordica", category:"bois", label:"Poêles à bois", docs:[["Catalogue","catalogues/la-nordica.pdf"]]},
  {brand:"Lorium", category:"bois", label:"Poêles à bois", docs:[["Catalogue","catalogues/lorium.pdf"]]},

  {brand:"MCZ", category:"pellets", label:"Poêles à pellets", docs:[
    ["Catalogue produits","catalogues/mcz.pdf"],
    ["Tarifs publics","catalogues/mcz-tarifs-2026-2027.pdf","secondary"]
  ]},
  {brand:"JM", subtitle:"Jolly Mec", category:"pellets", label:"Poêles à pellets", docs:[
    ["Catalogue produits","catalogues/jm.pdf"],
    ["Tarifs publics","catalogues/jm-tarifs-2026.pdf","secondary"]
  ]},

  {brand:"Spartherm", category:"foyers", label:"Foyers de cheminée", docs:[["Catalogue","catalogues/spartherm.pdf"]]},
  {brand:"M-Design", subtitle:"Argento", category:"foyers", label:"Foyers de cheminée", docs:[["Catalogue","catalogues/mdesign-argento.pdf"]]},
  {brand:"M-Design", subtitle:"Luna Diamond", category:"foyers", label:"Foyers de cheminée", docs:[["Catalogue","catalogues/mdesign-luna-diamond.pdf"]]},
  {brand:"Lorflam", subtitle:"Foyers & inserts", category:"foyers", label:"Foyers de cheminée", docs:[["Catalogue","catalogues/lorflam-foyers-inserts.pdf"]]},

  {brand:"Spartherm", category:"inserts", label:"Inserts", docs:[["Catalogue","catalogues/spartherm.pdf"]]},
  {brand:"Lorflam", category:"inserts", label:"Inserts", docs:[["Catalogue","catalogues/lorflam-foyers-inserts.pdf"]]},
  {brand:"Seguin", category:"inserts", label:"Inserts", docs:[["Catalogue","catalogues/seguin.pdf"]]},
  {brand:"Hergom", category:"inserts", label:"Inserts", docs:[["Catalogue","catalogues/hergom.pdf"]]},
  {brand:"Fonte Flamme", category:"inserts", label:"Inserts", docs:[["Catalogue","catalogues/fonte-flamme.pdf"]]}
];

const grid = document.getElementById("catalogues");
const search = document.getElementById("search");
const emptyState = document.getElementById("empty-state");
const filterButtons = [...document.querySelectorAll("[data-filter]")];
let currentFilter = "all";

function normalize(value){
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
}

function render(){
  const query = normalize(search.value.trim());
  const visible = catalogues.filter(item => {
    const matchesCategory = currentFilter === "all" || item.category === currentFilter;
    const haystack = normalize(`${item.brand} ${item.subtitle || ""} ${item.label}`);
    return matchesCategory && (!query || haystack.includes(query));
  });

  grid.innerHTML = visible.map(item => `
    <article class="card">
      <p class="card-category">${item.label}</p>
      <h3>${item.brand}</h3>
      ${item.subtitle ? `<p class="card-subtitle">${item.subtitle}</p>` : ""}
      <div class="card-actions">
        ${item.docs.map(doc => `
          <a href="${doc[1]}" target="_blank" rel="noopener" class="${doc[2] || ""}">${doc[0]}</a>
        `).join("")}
      </div>
    </article>
  `).join("");

  emptyState.hidden = visible.length !== 0;
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    filterButtons.forEach(item => item.classList.toggle("active", item === button));
    render();
  });
});

search.addEventListener("input", render);
render();
