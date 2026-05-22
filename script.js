const STORAGE_KEYS = {
  customRecipes: "rf_customRecipes",
  favorites: "rf_favorites",
  shoppingList: "rf_shoppingList",
  sources: "rf_sources",
  importLog: "rf_importLog"
};

const defaultSources = [
  {
    id: "source-demo-blog",
    name: "Beispiel-Foodblog",
    baseUrl: "https://example.com",
    status: "Aktiv",
    robotsAllowed: true,
    parserType: "JSON-LD Recipe",
    importFrequency: "Manuell",
    importedRecipeCount: 4,
    lastCheckedAt: "Heute",
    errorMessage: ""
  },
  {
    id: "source-family",
    name: "Eigene Sammlung",
    baseUrl: "Lokal",
    status: "Aktiv",
    robotsAllowed: true,
    parserType: "Manuell",
    importFrequency: "Manuell",
    importedRecipeCount: 2,
    lastCheckedAt: "Heute",
    errorMessage: ""
  }
];

const defaultRecipes = [
  {
    id: "recipe-pasta",
    title: "Vegetarische Pasta",
    description: "Schnelles Pasta-Gericht mit Gemüse, Tomaten und Kräutern.",
    sourceId: "source-demo-blog",
    sourceName: "Beispiel-Foodblog",
    sourceUrl: "https://example.com",
    category: "Hauptgericht",
    difficulty: "Einfach",
    servings: 2,
    totalTime: 25,
    tags: ["vegetarisch", "schnell", "pasta", "tomaten"],
    icon: "🍝",
    imageClass: "image-pasta",
    isCustom: false,
    isImported: true,
    createdAt: "2026-01-01T10:00:00.000Z",
    ingredients: [
      createIngredient("200 g Pasta"),
      createIngredient("250 g gehackte Tomaten"),
      createIngredient("1 EL Olivenöl"),
      createIngredient("1 Stück Zucchini"),
      createIngredient("1 Stück Paprika"),
      createIngredient("Salz nach Geschmack"),
      createIngredient("Pfeffer nach Geschmack")
    ]
  },
  {
    id: "recipe-rice-salad",
    title: "Schneller Reissalat",
    description: "Frischer Salat mit Reis, Gurke, Tomaten und leichtem Dressing.",
    sourceId: "source-demo-blog",
    sourceName: "Beispiel-Foodblog",
    sourceUrl: "https://example.com",
    category: "Salat",
    difficulty: "Einfach",
    servings: 2,
    totalTime: 20,
    tags: ["vegetarisch", "reis", "schnell", "salat"],
    icon: "🥗",
    imageClass: "image-salad",
    isCustom: false,
    isImported: true,
    createdAt: "2026-01-02T10:00:00.000Z",
    ingredients: [
      createIngredient("180 g Reis"),
      createIngredient("1 Stück Gurke"),
      createIngredient("200 g Tomaten"),
      createIngredient("150 g Mais"),
      createIngredient("2 EL Olivenöl"),
      createIngredient("1 EL Zitronensaft"),
      createIngredient("Salz nach Geschmack")
    ]
  },
  {
    id: "recipe-curry",
    title: "Veganes Curry",
    description: "Cremiges Curry mit Kokosmilch, Gemüse und Gewürzen.",
    sourceId: "source-demo-blog",
    sourceName: "Beispiel-Foodblog",
    sourceUrl: "https://example.com",
    category: "Hauptgericht",
    difficulty: "Mittel",
    servings: 2,
    totalTime: 35,
    tags: ["vegan", "curry", "reis", "gemüse"],
    icon: "🍛",
    imageClass: "image-curry",
    isCustom: false,
    isImported: true,
    createdAt: "2026-01-03T10:00:00.000Z",
    ingredients: [
      createIngredient("200 g Reis"),
      createIngredient("400 ml Kokosmilch"),
      createIngredient("250 g Kartoffeln"),
      createIngredient("200 g Karotten"),
      createIngredient("1 EL Currypulver"),
      createIngredient("1 TL Ingwer"),
      createIngredient("Salz nach Geschmack")
    ]
  },
  {
    id: "recipe-soup",
    title: "Tomatensuppe",
    description: "Einfache Suppe mit Tomaten, Zwiebeln, Knoblauch und Basilikum.",
    sourceId: "source-demo-blog",
    sourceName: "Beispiel-Foodblog",
    sourceUrl: "https://example.com",
    category: "Suppe",
    difficulty: "Einfach",
    servings: 2,
    totalTime: 30,
    tags: ["vegan", "suppe", "tomate", "schnell"],
    icon: "🍅",
    imageClass: "image-soup",
    isCustom: false,
    isImported: true,
    createdAt: "2026-01-04T10:00:00.000Z",
    ingredients: [
      createIngredient("500 g Tomaten"),
      createIngredient("1 Stück Zwiebel"),
      createIngredient("1 Stück Knoblauchzehe"),
      createIngredient("250 ml Gemüsebrühe"),
      createIngredient("1 EL Olivenöl"),
      createIngredient("Basilikum nach Geschmack")
    ]
  },
  {
    id: "recipe-chicken-rice",
    title: "Hähnchen-Reis-Pfanne",
    description: "Herzhafte Pfanne mit Reis, Gemüse und Hähnchen.",
    sourceId: "source-family",
    sourceName: "Eigene Sammlung",
    sourceUrl: "",
    category: "Hauptgericht",
    difficulty: "Mittel",
    servings: 2,
    totalTime: 40,
    tags: ["reis", "hähnchen", "pfanne"],
    icon: "🍚",
    imageClass: "image-rice",
    isCustom: false,
    isImported: false,
    createdAt: "2026-01-05T10:00:00.000Z",
    ingredients: [
      createIngredient("200 g Hähnchen"),
      createIngredient("180 g Reis"),
      createIngredient("1 Stück Paprika"),
      createIngredient("100 g Erbsen"),
      createIngredient("1 Stück Zwiebel"),
      createIngredient("1 EL Öl zum Anbraten"),
      createIngredient("Salz nach Geschmack")
    ]
  },
  {
    id: "recipe-cucumber-salad",
    title: "Gurkensalat",
    description: "Klassischer, schneller Salat mit Gurke, Joghurt und Dill.",
    sourceId: "source-family",
    sourceName: "Eigene Sammlung",
    sourceUrl: "",
    category: "Salat",
    difficulty: "Einfach",
    servings: 2,
    totalTime: 10,
    tags: ["salat", "schnell", "frisch", "vegetarisch"],
    icon: "🥒",
    imageClass: "image-salad",
    isCustom: false,
    isImported: false,
    createdAt: "2026-01-06T10:00:00.000Z",
    ingredients: [
      createIngredient("1 Stück Gurke"),
      createIngredient("150 g Joghurt"),
      createIngredient("1 EL Zitronensaft"),
      createIngredient("1 Bund Dill"),
      createIngredient("Salz nach Geschmack"),
      createIngredient("Pfeffer nach Geschmack")
    ]
  }
];

const elements = {
  navButtons: document.querySelectorAll(".nav-button"),
  recipesView: document.getElementById("recipesView"),
  sourcesView: document.getElementById("sourcesView"),
  shoppingView: document.getElementById("shoppingView"),

  totalRecipeCount: document.getElementById("totalRecipeCount"),
  favoriteCount: document.getElementById("favoriteCount"),
  sourceCount: document.getElementById("sourceCount"),
  shoppingCount: document.getElementById("shoppingCount"),

  searchInput: document.getElementById("searchInput"),
  sortSelect: document.getElementById("sortSelect"),
  categorySelect: document.getElementById("categorySelect"),
  difficultySelect: document.getElementById("difficultySelect"),
  maxTimeSelect: document.getElementById("maxTimeSelect"),
  resetFiltersButton: document.getElementById("resetFiltersButton"),
  quickFilterButtons: document.querySelectorAll(".quick-filter"),
  favoriteFilterButton: document.getElementById("favoriteFilterButton"),
  openShoppingButton: document.getElementById("openShoppingButton"),
  recipeGrid: document.getElementById("recipeGrid"),
  resultCount: document.getElementById("resultCount"),

  detailModal: document.getElementById("detailModal"),
  modalImage: document.getElementById("modalImage"),
  modalCategory: document.getElementById("modalCategory"),
  modalTitle: document.getElementById("modalTitle"),
  modalDescription: document.getElementById("modalDescription"),
  modalTime: document.getElementById("modalTime"),
  modalDifficulty: document.getElementById("modalDifficulty"),
  modalSourceName: document.getElementById("modalSourceName"),
  servingInfo: document.getElementById("servingInfo"),
  currentServings: document.getElementById("currentServings"),
  decreaseServingsButton: document.getElementById("decreaseServingsButton"),
  increaseServingsButton: document.getElementById("increaseServingsButton"),
  toggleOriginalIngredientsButton: document.getElementById("toggleOriginalIngredientsButton"),
  modalIngredients: document.getElementById("modalIngredients"),
  modalShoppingButton: document.getElementById("modalShoppingButton"),
  modalFavoriteButton: document.getElementById("modalFavoriteButton"),
  modalDeleteButton: document.getElementById("modalDeleteButton"),
  modalSource: document.getElementById("modalSource"),

  openAddRecipeButton: document.getElementById("openAddRecipeButton"),
  addRecipeModal: document.getElementById("addRecipeModal"),
  addRecipeForm: document.getElementById("addRecipeForm"),
  newRecipeTitle: document.getElementById("newRecipeTitle"),
  newRecipeDescription: document.getElementById("newRecipeDescription"),
  newRecipeCategory: document.getElementById("newRecipeCategory"),
  newRecipeDifficulty: document.getElementById("newRecipeDifficulty"),
  newRecipeServings: document.getElementById("newRecipeServings"),
  newRecipeTime: document.getElementById("newRecipeTime"),
  newRecipeIcon: document.getElementById("newRecipeIcon"),
  newRecipeIngredients: document.getElementById("newRecipeIngredients"),
  newRecipeTags: document.getElementById("newRecipeTags"),
  newRecipeSourceUrl: document.getElementById("newRecipeSourceUrl"),

  shoppingListItems: document.getElementById("shoppingListItems"),
  clearShoppingListButton: document.getElementById("clearShoppingListButton"),
  manualShoppingForm: document.getElementById("manualShoppingForm"),
  manualShoppingInput: document.getElementById("manualShoppingInput"),

  sourceList: document.getElementById("sourceList"),
  openAddSourceButton: document.getElementById("openAddSourceButton"),
  addSourceModal: document.getElementById("addSourceModal"),
  addSourceForm: document.getElementById("addSourceForm"),
  newSourceName: document.getElementById("newSourceName"),
  newSourceUrl: document.getElementById("newSourceUrl"),
  newSourceFrequency: document.getElementById("newSourceFrequency"),
  importLog: document.getElementById("importLog"),
  runImportSimulationButton: document.getElementById("runImportSimulationButton"),
  openImportDemoButton: document.getElementById("openImportDemoButton"),

  toast: document.getElementById("toast")
};

let customRecipes = loadJson(STORAGE_KEYS.customRecipes, loadJson("customRecipes", []));
let favorites = loadJson(STORAGE_KEYS.favorites, loadJson("favorites", []));
let shoppingList = loadJson(STORAGE_KEYS.shoppingList, loadJson("shoppingList", []));
let sources = loadJson(STORAGE_KEYS.sources, defaultSources);
let importLog = loadJson(STORAGE_KEYS.importLog, []);

let showOnlyFavorites = false;
let activeQuickFilter = "all";
let activeRecipeId = null;
let activeServings = 2;
let showOriginalIngredients = false;

customRecipes = customRecipes.map(normalizeRecipe);
sources = sources.map(normalizeSource);
shoppingList = shoppingList.map(normalizeShoppingItem);

function loadJson(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function saveJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.remove("hidden");

  window.clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => {
    elements.toast.classList.add("hidden");
  }, 2600);
}

function getAllRecipes() {
  return [...defaultRecipes, ...customRecipes].map(normalizeRecipe);
}

function normalizeRecipe(recipe) {
  const icon = recipe.icon || "🍽️";

  return {
    id: recipe.id || `recipe-${Date.now()}`,
    title: recipe.title || "Unbenanntes Rezept",
    description: recipe.description || "",
    sourceId: recipe.sourceId || "",
    sourceName: recipe.sourceName || (recipe.isCustom ? "Eigenes Rezept" : "Unbekannte Quelle"),
    sourceUrl: recipe.sourceUrl || "",
    category: recipe.category || "Hauptgericht",
    difficulty: recipe.difficulty || "Einfach",
    servings: Number(recipe.servings || 2),
    totalTime: Number(recipe.totalTime || recipe.time || 30),
    tags: Array.isArray(recipe.tags) ? recipe.tags : [],
    icon,
    imageClass: recipe.imageClass || getImageClassFromIcon(icon),
    isCustom: Boolean(recipe.isCustom),
    isImported: Boolean(recipe.isImported),
    createdAt: recipe.createdAt || new Date().toISOString(),
    ingredients: normalizeIngredients(recipe.ingredients || [])
  };
}

function normalizeSource(source) {
  return {
    id: source.id || `source-${Date.now()}`,
    name: source.name || "Unbenannte Quelle",
    baseUrl: source.baseUrl || source.url || "",
    status: source.status || "Aktiv",
    robotsAllowed: source.robotsAllowed !== false,
    parserType: source.parserType || "Prüfung erforderlich",
    importFrequency: source.importFrequency || "Manuell",
    importedRecipeCount: Number(source.importedRecipeCount || 0),
    lastCheckedAt: source.lastCheckedAt || "Noch nicht geprüft",
    errorMessage: source.errorMessage || ""
  };
}

function normalizeShoppingItem(item) {
  return {
    id: item.id || `shopping-${Date.now()}`,
    food: item.food || item.name || "Unbekannte Zutat",
    amount: item.amount === null || item.amount === undefined ? null : Number(item.amount),
    unit: item.unit || "",
    checked: Boolean(item.checked),
    note: item.note || "",
    sourceRecipeIds: Array.isArray(item.sourceRecipeIds) ? item.sourceRecipeIds : []
  };
}

function normalizeIngredients(ingredients) {
  return ingredients.map((ingredient) => {
    if (typeof ingredient === "string") {
      return createIngredient(ingredient);
    }

    if (ingredient.originalText || ingredient.original_text) {
      return {
        id: ingredient.id || `ingredient-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        originalText: ingredient.originalText || ingredient.original_text || "",
        amount: ingredient.amount === null || ingredient.amount === undefined ? null : Number(ingredient.amount),
        unit: normalizeUnit(ingredient.unit || ""),
        food: ingredient.food || "",
        normalizedFood: normalizeFoodName(ingredient.normalizedFood || ingredient.normalized_food || ingredient.food || ""),
        preparation: ingredient.preparation || "",
        note: ingredient.note || "",
        scalable: ingredient.scalable !== false,
        scalingGroup: ingredient.scalingGroup || ingredient.scaling_group || "normal",
        conversionNote: ingredient.conversionNote || ingredient.conversion_note || ""
      };
    }

    return createIngredient(String(ingredient));
  });
}

function createIngredient(line) {
  return parseIngredientLine(line);
}

function parseIngredientLine(line) {
  const originalText = String(line || "").trim();
  const lower = originalText.toLowerCase();

  const qualitativePatterns = [
    "nach geschmack",
    "zum abschmecken",
    "zum servieren",
    "zum garnieren"
  ];

  const cookingMediumPatterns = [
    "zum anbraten",
    "zum braten",
    "zum kochen",
    "für die form"
  ];

  let scalable = true;
  let scalingGroup = "normal";
  let note = "";
  let amount = null;
  let unit = "";
  let foodText = originalText;

  if (qualitativePatterns.some((pattern) => lower.includes(pattern))) {
    scalable = false;
    scalingGroup = "qualitative";
    note = getMatchedPattern(originalText, qualitativePatterns);
  }

  if (cookingMediumPatterns.some((pattern) => lower.includes(pattern))) {
    scalable = false;
    scalingGroup = "cooking_medium";
    note = getMatchedPattern(originalText, cookingMediumPatterns);
  }

  const amountMatch = originalText.match(
    /^(\d+(?:[,.]\d+)?|\d+\/\d+)\s*(kg|g|gramm|ml|l|liter|tl|teelöffel|el|esslöffel|stück|stk\.?|prise|prisen|bund|dose|dosen|packung|packungen|cup|cups|oz)?\s+(.+)$/i
  );

  if (amountMatch) {
    amount = parseAmount(amountMatch[1]);
    unit = normalizeUnit(amountMatch[2] || "");
    foodText = amountMatch[3].trim();
  }

  if (unit === "Prise") {
    scalable = false;
    scalingGroup = "spice";
  }

  if (!unit && amount !== null) {
    const lowerFood = foodText.toLowerCase();

    if (lowerFood.startsWith("ei") || lowerFood.startsWith("eier")) {
      unit = "Stück";
      foodText = "Ei";
    }
  }

  const converted = convertToMetric(amount, unit, foodText);

  amount = converted.amount;
  unit = converted.unit;

  if (converted.conversionNote) {
    note = note ? `${note}; ${converted.conversionNote}` : converted.conversionNote;
  }

  const preparation = detectPreparation(foodText);
  const food = cleanFoodName(foodText);
  const normalizedFood = normalizeFoodName(food);

  return {
    id: `ingredient-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    originalText,
    amount,
    unit,
    food,
    normalizedFood,
    preparation,
    note,
    scalable,
    scalingGroup,
    conversionNote: converted.conversionNote || ""
  };
}

function parseAmount(value) {
  const clean = String(value).trim().replace(",", ".");

  if (clean.includes("/")) {
    const [numerator, denominator] = clean.split("/").map(Number);
    return denominator ? numerator / denominator : null;
  }

  const number = Number(clean);
  return Number.isFinite(number) ? number : null;
}

function normalizeUnit(unit) {
  const clean = String(unit || "").trim().toLowerCase();

  const unitMap = {
    kg: "kg",
    g: "g",
    gramm: "g",
    ml: "ml",
    l: "l",
    liter: "l",
    tl: "TL",
    teelöffel: "TL",
    el: "EL",
    esslöffel: "EL",
    stück: "Stück",
    stk: "Stück",
    "stk.": "Stück",
    prise: "Prise",
    prisen: "Prise",
    bund: "Bund",
    dose: "Dose",
    dosen: "Dose",
    packung: "Packung",
    packungen: "Packung",
    cup: "cup",
    cups: "cup",
    oz: "oz"
  };

  return unitMap[clean] || unit || "";
}

function convertToMetric(amount, unit, foodText) {
  if (amount === null) {
    return {
      amount,
      unit,
      conversionNote: ""
    };
  }

  const normalizedFood = normalizeFoodName(foodText);

  if (unit === "oz") {
    return {
      amount: amount * 28,
      unit: "g",
      conversionNote: "oz wurde metrisch in g umgerechnet"
    };
  }

  if (unit === "cup") {
    if (["Wasser", "Milch", "Gemüsebrühe", "Brühe"].includes(normalizedFood)) {
      return {
        amount: amount * 240,
        unit: "ml",
        conversionNote: "cup wurde abhängig vom Lebensmittel in ml umgerechnet"
      };
    }

    if (["Mehl", "Weizenmehl"].includes(normalizedFood)) {
      return {
        amount: amount * 120,
        unit: "g",
        conversionNote: "cup Mehl wurde mit 120 g pro cup umgerechnet"
      };
    }

    if (["Zucker"].includes(normalizedFood)) {
      return {
        amount: amount * 200,
        unit: "g",
        conversionNote: "cup Zucker wurde mit 200 g pro cup umgerechnet"
      };
    }

    return {
      amount: amount * 240,
      unit: "ml",
      conversionNote: "cup wurde näherungsweise in ml umgerechnet"
    };
  }

  return {
    amount,
    unit,
    conversionNote: ""
  };
}

function getMatchedPattern(text, patterns) {
  const lower = text.toLowerCase();
  return patterns.find((pattern) => lower.includes(pattern)) || "";
}

function detectPreparation(foodText) {
  const lower = foodText.toLowerCase();

  const preparationMap = [
    { pattern: "gehackte", value: "gehackt" },
    { pattern: "gehackt", value: "gehackt" },
    { pattern: "geriebene", value: "gerieben" },
    { pattern: "gerieben", value: "gerieben" },
    { pattern: "gewürfelt", value: "gewürfelt" },
    { pattern: "geschnitten", value: "geschnitten" },
    { pattern: "frisch", value: "frisch" }
  ];

  const match = preparationMap.find((item) => lower.includes(item.pattern));
  return match ? match.value : "";
}

function cleanFoodName(foodText) {
  return String(foodText || "")
    .replace(/\bgehackte\b/gi, "")
    .replace(/\bgehackt\b/gi, "")
    .replace(/\bgeriebene\b/gi, "")
    .replace(/\bgerieben\b/gi, "")
    .replace(/\bgewürfelt\b/gi, "")
    .replace(/\bgeschnitten\b/gi, "")
    .replace(/\bfrisch(e|er|es|en)?\b/gi, "")
    .replace(/\bnach Geschmack\b/gi, "")
    .replace(/\bzum Anbraten\b/gi, "")
    .replace(/\bzum Braten\b/gi, "")
    .replace(/\bzum Kochen\b/gi, "")
    .trim();
}

function normalizeFoodName(foodText) {
  const clean = cleanFoodName(foodText)
    .toLowerCase()
    .replace(/[.,;:!?]/g, "")
    .trim();

  const synonymMap = {
    tomate: "Tomaten",
    tomaten: "Tomaten",
    paradeiser: "Tomaten",
    pasta: "Nudeln",
    spaghetti: "Nudeln",
    nudel: "Nudeln",
    nudeln: "Nudeln",
    mehl: "Weizenmehl",
    weizenmehl: "Weizenmehl",
    reis: "Reis",
    olivenöl: "Olivenöl",
    öl: "Öl",
    zucker: "Zucker",
    wasser: "Wasser",
    milch: "Milch",
    gemüsebrühe: "Gemüsebrühe",
    brühe: "Gemüsebrühe",
    hähnchen: "Hähnchen",
    huhn: "Hähnchen",
    ei: "Ei",
    eier: "Ei",
    kartoffel: "Kartoffeln",
    kartoffeln: "Kartoffeln",
    paprika: "Paprika",
    zwiebel: "Zwiebeln",
    zwiebeln: "Zwiebeln",
    knoblauch: "Knoblauch",
    knoblauchzehe: "Knoblauch",
    gurke: "Gurke",
    karotte: "Karotten",
    karotten: "Karotten"
  };

  return synonymMap[clean] || capitalizeFirst(cleanFoodName(foodText));
}

function capitalizeFirst(value) {
  const clean = String(value || "").trim();

  if (!clean) {
    return "";
  }

  return clean.charAt(0).toUpperCase() + clean.slice(1);
}

function getImageClassFromIcon(icon) {
  const iconMap = {
    "🍝": "image-pasta",
    "🥗": "image-salad",
    "🍛": "image-curry",
    "🍅": "image-soup",
    "🍚": "image-rice",
    "🍰": "image-dessert",
    "🥪": "image-snack"
  };

  return iconMap[icon] || "image-default";
}

function getSafeUrl(url) {
  if (!url) {
    return "#";
  }

  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:") {
      return parsedUrl.href;
    }

    return "#";
  } catch {
    return "#";
  }
}

function isFavorite(recipeId) {
  return favorites.includes(recipeId);
}

function saveFavorites() {
  saveJson(STORAGE_KEYS.favorites, favorites);
}

function saveCustomRecipes() {
  saveJson(STORAGE_KEYS.customRecipes, customRecipes);
}

function saveShoppingList() {
  saveJson(STORAGE_KEYS.shoppingList, shoppingList);
}

function saveSources() {
  saveJson(STORAGE_KEYS.sources, sources);
}

function saveImportLog() {
  saveJson(STORAGE_KEYS.importLog, importLog);
}

function setView(viewName) {
  const viewMap = {
    recipes: elements.recipesView,
    sources: elements.sourcesView,
    shopping: elements.shoppingView
  };

  Object.entries(viewMap).forEach(([name, view]) => {
    view.classList.toggle("active-view", name === viewName);
  });

  elements.navButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.view === viewName);
  });

  if (viewName === "shopping") {
    renderShoppingList();
  }

  if (viewName === "sources") {
    renderSources();
    renderImportLog();
  }

  window.scrollTo({
    top: document.querySelector(".container").offsetTop - 12,
    behavior: "smooth"
  });
}

function getFilteredRecipes() {
  const recipes = getAllRecipes();
  const searchTerm = elements.searchInput.value.toLowerCase().trim();
  const sortValue = elements.sortSelect.value;
  const categoryValue = elements.categorySelect.value;
  const difficultyValue = elements.difficultySelect.value;
  const maxTimeValue = elements.maxTimeSelect.value;

  let filteredRecipes = recipes.filter((recipe) => {
    const searchableText = [
      recipe.title,
      recipe.description,
      recipe.category,
      recipe.difficulty,
      recipe.sourceName,
      ...recipe.tags,
      ...recipe.ingredients.map((ingredient) => ingredient.food),
      ...recipe.ingredients.map((ingredient) => ingredient.normalizedFood)
    ].join(" ").toLowerCase();

    const matchesSearch = !searchTerm || searchableText.includes(searchTerm);
    const matchesCategory = categoryValue === "all" || recipe.category === categoryValue;
    const matchesDifficulty = difficultyValue === "all" || recipe.difficulty === difficultyValue;
    const matchesTime = maxTimeValue === "all" || recipe.totalTime <= Number(maxTimeValue);
    const matchesFavorite = !showOnlyFavorites || isFavorite(recipe.id);
    const matchesQuickFilter = activeQuickFilter === "all" || searchableText.includes(activeQuickFilter);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesDifficulty &&
      matchesTime &&
      matchesFavorite &&
      matchesQuickFilter
    );
  });

  if (sortValue === "time") {
    filteredRecipes.sort((a, b) => a.totalTime - b.totalTime);
  }

  if (sortValue === "title") {
    filteredRecipes.sort((a, b) => a.title.localeCompare(b.title, "de"));
  }

  if (sortValue === "newest") {
    filteredRecipes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  return filteredRecipes;
}

function renderRecipes() {
  const filteredRecipes = getFilteredRecipes();

  elements.resultCount.textContent =
    filteredRecipes.length === 1
      ? "1 Rezept gefunden"
      : `${filteredRecipes.length} Rezepte gefunden`;

  elements.favoriteFilterButton.textContent = showOnlyFavorites
    ? "Alle Rezepte anzeigen"
    : "Nur Favoriten anzeigen";

  elements.favoriteFilterButton.classList.toggle("active", showOnlyFavorites);

  elements.recipeGrid.innerHTML = "";

  if (filteredRecipes.length === 0) {
    elements.recipeGrid.innerHTML = `
      <div class="empty">
        Keine passenden Rezepte gefunden. Passe Suche oder Filter an.
      </div>
    `;
    updateDashboard();
    return;
  }

  filteredRecipes.forEach((recipe) => {
    const sourceUrl = getSafeUrl(recipe.sourceUrl);
    const sourceLink = sourceUrl === "#"
      ? ""
      : `
        <a class="source-link" href="${escapeHtml(sourceUrl)}" target="_blank" rel="noopener noreferrer">
          Originalquelle öffnen
        </a>
      `;

    const recipeTypeTag = recipe.isCustom
      ? `<span class="tag user-tag">Eigenes Rezept</span>`
      : recipe.isImported
        ? `<span class="tag import-tag">Importiert</span>`
        : `<span class="tag">Lokal</span>`;

    const ingredientPreview = recipe.ingredients
      .slice(0, 3)
      .map((ingredient) => ingredient.normalizedFood || ingredient.food)
      .join(", ");

    const card = document.createElement("article");
    card.className = "recipe-card";

    card.innerHTML = `
      <div class="recipe-image ${escapeHtml(recipe.imageClass)}">
        ${escapeHtml(recipe.icon)}
      </div>

      <div class="recipe-card-content">
        <div class="card-header">
          <span class="tag">${escapeHtml(recipe.category)}</span>

          <button
            class="favorite-button"
            type="button"
            data-action="toggle-favorite"
            data-recipe-id="${escapeHtml(recipe.id)}"
            aria-label="Favorit umschalten"
          >
            ${isFavorite(recipe.id) ? "★" : "☆"}
          </button>
        </div>

        <h3>${escapeHtml(recipe.title)}</h3>

        <p>${escapeHtml(recipe.description)}</p>

        <div class="meta">
          ${recipeTypeTag}
          <span class="tag">${escapeHtml(recipe.totalTime)} Min.</span>
          <span class="tag">${escapeHtml(recipe.servings)} Portionen</span>
          <span class="tag">${escapeHtml(recipe.difficulty)}</span>
          ${recipe.tags.slice(0, 3).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
        </div>

        <div class="ingredients-preview">
          <strong>Zutaten:</strong> ${escapeHtml(ingredientPreview)}
        </div>

        <div class="card-actions">
          <button
            class="detail-button"
            type="button"
            data-action="open-details"
            data-recipe-id="${escapeHtml(recipe.id)}"
          >
            Details anzeigen
          </button>

          ${sourceLink}
        </div>
      </div>
    `;

    elements.recipeGrid.appendChild(card);
  });

  updateDashboard();
}

function resetFilters() {
  elements.searchInput.value = "";
  elements.sortSelect.value = "relevance";
  elements.categorySelect.value = "all";
  elements.difficultySelect.value = "all";
  elements.maxTimeSelect.value = "all";
  showOnlyFavorites = false;
  setQuickFilter("all");
  renderRecipes();
  showToast("Filter wurden zurückgesetzt.");
}

function setQuickFilter(filterValue) {
  activeQuickFilter = filterValue;

  elements.quickFilterButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.filter === filterValue);
  });
}

function toggleFavorite(recipeId) {
  if (isFavorite(recipeId)) {
    favorites = favorites.filter((id) => id !== recipeId);
    showToast("Aus Favoriten entfernt.");
  } else {
    favorites.push(recipeId);
    showToast("Als Favorit gespeichert.");
  }

  saveFavorites();
  renderRecipes();

  if (activeRecipeId === recipeId) {
    updateModalFavoriteButton(recipeId);
  }
}

function openRecipeDetails(recipeId) {
  const recipe = getAllRecipes().find((item) => item.id === recipeId);

  if (!recipe) {
    return;
  }

  activeRecipeId = recipe.id;
  activeServings = recipe.servings;
  showOriginalIngredients = false;

  elements.modalImage.textContent = recipe.icon;
  elements.modalImage.className = `modal-image ${recipe.imageClass}`;
  elements.modalCategory.textContent = recipe.isCustom
    ? `${recipe.category} · Eigenes Rezept`
    : recipe.isImported
      ? `${recipe.category} · Importiert`
      : recipe.category;

  elements.modalTitle.textContent = recipe.title;
  elements.modalDescription.textContent = recipe.description;
  elements.modalTime.textContent = `${recipe.totalTime} Min.`;
  elements.modalDifficulty.textContent = recipe.difficulty;
  elements.modalSourceName.textContent = recipe.sourceName;
  elements.modalSource.href = getSafeUrl(recipe.sourceUrl);

  if (getSafeUrl(recipe.sourceUrl) === "#") {
    elements.modalSource.classList.add("hidden");
  } else {
    elements.modalSource.classList.remove("hidden");
  }

  if (recipe.isCustom) {
    elements.modalDeleteButton.classList.remove("hidden");
  } else {
    elements.modalDeleteButton.classList.add("hidden");
  }

  updateModalFavoriteButton(recipe.id);
  renderServingControls();
  renderModalIngredients();
  openModal(elements.detailModal);
}

function renderServingControls() {
  const recipe = getAllRecipes().find((item) => item.id === activeRecipeId);

  if (!recipe) {
    return;
  }

  elements.currentServings.textContent = activeServings;
  elements.servingInfo.textContent = `Original: ${recipe.servings} ${recipe.servings === 1 ? "Portion" : "Portionen"}`;

  elements.decreaseServingsButton.disabled = activeServings <= 1;
  elements.increaseServingsButton.disabled = activeServings >= 20;
}

function changeServings(direction) {
  activeServings = Math.min(20, Math.max(1, activeServings + direction));
  renderServingControls();
  renderModalIngredients();
}

function updateModalFavoriteButton(recipeId) {
  elements.modalFavoriteButton.textContent = isFavorite(recipeId)
    ? "Aus Favoriten entfernen"
    : "Als Favorit speichern";
}

function renderModalIngredients() {
  const recipe = getAllRecipes().find((item) => item.id === activeRecipeId);

  if (!recipe) {
    return;
  }

  elements.toggleOriginalIngredientsButton.textContent = showOriginalIngredients
    ? "Normalisiert anzeigen"
    : "Original anzeigen";

  elements.modalIngredients.innerHTML = "";

  recipe.ingredients.forEach((ingredient) => {
    const scaledIngredient = getScaledIngredient(ingredient, recipe.servings, activeServings);

    const item = document.createElement("li");
    item.className = "ingredient-item";

    const note = showOriginalIngredients
      ? `Original: ${ingredient.originalText}`
      : getIngredientNote(ingredient, scaledIngredient);

    item.innerHTML = `
      <div class="ingredient-main">
        <span>${escapeHtml(formatIngredientLabel(scaledIngredient))}</span>
        <span>${escapeHtml(scaledIngredient.scalable ? "skalierbar" : "fix")}</span>
      </div>

      ${note ? `<span class="ingredient-note">${escapeHtml(note)}</span>` : ""}
    `;

    elements.modalIngredients.appendChild(item);
  });
}

function getIngredientNote(original, scaled) {
  const notes = [];

  if (original.preparation) {
    notes.push(`Zubereitung: ${original.preparation}`);
  }

  if (original.note) {
    notes.push(original.note);
  }

  if (!scaled.scalable) {
    notes.push("wird nicht automatisch skaliert");
  }

  if (original.conversionNote) {
    notes.push(original.conversionNote);
  }

  return notes.join(" · ");
}

function getScaledIngredient(ingredient, originalServings, targetServings) {
  const scaleFactor = targetServings / originalServings;

  if (!ingredient.scalable || ingredient.amount === null) {
    return {
      ...ingredient,
      scaledAmount: ingredient.amount,
      scaledUnit: ingredient.unit
    };
  }

  const rawAmount = ingredient.amount * scaleFactor;
  const normalized = normalizeDisplayUnit(rawAmount, ingredient.unit);

  return {
    ...ingredient,
    scaledAmount: normalized.amount,
    scaledUnit: normalized.unit
  };
}

function normalizeDisplayUnit(amount, unit) {
  if (unit === "g" && amount >= 1000) {
    return {
      amount: amount / 1000,
      unit: "kg"
    };
  }

  if (unit === "ml" && amount >= 1000) {
    return {
      amount: amount / 1000,
      unit: "l"
    };
  }

  if (unit === "TL" && amount >= 3) {
    return {
      amount: amount / 3,
      unit: "EL"
    };
  }

  return {
    amount,
    unit
  };
}

function formatIngredientLabel(ingredient) {
  const amount = ingredient.scaledAmount ?? ingredient.amount;
  const unit = ingredient.scaledUnit ?? ingredient.unit;

  if (amount === null || amount === undefined || !unit) {
    if (ingredient.note) {
      return `${ingredient.food} ${ingredient.note}`.trim();
    }

    return ingredient.food;
  }

  return `${formatAmount(amount, unit)} ${unit} ${ingredient.food}`.trim();
}

function formatAmount(amount, unit) {
  if (amount === null || amount === undefined) {
    return "";
  }

  if (["g", "ml"].includes(unit)) {
    const rounded = amount >= 100 ? Math.round(amount / 5) * 5 : Math.round(amount * 10) / 10;
    return formatGermanNumber(rounded);
  }

  if (["kg", "l"].includes(unit)) {
    return formatGermanNumber(Math.round(amount * 10) / 10);
  }

  if (["EL", "TL"].includes(unit)) {
    return formatFractionAmount(amount);
  }

  if (["Stück", "Dose", "Packung", "Bund", "Prise"].includes(unit)) {
    return formatGermanNumber(Math.round(amount * 2) / 2);
  }

  return formatGermanNumber(Math.round(amount * 10) / 10);
}

function formatFractionAmount(amount) {
  const rounded = Math.round(amount * 4) / 4;
  const whole = Math.floor(rounded);
  const fraction = rounded - whole;

  const fractionMap = {
    0.25: "1/4",
    0.5: "1/2",
    0.75: "3/4"
  };

  if (fractionMap[fraction]) {
    return whole > 0 ? `${whole} ${fractionMap[fraction]}` : fractionMap[fraction];
  }

  return formatGermanNumber(rounded);
}

function formatGermanNumber(value) {
  if (Number.isInteger(value)) {
    return String(value);
  }

  return String(value).replace(".", ",");
}

function addActiveRecipeToShoppingList() {
  const recipe = getAllRecipes().find((item) => item.id === activeRecipeId);

  if (!recipe) {
    return;
  }

  recipe.ingredients.forEach((ingredient) => {
    const scaledIngredient = getScaledIngredient(ingredient, recipe.servings, activeServings);
    addIngredientToShoppingList(scaledIngredient, recipe.id);
  });

  saveShoppingList();
  renderShoppingList();
  updateDashboard();
  showToast("Zutaten wurden zur Einkaufsliste hinzugefügt.");
}

function addIngredientToShoppingList(ingredient, recipeId = "") {
  const amount = ingredient.scaledAmount ?? ingredient.amount;
  const unit = ingredient.scaledUnit ?? ingredient.unit;
  const food = ingredient.normalizedFood || ingredient.food;
  const isAddable = ingredient.scalable && amount !== null && unit;

  if (isAddable) {
    const existingItem = shoppingList.find((item) => {
      return (
        item.food.toLowerCase() === food.toLowerCase() &&
        item.unit === unit &&
        item.note === ""
      );
    });

    if (existingItem) {
      existingItem.amount = Number(existingItem.amount || 0) + amount;

      if (recipeId && !existingItem.sourceRecipeIds.includes(recipeId)) {
        existingItem.sourceRecipeIds.push(recipeId);
      }

      return;
    }
  }

  const note = ingredient.note || (!ingredient.scalable ? "nicht automatisch skaliert" : "");

  const duplicateQualitative = shoppingList.find((item) => {
    return (
      item.food.toLowerCase() === food.toLowerCase() &&
      item.unit === unit &&
      item.note === note
    );
  });

  if (duplicateQualitative) {
    if (recipeId && !duplicateQualitative.sourceRecipeIds.includes(recipeId)) {
      duplicateQualitative.sourceRecipeIds.push(recipeId);
    }

    return;
  }

  shoppingList.push({
    id: `shopping-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    food,
    amount: isAddable ? amount : null,
    unit: isAddable ? unit : "",
    checked: false,
    note,
    sourceRecipeIds: recipeId ? [recipeId] : []
  });
}

function renderShoppingList() {
  elements.shoppingListItems.innerHTML = "";

  if (shoppingList.length === 0) {
    elements.shoppingListItems.innerHTML = `
      <div class="empty">
        Deine Einkaufsliste ist noch leer.
      </div>
    `;
    updateDashboard();
    return;
  }

  const sortedItems = [...shoppingList].sort((a, b) => {
    if (a.checked !== b.checked) {
      return a.checked ? 1 : -1;
    }

    return a.food.localeCompare(b.food, "de");
  });

  sortedItems.forEach((item) => {
    const shoppingItem = document.createElement("div");
    shoppingItem.className = "shopping-item";

    const amountLabel = item.amount === null || !item.unit
      ? ""
      : `${formatAmount(item.amount, item.unit)} ${item.unit} `;

    shoppingItem.innerHTML = `
      <input
        type="checkbox"
        ${item.checked ? "checked" : ""}
        data-action="toggle-shopping"
        data-shopping-id="${escapeHtml(item.id)}"
        aria-label="Zutat abhaken"
      />

      <div>
        <span class="shopping-item-name ${item.checked ? "checked" : ""}">
          ${escapeHtml(amountLabel)}${escapeHtml(item.food)}
        </span>

        ${
          item.note
            ? `<span class="shopping-item-note">${escapeHtml(item.note)}</span>`
            : ""
        }
      </div>

      <button
        class="remove-shopping-item"
        type="button"
        data-action="remove-shopping"
        data-shopping-id="${escapeHtml(item.id)}"
        aria-label="Zutat entfernen"
      >
        ×
      </button>
    `;

    elements.shoppingListItems.appendChild(shoppingItem);
  });

  updateDashboard();
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
  showToast("Zutat wurde entfernt.");
}

function clearShoppingList() {
  if (shoppingList.length === 0) {
    showToast("Die Einkaufsliste ist bereits leer.");
    return;
  }

  const shouldClear = confirm("Möchtest du die komplette Einkaufsliste leeren?");

  if (!shouldClear) {
    return;
  }

  shoppingList = [];
  saveShoppingList();
  renderShoppingList();
  showToast("Einkaufsliste wurde geleert.");
}

function addManualShoppingItem(event) {
  event.preventDefault();

  const value = elements.manualShoppingInput.value.trim();

  if (!value) {
    showToast("Bitte gib eine Zutat ein.");
    return;
  }

  const ingredient = createIngredient(value);
  addIngredientToShoppingList(ingredient);
  saveShoppingList();
  renderShoppingList();

  elements.manualShoppingInput.value = "";
  showToast("Zutat wurde hinzugefügt.");
}

function openModal(modal) {
  modal.classList.remove("hidden");
  document.body.classList.add("modal-open");
}

function closeModal(modalName) {
  const modalMap = {
    detail: elements.detailModal,
    addRecipe: elements.addRecipeModal,
    addSource: elements.addSourceModal
  };

  const modal = modalMap[modalName];

  if (modal) {
    modal.classList.add("hidden");
  }

  const hasOpenModal = Object.values(modalMap).some((item) => !item.classList.contains("hidden"));

  if (!hasOpenModal) {
    document.body.classList.remove("modal-open");
  }
}

function closeAllModals() {
  elements.detailModal.classList.add("hidden");
  elements.addRecipeModal.classList.add("hidden");
  elements.addSourceModal.classList.add("hidden");
  document.body.classList.remove("modal-open");
}

function openAddRecipeModal() {
  elements.addRecipeForm.reset();
  elements.newRecipeServings.value = 2;
  elements.newRecipeTime.value = 30;
  openModal(elements.addRecipeModal);
  elements.newRecipeTitle.focus();
}

function addCustomRecipe(event) {
  event.preventDefault();

  const title = elements.newRecipeTitle.value.trim();
  const description = elements.newRecipeDescription.value.trim();
  const ingredientLines = splitIngredientLines(elements.newRecipeIngredients.value);
  const tags = splitTagList(elements.newRecipeTags.value);
  const sourceUrl = elements.newRecipeSourceUrl.value.trim();
  const icon = elements.newRecipeIcon.value;

  if (!title || !description || ingredientLines.length === 0) {
    showToast("Bitte fülle Rezeptname, Beschreibung und Zutaten aus.");
    return;
  }

  const recipe = {
    id: `custom-${Date.now()}`,
    title,
    description,
    sourceId: "source-family",
    sourceName: sourceUrl ? "Eigene Quelle" : "Eigenes Rezept",
    sourceUrl,
    category: elements.newRecipeCategory.value,
    difficulty: elements.newRecipeDifficulty.value,
    servings: Number(elements.newRecipeServings.value),
    totalTime: Number(elements.newRecipeTime.value),
    tags,
    icon,
    imageClass: getImageClassFromIcon(icon),
    isCustom: true,
    isImported: false,
    createdAt: new Date().toISOString(),
    ingredients: ingredientLines.map(createIngredient)
  };

  customRecipes.push(recipe);
  saveCustomRecipes();
  closeModal("addRecipe");
  renderRecipes();
  showToast("Eigenes Rezept wurde gespeichert.");
}

function splitIngredientLines(value) {
  const lines = String(value || "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

  if (lines.length === 1 && lines[0].includes(",")) {
    return lines[0]
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return lines;
}

function splitTagList(value) {
  return String(value || "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
}

function deleteActiveCustomRecipe() {
  const recipe = getAllRecipes().find((item) => item.id === activeRecipeId);

  if (!recipe || !recipe.isCustom) {
    return;
  }

  const shouldDelete = confirm("Möchtest du dieses eigene Rezept wirklich löschen?");

  if (!shouldDelete) {
    return;
  }

  customRecipes = customRecipes.filter((item) => item.id !== recipe.id);
  favorites = favorites.filter((id) => id !== recipe.id);

  saveCustomRecipes();
  saveFavorites();
  closeModal("detail");
  renderRecipes();
  showToast("Eigenes Rezept wurde gelöscht.");
}

function renderSources() {
  elements.sourceList.innerHTML = "";

  if (sources.length === 0) {
    elements.sourceList.innerHTML = `
      <div class="empty">
        Noch keine Quellen gespeichert.
      </div>
    `;
    updateDashboard();
    return;
  }

  sources.forEach((source) => {
    const statusClass = source.status === "Aktiv"
      ? "status-active"
      : source.status === "Pausiert"
        ? "status-paused"
        : "status-error";

    const card = document.createElement("article");
    card.className = "source-card";

    card.innerHTML = `
      <div>
        <h3>${escapeHtml(source.name)}</h3>

        <p>${escapeHtml(source.baseUrl)}</p>

        <div class="source-meta">
          <span class="status-pill ${statusClass}">${escapeHtml(source.status)}</span>
          <span class="tag">${source.robotsAllowed ? "robots.txt erlaubt" : "nicht erlaubt"}</span>
          <span class="tag">${escapeHtml(source.parserType)}</span>
          <span class="tag">${escapeHtml(source.importFrequency)}</span>
          <span class="tag">${escapeHtml(source.importedRecipeCount)} Rezepte</span>
        </div>

        <p class="shopping-item-note">
          Letzte Prüfung: ${escapeHtml(source.lastCheckedAt)}
          ${source.errorMessage ? ` · Fehler: ${escapeHtml(source.errorMessage)}` : ""}
        </p>
      </div>

      <div class="source-actions">
        <button
          class="small-button"
          type="button"
          data-source-action="check"
          data-source-id="${escapeHtml(source.id)}"
        >
          Prüfen
        </button>

        <button
          class="small-button"
          type="button"
          data-source-action="toggle"
          data-source-id="${escapeHtml(source.id)}"
        >
          ${source.status === "Aktiv" ? "Pausieren" : "Aktivieren"}
        </button>

        <button
          class="danger-outline-button"
          type="button"
          data-source-action="delete"
          data-source-id="${escapeHtml(source.id)}"
        >
          Löschen
        </button>
      </div>
    `;

    elements.sourceList.appendChild(card);
  });

  updateDashboard();
}

function openAddSourceModal() {
  elements.addSourceForm.reset();
  openModal(elements.addSourceModal);
  elements.newSourceName.focus();
}

function addSource(event) {
  event.preventDefault();

  const name = elements.newSourceName.value.trim();
  const baseUrl = elements.newSourceUrl.value.trim();

  if (!name || !baseUrl) {
    showToast("Bitte Quellenname und URL eingeben.");
    return;
  }

  sources.push({
    id: `source-${Date.now()}`,
    name,
    baseUrl,
    status: "Aktiv",
    robotsAllowed: true,
    parserType: "Prüfung erforderlich",
    importFrequency: elements.newSourceFrequency.value,
    importedRecipeCount: 0,
    lastCheckedAt: "Noch nicht geprüft",
    errorMessage: ""
  });

  saveSources();
  closeModal("addSource");
  renderSources();
  showToast("Quelle wurde gespeichert.");
}

function handleSourceAction(action, sourceId) {
  const source = sources.find((item) => item.id === sourceId);

  if (!source) {
    return;
  }

  if (action === "toggle") {
    source.status = source.status === "Aktiv" ? "Pausiert" : "Aktiv";
    source.lastCheckedAt = "Gerade eben";
    saveSources();
    renderSources();
    showToast(source.status === "Aktiv" ? "Quelle wurde aktiviert." : "Quelle wurde pausiert.");
  }

  if (action === "check") {
    source.robotsAllowed = true;
    source.parserType = source.parserType === "Prüfung erforderlich" ? "JSON-LD Recipe" : source.parserType;
    source.lastCheckedAt = "Gerade eben";
    source.errorMessage = "";
    saveSources();
    renderSources();
    addImportLog(`Quelle „${source.name}“ geprüft`, "robots.txt erlaubt, Parser verfügbar, Quelle bereit.");
    showToast("Quelle wurde geprüft.");
  }

  if (action === "delete") {
    const shouldDelete = confirm("Möchtest du diese Quelle wirklich löschen?");

    if (!shouldDelete) {
      return;
    }

    sources = sources.filter((item) => item.id !== sourceId);
    saveSources();
    renderSources();
    showToast("Quelle wurde gelöscht.");
  }
}

function addImportLog(title, details) {
  importLog.unshift({
    id: `log-${Date.now()}`,
    title,
    details,
    createdAt: new Date().toISOString()
  });

  importLog = importLog.slice(0, 8);
  saveImportLog();
  renderImportLog();
}

function renderImportLog() {
  elements.importLog.innerHTML = "";

  if (importLog.length === 0) {
    elements.importLog.innerHTML = `
      <div class="import-log-item">
        Noch kein Import gestartet. Starte einen Beispiel-Import, um den geplanten Ablauf zu sehen.
      </div>
    `;
    return;
  }

  importLog.forEach((item) => {
    const logItem = document.createElement("div");
    logItem.className = "import-log-item";

    logItem.innerHTML = `
      <strong>${escapeHtml(item.title)}</strong><br />
      ${escapeHtml(item.details)}
    `;

    elements.importLog.appendChild(logItem);
  });
}

function runImportSimulation() {
  const activeSource = sources.find((source) => source.status === "Aktiv") || sources[0];

  if (!activeSource) {
    showToast("Bitte zuerst eine Quelle hinzufügen.");
    return;
  }

  activeSource.lastCheckedAt = "Gerade eben";
  activeSource.robotsAllowed = true;
  activeSource.parserType = activeSource.parserType === "Prüfung erforderlich"
    ? "JSON-LD Recipe"
    : activeSource.parserType;

  const alreadyImported = customRecipes.some((recipe) => recipe.id === "import-demo-ofengemuese");

  if (!alreadyImported) {
    customRecipes.push({
      id: "import-demo-ofengemuese",
      title: "Importiertes Ofengemüse",
      description: "Simuliert importiertes Rezept mit metrisch normalisierten Zutaten.",
      sourceId: activeSource.id,
      sourceName: activeSource.name,
      sourceUrl: activeSource.baseUrl.startsWith("http") ? activeSource.baseUrl : "",
      category: "Hauptgericht",
      difficulty: "Einfach",
      servings: 2,
      totalTime: 45,
      tags: ["vegetarisch", "gemüse", "importiert"],
      icon: "🥘",
      imageClass: "image-default",
      isCustom: true,
      isImported: true,
      createdAt: new Date().toISOString(),
      ingredients: [
        createIngredient("500 g Kartoffeln"),
        createIngredient("250 g Karotten"),
        createIngredient("1 Stück Paprika"),
        createIngredient("2 EL Olivenöl"),
        createIngredient("1 TL Salz"),
        createIngredient("Pfeffer nach Geschmack")
      ]
    });

    activeSource.importedRecipeCount += 1;
    saveCustomRecipes();
  }

  saveSources();

  addImportLog(
    "Beispiel-Import abgeschlossen",
    `Quelle „${activeSource.name}“ geprüft, strukturierte Rezeptdaten erkannt, Zutaten analysiert, Mengen metrisch normalisiert.`
  );

  renderSources();
  renderRecipes();
  showToast(alreadyImported ? "Import wurde erneut simuliert." : "Beispielrezept wurde importiert.");
}

function updateDashboard() {
  const allRecipes = getAllRecipes();

  elements.totalRecipeCount.textContent = allRecipes.length;
  elements.favoriteCount.textContent = favorites.length;
  elements.sourceCount.textContent = sources.length;
  elements.shoppingCount.textContent = shoppingList.length;
}

function setupEventListeners() {
  elements.navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setView(button.dataset.view);
    });
  });

  elements.openImportDemoButton.addEventListener("click", () => {
    setView("sources");
    runImportSimulation();
  });

  elements.openAddRecipeButton.addEventListener("click", openAddRecipeModal);
  elements.openAddSourceButton.addEventListener("click", openAddSourceModal);

  elements.searchInput.addEventListener("input", renderRecipes);
  elements.sortSelect.addEventListener("change", renderRecipes);
  elements.categorySelect.addEventListener("change", renderRecipes);
  elements.difficultySelect.addEventListener("change", renderRecipes);
  elements.maxTimeSelect.addEventListener("change", renderRecipes);
  elements.resetFiltersButton.addEventListener("click", resetFilters);

  elements.quickFilterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setQuickFilter(button.dataset.filter);
      renderRecipes();
    });
  });

  elements.favoriteFilterButton.addEventListener("click", () => {
    showOnlyFavorites = !showOnlyFavorites;
    renderRecipes();
  });

  elements.openShoppingButton.addEventListener("click", () => {
    setView("shopping");
  });

  elements.recipeGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");

    if (!button) {
      return;
    }

    const action = button.dataset.action;
    const recipeId = button.dataset.recipeId;

    if (action === "open-details") {
      openRecipeDetails(recipeId);
    }

    if (action === "toggle-favorite") {
      toggleFavorite(recipeId);
    }
  });

  elements.decreaseServingsButton.addEventListener("click", () => changeServings(-1));
  elements.increaseServingsButton.addEventListener("click", () => changeServings(1));

  elements.toggleOriginalIngredientsButton.addEventListener("click", () => {
    showOriginalIngredients = !showOriginalIngredients;
    renderModalIngredients();
  });

  elements.modalShoppingButton.addEventListener("click", addActiveRecipeToShoppingList);

  elements.modalFavoriteButton.addEventListener("click", () => {
    if (activeRecipeId) {
      toggleFavorite(activeRecipeId);
    }
  });

  elements.modalDeleteButton.addEventListener("click", deleteActiveCustomRecipe);

  elements.addRecipeForm.addEventListener("submit", addCustomRecipe);
  elements.addSourceForm.addEventListener("submit", addSource);

  elements.clearShoppingListButton.addEventListener("click", clearShoppingList);
  elements.manualShoppingForm.addEventListener("submit", addManualShoppingItem);

  elements.shoppingListItems.addEventListener("click", (event) => {
    const target = event.target.closest("[data-action]");

    if (!target) {
      return;
    }

    const action = target.dataset.action;
    const shoppingId = target.dataset.shoppingId;

    if (action === "remove-shopping") {
      removeShoppingItem(shoppingId);
    }
  });

  elements.shoppingListItems.addEventListener("change", (event) => {
    const target = event.target.closest("[data-action='toggle-shopping']");

    if (!target) {
      return;
    }

    toggleShoppingItem(target.dataset.shoppingId);
  });

  elements.sourceList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-source-action]");

    if (!button) {
      return;
    }

    handleSourceAction(button.dataset.sourceAction, button.dataset.sourceId);
  });

  elements.runImportSimulationButton.addEventListener("click", runImportSimulation);

  document.addEventListener("click", (event) => {
    const closeTarget = event.target.closest("[data-close-modal]");

    if (!closeTarget) {
      return;
    }

    closeModal(closeTarget.dataset.closeModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAllModals();
    }
  });
}

function initializeApp() {
  saveJson(STORAGE_KEYS.favorites, favorites);
  saveJson(STORAGE_KEYS.customRecipes, customRecipes);
  saveJson(STORAGE_KEYS.shoppingList, shoppingList);
  saveJson(STORAGE_KEYS.sources, sources);
  saveJson(STORAGE_KEYS.importLog, importLog);

  setupEventListeners();
  renderRecipes();
  renderShoppingList();
  renderSources();
  renderImportLog();
  updateDashboard();
}

initializeApp();
