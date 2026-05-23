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
    ],
    instructions: [
      createInstruction("Pasta in reichlich Salzwasser nach Packungsangabe kochen.", 1),
      createInstruction("Zucchini und Paprika klein schneiden und in Olivenöl anbraten.", 2),
      createInstruction("Tomaten hinzufügen und alles einige Minuten köcheln lassen.", 3),
      createInstruction("Pasta mit der Sauce vermengen und mit Salz und Pfeffer abschmecken.", 4)
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
    ],
    instructions: [
      createInstruction("Reis gar kochen und anschließend abkühlen lassen.", 1),
      createInstruction("Gurke und Tomaten klein schneiden.", 2),
      createInstruction("Reis, Gemüse und Mais in einer Schüssel vermengen.", 3),
      createInstruction("Olivenöl, Zitronensaft und Salz hinzufügen und gut mischen.", 4)
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
    ],
    instructions: [
      createInstruction("Reis nach Packungsangabe kochen.", 1),
      createInstruction("Kartoffeln und Karotten würfeln.", 2),
      createInstruction("Gemüse mit Currypulver und Ingwer kurz anrösten.", 3),
      createInstruction("Kokosmilch hinzufügen und köcheln lassen, bis das Gemüse weich ist.", 4),
      createInstruction("Mit Salz abschmecken und mit Reis servieren.", 5)
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
    ],
    instructions: [
      createInstruction("Zwiebel und Knoblauch fein schneiden.", 1),
      createInstruction("Beides in Olivenöl glasig anbraten.", 2),
      createInstruction("Tomaten und Gemüsebrühe hinzufügen.", 3),
      createInstruction("Suppe köcheln lassen und anschließend pürieren.", 4),
      createInstruction("Mit Basilikum abschmecken und servieren.", 5)
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
    ],
    instructions: [
      createInstruction("Reis nach Packungsangabe kochen.", 1),
      createInstruction("Hähnchen in Stücke schneiden und in Öl anbraten.", 2),
      createInstruction("Zwiebel und Paprika hinzufügen und mitbraten.", 3),
      createInstruction("Erbsen und Reis unterheben.", 4),
      createInstruction("Alles abschmecken und heiß servieren.", 5)
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
    ],
    instructions: [
      createInstruction("Gurke waschen und in feine Scheiben schneiden.", 1),
      createInstruction("Joghurt mit Zitronensaft und Dill verrühren.", 2),
      createInstruction("Gurke mit dem Dressing mischen.", 3),
      createInstruction("Mit Salz und Pfeffer abschmecken.", 4)
    ]
  }
];

const elements = {
  navButtons: document.querySelectorAll(".nav-button"),
  recipesView: document.getElementById("recipesView"),
  sourcesView: document.getElementById("sourcesView"),
  shoppingView: document.getElementById("shoppingView"),
  settingsView: document.getElementById("settingsView"),

  totalRecipeCount: document.getElementById("totalRecipeCount"),
  favoriteCount: document.getElementById("favoriteCount"),
  sourceCount: document.getElementById("sourceCount"),
  shoppingCount: document.getElementById("shoppingCount"),

  searchInput: document.getElementById("searchInput"),
  sortSelect: document.getElementById("sortSelect"),
  categorySelect: document.getElementById("categorySelect"),
  difficultySelect: document.getElementById("difficultySelect"),
  maxTimeSelect: document.getElementById("maxTimeSelect"),
  sourceFilterSelect: document.getElementById("sourceFilterSelect"),
  recipeTypeSelect: document.getElementById("recipeTypeSelect"),
  featureFilterSelect: document.getElementById("featureFilterSelect"),
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
  modalInstructions: document.getElementById("modalInstructions"),
  modalShoppingButton: document.getElementById("modalShoppingButton"),
  modalFavoriteButton: document.getElementById("modalFavoriteButton"),
  modalEditButton: document.getElementById("modalEditButton"),
  modalDeleteButton: document.getElementById("modalDeleteButton"),
  modalSource: document.getElementById("modalSource"),

  openAddRecipeButton: document.getElementById("openAddRecipeButton"),
  addRecipeModal: document.getElementById("addRecipeModal"),
  addRecipeTitle: document.getElementById("addRecipeTitle"),
  addRecipeIntro: document.getElementById("addRecipeIntro"),
  addRecipeForm: document.getElementById("addRecipeForm"),
  saveRecipeButton: document.getElementById("saveRecipeButton"),
  newRecipeTitle: document.getElementById("newRecipeTitle"),
  newRecipeDescription: document.getElementById("newRecipeDescription"),
  newRecipeCategory: document.getElementById("newRecipeCategory"),
  newRecipeDifficulty: document.getElementById("newRecipeDifficulty"),
  newRecipeServings: document.getElementById("newRecipeServings"),
  newRecipeTime: document.getElementById("newRecipeTime"),
  newRecipeIcon: document.getElementById("newRecipeIcon"),
  newRecipeIngredients: document.getElementById("newRecipeIngredients"),
  newRecipeInstructions: document.getElementById("newRecipeInstructions"),
  newRecipeTags: document.getElementById("newRecipeTags"),
  newRecipeSourceUrl: document.getElementById("newRecipeSourceUrl"),

  shoppingListItems: document.getElementById("shoppingListItems"),
  clearShoppingListButton: document.getElementById("clearShoppingListButton"),
  manualShoppingForm: document.getElementById("manualShoppingForm"),
  manualShoppingInput: document.getElementById("manualShoppingInput"),

  sourceList: document.getElementById("sourceList"),
  openAddSourceButton: document.getElementById("openAddSourceButton"),
  addSourceModal: document.getElementById("addSourceModal"),
  addSourceTitle: document.getElementById("addSourceTitle"),
  addSourceIntro: document.getElementById("addSourceIntro"),
  saveSourceButton: document.getElementById("saveSourceButton"),
  addSourceForm: document.getElementById("addSourceForm"),
  newSourceName: document.getElementById("newSourceName"),
  newSourceUrl: document.getElementById("newSourceUrl"),
  newSourceFrequency: document.getElementById("newSourceFrequency"),
  importLog: document.getElementById("importLog"),
  runImportSimulationButton: document.getElementById("runImportSimulationButton"),
  openImportDemoButton: document.getElementById("openImportDemoButton"),

  openUrlImportButton: document.getElementById("openUrlImportButton"),
  openUrlImportButtonSecondary: document.getElementById("openUrlImportButtonSecondary"),
  openUrlImportButtonSources: document.getElementById("openUrlImportButtonSources"),
  importUrlModal: document.getElementById("importUrlModal"),
  importUrlForm: document.getElementById("importUrlForm"),
  recipeUrlInput: document.getElementById("recipeUrlInput"),
  recipeUrlTitleInput: document.getElementById("recipeUrlTitleInput"),

  exportDataButton: document.getElementById("exportDataButton"),
  copyExportButton: document.getElementById("copyExportButton"),
  exportDataOutput: document.getElementById("exportDataOutput"),
  importDataForm: document.getElementById("importDataForm"),
  importDataInput: document.getElementById("importDataInput"),
  clearUserDataButton: document.getElementById("clearUserDataButton"),
  resetDemoDataButton: document.getElementById("resetDemoDataButton"),

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
let editingRecipeId = null;
let editingSourceId = null;
let activeServings = 2;
let showOriginalIngredients = false;

customRecipes = customRecipes.map(normalizeRecipe);
sources = sources.map(normalizeSource);
shoppingList = shoppingList.map(normalizeShoppingItem);

function injectRecipeCardBadgeStyles() {
  if (document.getElementById("recipe-card-badge-styles")) {
    return;
  }

  const style = document.createElement("style");
  style.id = "recipe-card-badge-styles";
  style.textContent = `
    .recipe-card .card-header {
      align-items: flex-start;
    }

    .card-badges {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      min-width: 0;
      flex: 1;
    }

    .recipe-card-source-row {
      display: grid;
      grid-template-columns: auto minmax(0, 1fr);
      gap: 8px;
      align-items: baseline;
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid rgba(0, 0, 0, 0.08);
      color: var(--muted, #6f6f6f);
      font-size: 13px;
      line-height: 1.35;
    }

    .recipe-card-source-row span {
      color: var(--muted, #6f6f6f);
      font-weight: 650;
    }

    .recipe-card-source-row strong {
      min-width: 0;
      color: var(--text, #111111);
      font-weight: 750;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .feature-badges {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 12px;
    }

    .tag.source-tag {
      background: var(--surface-soft, #f7f3ec);
      border-color: var(--border, #ddd0bd);
      color: var(--text-soft, #333333);
    }

    .tag.local-tag {
      background: var(--surface-soft, #f7f3ec);
      border-color: var(--border, #ddd0bd);
      color: var(--muted, #6f6f6f);
    }

    .tag.type-tag {
      font-weight: 800;
    }

    .tag.feature-tag {
      background: var(--surface-soft, #f7f3ec);
      border-color: var(--border, #ddd0bd);
      color: var(--text-soft, #333333);
    }

    .tag.feature-fast {
      background: var(--warning, #fff1c7);
      border-color: var(--warning-strong, #d6bd8e);
      color: #5a4313;
    }

    .tag.feature-vegan,
    .tag.feature-vegetarian {
      background: var(--green-soft, var(--success, #dfe5d6));
      border-color: var(--success-strong, #bdc9ad);
      color: #405023;
    }

    .tag.feature-main {
      background: var(--primary-soft, #f3d7c7);
      border-color: #e7bea9;
      color: var(--primary-dark, #8f4028);
    }

    @media (max-width: 720px) {
      .recipe-card-source-row {
        grid-template-columns: 1fr;
        gap: 2px;
      }

      .recipe-card-source-row strong {
        white-space: normal;
      }
    }
  `;

  document.head.appendChild(style);
}

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

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
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
    servings: Math.max(1, Number(recipe.servings || 2)),
    totalTime: Math.max(1, Number(recipe.totalTime || recipe.time || 30)),
    tags: Array.isArray(recipe.tags) ? recipe.tags : [],
    icon,
    imageClass: recipe.imageClass || getImageClassFromIcon(icon),
    isCustom: Boolean(recipe.isCustom),
    isImported: Boolean(recipe.isImported),
    createdAt: recipe.createdAt || new Date().toISOString(),
    updatedAt: recipe.updatedAt || recipe.createdAt || new Date().toISOString(),
    ingredients: normalizeIngredients(recipe.ingredients || []),
    instructions: normalizeInstructions(recipe.instructions || recipe.steps || [], recipe.title || "dieses Rezept")
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
    id: item.id || `shopping-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    food: item.food || item.name || "Unbekannte Zutat",
    normalizedFood: item.normalizedFood || item.normalized_food || item.food || item.name || "Unbekannte Zutat",
    amount: item.amount === null || item.amount === undefined ? null : Number(item.amount),
    unit: normalizeUnit(item.unit || ""),
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
        conversionNote: ingredient.conversionNote || ingredient.conversion_note || "",
        confidence: ingredient.confidence || "medium"
      };
    }

    return createIngredient(String(ingredient));
  });
}

function createInstruction(text, position = 1) {
  return {
    id: `instruction-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    position,
    text: String(text || "").trim(),
    timerMinutes: detectTimerMinutes(text),
    ingredientsUsed: []
  };
}

function normalizeInstructions(instructions, recipeTitle = "dieses Rezept") {
  let normalized = [];

  if (Array.isArray(instructions)) {
    normalized = instructions
      .map((instruction, index) => {
        if (typeof instruction === "string") {
          return createInstruction(instruction, index + 1);
        }

        return {
          id: instruction.id || `instruction-${Date.now()}-${Math.random().toString(16).slice(2)}`,
          position: Number(instruction.position || index + 1),
          text: instruction.text || instruction.name || "",
          timerMinutes: instruction.timerMinutes || instruction.timer_minutes || detectTimerMinutes(instruction.text || instruction.name || ""),
          ingredientsUsed: Array.isArray(instruction.ingredientsUsed)
            ? instruction.ingredientsUsed
            : Array.isArray(instruction.ingredients_used)
              ? instruction.ingredients_used
              : []
        };
      })
      .filter((instruction) => instruction.text.trim());
  }

  if (normalized.length === 0) {
    normalized = createDefaultInstructions(recipeTitle);
  }

  return normalized.sort((a, b) => a.position - b.position);
}

function createDefaultInstructions(recipeTitle) {
  return [
    createInstruction("Zutaten vorbereiten und nach Bedarf waschen, schneiden oder abwiegen.", 1),
    createInstruction(`${recipeTitle} nach Geschmack würzen und Schritt für Schritt zubereiten.`, 2),
    createInstruction("Vor dem Servieren abschmecken und warm oder frisch genießen.", 3)
  ];
}

function detectTimerMinutes(text) {
  const match = String(text || "").match(/(\d+)\s*(minuten|min\.|minute|min)/i);

  if (!match) {
    return null;
  }

  const minutes = Number(match[1]);
  return Number.isFinite(minutes) ? minutes : null;
}

function createIngredient(line) {
  return parseIngredientLine(line);
}

function parseIngredientLine(line) {
  const originalText = String(line || "").trim();
  const lower = originalText.toLowerCase();

  let amount = null;
  let unit = "";
  let foodText = originalText;
  let preparation = "";
  let note = "";
  let scalable = true;
  let scalingGroup = "normal";
  let conversionNote = "";
  let confidence = "medium";

  const qualitativePatterns = [
    "nach geschmack",
    "zum abschmecken",
    "nach belieben",
    "optional",
    "bei bedarf"
  ];

  const cookingMediumPatterns = [
    "zum anbraten",
    "zum braten",
    "zum kochen",
    "für die form",
    "zum einfetten"
  ];

  const garnishPatterns = [
    "zum servieren",
    "zum garnieren",
    "als topping",
    "zum bestreuen"
  ];

  const vaguePatterns = [
    "eine handvoll",
    "handvoll",
    "etwas",
    "ein wenig",
    "n. b.",
    "n.b."
  ];

  const amountMatch = originalText.match(
    /^((?:\d+\s+\d+\/\d+)|(?:\d+[,.]\d+)|(?:\d+\/\d+)|(?:\d+)|(?:½|¼|¾|⅓|⅔))\s*(kg|kilogramm|g|gramm|ml|milliliter|l|liter|tl|teelöffel|el|esslöffel|stück|stk\.?|prise|prisen|bund|dose|dosen|packung|packungen|becher|cup|cups|oz|unze|unzen|lb|pfund)?\s+(.+)$/i
  );

  if (amountMatch) {
    amount = parseAmount(amountMatch[1]);
    unit = normalizeUnit(amountMatch[2] || "");
    foodText = amountMatch[3].trim();
    confidence = "high";
  }

  if (!amountMatch) {
    const vagueMatch = vaguePatterns.find((pattern) => lower.includes(pattern));

    if (vagueMatch) {
      note = "unklare Menge";
      scalable = false;
      scalingGroup = "unknown";
      foodText = removeKnownPhrases(originalText, [vagueMatch]);
      confidence = "low";
    }
  }

  if (qualitativePatterns.some((pattern) => lower.includes(pattern))) {
    note = appendNote(note, getMatchedPattern(originalText, qualitativePatterns));
    scalable = false;
    scalingGroup = "qualitative";
    confidence = "high";
  }

  if (cookingMediumPatterns.some((pattern) => lower.includes(pattern))) {
    note = appendNote(note, getMatchedPattern(originalText, cookingMediumPatterns));
    scalable = false;
    scalingGroup = "cooking_medium";
    confidence = "high";
  }

  if (garnishPatterns.some((pattern) => lower.includes(pattern))) {
    note = appendNote(note, getMatchedPattern(originalText, garnishPatterns));
    scalable = false;
    scalingGroup = "garnish";
    confidence = "high";
  }

  if (unit === "Prise") {
    scalable = false;
    scalingGroup = "spice";
    confidence = "high";
  }

  if (!unit && amount !== null) {
    const lowerFood = foodText.toLowerCase();

    if (lowerFood.startsWith("ei") || lowerFood.startsWith("eier")) {
      unit = "Stück";
      foodText = "Ei";
      confidence = "medium";
    }
  }

  if (!amountMatch && !note && originalText) {
    scalable = false;
    scalingGroup = "unknown";
    note = "keine eindeutige Menge erkannt";
    confidence = "low";
  }

  const converted = convertToMetric(amount, unit, foodText);
  amount = converted.amount;
  unit = converted.unit;
  conversionNote = converted.conversionNote;

  if (conversionNote) {
    note = appendNote(note, conversionNote);
  }

  preparation = detectPreparation(foodText);
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
    conversionNote,
    confidence
  };
}

function parseAmount(value) {
  const raw = String(value || "").trim();
  const unicodeMap = {
    "½": 0.5,
    "¼": 0.25,
    "¾": 0.75,
    "⅓": 1 / 3,
    "⅔": 2 / 3
  };

  if (unicodeMap[raw] !== undefined) {
    return unicodeMap[raw];
  }

  if (/^\d+\s+\d+\/\d+$/.test(raw)) {
    const [whole, fraction] = raw.split(/\s+/);
    return Number(whole) + parseAmount(fraction);
  }

  const clean = raw.replace(",", ".");

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
    kilogramm: "kg",
    g: "g",
    gramm: "g",
    ml: "ml",
    milliliter: "ml",
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
    becher: "cup",
    cup: "cup",
    cups: "cup",
    oz: "oz",
    unze: "oz",
    unzen: "oz",
    lb: "lb",
    pfund: "lb"
  };

  return unitMap[clean] || unit || "";
}

function convertToMetric(amount, unit, foodText) {
  if (amount === null || amount === undefined) {
    return {
      amount,
      unit,
      conversionNote: ""
    };
  }

  const normalizedFood = normalizeFoodName(foodText);

  if (unit === "kg") {
    return {
      amount,
      unit: "kg",
      conversionNote: ""
    };
  }

  if (unit === "l") {
    return {
      amount,
      unit: "l",
      conversionNote: ""
    };
  }

  if (unit === "oz") {
    return {
      amount: amount * 28.35,
      unit: "g",
      conversionNote: "oz wurde metrisch in g umgerechnet"
    };
  }

  if (unit === "lb") {
    return {
      amount: amount * 453.6,
      unit: "g",
      conversionNote: "lb wurde metrisch in g umgerechnet"
    };
  }

  if (unit === "cup") {
    const liquidFoods = ["Wasser", "Milch", "Gemüsebrühe", "Brühe", "Kokosmilch", "Sahne"];
    const flourFoods = ["Mehl", "Weizenmehl"];
    const sugarFoods = ["Zucker"];

    if (liquidFoods.includes(normalizedFood)) {
      return {
        amount: amount * 240,
        unit: "ml",
        conversionNote: "cup wurde abhängig vom Lebensmittel in ml umgerechnet"
      };
    }

    if (flourFoods.includes(normalizedFood)) {
      return {
        amount: amount * 120,
        unit: "g",
        conversionNote: "cup Mehl wurde mit 120 g pro cup umgerechnet"
      };
    }

    if (sugarFoods.includes(normalizedFood)) {
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

function appendNote(existingNote, newNote) {
  if (!newNote) {
    return existingNote;
  }

  if (!existingNote) {
    return newNote;
  }

  if (existingNote.includes(newNote)) {
    return existingNote;
  }

  return `${existingNote}; ${newNote}`;
}

function removeKnownPhrases(text, phrases) {
  let result = String(text || "");

  phrases.forEach((phrase) => {
    result = result.replace(new RegExp(escapeRegExp(phrase), "gi"), "");
  });

  return result.trim();
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function detectPreparation(foodText) {
  const lower = foodText.toLowerCase();

  const preparationMap = [
    { pattern: "gehackte", value: "gehackt" },
    { pattern: "gehackter", value: "gehackt" },
    { pattern: "gehacktes", value: "gehackt" },
    { pattern: "gehackt", value: "gehackt" },
    { pattern: "geriebene", value: "gerieben" },
    { pattern: "geriebener", value: "gerieben" },
    { pattern: "geriebenes", value: "gerieben" },
    { pattern: "gerieben", value: "gerieben" },
    { pattern: "gewürfelte", value: "gewürfelt" },
    { pattern: "gewürfelter", value: "gewürfelt" },
    { pattern: "gewürfeltes", value: "gewürfelt" },
    { pattern: "gewürfelt", value: "gewürfelt" },
    { pattern: "geschnittene", value: "geschnitten" },
    { pattern: "geschnittener", value: "geschnitten" },
    { pattern: "geschnittenes", value: "geschnitten" },
    { pattern: "geschnitten", value: "geschnitten" },
    { pattern: "frische", value: "frisch" },
    { pattern: "frischer", value: "frisch" },
    { pattern: "frisches", value: "frisch" },
    { pattern: "frisch", value: "frisch" }
  ];

  const match = preparationMap.find((item) => lower.includes(item.pattern));
  return match ? match.value : "";
}

function cleanFoodName(foodText) {
  return String(foodText || "")
    .replace(/\bgehackte\b/gi, "")
    .replace(/\bgehackter\b/gi, "")
    .replace(/\bgehacktes\b/gi, "")
    .replace(/\bgehackt\b/gi, "")
    .replace(/\bgeriebene\b/gi, "")
    .replace(/\bgeriebener\b/gi, "")
    .replace(/\bgeriebenes\b/gi, "")
    .replace(/\bgerieben\b/gi, "")
    .replace(/\bgewürfelte\b/gi, "")
    .replace(/\bgewürfelter\b/gi, "")
    .replace(/\bgewürfeltes\b/gi, "")
    .replace(/\bgewürfelt\b/gi, "")
    .replace(/\bgeschnittene\b/gi, "")
    .replace(/\bgeschnittener\b/gi, "")
    .replace(/\bgeschnittenes\b/gi, "")
    .replace(/\bgeschnitten\b/gi, "")
    .replace(/\bfrisch(e|er|es|en)?\b/gi, "")
    .replace(/\bnach Geschmack\b/gi, "")
    .replace(/\bnach Belieben\b/gi, "")
    .replace(/\bzum Abschmecken\b/gi, "")
    .replace(/\bzum Anbraten\b/gi, "")
    .replace(/\bzum Braten\b/gi, "")
    .replace(/\bzum Kochen\b/gi, "")
    .replace(/\bfür die Form\b/gi, "")
    .replace(/\bzum Einfetten\b/gi, "")
    .replace(/\bzum Garnieren\b/gi, "")
    .replace(/\bzum Servieren\b/gi, "")
    .replace(/\boptional\b/gi, "")
    .replace(/\beine Handvoll\b/gi, "")
    .replace(/\bHandvoll\b/gi, "")
    .replace(/\betwas\b/gi, "")
    .replace(/[.,;:!?]+$/g, "")
    .replace(/\s+/g, " ")
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
    sahne: "Sahne",
    kokosmilch: "Kokosmilch",
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
    knoblauchzehen: "Knoblauch",
    gurke: "Gurke",
    karotte: "Karotten",
    karotten: "Karotten",
    möhre: "Karotten",
    möhren: "Karotten",
    salz: "Salz",
    pfeffer: "Pfeffer",
    currypulver: "Currypulver",
    ingwer: "Ingwer",
    basilikum: "Basilikum",
    dill: "Dill",
    joghurt: "Joghurt",
    mais: "Mais",
    erbsen: "Erbsen",
    blattsalat: "Blattsalat",
    zitrone: "Zitrone",
    zitronensaft: "Zitronensaft",
    hauptzutat: "Hauptzutat",
    gemüse: "Gemüse"
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

function getRecipeSourceKey(recipe) {
  return recipe.sourceId || `source-name-${recipe.sourceName}`;
}

function getRecipeType(recipe) {
  if (recipe.isImported) {
    return "imported";
  }

  if (recipe.isCustom) {
    return "custom";
  }

  return "local";
}

function getRecipeTypeConfig(recipe) {
  const recipeType = getRecipeType(recipe);

  if (recipeType === "imported") {
    return {
      label: "Importiert",
      className: "import-tag type-tag"
    };
  }

  if (recipeType === "custom") {
    return {
      label: "Eigenes Rezept",
      className: "user-tag type-tag"
    };
  }

  return {
    label: "Lokal",
    className: "local-tag type-tag"
  };
}

function getRecipeSearchText(recipe) {
  return [
    recipe.title,
    recipe.description,
    recipe.category,
    recipe.difficulty,
    recipe.sourceName,
    ...recipe.tags,
    ...recipe.ingredients.map((ingredient) => ingredient.food),
    ...recipe.ingredients.map((ingredient) => ingredient.normalizedFood),
    ...recipe.instructions.map((instruction) => instruction.text)
  ].join(" ").toLowerCase();
}

function getRecipeRelevanceScore(recipe, searchTerm) {
  const cleanSearchTerm = String(searchTerm || "").toLowerCase().trim();

  if (!cleanSearchTerm) {
    let score = 0;

    if (isFavorite(recipe.id)) {
      score += 15;
    }

    if (recipe.isImported) {
      score += 8;
    }

    score += Math.max(0, 60 - recipe.totalTime) / 10;

    return score;
  }

  const searchWords = cleanSearchTerm
    .split(/\s+/)
    .map((word) => word.trim())
    .filter(Boolean);

  let score = 0;

  const title = recipe.title.toLowerCase();
  const description = recipe.description.toLowerCase();
  const category = recipe.category.toLowerCase();
  const sourceName = recipe.sourceName.toLowerCase();
  const tags = recipe.tags.map((tag) => tag.toLowerCase());
  const ingredients = recipe.ingredients.map((ingredient) => {
    return `${ingredient.food} ${ingredient.normalizedFood}`.toLowerCase();
  });
  const featureBadges = getRecipeFeatureBadges(recipe).map((badge) => badge.label.toLowerCase());

  searchWords.forEach((word) => {
    if (title === word) {
      score += 100;
    }

    if (title.includes(word)) {
      score += 45;
    }

    if (tags.includes(word)) {
      score += 38;
    }

    if (featureBadges.includes(word)) {
      score += 35;
    }

    if (category.includes(word)) {
      score += 28;
    }

    if (ingredients.some((ingredient) => ingredient.includes(word))) {
      score += 26;
    }

    if (description.includes(word)) {
      score += 16;
    }

    if (sourceName.includes(word)) {
      score += 8;
    }
  });

  if (isFavorite(recipe.id)) {
    score += 5;
  }

  return score;
}

function hasRecipeTag(recipe, tagNames) {
  const tags = recipe.tags.map((tag) => tag.toLowerCase());
  return tagNames.some((tagName) => tags.includes(tagName.toLowerCase()));
}

function recipeTextContains(recipe, words) {
  const text = getRecipeSearchText(recipe);
  return words.some((word) => text.includes(word.toLowerCase()));
}

function hasLikelyMeatOrFish(recipe) {
  return recipeTextContains(recipe, [
    "hähnchen",
    "huhn",
    "rind",
    "schwein",
    "speck",
    "wurst",
    "fisch",
    "lachs",
    "thunfisch",
    "garnele",
    "garnelen"
  ]);
}

function addFeatureBadge(badges, label, className = "feature-tag") {
  const alreadyExists = badges.some((badge) => badge.label.toLowerCase() === label.toLowerCase());

  if (!alreadyExists) {
    badges.push({
      label,
      className
    });
  }
}

function getRecipeFeatureBadges(recipe) {
  const badges = [];

  if (recipe.totalTime <= 15) {
    addFeatureBadge(badges, "Sehr schnell", "feature-tag feature-fast");
  } else if (recipe.totalTime <= 30 || hasRecipeTag(recipe, ["schnell"])) {
    addFeatureBadge(badges, "Schnell", "feature-tag feature-fast");
  }

  if (hasRecipeTag(recipe, ["vegan"])) {
    addFeatureBadge(badges, "Vegan", "feature-tag feature-vegan");
  } else if (hasRecipeTag(recipe, ["vegetarisch"]) || !hasLikelyMeatOrFish(recipe)) {
    addFeatureBadge(badges, "Vegetarisch", "feature-tag feature-vegetarian");
  }

  if (recipeTextContains(recipe, ["pasta", "nudeln", "spaghetti"])) {
    addFeatureBadge(badges, "Pasta", "feature-tag feature-main");
  }

  if (recipeTextContains(recipe, ["reis"])) {
    addFeatureBadge(badges, "Reis", "feature-tag feature-main");
  }

  if (recipe.category === "Suppe" || recipeTextContains(recipe, ["suppe"])) {
    addFeatureBadge(badges, "Suppe", "feature-tag");
  }

  if (recipe.category === "Salat" || recipeTextContains(recipe, ["salat"])) {
    addFeatureBadge(badges, "Salat", "feature-tag");
  }

  if (recipeTextContains(recipe, ["gemüse", "tomaten", "zucchini", "paprika", "karotten", "kartoffeln"])) {
    addFeatureBadge(badges, "Gemüse", "feature-tag");
  }

  if (hasRecipeTag(recipe, ["glutenfrei", "gf"])) {
    addFeatureBadge(badges, "Glutenfrei", "feature-tag");
  }

  if (hasRecipeTag(recipe, ["laktosefrei", "milchfrei", "df"])) {
    addFeatureBadge(badges, "Milchfrei", "feature-tag");
  }

  if (recipe.ingredients.some((ingredient) => ingredient.amount !== null || ingredient.conversionNote)) {
    addFeatureBadge(badges, "Metrisch analysiert", "feature-tag");
  }

  return badges.slice(0, 6);
}

function recipeMatchesFeatureFilter(recipe, featureValue) {
  if (featureValue === "all") {
    return true;
  }

  const featureBadges = getRecipeFeatureBadges(recipe).map((badge) => badge.label.toLowerCase());
  return featureBadges.includes(featureValue.toLowerCase());
}

function renderSourceFilterOptions() {
  const currentValue = elements.sourceFilterSelect.value || "all";
  const recipes = getAllRecipes();
  const sourceMap = new Map();

  recipes.forEach((recipe) => {
    const key = getRecipeSourceKey(recipe);
    const label = recipe.sourceName || "Unbekannte Quelle";

    if (!sourceMap.has(key)) {
      sourceMap.set(key, label);
    }
  });

  const options = [...sourceMap.entries()]
    .sort((a, b) => a[1].localeCompare(b[1], "de"))
    .map(([value, label]) => {
      return `<option value="${escapeHtml(value)}">${escapeHtml(label)}</option>`;
    })
    .join("");

  elements.sourceFilterSelect.innerHTML = `
    <option value="all">Alle Quellen</option>
    ${options}
  `;

  const availableValues = ["all", ...sourceMap.keys()];

  if (availableValues.includes(currentValue)) {
    elements.sourceFilterSelect.value = currentValue;
  } else {
    elements.sourceFilterSelect.value = "all";
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

function saveAllData() {
  saveFavorites();
  saveCustomRecipes();
  saveShoppingList();
  saveSources();
  saveImportLog();
}

function setView(viewName) {
  const viewMap = {
    recipes: elements.recipesView,
    sources: elements.sourcesView,
    shopping: elements.shoppingView,
    settings: elements.settingsView
  };

  Object.entries(viewMap).forEach(([name, view]) => {
    view.classList.toggle("active-view", name === viewName);
  });

  elements.navButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.view === viewName);
  });

  if (viewName === "recipes") {
    renderSourceFilterOptions();
    renderRecipes();
  }

  if (viewName === "shopping") {
    renderShoppingList();
  }

  if (viewName === "sources") {
    renderSources();
    renderImportLog();
  }

  if (viewName === "settings") {
    updateDashboard();
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
  const sourceValue = elements.sourceFilterSelect.value;
  const recipeTypeValue = elements.recipeTypeSelect.value;
  const featureValue = elements.featureFilterSelect ? elements.featureFilterSelect.value : "all";

  let filteredRecipes = recipes.filter((recipe) => {
    const featureBadges = getRecipeFeatureBadges(recipe);
    const searchableText = [
      getRecipeSearchText(recipe),
      ...featureBadges.map((badge) => badge.label)
    ].join(" ").toLowerCase();

    const matchesSearch = !searchTerm || searchableText.includes(searchTerm);
    const matchesCategory = categoryValue === "all" || recipe.category === categoryValue;
    const matchesDifficulty = difficultyValue === "all" || recipe.difficulty === difficultyValue;
    const matchesTime = maxTimeValue === "all" || recipe.totalTime <= Number(maxTimeValue);
    const matchesSource = sourceValue === "all" || getRecipeSourceKey(recipe) === sourceValue;
    const matchesRecipeType = recipeTypeValue === "all" || getRecipeType(recipe) === recipeTypeValue;
    const matchesFeature = recipeMatchesFeatureFilter(recipe, featureValue);
    const matchesFavorite = !showOnlyFavorites || isFavorite(recipe.id);
    const matchesQuickFilter = activeQuickFilter === "all" || searchableText.includes(activeQuickFilter);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesDifficulty &&
      matchesTime &&
      matchesSource &&
      matchesRecipeType &&
      matchesFeature &&
      matchesFavorite &&
      matchesQuickFilter
    );
  });

  if (sortValue === "relevance") {
    filteredRecipes.sort((a, b) => {
      const scoreDifference = getRecipeRelevanceScore(b, searchTerm) - getRecipeRelevanceScore(a, searchTerm);

      if (scoreDifference !== 0) {
        return scoreDifference;
      }

      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }

  if (sortValue === "favorites") {
    filteredRecipes.sort((a, b) => {
      const favoriteDifference = Number(isFavorite(b.id)) - Number(isFavorite(a.id));

      if (favoriteDifference !== 0) {
        return favoriteDifference;
      }

      return a.title.localeCompare(b.title, "de");
    });
  }

  if (sortValue === "recentImported") {
    filteredRecipes.sort((a, b) => {
      const importedDifference = Number(b.isImported) - Number(a.isImported);

      if (importedDifference !== 0) {
        return importedDifference;
      }

      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }

  if (sortValue === "newest") {
    filteredRecipes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  if (sortValue === "time") {
    filteredRecipes.sort((a, b) => {
      const timeDifference = a.totalTime - b.totalTime;

      if (timeDifference !== 0) {
        return timeDifference;
      }

      return a.title.localeCompare(b.title, "de");
    });
  }

  if (sortValue === "title") {
    filteredRecipes.sort((a, b) => a.title.localeCompare(b.title, "de"));
  }

  if (sortValue === "source") {
    filteredRecipes.sort((a, b) => {
      const sourceDifference = a.sourceName.localeCompare(b.sourceName, "de");

      if (sourceDifference !== 0) {
        return sourceDifference;
      }

      return a.title.localeCompare(b.title, "de");
    });
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
    const recipeTypeConfig = getRecipeTypeConfig(recipe);
    const sourceName = recipe.sourceName || "Unbekannte Quelle";
    const featureBadges = getRecipeFeatureBadges(recipe);

    const sourceLink = sourceUrl === "#"
      ? ""
      : `
        <a class="source-link" href="${escapeHtml(sourceUrl)}" target="_blank" rel="noopener noreferrer">
          Originalquelle öffnen
        </a>
      `;

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
          <div class="card-badges" aria-label="Rezeptkennzeichnung">
            <span class="tag ${escapeHtml(recipeTypeConfig.className)}">${escapeHtml(recipeTypeConfig.label)}</span>
            <span class="tag">${escapeHtml(recipe.category)}</span>
          </div>

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

        <div class="recipe-card-source-row">
          <span>Quelle</span>
          <strong>${escapeHtml(sourceName)}</strong>
        </div>

        <div class="feature-badges" aria-label="Rezepteigenschaften">
          ${featureBadges.map((badge) => `<span class="tag ${escapeHtml(badge.className)}">${escapeHtml(badge.label)}</span>`).join("")}
        </div>

        <div class="meta">
          <span class="tag">${escapeHtml(recipe.totalTime)} Min.</span>
          <span class="tag">${escapeHtml(recipe.servings)} Portionen</span>
          <span class="tag">${escapeHtml(recipe.difficulty)}</span>
          <span class="tag">${escapeHtml(recipe.instructions.length)} Schritte</span>
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
  elements.sourceFilterSelect.value = "all";
  elements.recipeTypeSelect.value = "all";

  if (elements.featureFilterSelect) {
    elements.featureFilterSelect.value = "all";
  }

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

  elements.modalCategory.textContent = recipe.isImported
    ? `${recipe.category} · Importiert`
    : recipe.isCustom
      ? `${recipe.category} · Eigenes Rezept`
      : `${recipe.category} · Lokal`;

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
    elements.modalEditButton.classList.remove("hidden");
    elements.modalDeleteButton.classList.remove("hidden");
  } else {
    elements.modalEditButton.classList.add("hidden");
    elements.modalDeleteButton.classList.add("hidden");
  }

  updateModalFavoriteButton(recipe.id);
  renderServingControls();
  renderModalIngredients();
  renderModalInstructions(recipe);
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

function renderModalInstructions(recipe) {
  elements.modalInstructions.innerHTML = "";

  if (!recipe.instructions || recipe.instructions.length === 0) {
    elements.modalInstructions.innerHTML = `
      <li class="instruction-empty">
        Für dieses Rezept ist noch keine Kochanleitung gespeichert.
      </li>
    `;
    return;
  }

  recipe.instructions.forEach((instruction) => {
    const item = document.createElement("li");
    item.className = "instruction-item";

    const timerText = instruction.timerMinutes
      ? `<p>${escapeHtml(instruction.timerMinutes)} Minuten</p>`
      : "";

    item.innerHTML = `
      <div class="instruction-content">
        <strong>${escapeHtml(instruction.text)}</strong>
        ${timerText}
      </div>
    `;

    elements.modalInstructions.appendChild(item);
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

  if (original.confidence === "low") {
    notes.push("unsichere Erkennung");
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

  if (unit === "kg" && amount < 1) {
    return {
      amount: amount * 1000,
      unit: "g"
    };
  }

  if (unit === "ml" && amount >= 1000) {
    return {
      amount: amount / 1000,
      unit: "l"
    };
  }

  if (unit === "l" && amount < 1) {
    return {
      amount: amount * 1000,
      unit: "ml"
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
    if (ingredient.note && ingredient.food) {
      return `${ingredient.food} ${ingredient.note}`.trim();
    }

    return ingredient.food || ingredient.originalText;
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
  const rounded = Math.round(amount * 12) / 12;
  const whole = Math.floor(rounded);
  const fraction = Number((rounded - whole).toFixed(4));

  const fractionMap = {
    0.25: "1/4",
    0.3333: "1/3",
    0.5: "1/2",
    0.6667: "2/3",
    0.75: "3/4"
  };

  const matchingFraction = Object.keys(fractionMap).find((key) => {
    return Math.abs(Number(key) - fraction) < 0.02;
  });

  if (matchingFraction) {
    return whole > 0 ? `${whole} ${fractionMap[matchingFraction]}` : fractionMap[matchingFraction];
  }

  return formatGermanNumber(Math.round(amount * 10) / 10);
}

function formatGermanNumber(value) {
  if (Number.isInteger(value)) {
    return String(value);
  }

  return String(value).replace(".", ",");
}

function normalizeShoppingMeasurement(amount, unit) {
  if (amount === null || amount === undefined || !unit) {
    return {
      amount: null,
      unit: ""
    };
  }

  if (unit === "kg") {
    return {
      amount: amount * 1000,
      unit: "g"
    };
  }

  if (unit === "l") {
    return {
      amount: amount * 1000,
      unit: "ml"
    };
  }

  if (unit === "EL") {
    return {
      amount: amount * 3,
      unit: "TL"
    };
  }

  return {
    amount,
    unit
  };
}

function formatShoppingAmount(amount, unit) {
  const normalized = normalizeDisplayUnit(amount, unit);
  return `${formatAmount(normalized.amount, normalized.unit)} ${normalized.unit}`;
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
  const normalizedMeasurement = normalizeShoppingMeasurement(amount, unit);
  const isAddable = ingredient.scalable && normalizedMeasurement.amount !== null && normalizedMeasurement.unit;

  if (isAddable) {
    const existingItem = shoppingList.find((item) => {
      return (
        item.normalizedFood.toLowerCase() === food.toLowerCase() &&
        item.unit === normalizedMeasurement.unit &&
        item.note === ""
      );
    });

    if (existingItem) {
      existingItem.amount = Number(existingItem.amount || 0) + normalizedMeasurement.amount;

      if (recipeId && !existingItem.sourceRecipeIds.includes(recipeId)) {
        existingItem.sourceRecipeIds.push(recipeId);
      }

      return;
    }
  }

  const note = ingredient.note || (!ingredient.scalable ? "nicht automatisch skaliert" : "");

  const duplicateQualitative = shoppingList.find((item) => {
    return (
      item.normalizedFood.toLowerCase() === food.toLowerCase() &&
      item.unit === normalizedMeasurement.unit &&
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
    normalizedFood: food,
    amount: isAddable ? normalizedMeasurement.amount : null,
    unit: isAddable ? normalizedMeasurement.unit : "",
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

    return a.normalizedFood.localeCompare(b.normalizedFood, "de");
  });

  sortedItems.forEach((item) => {
    const shoppingItem = document.createElement("div");
    shoppingItem.className = "shopping-item";

    const amountLabel = item.amount === null || !item.unit
      ? ""
      : `${formatShoppingAmount(item.amount, item.unit)} `;

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
    addSource: elements.addSourceModal,
    importUrl: elements.importUrlModal
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
  elements.importUrlModal.classList.add("hidden");
  document.body.classList.remove("modal-open");
}

function openAddRecipeModal() {
  editingRecipeId = null;

  elements.addRecipeForm.reset();
  elements.addRecipeTitle.textContent = "Rezept hinzufügen";
  elements.addRecipeIntro.innerHTML =
    'Trage ein eigenes Rezept ein. Zutaten können mit Mengen angegeben werden, zum Beispiel: <strong>200 g Pasta</strong> oder <strong>Salz nach Geschmack</strong>.';
  elements.saveRecipeButton.textContent = "Rezept speichern";
  elements.newRecipeServings.value = 2;
  elements.newRecipeTime.value = 30;

  openModal(elements.addRecipeModal);
  elements.newRecipeTitle.focus();
}

function openEditRecipeModal() {
  const recipe = customRecipes.find((item) => item.id === activeRecipeId);

  if (!recipe) {
    showToast("Dieses Rezept kann nicht bearbeitet werden.");
    return;
  }

  const normalizedRecipe = normalizeRecipe(recipe);
  editingRecipeId = normalizedRecipe.id;

  elements.addRecipeForm.reset();
  elements.addRecipeTitle.textContent = "Rezept bearbeiten";
  elements.addRecipeIntro.textContent = "Passe dein eigenes Rezept an. Beim Speichern werden Zutaten und Zubereitung neu analysiert.";
  elements.saveRecipeButton.textContent = "Änderungen speichern";

  elements.newRecipeTitle.value = normalizedRecipe.title;
  elements.newRecipeDescription.value = normalizedRecipe.description;
  elements.newRecipeCategory.value = normalizedRecipe.category;
  elements.newRecipeDifficulty.value = normalizedRecipe.difficulty;
  elements.newRecipeServings.value = normalizedRecipe.servings;
  elements.newRecipeTime.value = normalizedRecipe.totalTime;
  elements.newRecipeIcon.value = normalizedRecipe.icon;
  elements.newRecipeIngredients.value = normalizedRecipe.ingredients
    .map((ingredient) => ingredient.originalText || formatIngredientLabel(ingredient))
    .join("\n");
  elements.newRecipeInstructions.value = normalizedRecipe.instructions
    .map((instruction) => instruction.text)
    .join("\n");
  elements.newRecipeTags.value = normalizedRecipe.tags.join(", ");
  elements.newRecipeSourceUrl.value = normalizedRecipe.sourceUrl;

  closeModal("detail");
  openModal(elements.addRecipeModal);
  elements.newRecipeTitle.focus();
}

function saveRecipeFromForm(event) {
  event.preventDefault();

  const title = elements.newRecipeTitle.value.trim();
  const description = elements.newRecipeDescription.value.trim();
  const ingredientLines = splitIngredientLines(elements.newRecipeIngredients.value);
  const instructionLines = splitInstructionLines(elements.newRecipeInstructions.value);
  const tags = splitTagList(elements.newRecipeTags.value);
  const sourceUrl = elements.newRecipeSourceUrl.value.trim();
  const icon = elements.newRecipeIcon.value;

  if (!title || !description || ingredientLines.length === 0) {
    showToast("Bitte fülle Rezeptname, Beschreibung und Zutaten aus.");
    return;
  }

  if (editingRecipeId) {
    const recipeIndex = customRecipes.findIndex((recipe) => recipe.id === editingRecipeId);

    if (recipeIndex === -1) {
      showToast("Das Rezept wurde nicht gefunden.");
      return;
    }

    const previousRecipe = normalizeRecipe(customRecipes[recipeIndex]);

    customRecipes[recipeIndex] = {
      ...previousRecipe,
      title,
      description,
      sourceName: sourceUrl ? previousRecipe.sourceName || "Eigene Quelle" : "Eigenes Rezept",
      sourceUrl,
      category: elements.newRecipeCategory.value,
      difficulty: elements.newRecipeDifficulty.value,
      servings: Number(elements.newRecipeServings.value),
      totalTime: Number(elements.newRecipeTime.value),
      tags,
      icon,
      imageClass: getImageClassFromIcon(icon),
      updatedAt: new Date().toISOString(),
      ingredients: ingredientLines.map(createIngredient),
      instructions: instructionLines.length > 0
        ? instructionLines.map((line, index) => createInstruction(line, index + 1))
        : createDefaultInstructions(title)
    };

    activeRecipeId = editingRecipeId;
    editingRecipeId = null;

    saveCustomRecipes();
    renderSourceFilterOptions();
    closeModal("addRecipe");
    renderRecipes();
    showToast("Rezept wurde aktualisiert.");
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
    updatedAt: new Date().toISOString(),
    ingredients: ingredientLines.map(createIngredient),
    instructions: instructionLines.length > 0
      ? instructionLines.map((line, index) => createInstruction(line, index + 1))
      : createDefaultInstructions(title)
  };

  customRecipes.push(recipe);
  saveCustomRecipes();
  renderSourceFilterOptions();
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

function splitInstructionLines(value) {
  return String(value || "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
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

  const shouldDelete = confirm("Möchtest du dieses Rezept wirklich löschen?");

  if (!shouldDelete) {
    return;
  }

  customRecipes = customRecipes.filter((item) => item.id !== recipe.id);
  favorites = favorites.filter((id) => id !== recipe.id);

  saveCustomRecipes();
  saveFavorites();
  renderSourceFilterOptions();
  closeModal("detail");
  renderRecipes();
  showToast("Rezept wurde gelöscht.");
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
          data-source-action="edit"
          data-source-id="${escapeHtml(source.id)}"
        >
          Bearbeiten
        </button>

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

  renderSourceFilterOptions();
  updateDashboard();
}

function openAddSourceModal() {
  editingSourceId = null;

  elements.addSourceForm.reset();
  elements.addSourceTitle.textContent = "Neue Homepage eintragen";
  elements.addSourceIntro.textContent =
    "Im Browser-Prototyp wird der Import simuliert. In der späteren Backend-Version werden robots.txt, strukturierte Rezeptdaten, Sitemaps und Importfehler echt geprüft.";
  elements.saveSourceButton.textContent = "Quelle speichern";

  openModal(elements.addSourceModal);
  elements.newSourceName.focus();
}

function openEditSourceModal(sourceId) {
  const source = sources.find((item) => item.id === sourceId);

  if (!source) {
    showToast("Quelle wurde nicht gefunden.");
    return;
  }

  editingSourceId = source.id;

  elements.addSourceForm.reset();
  elements.addSourceTitle.textContent = "Quelle bearbeiten";
  elements.addSourceIntro.textContent = "Passe Name, URL oder Import-Häufigkeit dieser Quelle an.";
  elements.saveSourceButton.textContent = "Änderungen speichern";

  elements.newSourceName.value = source.name;
  elements.newSourceUrl.value = source.baseUrl.startsWith("http") ? source.baseUrl : "https://example.com";

  if (["Manuell", "Wöchentlich", "Täglich"].includes(source.importFrequency)) {
    elements.newSourceFrequency.value = source.importFrequency;
  } else {
    elements.newSourceFrequency.value = "Manuell";
  }

  openModal(elements.addSourceModal);
  elements.newSourceName.focus();
}

function saveSourceFromForm(event) {
  event.preventDefault();

  const name = elements.newSourceName.value.trim();
  const baseUrl = elements.newSourceUrl.value.trim();
  const importFrequency = elements.newSourceFrequency.value;

  if (!name || !baseUrl) {
    showToast("Bitte Quellenname und URL eingeben.");
    return;
  }

  if (editingSourceId) {
    const sourceIndex = sources.findIndex((source) => source.id === editingSourceId);

    if (sourceIndex === -1) {
      showToast("Quelle wurde nicht gefunden.");
      return;
    }

    sources[sourceIndex] = {
      ...sources[sourceIndex],
      name,
      baseUrl,
      importFrequency,
      lastCheckedAt: "Bearbeitet",
      errorMessage: ""
    };

    editingSourceId = null;
    saveSources();
    renderSourceFilterOptions();
    closeModal("addSource");
    renderSources();
    renderRecipes();
    showToast("Quelle wurde aktualisiert.");
    return;
  }

  sources.push({
    id: `source-${Date.now()}`,
    name,
    baseUrl,
    status: "Aktiv",
    robotsAllowed: true,
    parserType: "Prüfung erforderlich",
    importFrequency,
    importedRecipeCount: 0,
    lastCheckedAt: "Noch nicht geprüft",
    errorMessage: ""
  });

  saveSources();
  renderSourceFilterOptions();
  closeModal("addSource");
  renderSources();
  showToast("Quelle wurde gespeichert.");
}

function handleSourceAction(action, sourceId) {
  const source = sources.find((item) => item.id === sourceId);

  if (!source) {
    return;
  }

  if (action === "edit") {
    openEditSourceModal(sourceId);
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
    renderSourceFilterOptions();
    renderSources();
    renderRecipes();
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

  importLog = importLog.slice(0, 10);
  saveImportLog();
  renderImportLog();
}

function renderImportLog() {
  elements.importLog.innerHTML = "";

  if (importLog.length === 0) {
    elements.importLog.innerHTML = `
      <div class="import-log-item">
        Noch kein Import gestartet. Starte einen Beispiel-Import oder importiere eine Rezept-URL.
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
      updatedAt: new Date().toISOString(),
      ingredients: [
        createIngredient("500 g Kartoffeln"),
        createIngredient("250 g Karotten"),
        createIngredient("1 Stück Paprika"),
        createIngredient("2 EL Olivenöl"),
        createIngredient("1 TL Salz"),
        createIngredient("Pfeffer nach Geschmack")
      ],
      instructions: [
        createInstruction("Gemüse waschen, schneiden und auf ein Backblech geben.", 1),
        createInstruction("Olivenöl und Gewürze darübergeben und alles gut vermengen.", 2),
        createInstruction("Im Ofen backen, bis das Gemüse weich und leicht gebräunt ist.", 3)
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

  renderSourceFilterOptions();
  renderSources();
  renderRecipes();
  showToast(alreadyImported ? "Import wurde erneut simuliert." : "Beispielrezept wurde importiert.");
}

function openUrlImportModal() {
  elements.importUrlForm.reset();
  openModal(elements.importUrlModal);
  elements.recipeUrlInput.focus();
}

function simulateUrlRecipeImport(event) {
  event.preventDefault();

  const rawUrl = elements.recipeUrlInput.value.trim();
  const customTitle = elements.recipeUrlTitleInput.value.trim();

  let parsedUrl;

  try {
    parsedUrl = new URL(rawUrl);
  } catch {
    showToast("Bitte gib eine gültige URL ein.");
    return;
  }

  if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
    showToast("Nur http- und https-URLs werden unterstützt.");
    return;
  }

  const source = getOrCreateSourceFromUrl(parsedUrl);
  const recipeTitle = customTitle || createTitleFromUrl(parsedUrl);
  const recipeId = `url-import-${Date.now()}`;
  const icon = pickIconFromTitle(recipeTitle);

  const simulatedRecipe = {
    id: recipeId,
    title: recipeTitle,
    description: "Simuliert aus einer Rezept-URL importiertes Rezept. Der echte Webseitenabruf wird später über ein Backend umgesetzt.",
    sourceId: source.id,
    sourceName: source.name,
    sourceUrl: parsedUrl.href,
    category: "Hauptgericht",
    difficulty: "Einfach",
    servings: 2,
    totalTime: 30,
    tags: ["importiert", "url-import", "metrisch"],
    icon,
    imageClass: getImageClassFromIcon(icon),
    isCustom: true,
    isImported: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ingredients: createSimulatedIngredientsFromTitle(recipeTitle),
    instructions: createSimulatedInstructionsFromTitle(recipeTitle)
  };

  customRecipes.push(simulatedRecipe);
  source.importedRecipeCount += 1;
  source.lastCheckedAt = "Gerade eben";
  source.robotsAllowed = true;
  source.parserType = "simulierter JSON-LD Recipe Import";
  source.errorMessage = "";

  saveSources();
  saveCustomRecipes();

  addImportLog(
    `URL-Import simuliert: „${recipeTitle}“`,
    `URL geprüft: ${parsedUrl.hostname}. Strukturierte Rezeptdaten simuliert, Zutaten analysiert, Mengen metrisch normalisiert, Original-Link gespeichert.`
  );

  renderSourceFilterOptions();
  closeModal("importUrl");
  setView("recipes");
  elements.sortSelect.value = "recentImported";
  elements.recipeTypeSelect.value = "imported";
  renderRecipes();

  showToast("Rezept-URL wurde als Simulation importiert.");
}

function getOrCreateSourceFromUrl(parsedUrl) {
  const hostname = parsedUrl.hostname.replace(/^www\./, "");
  const existingSource = sources.find((source) => {
    try {
      const sourceUrl = new URL(source.baseUrl);
      return sourceUrl.hostname.replace(/^www\./, "") === hostname;
    } catch {
      return source.baseUrl.includes(hostname);
    }
  });

  if (existingSource) {
    return existingSource;
  }

  const newSource = {
    id: `source-${Date.now()}`,
    name: hostname,
    baseUrl: parsedUrl.origin,
    status: "Aktiv",
    robotsAllowed: true,
    parserType: "simulierte Prüfung",
    importFrequency: "Manuell",
    importedRecipeCount: 0,
    lastCheckedAt: "Gerade eben",
    errorMessage: ""
  };

  sources.push(newSource);
  saveSources();

  return newSource;
}

function createTitleFromUrl(parsedUrl) {
  const pathParts = parsedUrl.pathname
    .split("/")
    .map((part) => part.trim())
    .filter(Boolean);

  const lastPart = pathParts[pathParts.length - 1] || parsedUrl.hostname;

  const cleaned = lastPart
    .replace(/\.(html|htm|php)$/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\d+/g, "")
    .trim();

  if (!cleaned) {
    return "Importiertes Rezept";
  }

  return cleaned
    .split(" ")
    .filter(Boolean)
    .map(capitalizeFirst)
    .join(" ");
}

function pickIconFromTitle(title) {
  const lower = title.toLowerCase();

  if (lower.includes("pasta") || lower.includes("nudel") || lower.includes("spaghetti")) {
    return "🍝";
  }

  if (lower.includes("salat")) {
    return "🥗";
  }

  if (lower.includes("curry")) {
    return "🍛";
  }

  if (lower.includes("suppe") || lower.includes("tomate")) {
    return "🍅";
  }

  if (lower.includes("reis")) {
    return "🍚";
  }

  if (lower.includes("kuchen") || lower.includes("dessert")) {
    return "🍰";
  }

  if (lower.includes("sandwich") || lower.includes("snack")) {
    return "🥪";
  }

  return "🍽️";
}

function createSimulatedIngredientsFromTitle(title) {
  const lower = title.toLowerCase();

  if (lower.includes("pasta") || lower.includes("nudel") || lower.includes("spaghetti")) {
    return [
      createIngredient("200 g Pasta"),
      createIngredient("250 g Tomaten"),
      createIngredient("1 EL Olivenöl"),
      createIngredient("1 Stück Knoblauchzehe"),
      createIngredient("Salz nach Geschmack")
    ];
  }

  if (lower.includes("reis")) {
    return [
      createIngredient("200 g Reis"),
      createIngredient("250 g Gemüse"),
      createIngredient("1 EL Öl zum Anbraten"),
      createIngredient("1 TL Gewürze"),
      createIngredient("Salz nach Geschmack")
    ];
  }

  if (lower.includes("salat")) {
    return [
      createIngredient("1 Stück Gurke"),
      createIngredient("200 g Tomaten"),
      createIngredient("100 g Blattsalat"),
      createIngredient("2 EL Olivenöl"),
      createIngredient("1 EL Zitronensaft")
    ];
  }

  if (lower.includes("suppe")) {
    return [
      createIngredient("500 g Gemüse"),
      createIngredient("500 ml Gemüsebrühe"),
      createIngredient("1 Stück Zwiebel"),
      createIngredient("1 EL Olivenöl"),
      createIngredient("Pfeffer nach Geschmack")
    ];
  }

  if (lower.includes("curry")) {
    return [
      createIngredient("400 ml Kokosmilch"),
      createIngredient("250 g Gemüse"),
      createIngredient("200 g Reis"),
      createIngredient("1 EL Currypulver"),
      createIngredient("Salz nach Geschmack")
    ];
  }

  return [
    createIngredient("250 g Hauptzutat"),
    createIngredient("200 g Gemüse"),
    createIngredient("1 EL Olivenöl"),
    createIngredient("1 TL Gewürze"),
    createIngredient("Salz nach Geschmack")
  ];
}

function createSimulatedInstructionsFromTitle(title) {
  const lower = title.toLowerCase();

  if (lower.includes("pasta") || lower.includes("nudel") || lower.includes("spaghetti")) {
    return [
      createInstruction("Pasta in Salzwasser kochen.", 1),
      createInstruction("Sauce vorbereiten und kurz köcheln lassen.", 2),
      createInstruction("Pasta mit der Sauce vermengen und servieren.", 3)
    ];
  }

  if (lower.includes("reis")) {
    return [
      createInstruction("Reis nach Packungsangabe kochen.", 1),
      createInstruction("Weitere Zutaten vorbereiten und anbraten.", 2),
      createInstruction("Alles zusammenführen und abschmecken.", 3)
    ];
  }

  if (lower.includes("salat")) {
    return [
      createInstruction("Gemüse waschen und schneiden.", 1),
      createInstruction("Dressing anrühren.", 2),
      createInstruction("Alles vermengen und frisch servieren.", 3)
    ];
  }

  if (lower.includes("suppe")) {
    return [
      createInstruction("Zutaten vorbereiten und in einem Topf anbraten.", 1),
      createInstruction("Flüssigkeit hinzufügen und köcheln lassen.", 2),
      createInstruction("Nach Wunsch pürieren und abschmecken.", 3)
    ];
  }

  if (lower.includes("curry")) {
    return [
      createInstruction("Reis oder Beilage vorbereiten.", 1),
      createInstruction("Gemüse mit Gewürzen anbraten.", 2),
      createInstruction("Kokosmilch hinzufügen und köcheln lassen.", 3),
      createInstruction("Abschmecken und servieren.", 4)
    ];
  }

  return createDefaultInstructions(title);
}

function createExportData() {
  return {
    app: "RecipeFinder",
    schemaVersion: 1,
    exportedAt: new Date().toISOString(),
    data: {
      customRecipes,
      favorites,
      shoppingList,
      sources,
      importLog
    }
  };
}

function exportData() {
  const exportPayload = createExportData();
  elements.exportDataOutput.value = JSON.stringify(exportPayload, null, 2);
  showToast("Export wurde erzeugt.");
}

async function copyExportData() {
  if (!elements.exportDataOutput.value.trim()) {
    exportData();
  }

  const text = elements.exportDataOutput.value;

  try {
    await navigator.clipboard.writeText(text);
    showToast("Export wurde kopiert.");
  } catch {
    elements.exportDataOutput.focus();
    elements.exportDataOutput.select();
    document.execCommand("copy");
    showToast("Export wurde markiert und kopiert.");
  }
}

function importData(event) {
  event.preventDefault();

  let parsed;

  try {
    parsed = JSON.parse(elements.importDataInput.value);
  } catch {
    showToast("Der Import ist kein gültiges JSON.");
    return;
  }

  if (!parsed || typeof parsed !== "object" || !parsed.data) {
    showToast("Die JSON-Struktur passt nicht zu RecipeFinder.");
    return;
  }

  const shouldImport = confirm("Bestehende lokale Daten werden ersetzt. Möchtest du fortfahren?");

  if (!shouldImport) {
    return;
  }

  customRecipes = Array.isArray(parsed.data.customRecipes)
    ? parsed.data.customRecipes.map(normalizeRecipe)
    : [];

  favorites = Array.isArray(parsed.data.favorites)
    ? parsed.data.favorites.filter((item) => typeof item === "string")
    : [];

  shoppingList = Array.isArray(parsed.data.shoppingList)
    ? parsed.data.shoppingList.map(normalizeShoppingItem)
    : [];

  sources = Array.isArray(parsed.data.sources)
    ? parsed.data.sources.map(normalizeSource)
    : deepClone(defaultSources).map(normalizeSource);

  importLog = Array.isArray(parsed.data.importLog)
    ? parsed.data.importLog
    : [];

  saveAllData();
  renderSourceFilterOptions();
  renderRecipes();
  renderShoppingList();
  renderSources();
  renderImportLog();
  updateDashboard();

  elements.importDataInput.value = "";
  elements.exportDataOutput.value = "";

  showToast("Daten wurden importiert.");
}

function clearUserData() {
  const shouldClear = confirm(
    "Möchtest du eigene Rezepte, Favoriten, Einkaufsliste, Quellen und Importprotokoll löschen?"
  );

  if (!shouldClear) {
    return;
  }

  customRecipes = [];
  favorites = [];
  shoppingList = [];
  sources = deepClone(defaultSources).map(normalizeSource);
  importLog = [];

  saveAllData();

  elements.exportDataOutput.value = "";
  elements.importDataInput.value = "";

  showOnlyFavorites = false;
  activeQuickFilter = "all";
  setQuickFilter("all");
  elements.sourceFilterSelect.value = "all";
  elements.recipeTypeSelect.value = "all";

  if (elements.featureFilterSelect) {
    elements.featureFilterSelect.value = "all";
  }

  renderSourceFilterOptions();
  renderRecipes();
  renderShoppingList();
  renderSources();
  renderImportLog();
  updateDashboard();

  showToast("Eigene Daten wurden gelöscht.");
}

function resetDemoData() {
  const shouldReset = confirm(
    "Möchtest du den Prototyp vollständig zurücksetzen? Alle lokalen Daten werden gelöscht."
  );

  if (!shouldReset) {
    return;
  }

  Object.values(STORAGE_KEYS).forEach((key) => {
    localStorage.removeItem(key);
  });

  localStorage.removeItem("customRecipes");
  localStorage.removeItem("favorites");
  localStorage.removeItem("shoppingList");

  showToast("Prototyp wird zurückgesetzt.");

  window.setTimeout(() => {
    window.location.reload();
  }, 700);
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

  elements.openUrlImportButton.addEventListener("click", openUrlImportModal);
  elements.openUrlImportButtonSecondary.addEventListener("click", openUrlImportModal);
  elements.openUrlImportButtonSources.addEventListener("click", openUrlImportModal);
  elements.importUrlForm.addEventListener("submit", simulateUrlRecipeImport);

  elements.searchInput.addEventListener("input", renderRecipes);
  elements.sortSelect.addEventListener("change", renderRecipes);
  elements.categorySelect.addEventListener("change", renderRecipes);
  elements.difficultySelect.addEventListener("change", renderRecipes);
  elements.maxTimeSelect.addEventListener("change", renderRecipes);
  elements.sourceFilterSelect.addEventListener("change", renderRecipes);
  elements.recipeTypeSelect.addEventListener("change", renderRecipes);

  if (elements.featureFilterSelect) {
    elements.featureFilterSelect.addEventListener("change", renderRecipes);
  }

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

  elements.modalEditButton.addEventListener("click", openEditRecipeModal);
  elements.modalDeleteButton.addEventListener("click", deleteActiveCustomRecipe);

  elements.addRecipeForm.addEventListener("submit", saveRecipeFromForm);
  elements.addSourceForm.addEventListener("submit", saveSourceFromForm);

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

  elements.exportDataButton.addEventListener("click", exportData);
  elements.copyExportButton.addEventListener("click", copyExportData);
  elements.importDataForm.addEventListener("submit", importData);
  elements.clearUserDataButton.addEventListener("click", clearUserData);
  elements.resetDemoDataButton.addEventListener("click", resetDemoData);

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
  injectRecipeCardBadgeStyles();
  saveAllData();

  renderSourceFilterOptions();
  setupEventListeners();
  renderRecipes();
  renderShoppingList();
  renderSources();
  renderImportLog();
  updateDashboard();
}

initializeApp();