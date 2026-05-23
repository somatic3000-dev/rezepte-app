const activeFilterElements = {
  chipsContainer: document.getElementById("activeFilterChips"),
  searchInput: document.getElementById("searchInput"),
  categorySelect: document.getElementById("categorySelect"),
  difficultySelect: document.getElementById("difficultySelect"),
  maxTimeSelect: document.getElementById("maxTimeSelect"),
  sourceFilterSelect: document.getElementById("sourceFilterSelect"),
  recipeTypeSelect: document.getElementById("recipeTypeSelect"),
  featureFilterSelect: document.getElementById("featureFilterSelect"),
  quickFilterButtons: document.querySelectorAll(".quick-filter"),
  favoriteFilterButton: document.getElementById("favoriteFilterButton"),
  resetFiltersButton: document.getElementById("resetFiltersButton"),
  recipeGrid: document.getElementById("recipeGrid"),
  recipeLibrary: document.getElementById("recipeLibrary"),
  detailModal: document.getElementById("detailModal"),
  modalTitle: document.getElementById("modalTitle"),
  modalCategory: document.getElementById("modalCategory"),
  modalSourceName: document.getElementById("modalSourceName"),
  modalSource: document.getElementById("modalSource")
};

const RECIPE_VIEW_STORAGE_KEY = "rf_recipeViewMode";

const DIETARY_RULES = {
  meatAndFish: [
    "hähnchen",
    "huhn",
    "chicken",
    "pute",
    "truthahn",
    "rind",
    "rindfleisch",
    "beef",
    "schwein",
    "schweinefleisch",
    "pork",
    "speck",
    "bacon",
    "schinken",
    "salami",
    "wurst",
    "hackfleisch",
    "kalb",
    "lamm",
    "ente",
    "gans",
    "fisch",
    "lachs",
    "thunfisch",
    "forelle",
    "kabeljau",
    "garnelen",
    "garnele",
    "shrimp",
    "scampi",
    "muscheln",
    "muschel",
    "krabben",
    "krabbe"
  ],
  dairy: [
    "milch",
    "kuhmilch",
    "butter",
    "joghurt",
    "yoghurt",
    "quark",
    "sahne",
    "schmand",
    "creme fraiche",
    "crème fraîche",
    "käse",
    "parmesan",
    "mozzarella",
    "feta",
    "ricotta",
    "mascarpone",
    "frischkäse",
    "gouda",
    "emmentaler",
    "cheddar"
  ],
  eggs: [
    "ei",
    "eier",
    "eigelb",
    "eiweiß"
  ],
  honey: [
    "honig"
  ],
  gluten: [
    "weizen",
    "weizenmehl",
    "mehl",
    "dinkel",
    "dinkelmehl",
    "roggen",
    "gerste",
    "bulgur",
    "couscous",
    "seitan",
    "pasta",
    "nudeln",
    "spaghetti",
    "tagliatelle",
    "lasagne",
    "brot",
    "brötchen",
    "paniermehl",
    "panko"
  ],
  glutenFreeAlternatives: [
    "reis",
    "reisnudeln",
    "glasnudeln",
    "kartoffeln",
    "kartoffel",
    "mais",
    "polenta",
    "quinoa",
    "hirse",
    "buchweizen",
    "hafer glutenfrei",
    "glutenfreie pasta",
    "glutenfreie nudeln",
    "glutenfreies mehl"
  ],
  veganIndicators: [
    "vegan",
    "pflanzlich",
    "plant based",
    "plant-based"
  ],
  vegetarianIndicators: [
    "vegetarisch",
    "vegetarian"
  ],
  dairyFreeIndicators: [
    "milchfrei",
    "laktosefrei",
    "dairy free",
    "dairy-free",
    "ohne milch"
  ],
  glutenFreeIndicators: [
    "glutenfrei",
    "gluten free",
    "gluten-free",
    "ohne gluten"
  ]
};

function injectActiveFilterStyles() {
  if (document.getElementById("active-filter-chip-styles")) {
    return;
  }

  const style = document.createElement("style");
  style.id = "active-filter-chip-styles";
  style.textContent = `
    .active-filter-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 18px;
      min-height: 0;
    }

    .active-filter-chips:empty {
      display: none;
    }

    .active-filter-chip {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      min-height: 34px;
      border: 1px solid var(--border, #ddd0bd);
      border-radius: 999px;
      padding: 7px 11px;
      background: var(--surface, #ffffff);
      color: var(--text, #111111);
      font-size: 13px;
      font-weight: 750;
      line-height: 1;
      cursor: pointer;
      transition:
        background 0.18s ease,
        border-color 0.18s ease,
        transform 0.18s ease,
        box-shadow 0.18s ease;
    }

    .active-filter-chip:hover {
      background: var(--surface-soft, #f7f3ec);
      border-color: var(--border-strong, #cbb69d);
      transform: translateY(-1px);
      box-shadow: var(--shadow-soft, 0 10px 24px rgba(0, 0, 0, 0.06));
    }

    .active-filter-chip-label {
      white-space: nowrap;
    }

    .active-filter-chip-remove {
      display: inline-grid;
      place-items: center;
      width: 18px;
      height: 18px;
      border-radius: 999px;
      background: rgba(0, 0, 0, 0.08);
      color: inherit;
      font-size: 14px;
      line-height: 1;
    }

    .active-filter-chip-search {
      background: var(--primary-soft, #f3d7c7);
      border-color: rgba(0, 0, 0, 0.12);
    }

    .active-filter-chip-feature {
      background: var(--success, #dfe5d6);
      border-color: var(--success-strong, #bdc9ad);
    }

    .active-filter-chip-favorite {
      background: var(--warning, #fff1c7);
      border-color: var(--warning-strong, #d6bd8e);
    }

    .recipe-view-switcher {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 18px;
    }

    .recipe-view-button {
      min-height: 38px;
      border: 1px solid var(--border, #ddd0bd);
      border-radius: 999px;
      padding: 9px 13px;
      background: var(--surface, #ffffff);
      color: var(--text-soft, #333333);
      font-size: 13px;
      font-weight: 760;
      cursor: pointer;
      transition:
        background 0.18s ease,
        border-color 0.18s ease,
        transform 0.18s ease,
        box-shadow 0.18s ease,
        color 0.18s ease;
    }

    .recipe-view-button:hover {
      background: var(--surface-soft, #f7f3ec);
      border-color: var(--border-strong, #cbb69d);
      transform: translateY(-1px);
      box-shadow: var(--shadow-soft, 0 10px 24px rgba(0, 0, 0, 0.06));
    }

    .recipe-view-button.active {
      background: var(--primary, #111111);
      border-color: var(--primary, #111111);
      color: #ffffff;
    }

    .recipe-grid.recipe-list-view {
      display: grid;
      grid-template-columns: 1fr;
      gap: 14px;
    }

    .recipe-grid.recipe-list-view .recipe-card {
      display: grid;
      grid-template-columns: 210px minmax(0, 1fr);
      min-height: 210px;
    }

    .recipe-grid.recipe-list-view .recipe-card:hover {
      transform: translateY(-2px);
    }

    .recipe-grid.recipe-list-view .recipe-image {
      min-height: 100%;
      height: 100%;
      border-bottom: 0;
      border-right: 1px solid var(--border, #ddd0bd);
    }

    .recipe-grid.recipe-list-view .recipe-card-content {
      display: grid;
      align-content: start;
      padding: 18px;
    }

    .recipe-grid.recipe-list-view .recipe-card h3 {
      margin-top: 10px;
      margin-bottom: 6px;
      font-size: clamp(22px, 2.4vw, 30px);
    }

    .recipe-grid.recipe-list-view .recipe-card p {
      max-width: 760px;
    }

    .recipe-grid.recipe-list-view .recipe-card-source-row {
      max-width: 520px;
    }

    .recipe-grid.recipe-list-view .feature-badges,
    .recipe-grid.recipe-list-view .meta {
      margin-top: 10px;
    }

    .recipe-grid.recipe-list-view .ingredients-preview {
      margin-top: 10px;
    }

    .recipe-grid.recipe-list-view .card-actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 10px;
      margin-top: 14px;
    }

    .recipe-grid.recipe-list-view .detail-button {
      width: auto;
      min-width: 170px;
      padding-left: 18px;
      padding-right: 18px;
    }

    .recipe-detail-insights {
      display: grid;
      gap: 14px;
      margin: 20px 0 18px;
      padding: 16px;
      border: 1px solid var(--border, #ddd0bd);
      border-radius: 20px;
      background: var(--surface-soft, #f7f3ec);
    }

    .recipe-detail-insights-header {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }

    .recipe-detail-insights-title {
      display: grid;
      gap: 3px;
    }

    .recipe-detail-insights-title span {
      color: var(--muted, #6f6f6f);
      font-size: 12px;
      font-weight: 760;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .recipe-detail-insights-title strong {
      color: var(--text, #111111);
      font-size: 17px;
      line-height: 1.25;
    }

    .recipe-detail-source-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
    }

    .recipe-detail-source-item {
      display: grid;
      gap: 4px;
      padding: 12px;
      border: 1px solid rgba(0, 0, 0, 0.08);
      border-radius: 16px;
      background: var(--surface, #ffffff);
    }

    .recipe-detail-source-item span {
      color: var(--muted, #6f6f6f);
      font-size: 12px;
      font-weight: 760;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    .recipe-detail-source-item strong {
      min-width: 0;
      color: var(--text, #111111);
      font-size: 14px;
      font-weight: 800;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .recipe-detail-feature-list {
      display: flex;
      flex-wrap: wrap;
      gap: 7px;
    }

    .recipe-detail-link-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
    }

    .recipe-detail-origin-link {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 36px;
      border-radius: 999px;
      padding: 8px 13px;
      background: var(--primary, #111111);
      color: #ffffff;
      font-size: 13px;
      font-weight: 800;
      text-decoration: none;
    }

    .recipe-detail-origin-link:hover {
      transform: translateY(-1px);
      box-shadow: var(--shadow-soft, 0 10px 24px rgba(0, 0, 0, 0.06));
    }

    .tag.feature-dairy-free,
    .tag.feature-gluten-free {
      background: var(--surface, #ffffff);
      border-color: var(--border-strong, #cbb69d);
      color: var(--text, #111111);
    }

    @media (max-width: 820px) {
      .recipe-grid.recipe-list-view .recipe-card {
        grid-template-columns: 150px minmax(0, 1fr);
        min-height: 180px;
      }

      .recipe-grid.recipe-list-view .recipe-image {
        min-height: 180px;
      }
    }

    @media (max-width: 720px) {
      .active-filter-chips,
      .recipe-view-switcher {
        display: grid;
        grid-template-columns: 1fr;
      }

      .active-filter-chip,
      .recipe-view-button {
        justify-content: space-between;
        width: 100%;
      }

      .active-filter-chip-label {
        white-space: normal;
      }

      .recipe-grid.recipe-list-view .recipe-card {
        display: block;
      }

      .recipe-grid.recipe-list-view .recipe-image {
        min-height: 240px;
        border-right: 0;
        border-bottom: 1px solid var(--border, #ddd0bd);
      }

      .recipe-grid.recipe-list-view .card-actions {
        display: grid;
      }

      .recipe-grid.recipe-list-view .detail-button {
        width: 100%;
      }

      .recipe-detail-source-grid {
        grid-template-columns: 1fr;
      }

      .recipe-detail-source-item strong {
        white-space: normal;
      }
    }
  `;

  document.head.appendChild(style);
}

function normalizeDietaryText(value) {
  return String(value || "")
    .toLowerCase()
    .replaceAll("ä", "ae")
    .replaceAll("ö", "oe")
    .replaceAll("ü", "ue")
    .replaceAll("ß", "ss")
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getRecipeDietaryText(recipe) {
  if (!recipe) {
    return "";
  }

  const ingredientText = Array.isArray(recipe.ingredients)
    ? recipe.ingredients.map((ingredient) => {
      return [
        ingredient.originalText,
        ingredient.original_text,
        ingredient.food,
        ingredient.normalizedFood,
        ingredient.normalized_food,
        ingredient.note
      ].filter(Boolean).join(" ");
    }).join(" ")
    : "";

  const instructionText = Array.isArray(recipe.instructions)
    ? recipe.instructions.map((instruction) => instruction.text || "").join(" ")
    : "";

  return normalizeDietaryText([
    recipe.title,
    recipe.description,
    recipe.category,
    recipe.difficulty,
    recipe.sourceName,
    Array.isArray(recipe.tags) ? recipe.tags.join(" ") : "",
    ingredientText,
    instructionText
  ].filter(Boolean).join(" "));
}

function normalizeRuleList(list) {
  return list.map(normalizeDietaryText);
}

function dietaryTextContainsAny(text, list) {
  const normalizedList = normalizeRuleList(list);

  return normalizedList.some((item) => {
    if (!item) {
      return false;
    }

    const escapedItem = item.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(`(^|\\s|-)${escapedItem}(\\s|-|$)`, "i");

    return pattern.test(text);
  });
}

function getRecipeDietaryProfile(recipe) {
  const text = getRecipeDietaryText(recipe);

  const hasMeatOrFish = dietaryTextContainsAny(text, DIETARY_RULES.meatAndFish);
  const hasDairy = dietaryTextContainsAny(text, DIETARY_RULES.dairy);
  const hasEggs = dietaryTextContainsAny(text, DIETARY_RULES.eggs);
  const hasHoney = dietaryTextContainsAny(text, DIETARY_RULES.honey);
  const hasGluten = dietaryTextContainsAny(text, DIETARY_RULES.gluten);
  const hasGlutenFreeAlternative = dietaryTextContainsAny(text, DIETARY_RULES.glutenFreeAlternatives);

  const explicitVegan = dietaryTextContainsAny(text, DIETARY_RULES.veganIndicators);
  const explicitVegetarian = dietaryTextContainsAny(text, DIETARY_RULES.vegetarianIndicators);
  const explicitDairyFree = dietaryTextContainsAny(text, DIETARY_RULES.dairyFreeIndicators);
  const explicitGlutenFree = dietaryTextContainsAny(text, DIETARY_RULES.glutenFreeIndicators);

  const isVegan = explicitVegan || (!hasMeatOrFish && !hasDairy && !hasEggs && !hasHoney);
  const isVegetarian = explicitVegetarian || explicitVegan || !hasMeatOrFish;
  const isDairyFree = explicitDairyFree || !hasDairy;
  const isGlutenFree = explicitGlutenFree || (!hasGluten || hasGlutenFreeAlternative);

  return {
    text,
    hasMeatOrFish,
    hasDairy,
    hasEggs,
    hasHoney,
    hasGluten,
    explicitVegan,
    explicitVegetarian,
    explicitDairyFree,
    explicitGlutenFree,
    isVegan,
    isVegetarian,
    isDairyFree,
    isGlutenFree
  };
}

function addFeatureBadge(badges, label, className = "feature-tag") {
  const alreadyExists = badges.some((badge) => {
    return badge.label.toLowerCase() === label.toLowerCase();
  });

  if (!alreadyExists) {
    badges.push({
      label,
      className
    });
  }
}

function recipeTextContainsForFeatures(recipe, words) {
  const text = getRecipeDietaryText(recipe);

  return words.some((word) => {
    return text.includes(normalizeDietaryText(word));
  });
}

function hasRecipeTagForFeatures(recipe, tagNames) {
  const tags = Array.isArray(recipe.tags)
    ? recipe.tags.map((tag) => normalizeDietaryText(tag))
    : [];

  return tagNames.some((tagName) => tags.includes(normalizeDietaryText(tagName)));
}

function getRecipeFeatureBadges(recipe) {
  const badges = [];
  const profile = getRecipeDietaryProfile(recipe);

  if (recipe.totalTime <= 15) {
    addFeatureBadge(badges, "Sehr schnell", "feature-tag feature-fast");
  } else if (recipe.totalTime <= 30 || hasRecipeTagForFeatures(recipe, ["schnell"])) {
    addFeatureBadge(badges, "Schnell", "feature-tag feature-fast");
  }

  if (profile.isVegan) {
    addFeatureBadge(badges, "Vegan", "feature-tag feature-vegan");
  } else if (profile.isVegetarian) {
    addFeatureBadge(badges, "Vegetarisch", "feature-tag feature-vegetarian");
  }

  if (profile.isDairyFree) {
    addFeatureBadge(badges, "Milchfrei", "feature-tag feature-dairy-free");
  }

  if (profile.isGlutenFree) {
    addFeatureBadge(badges, "Glutenfrei", "feature-tag feature-gluten-free");
  }

  if (recipeTextContainsForFeatures(recipe, ["pasta", "nudeln", "spaghetti", "tagliatelle", "penne"])) {
    addFeatureBadge(badges, "Pasta", "feature-tag feature-main");
  }

  if (recipeTextContainsForFeatures(recipe, ["reis", "risotto", "reissalat"])) {
    addFeatureBadge(badges, "Reis", "feature-tag feature-main");
  }

  if (recipe.category === "Suppe" || recipeTextContainsForFeatures(recipe, ["suppe", "eintopf", "brühe"])) {
    addFeatureBadge(badges, "Suppe", "feature-tag");
  }

  if (recipe.category === "Salat" || recipeTextContainsForFeatures(recipe, ["salat", "blattsalat"])) {
    addFeatureBadge(badges, "Salat", "feature-tag");
  }

  if (recipeTextContainsForFeatures(recipe, [
    "gemüse",
    "tomaten",
    "tomate",
    "zucchini",
    "paprika",
    "karotten",
    "karotte",
    "kartoffeln",
    "kartoffel",
    "gurke",
    "zwiebel",
    "knoblauch"
  ])) {
    addFeatureBadge(badges, "Gemüse", "feature-tag");
  }

  if (Array.isArray(recipe.ingredients) && recipe.ingredients.some((ingredient) => {
    return ingredient.amount !== null || ingredient.conversionNote;
  })) {
    addFeatureBadge(badges, "Metrisch analysiert", "feature-tag");
  }

  return badges.slice(0, 8);
}

function recipeMatchesFeatureFilter(recipe, featureValue) {
  if (featureValue === "all") {
    return true;
  }

  const featureBadges = getRecipeFeatureBadges(recipe).map((badge) => {
    return normalizeDietaryText(badge.label);
  });

  return featureBadges.includes(normalizeDietaryText(featureValue));
}

function hasLikelyMeatOrFish(recipe) {
  return getRecipeDietaryProfile(recipe).hasMeatOrFish;
}

function getSelectedOptionText(selectElement) {
  if (!selectElement || !selectElement.selectedOptions || !selectElement.selectedOptions[0]) {
    return "";
  }

  return selectElement.selectedOptions[0].textContent.trim();
}

function getActiveQuickFilterValue() {
  const activeButton = Array.from(activeFilterElements.quickFilterButtons).find((button) => {
    return button.classList.contains("active");
  });

  return activeButton ? activeButton.dataset.filter : "all";
}

function isFavoriteFilterActive() {
  if (!activeFilterElements.favoriteFilterButton) {
    return false;
  }

  return activeFilterElements.favoriteFilterButton.classList.contains("active") ||
    activeFilterElements.favoriteFilterButton.textContent.trim().toLowerCase().includes("alle rezepte anzeigen");
}

function createChip(label, type, className = "") {
  return {
    label,
    type,
    className
  };
}

function getActiveFilterChips() {
  const chips = [];
  const searchTerm = activeFilterElements.searchInput?.value.trim() || "";

  if (searchTerm) {
    chips.push(createChip(`Suche: ${searchTerm}`, "search", "active-filter-chip-search"));
  }

  if (activeFilterElements.categorySelect?.value && activeFilterElements.categorySelect.value !== "all") {
    chips.push(createChip(`Kategorie: ${getSelectedOptionText(activeFilterElements.categorySelect)}`, "category"));
  }

  if (activeFilterElements.difficultySelect?.value && activeFilterElements.difficultySelect.value !== "all") {
    chips.push(createChip(`Schwierigkeit: ${getSelectedOptionText(activeFilterElements.difficultySelect)}`, "difficulty"));
  }

  if (activeFilterElements.maxTimeSelect?.value && activeFilterElements.maxTimeSelect.value !== "all") {
    chips.push(createChip(getSelectedOptionText(activeFilterElements.maxTimeSelect), "time"));
  }

  if (activeFilterElements.sourceFilterSelect?.value && activeFilterElements.sourceFilterSelect.value !== "all") {
    chips.push(createChip(`Quelle: ${getSelectedOptionText(activeFilterElements.sourceFilterSelect)}`, "source"));
  }

  if (activeFilterElements.recipeTypeSelect?.value && activeFilterElements.recipeTypeSelect.value !== "all") {
    chips.push(createChip(getSelectedOptionText(activeFilterElements.recipeTypeSelect), "recipeType"));
  }

  if (activeFilterElements.featureFilterSelect?.value && activeFilterElements.featureFilterSelect.value !== "all") {
    chips.push(createChip(getSelectedOptionText(activeFilterElements.featureFilterSelect), "feature", "active-filter-chip-feature"));
  }

  const quickFilterValue = getActiveQuickFilterValue();

  if (quickFilterValue && quickFilterValue !== "all") {
    const quickFilterLabel = Array.from(activeFilterElements.quickFilterButtons)
      .find((button) => button.dataset.filter === quickFilterValue)
      ?.textContent.trim() || quickFilterValue;

    chips.push(createChip(`Schnellfilter: ${quickFilterLabel}`, "quick"));
  }

  if (isFavoriteFilterActive()) {
    chips.push(createChip("Nur Favoriten", "favorite", "active-filter-chip-favorite"));
  }

  return chips;
}

function renderActiveFilterChips() {
  if (!activeFilterElements.chipsContainer) {
    return;
  }

  const chips = getActiveFilterChips();

  activeFilterElements.chipsContainer.innerHTML = chips.map((chip) => {
    return `
      <button
        class="active-filter-chip ${chip.className}"
        type="button"
        data-filter-chip="${chip.type}"
        aria-label="Filter entfernen: ${escapeActiveFilterHtml(chip.label)}"
      >
        <span class="active-filter-chip-label">${escapeActiveFilterHtml(chip.label)}</span>
        <span class="active-filter-chip-remove" aria-hidden="true">×</span>
      </button>
    `;
  }).join("");
}

function escapeActiveFilterHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function dispatchInputChange(element) {
  if (!element) {
    return;
  }

  element.dispatchEvent(new Event("input", { bubbles: true }));
  element.dispatchEvent(new Event("change", { bubbles: true }));
}

function setQuickFilterToAll() {
  const allButton = Array.from(activeFilterElements.quickFilterButtons).find((button) => {
    return button.dataset.filter === "all";
  });

  if (allButton) {
    allButton.click();
  }
}

function clearFilterByType(type) {
  if (type === "search") {
    activeFilterElements.searchInput.value = "";
    dispatchInputChange(activeFilterElements.searchInput);
  }

  if (type === "category") {
    activeFilterElements.categorySelect.value = "all";
    dispatchInputChange(activeFilterElements.categorySelect);
  }

  if (type === "difficulty") {
    activeFilterElements.difficultySelect.value = "all";
    dispatchInputChange(activeFilterElements.difficultySelect);
  }

  if (type === "time") {
    activeFilterElements.maxTimeSelect.value = "all";
    dispatchInputChange(activeFilterElements.maxTimeSelect);
  }

  if (type === "source") {
    activeFilterElements.sourceFilterSelect.value = "all";
    dispatchInputChange(activeFilterElements.sourceFilterSelect);
  }

  if (type === "recipeType") {
    activeFilterElements.recipeTypeSelect.value = "all";
    dispatchInputChange(activeFilterElements.recipeTypeSelect);
  }

  if (type === "feature") {
    activeFilterElements.featureFilterSelect.value = "all";
    dispatchInputChange(activeFilterElements.featureFilterSelect);
  }

  if (type === "quick") {
    setQuickFilterToAll();
  }

  if (type === "favorite") {
    if (isFavoriteFilterActive()) {
      activeFilterElements.favoriteFilterButton.click();
    }
  }

  window.setTimeout(renderActiveFilterChips, 0);
}

function getStoredRecipeViewMode() {
  const storedMode = localStorage.getItem(RECIPE_VIEW_STORAGE_KEY);

  if (storedMode === "grid" || storedMode === "list") {
    return storedMode;
  }

  return "grid";
}

function setStoredRecipeViewMode(mode) {
  localStorage.setItem(RECIPE_VIEW_STORAGE_KEY, mode);
}

function createRecipeViewSwitcher() {
  if (document.getElementById("recipeViewSwitcher")) {
    return;
  }

  const switcher = document.createElement("div");
  switcher.id = "recipeViewSwitcher";
  switcher.className = "recipe-view-switcher";
  switcher.setAttribute("aria-label", "Rezeptansicht umschalten");

  switcher.innerHTML = `
    <button
      id="recipeGridViewButton"
      class="recipe-view-button"
      type="button"
      data-recipe-view="grid"
    >
      Große Karten
    </button>

    <button
      id="recipeListViewButton"
      class="recipe-view-button"
      type="button"
      data-recipe-view="list"
    >
      Kompakte Liste
    </button>
  `;

  if (activeFilterElements.chipsContainer) {
    activeFilterElements.chipsContainer.insertAdjacentElement("afterend", switcher);
    return;
  }

  if (activeFilterElements.recipeLibrary) {
    activeFilterElements.recipeLibrary.appendChild(switcher);
  }
}

function applyRecipeViewMode(mode) {
  if (!activeFilterElements.recipeGrid) {
    return;
  }

  const safeMode = mode === "list" ? "list" : "grid";

  activeFilterElements.recipeGrid.classList.toggle("recipe-list-view", safeMode === "list");
  setStoredRecipeViewMode(safeMode);
  updateRecipeViewButtons(safeMode);
}

function updateRecipeViewButtons(mode) {
  const gridButton = document.getElementById("recipeGridViewButton");
  const listButton = document.getElementById("recipeListViewButton");

  if (gridButton) {
    gridButton.classList.toggle("active", mode === "grid");
    gridButton.setAttribute("aria-pressed", String(mode === "grid"));
  }

  if (listButton) {
    listButton.classList.toggle("active", mode === "list");
    listButton.setAttribute("aria-pressed", String(mode === "list"));
  }
}

function setupRecipeViewSwitcher() {
  createRecipeViewSwitcher();

  const switcher = document.getElementById("recipeViewSwitcher");

  if (!switcher) {
    return;
  }

  switcher.addEventListener("click", (event) => {
    const button = event.target.closest("[data-recipe-view]");

    if (!button) {
      return;
    }

    applyRecipeViewMode(button.dataset.recipeView);
  });

  applyRecipeViewMode(getStoredRecipeViewMode());
}

function observeRecipeGridChanges() {
  if (!activeFilterElements.recipeGrid) {
    return;
  }

  const observer = new MutationObserver(() => {
    applyRecipeViewMode(getStoredRecipeViewMode());
  });

  observer.observe(activeFilterElements.recipeGrid, {
    childList: true
  });
}

function findActiveModalRecipe() {
  if (!activeFilterElements.modalTitle || typeof getAllRecipes !== "function") {
    return null;
  }

  const modalTitle = activeFilterElements.modalTitle.textContent.trim();

  if (!modalTitle) {
    return null;
  }

  return getAllRecipes().find((recipe) => recipe.title === modalTitle) || null;
}

function getDetailRecipeTypeLabel(recipe) {
  if (!recipe) {
    return "Unbekannt";
  }

  if (typeof getRecipeTypeConfig === "function") {
    return getRecipeTypeConfig(recipe).label;
  }

  if (recipe.isImported) {
    return "Importiert";
  }

  if (recipe.isCustom) {
    return "Eigenes Rezept";
  }

  return "Lokal";
}

function getDetailRecipeFeatureBadges(recipe) {
  if (!recipe) {
    return [];
  }

  return getRecipeFeatureBadges(recipe);
}

function getDetailRecipeSourceUrl(recipe) {
  if (!recipe || !recipe.sourceUrl) {
    return "";
  }

  try {
    const url = new URL(recipe.sourceUrl);

    if (url.protocol === "http:" || url.protocol === "https:") {
      return url.href;
    }

    return "";
  } catch {
    return "";
  }
}

function renderRecipeDetailInsights() {
  const recipe = findActiveModalRecipe();

  if (!recipe || !activeFilterElements.detailModal) {
    return;
  }

  const modalMeta = activeFilterElements.detailModal.querySelector(".modal-meta");

  if (!modalMeta) {
    return;
  }

  const existingPanel = document.getElementById("recipeDetailInsights");

  if (existingPanel) {
    existingPanel.remove();
  }

  const featureBadges = getDetailRecipeFeatureBadges(recipe);
  const typeLabel = getDetailRecipeTypeLabel(recipe);
  const sourceName = recipe.sourceName || activeFilterElements.modalSourceName?.textContent.trim() || "Unbekannte Quelle";
  const sourceUrl = getDetailRecipeSourceUrl(recipe);
  const sourceHost = sourceUrl ? new URL(sourceUrl).hostname.replace(/^www\./, "") : "Kein externer Link";
  const createdDate = recipe.createdAt
    ? new Date(recipe.createdAt).toLocaleDateString("de-DE")
    : "Unbekannt";

  const panel = document.createElement("section");
  panel.id = "recipeDetailInsights";
  panel.className = "recipe-detail-insights";
  panel.setAttribute("aria-label", "Rezept-Metadaten");

  panel.innerHTML = `
    <div class="recipe-detail-insights-header">
      <div class="recipe-detail-insights-title">
        <span>Rezeptprofil</span>
        <strong>${escapeActiveFilterHtml(typeLabel)} · ${escapeActiveFilterHtml(recipe.category)}</strong>
      </div>

      <span class="tag">${escapeActiveFilterHtml(recipe.totalTime)} Min.</span>
    </div>

    <div class="recipe-detail-source-grid">
      <div class="recipe-detail-source-item">
        <span>Quelle</span>
        <strong>${escapeActiveFilterHtml(sourceName)}</strong>
      </div>

      <div class="recipe-detail-source-item">
        <span>Original-Link</span>
        <strong>${escapeActiveFilterHtml(sourceHost)}</strong>
      </div>

      <div class="recipe-detail-source-item">
        <span>Rezepttyp</span>
        <strong>${escapeActiveFilterHtml(typeLabel)}</strong>
      </div>

      <div class="recipe-detail-source-item">
        <span>Erfasst am</span>
        <strong>${escapeActiveFilterHtml(createdDate)}</strong>
      </div>
    </div>

    ${
      featureBadges.length > 0
        ? `
          <div class="recipe-detail-feature-list" aria-label="Eigenschaften">
            ${featureBadges.map((badge) => {
              return `<span class="tag ${escapeActiveFilterHtml(badge.className || "feature-tag")}">${escapeActiveFilterHtml(badge.label)}</span>`;
            }).join("")}
          </div>
        `
        : ""
    }

    ${
      sourceUrl
        ? `
          <div class="recipe-detail-link-row">
            <a class="recipe-detail-origin-link" href="${escapeActiveFilterHtml(sourceUrl)}" target="_blank" rel="noopener noreferrer">
              Originalquelle öffnen
            </a>
          </div>
        `
        : ""
    }
  `;

  modalMeta.insertAdjacentElement("afterend", panel);
}

function setupRecipeDetailInsights() {
  if (!activeFilterElements.detailModal) {
    return;
  }

  activeFilterElements.recipeGrid?.addEventListener("click", (event) => {
    const detailButton = event.target.closest("[data-action='open-details']");

    if (!detailButton) {
      return;
    }

    window.setTimeout(renderRecipeDetailInsights, 0);
    window.setTimeout(renderRecipeDetailInsights, 120);
  });

  const observer = new MutationObserver(() => {
    if (!activeFilterElements.detailModal.classList.contains("hidden")) {
      window.setTimeout(renderRecipeDetailInsights, 0);
    }
  });

  observer.observe(activeFilterElements.detailModal, {
    attributes: true,
    attributeFilter: ["class"],
    childList: true,
    subtree: true
  });

  window.setTimeout(renderRecipeDetailInsights, 500);
}

function setupActiveFilterListeners() {
  const watchedElements = [
    activeFilterElements.searchInput,
    activeFilterElements.categorySelect,
    activeFilterElements.difficultySelect,
    activeFilterElements.maxTimeSelect,
    activeFilterElements.sourceFilterSelect,
    activeFilterElements.recipeTypeSelect,
    activeFilterElements.featureFilterSelect
  ].filter(Boolean);

  watchedElements.forEach((element) => {
    element.addEventListener("input", renderActiveFilterChips);
    element.addEventListener("change", renderActiveFilterChips);
  });

  activeFilterElements.quickFilterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      window.setTimeout(renderActiveFilterChips, 0);
    });
  });

  activeFilterElements.favoriteFilterButton?.addEventListener("click", () => {
    window.setTimeout(renderActiveFilterChips, 0);
  });

  activeFilterElements.resetFiltersButton?.addEventListener("click", () => {
    window.setTimeout(renderActiveFilterChips, 0);
  });

  activeFilterElements.chipsContainer?.addEventListener("click", (event) => {
    const chip = event.target.closest("[data-filter-chip]");

    if (!chip) {
      return;
    }

    clearFilterByType(chip.dataset.filterChip);
  });
}

function initializeActiveFilterChips() {
  injectActiveFilterStyles();
  setupActiveFilterListeners();
  setupRecipeViewSwitcher();
  observeRecipeGridChanges();
  setupRecipeDetailInsights();

  window.setTimeout(renderActiveFilterChips, 50);
  window.setTimeout(renderActiveFilterChips, 500);
  window.setTimeout(() => applyRecipeViewMode(getStoredRecipeViewMode()), 50);
  window.setTimeout(() => applyRecipeViewMode(getStoredRecipeViewMode()), 500);

  if (typeof renderRecipes === "function") {
    window.setTimeout(renderRecipes, 150);
  }
}

initializeActiveFilterChips();