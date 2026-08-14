const catalogues = [
  // DÉSTOCKAGE
{
  brand:"Piazzetta",
  model:"E129 M",
  category:"destockage",
  label:"Déstockage",
  discount:"-20 %",
  image:"destockage/piazzetta-e129m.png",
  original55:"4 579 €",
  promo55:"3 663 € TTC",
  original20:"5 208 €",
  promo20:"4 166 € TTC"
},
{
  {
  brand:"Skanderborg",
  model:"TIVA XL DA",
  category:"destockage",
  label:"Déstockage",
  discount:"-30 %",
  image:"destockage/skanderborg-tiva-xl.png",
  original55:"5 516 €",
  promo55:"3 861 € TTC",
  original20:"6 274 €",
  promo20:"4 392 € TTC"
},
},
{
  brand:"Spartherm",
  model:"Ambiante A7 Blanc",
  category:"destockage",
  label:"Déstockage",
  discount:"-20 %",
  image:"destockage/spartherm-ambiante-a7.png",
  original55:"4 332 €",
  promo55:"3 466 € TTC",
  original20:"4 928 €",
  promo20:"3 942 € TTC"
},
  // POÊLES À BOIS
  {brand:"Spartherm", category:"bois", label:"Poêles à bois", docs:[["Catalogue","catalogues/spartherm.pdf"]]},
  {brand:"Romotop", category:"bois", label:"Poêles à bois", docs:[["Catalogue","catalogues/romotop.pdf"]]},
  {brand:"Lorflam", category:"bois", label:"Poêles à bois", docs:[
    ["Catalogue 2026-2027","catalogues/lorflam-poeles-bois-2026-2027.pdf"],
    ["Gamme XP Box","catalogues/lorflam-xbox.pdf","secondary"]
  ]},
  {brand:"Seguin", category:"bois", label:"Poêles à bois", docs:[["Catalogue","catalogues/seguin.pdf"]]},
  {brand:"Hergom", category:"bois", label:"Poêles à bois", docs:[["Catalogue","catalogues/hergom.pdf"]]},
  {brand:"Fonte Flamme", category:"bois", label:"Poêles à bois", docs:[["Catalogue","catalogues/fonte-flamme.pdf"]]},
  {brand:"Olsberg", category:"bois", label:"Poêles à bois", docs:[["Catalogue","catalogues/olsberg.pdf"]]},
  {brand:"Wiking", category:"bois", label:"Poêles à bois", docs:[["Catalogue","catalogues/wiking.pdf"]]},
  {brand:"Storch", category:"bois", label:"Poêles à bois", docs:[["Catalogue","catalogues/storch.pdf"]]},
  {brand:"La Nordica", category:"bois", label:"Poêles à bois", docs:[["Catalogue","catalogues/la-nordica.pdf"]]},
  {brand:"Lorium", category:"bois", label:"Poêles à bois", docs:[["Catalogue","catalogues/lorium.pdf"]]},
  {brand:"Rocal", category:"bois", label:"Poêles à bois", docs:[["Catalogue général","catalogues/rocal-2025.pdf"]]},
  {brand:"CERA Design", category:"bois", label:"Poêles à bois", docs:[["Catalogue 2025","catalogues/cera-design-2025.pdf"]]},
  {brand:"Dovre", category:"bois", label:"Poêles à bois", docs:[["Catalogue 2025-2026","catalogues/dovre-2025-2026-github.pdf"]]},
  // POÊLES À PELLETS
  {brand:"MCZ", category:"pellets", label:"Poêles à pellets", docs:[
    ["Catalogue produits","catalogues/mcz.pdf"],
    ["Tarifs publics","catalogues/mcz-tarifs-2026-2027.pdf","secondary"]
  ]},
  {brand:"Jolly Mec", subtitle:"JM", category:"pellets", label:"Poêles à pellets", docs:[
    ["Catalogue produits","catalogues/jm.pdf"],
    ["Tarifs publics","catalogues/jm-tarifs-2026.pdf","secondary"]
  ]},

  // FOYERS DE CHEMINÉE
  {brand:"Spartherm", category:"foyers", label:"Foyers de cheminée", docs:[["Catalogue","catalogues/spartherm.pdf"]]},
  {brand:"M-Design", subtitle:"Argento", category:"foyers", label:"Foyers de cheminée", docs:[["Catalogue","catalogues/mdesign-argento.pdf"]]},
  {brand:"M-Design", subtitle:"Luna Diamond", category:"foyers", label:"Foyers de cheminée", docs:[["Catalogue","catalogues/mdesign-luna-diamond.pdf"]]},
  {brand:"Lorflam", subtitle:"Foyers & inserts", category:"foyers", label:"Foyers de cheminée", docs:[["Catalogue","catalogues/lorflam-foyers-inserts.pdf"]]},

  // INSERTS - uniquement Spartherm, conformément à votre sélection
  {brand:"Spartherm", category:"inserts", label:"Inserts", docs:[["Catalogue","catalogues/spartherm.pdf"]]},

  // CUISINIÈRES
  {brand:"La Nordica", category:"cuisinieres", label:"Cuisinières", docs:[["Catalogue","catalogues/la-nordica.pdf"]]}
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
   const matchesCategory =
  currentFilter === "all"
    ? item.category !== "destockage"
    : item.category === currentFilter;
 const haystack = normalize(`${item.brand} ${item.model || ""} ${item.subtitle || ""} ${item.label}`);
    return matchesCategory && (!query || haystack.includes(query));
  });

grid.innerHTML = visible.map(item => {
  if (item.category === "destockage") {
    return `
      <article class="card stock-card">
        <div class="stock-badge">${item.discount}</div>

        <a href="${item.image}" target="_blank" rel="noopener" class="stock-image-link">
          <img src="${item.image}" alt="${item.brand} ${item.model}" class="stock-image">
        </a>

        <div class="stock-body">
          <p class="card-category">${item.label} · Modèle d’exposition</p>
          <h3>${item.brand}</h3>
          <p class="stock-model">${item.model}</p>

          <div class="stock-prices">
            <div class="price-box">
              <span class="price-label">TVA 5,5 %</span>
              <span class="old-price">${item.original55}</span>
              <strong>${item.promo55}</strong>
            </div>

            <div class="price-box">
              <span class="price-label">TVA 20 %</span>
              <span class="old-price">${item.original20}</span>
              <strong>${item.promo20}</strong>
            </div>
          </div>

          <a href="${item.image}" target="_blank" rel="noopener" class="stock-link">
            Voir la fiche complète
          </a>

          <p class="stock-note">Dans la limite des stocks disponibles.</p>
        </div>
      </article>
    `;
  }

  return `
    <article class="card">
      <p class="card-category">${item.label}</p>
      <h3>${item.brand}</h3>
      ${item.subtitle ? `<p class="card-subtitle">${item.subtitle}</p>` : ""}
      <div class="card-actions">
        ${item.docs.map(doc => `
          <a href="${doc[1]}" target="_blank" rel="noopener" class="${doc[2] || ""}">
            ${doc[0]}
          </a>
        `).join("")}
      </div>
    </article>
  `;
}).join(""); 

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
