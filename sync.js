// ─────────────────────────────────────────────────────────────────────────────
// sync.js – Lädt automatisch importierte Rezepte aus dem Backend
// und fügt sie der App hinzu. Wird nach backend.js geladen.
// ─────────────────────────────────────────────────────────────────────────────

const SYNC_BACKEND_URL = "https://rezepte-backend.vercel.app";
const SYNC_STORAGE_KEY = "rf_synced_recipes";
const SYNC_LAST_KEY = "rf_last_sync";
const SYNC_INTERVAL_MS = 60 * 60 * 1000; // 1 Stunde (prüft ob neue da sind)

let syncedRecipes = loadSyncedRecipes();

function loadSyncedRecipes() {
  try {
    const raw = localStorage.getItem(SYNC_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveSyncedRecipes(recipes) {
  localStorage.setItem(SYNC_STORAGE_KEY, JSON.stringify(recipes));
}

function shouldSync() {
  const last = localStorage.getItem(SYNC_LAST_KEY);
  if (!last) return true;
  return Date.now() - Number(last) > SYNC_INTERVAL_MS;
}

async function syncRecipesFromBackend() {
  if (!shouldSync()) return;

  try {
    const response = await fetch(`${SYNC_BACKEND_URL}/api/recipes`, {
      signal: AbortSignal.timeout(10000)
    });

    if (!response.ok) return;

    const data = await response.json();
    if (!data.recipes || data.recipes.length === 0) return;

    // Neue Rezepte normalisieren und speichern
    const normalized = data.recipes.map(r => ({
      id: r.id,
      title: r.title || "Importiertes Rezept",
      description: r.description || "",
      sourceId: "source-auto-import",
      sourceName: r.sourceName || "Auto-Import",
      sourceUrl: r.sourceUrl || "",
      category: r.category || "Hauptgericht",
      difficulty: r.difficulty || "Mittel",
      servings: Number(r.servings) || 4,
      totalTime: Number(r.totalTime) || 30,
      tags: Array.isArray(r.tags) ? r.tags : ["auto-import"],
      icon: r.icon || "🍽️",
      imageClass: "image-default",
      isCustom: false,
      isImported: true,
      isSynced: true,
      createdAt: r.importedAt || new Date().toISOString(),
      updatedAt: r.importedAt || new Date().toISOString(),
      ingredients: Array.isArray(r.ingredients)
        ? r.ingredients.map(i => typeof i === "string" ? createIngredient(i) : i)
        : [],
      instructions: Array.isArray(r.instructions)
        ? r.instructions.map((t, idx) => typeof t === "string" ? createInstruction(t, idx + 1) : t)
        : []
    }));

    syncedRecipes = normalized;
    saveSyncedRecipes(normalized);
    localStorage.setItem(SYNC_LAST_KEY, String(Date.now()));

    // App neu rendern falls Rezepte neu sind
    if (typeof renderRecipes === "function") {
      renderRecipes();
    }
    if (typeof updateDashboard === "function") {
      updateDashboard();
    }

    if (normalized.length > 0) {
      console.log(`Sync: ${normalized.length} Rezepte geladen.`);
    }

  } catch (err) {
    console.warn("Sync fehlgeschlagen:", err.message);
  }
}

// getAllRecipes() erweitern um synced Rezepte
const _originalGetAllRecipes = getAllRecipes;
function getAllRecipes() {
  const base = _originalGetAllRecipes();
  const syncIds = new Set(base.map(r => r.id));
  const newSynced = syncedRecipes.filter(r => !syncIds.has(r.id));
  return [...base, ...newSynced];
}

// URL zur Import-Liste hinzufügen
async function addUrlToImportList(url, label) {
  try {
    const response = await fetch(`${SYNC_BACKEND_URL}/api/urls`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, label })
    });
    const data = await response.json();
    return data.success;
  } catch {
    return false;
  }
}

// URL aus Import-Liste entfernen
async function removeUrlFromImportList(url) {
  try {
    const response = await fetch(
      `${SYNC_BACKEND_URL}/api/urls?url=${encodeURIComponent(url)}`,
      { method: "DELETE" }
    );
    const data = await response.json();
    return data.success;
  } catch {
    return false;
  }
}

// Import-URLs laden
async function loadImportUrls() {
  try {
    const response = await fetch(`${SYNC_BACKEND_URL}/api/urls`);
    const data = await response.json();
    return data.urls || [];
  } catch {
    return [];
  }
}

// Beim Start synchronisieren
window.addEventListener("load", () => {
  setTimeout(syncRecipesFromBackend, 1500);
});
