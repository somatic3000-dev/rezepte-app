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
    icon: "🍝",
    imageClass: "image-pasta",
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
    icon: "🥗",
    imageClass: "image-salad",
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
    icon: "🍛",
    imageClass: "image-curry",
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
    icon: "🍅",
    imageClass: "image-soup",
    sourceName: "Beispielquelle",
    sourceUrl: "https://example.com"
  },
  {
    id: "5",
    title: "Hähnchen-Reis-Pfanne",
    description: "Herzhafte Pfanne mit Reis, Gemüse und Hähnchen.",
    ingredients: ["Hähnchen", "Reis", "Paprika", "Erbsen", "Zwiebeln"],
    totalTime: 40,
    difficulty: "Mittel",
    category: "Hauptgericht",
    tags: ["reis", "hähnchen", "pfanne"],
    icon: "🍚",
    imageClass: "image-rice",
    sourceName: "Beispielquelle",
    sourceUrl: "https://example.com"
  },
  {
    id: "6",
    title: "Gurkensalat",
    description: "Klassischer, schneller Salat mit frischem Dill.",
    ingredients: ["Gurke", "Dill", "Joghurt", "Zitrone", "Salz"],
    totalTime: 10,
    difficulty: "Einfach",
    category: "Salat",
    tags: ["salat", "schnell", "frisch"],
    icon: "🥒",
    imageClass: "image-salad",
    sourceName: "Beispielquelle",
    sourceUrl: "https://example.com"
  }
];

const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const categorySelect = document.getElementById("categorySelect");
const recipeGrid = document.getElementById("recipeGrid");
const favoriteFilterButton = document.getElementById("favoriteFilterButton");
const shoppingListButton = document.getElementById("shoppingListButton");
const resultCount = document.getElementById("resultCount");
const quickFilterButtons = document.querySelectorAll(".quick-filter");

const detailModal = document.getElementById("detailModal");
const modalImage = document.getElementById("modalImage");
const modalCategory = document.getElementById("modalCategory");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalTime = document.getElementById("modalTime");
const modalDifficulty = document.getElementById("modalDifficulty");
const modalIngredients = document.getElementById("modalIngredients");
const modalSource = document.getElementById("modalSource");
const modalFavoriteButton = document.getElementById("modalFavoriteButton");
const modalShoppingButton = document.getElementById("modalShoppingButton");

const shoppingModal = document.getElementById("shoppingModal");
const shoppingListItems = document.getElementById("shoppingListItems");
const clearShoppingListButton = document.getElementById("clearShoppingListButton");

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];
let showOnlyFavorites = false;
let activeRecipeId = null;
let activeQuickFilter = "all";

function saveFavorites() {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function saveShoppingList() {
  localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
}

function createIdFromText(text) {
  return text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9äöüß-]/g, "");
}

function isFavorite(recipeId) {
  return favorites.includes(recipeId);
}

function toggleFavorite(recipeId) {
  if (isFavorite(recipeId)) {
    favorites = favorites.filter((id) => id !== recipeId);
  } else {
    favorites.push(recipeId);
  }

  saveFavorites();
  renderRecipes();

  if (activeRecipeId === recipeId) {
    updateModalFavoriteButton(recipeId);
  }
}

function updateModalFavoriteButton(recipeId) {
  if (isFavorite(recipeId)) {
    modalFavoriteButton.textContent = "Aus Favoriten entfernen";
  } else {
    modalFavoriteButton.textContent = "Als Favorit speichern";
  }
}

function addRecipeToShoppingList(recipeId) {
  const recipe = recipes.find((item) => item.id === recipeId);

  if (!recipe) {
    return;
  }

  recipe.ingredients.forEach((ingredient) => {
    const alreadyExists = shoppingList.some(
      (item) => item.name.toLowerCase() === ingredient.toLowerCase()
    );

    if (!alreadyExists) {
      shoppingList.push({
        id: createIdFromText(ingredient),
        name: ingredient,
        checked: false
      });
    }
  });

  saveShoppingList();
  renderShoppingList();
  updateToolbar(getFilteredRecipes());

  modalShoppingButton.textContent = "Zutaten wurden hinzugefügt";

  setTimeout(() => {
    modalShoppingButton.textContent = "Zutaten zur Einkaufsliste hinzufügen";
  }, 1500);
}

function openDetails(recipeId) {
  const recipe = recipes.find((item) => item.id === recipeId);

  if (!recipe) {
    return;
  }

  activeRecipeId = recipeId;

  modalImage.textContent = recipe.icon;
  modalImage.className = `modal-image ${recipe.imageClass || "image-default"}`;

  modalCategory.textContent = recipe.category;
  modalTitle.textContent = recipe.title;
  modalDescription.textContent = recipe.description;
  modalTime.textContent = `${recipe.totalTime} Min.`;
  modalDifficulty.textContent = recipe.difficulty;
  modalSource.href = recipe.sourceUrl;

  modalIngredients.innerHTML = "";

  recipe.ingredients.forEach((ingredient) => {
    const listItem = document.createElement("li");
    listItem.textContent = ingredient;
    modalIngredients.appendChild(listItem);
  });

  modalFavoriteButton.onclick = function () {
    toggleFavorite(recipe.id);
  };

  modalShoppingButton.onclick = function () {
    addRecipeToShoppingList(recipe.id);
  };

  updateModalFavoriteButton(recipe.id);

  detailModal.classList.remove("hidden");
}

function closeDetails() {
  detailModal.classList.add("hidden");
  activeRecipeId = null;
}

function openShoppingList() {
  renderShoppingList();
  shoppingModal.classList.remove("hidden");
}

function closeShoppingList() {
  shoppingModal.classList.add("hidden");
}

function toggleShoppingItem(itemId) {
  shoppingList = shoppingList.map((item) => {
    if (item.id === itemId) {
      return {
        ...item,
        checked: !item.checked
      };
    }

    return item;
  });

  saveShoppingList();
  renderShoppingList();
}

function removeShoppingItem(itemId) {
  shoppingList = shoppingList.filter((item) => item.id !== itemId);
  saveShoppingList();
  renderShoppingList();
  updateToolbar(getFilteredRecipes());
}

function clearShoppingList() {
  shoppingList = [];
  saveShoppingList();
  renderShoppingList();
  updateToolbar(getFilteredRecipes());
}

function renderShoppingList() {
  shoppingListItems.innerHTML = "";

  if (shoppingList.length === 0) {
    shoppingListItems.innerHTML = `
      <div class="empty">
        Deine Einkaufsliste ist noch leer.
      </div>
    `;
    return;
  }

  shoppingList.forEach((item) => {
    const shoppingItem = document.createElement("div");
    shoppingItem.className = "shopping-item";

    shoppingItem.innerHTML = `
      <input
        type="checkbox"
        ${item.checked ? "checked" : ""}
        onchange="toggleShoppingItem('${item.id}')"
      />

      <span class="shopping-item-name ${item.checked ? "checked" : ""}">
        ${item.name}
      </span>

      <button
        class="remove-shopping-item"
        onclick="removeShoppingItem('${item.id}')"
        aria-label="Zutat entfernen"
      >
        ×
      </button>
    `;

    shoppingListItems.appendChild(shoppingItem);
  });
}

function getFilteredRecipes() {
  const searchTerm = searchInput.value.toLowerCase().trim();
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
    const matchesFavoriteFilter =
      !showOnlyFavorites || isFavorite(recipe.id);
    const matchesQuickFilter =
      activeQuickFilter === "all" || searchableText.includes(activeQuickFilter);

    return matchesSearch && matchesCategory && matchesFavoriteFilter && matchesQuickFilter;
  });

  if (sortValue === "time") {
    filteredRecipes.sort((a, b) => a.totalTime - b.totalTime);
  }

  if (sortValue === "title") {
    filteredRecipes.sort((a, b) => a.title.localeCompare(b.title));
  }

  return filteredRecipes;
}

function updateToolbar(filteredRecipes) {
  const recipeCount = filteredRecipes.length;

  if (recipeCount === 1) {
    resultCount.textContent = "1 Rezept gefunden";
  } else {
    resultCount.textContent = `${recipeCount} Rezepte gefunden`;
  }

  if (showOnlyFavorites) {
    favoriteFilterButton.textContent = "Alle Rezepte anzeigen";
    favoriteFilterButton.classList.add("active");
  } else {
    favoriteFilterButton.textContent = "Nur Favoriten anzeigen";
    favoriteFilterButton.classList.remove("active");
  }

  if (shoppingList.length === 1) {
    shoppingListButton.textContent = "Einkaufsliste öffnen · 1 Zutat";
  } else {
    shoppingListButton.textContent = `Einkaufsliste öffnen · ${shoppingList.length} Zutaten`;
  }
}

function renderRecipes() {
  const filteredRecipes = getFilteredRecipes();

  updateToolbar(filteredRecipes);

  recipeGrid.innerHTML = "";

  if (filteredRecipes.length === 0) {
    if (showOnlyFavorites) {
      recipeGrid.innerHTML = `
        <div class="empty">
          Du hast noch keine passenden Favoriten gespeichert.
        </div>
      `;
    } else {
      recipeGrid.innerHTML = `
        <div class="empty">
          Keine passenden Rezepte gefunden.
        </div>
      `;
    }

    return;
  }

  filteredRecipes.forEach((recipe) => {
    const favorite = isFavorite(recipe.id);

    const card = document.createElement("article");
    card.className = "recipe-card";

    card.innerHTML = `
      <div class="recipe-image ${recipe.imageClass || "image-default"}">
        ${recipe.icon || "🍽️"}
      </div>

      <div class="recipe-card-content">
        <div class="card-header">
          <span class="tag">${recipe.category}</span>
          <button class="favorite-button" onclick="toggleFavorite('${recipe.id}')">
            ${favorite ? "★" : "☆"}
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
      </div>
    `;

    recipeGrid.appendChild(card);
  });
}

function setQuickFilter(filterValue) {
  activeQuickFilter = filterValue;

  quickFilterButtons.forEach((button) => {
    if (button.dataset.filter === filterValue) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });

  renderRecipes();
}

searchInput.addEventListener("input", renderRecipes);
sortSelect.addEventListener("change", renderRecipes);
categorySelect.addEventListener("change", renderRecipes);

favoriteFilterButton.addEventListener("click", function () {
  showOnlyFavorites = !showOnlyFavorites;
  renderRecipes();
});

shoppingListButton.addEventListener("click", openShoppingList);
clearShoppingListButton.addEventListener("click", clearShoppingList);

quickFilterButtons.forEach((button) => {
  button.addEventListener("click", function () {
    setQuickFilter(button.dataset.filter);
  });
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeDetails();
    closeShoppingList();
  }
});

renderRecipes();
renderShoppingList();
