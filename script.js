const recipes = [
  {
    id: "1",
    title: "Vegetarische Pasta",
    description: "Schnelles Pasta-Gericht mit Gemüse und Kräutern.",
    ingredients: ["Pasta", "Paprika", "Zucchini", "Tomaten", "Basilikum"],
    totalTime: 25,
    difficulty: "Einfach",
    category: "Hauptgericht",
    tags: ["vegetarisch", "schnell", "pasta"],
    sourceName: "Beispielquelle",
    sourceUrl: "https://example.com"
  },
  {
    id: "2",
    title: "Schneller Reissalat",
    description: "Frischer Salat mit Reis, Gemüse und leichtem Dressing.",
    ingredients: ["Reis", "Gurke", "Tomaten", "Mais", "Olivenöl"],
    totalTime: 20,
    difficulty: "Einfach",
    category: "Salat",
    tags: ["vegetarisch", "reis", "schnell"],
    sourceName: "Beispielquelle",
    sourceUrl: "https://example.com"
  },
  {
    id: "3",
    title: "Veganes Curry",
    description: "Cremiges Curry mit Kokosmilch, Gemüse und Gewürzen.",
    ingredients: ["Kokosmilch", "Kartoffeln", "Karotten", "Curry", "Reis"],
    totalTime: 35,
    difficulty: "Mittel",
    category: "Hauptgericht",
    tags: ["vegan", "curry", "gemüse"],
    sourceName: "Beispielquelle",
    sourceUrl: "https://example.com"
  },
  {
    id: "4",
    title: "Tomatensuppe",
    description: "Einfache Suppe mit Tomaten, Zwiebeln und Basilikum.",
    ingredients: ["Tomaten", "Zwiebeln", "Knoblauch", "Basilikum"],
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

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function saveFavorites() {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function toggleFavorite(recipeId) {
  if (favorites.includes(recipeId)) {
    favorites = favorites.filter((id) => id !== recipeId);
  } else {
    favorites.push(recipeId);
  }

  saveFavorites();
  renderRecipes();
}

function openDetails(recipeId) {
  const recipe = recipes.find((item) => item.id === recipeId);

  alert(
    `${recipe.title}\n\n` +
    `${recipe.description}\n\n` +
    `Zutaten:\n- ${recipe.ingredients.join("\n- ")}\n\n` +
    `Kochzeit: ${recipe.totalTime} Minuten\n` +
    `Schwierigkeit: ${recipe.difficulty}\n` +
    `Kategorie: ${recipe.category}`
  );
}

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
      ...recipe.tags,
      ...recipe.ingredients
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
    const isFavorite = favorites.includes(recipe.id);

    const card = document.createElement("article");
    card.className = "recipe-card";

    card.innerHTML = `
      <div class="card-header">
        <span class="tag">${recipe.category}</span>
        <button class="favorite-button" onclick="toggleFavorite('${recipe.id}')">
          ${isFavorite ? "★" : "☆"}
        </button>
      </div>

      <h2>${recipe.title}</h2>
      <p>${recipe.description}</p>

      <div class="meta">
        <span class="tag">${recipe.totalTime} Min.</span>
        <span class="tag">${recipe.difficulty}</span>
        ${recipe.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
      </div>

      <div class="ingredients">
        <strong>Zutaten:</strong>
        ${recipe.ingredients.slice(0, 3).join(", ")}
      </div>

      <button class="detail-button" onclick="openDetails('${recipe.id}')">
        Details anzeigen
      </button>

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
