const recipes = [
  {
    title: "Vegetarische Pasta",
    description: "Schnelles Pasta-Gericht mit Gemüse und Kräutern.",
    totalTime: 25,
    difficulty: "Einfach",
    category: "Hauptgericht",
    tags: ["vegetarisch", "schnell", "pasta"],
    sourceName: "Beispielquelle",
    sourceUrl: "https://example.com"
  },
  {
    title: "Schneller Reissalat",
    description: "Frischer Salat mit Reis, Gemüse und leichtem Dressing.",
    totalTime: 20,
    difficulty: "Einfach",
    category: "Salat",
    tags: ["vegetarisch", "reis", "schnell"],
    sourceName: "Beispielquelle",
    sourceUrl: "https://example.com"
  },
  {
    title: "Veganes Curry",
    description: "Cremiges Curry mit Kokosmilch, Gemüse und Gewürzen.",
    totalTime: 35,
    difficulty: "Mittel",
    category: "Hauptgericht",
    tags: ["vegan", "curry", "gemüse"],
    sourceName: "Beispielquelle",
    sourceUrl: "https://example.com"
  },
  {
    title: "Tomatensuppe",
    description: "Einfache Suppe mit Tomaten, Zwiebeln und Basilikum.",
    totalTime: 30,
    difficulty: "Einfach",
    category: "Suppe",
    tags: ["vegan", "suppe", "tomate"],
    sourceName: "Beispielquelle",
    sourceUrl: "https://example.com"
  }
];

const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const categorySelect = document.getElementById("categorySelect");
const recipeGrid = document.getElementById("recipeGrid");

function renderRecipes() {
  const searchTerm = searchInput.value.toLowerCase();
  const sortValue = sortSelect.value;
  const categoryValue = categorySelect.value;

  let filteredRecipes = recipes.filter((recipe) => {
    const searchableText = [
      recipe.title,
      recipe.description,
      recipe.category,
      recipe.difficulty,
      ...recipe.tags
    ].join(" ").toLowerCase();

    const matchesSearch = searchableText.includes(searchTerm);
    const matchesCategory =
      categoryValue === "all" || recipe.category === categoryValue;

    return matchesSearch && matchesCategory;
  });

  if (sortValue === "time") {
    filteredRecipes.sort((a, b) => a.totalTime - b.totalTime);
  }

  if (sortValue === "title") {
    filteredRecipes.sort((a, b) => a.title.localeCompare(b.title));
  }

  recipeGrid.innerHTML = "";

  if (filteredRecipes.length === 0) {
    recipeGrid.innerHTML = `
      <div class="empty">
        Keine passenden Rezepte gefunden.
      </div>
    `;
    return;
  }

  filteredRecipes.forEach((recipe) => {
    const card = document.createElement("article");
    card.className = "recipe-card";

    card.innerHTML = `
      <span class="tag">${recipe.category}</span>
      <h2>${recipe.title}</h2>
      <p>${recipe.description}</p>

      <div class="meta">
        <span class="tag">${recipe.totalTime} Min.</span>
        <span class="tag">${recipe.difficulty}</span>
        ${recipe.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
      </div>

      <a class="source-link" href="${recipe.sourceUrl}" target="_blank">
        Originalquelle öffnen
      </a>
    `;

    recipeGrid.appendChild(card);
  });
}

searchInput.addEventListener("input", renderRecipes);
sortSelect.addEventListener("change", renderRecipes);
categorySelect.addEventListener("change", renderRecipes);

renderRecipes();
