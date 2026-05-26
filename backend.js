// ─────────────────────────────────────────────────────────────────────────────
// backend.js – Echter URL-Import über dein Vercel-Backend
// ─────────────────────────────────────────────────────────────────────────────

const BACKEND_URL = "https://rezepte-backend.vercel.app";

async function realUrlImport(event) {
  event.preventDefault();

  const rawUrl = elements.recipeUrlInput.value.trim();
  const customTitle = elements.recipeUrlTitleInput.value.trim();
  const importOptions = getUrlImportOptions();

  let parsedUrl;
  try {
    parsedUrl = new URL(rawUrl);
  } catch {
    addImportLog("URL-Import fehlgeschlagen", "Die eingegebene Adresse ist keine gültige URL.", {
      status: "error", statusLabel: "Ungültige URL", url: rawUrl,
      steps: ["URL gelesen", "URL-Prüfung fehlgeschlagen", "Import abgebrochen"]
    });
    showToast("Bitte gib eine gültige URL ein.");
    return;
  }

  if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
    addImportLog("URL-Import blockiert", "Nur http- und https-URLs werden unterstützt.", {
      status: "error", statusLabel: "Blockiert", url: rawUrl,
      steps: ["URL gelesen", `Nicht unterstütztes Protokoll: ${parsedUrl.protocol}`, "Import abgebrochen"]
    });
    showToast("Nur http- und https-URLs werden unterstützt.");
    return;
  }

  showToast("Rezept wird geladen …");

  let apiData = null;
  let usedRealData = false;

  try {
    const apiUrl = `${BACKEND_URL}/api/scrape?url=${encodeURIComponent(rawUrl)}`;
    const response = await fetch(apiUrl, { signal: AbortSignal.timeout(15000) });
    if (response.ok) {
      const json = await response.json();
      if (json && json.success) {
        apiData = json;
        usedRealData = true;
      }
    }
  } catch (err) {
    console.warn("Backend nicht erreichbar, Fallback auf Simulation.", err);
  }

  const source = getOrCreateSourceFromUrl(parsedUrl);

  let recipeTitle, ingredients, instructions, description, tags, icon;

  if (usedRealData && apiData) {
    recipeTitle = customTitle || apiData.name || createTitleFromUrl(parsedUrl);
    description = apiData.description || "Importiertes Rezept von " + parsedUrl.hostname;
    ingredients = apiData.ingredients && apiData.ingredients.length > 0
      ? apiData.ingredients.map(line => createIngredient(line))
      : createSimulatedIngredientsFromTitle(recipeTitle);
    instructions = apiData.instructions && apiData.instructions.length > 0
      ? apiData.instructions.map((text, i) => createInstruction(text, i + 1))
      : createSimulatedInstructionsFromTitle(recipeTitle);
    if (apiData.cookTime) importOptions.totalTime = apiData.cookTime;
    if (apiData.servings) importOptions.servings = apiData.servings;
    tags = ["importiert", "url-import",
      ...(apiData.tags || []).map(t => t.toLowerCase()),
      importOptions.category.toLowerCase()
    ].filter((v, i, arr) => arr.indexOf(v) === i).slice(0, 8);
    icon = pickIconFromTitle(recipeTitle);
  } else {
    recipeTitle = customTitle || createTitleFromUrl(parsedUrl);
    description = "Simuliert importiertes Rezept – Backend war nicht erreichbar.";
    ingredients = createSimulatedIngredientsFromTitle(recipeTitle);
    instructions = createSimulatedInstructionsFromTitle(recipeTitle);
    tags = ["importiert", "url-import", "simulation", importOptions.category.toLowerCase()];
    icon = pickIconFromTitle(recipeTitle);
  }

  const newRecipe = {
    id: `url-import-${Date.now()}`,
    title: recipeTitle, description,
    sourceId: source.id, sourceName: source.name, sourceUrl: parsedUrl.href,
    category: importOptions.category, difficulty: importOptions.difficulty,
    servings: importOptions.servings, totalTime: importOptions.totalTime,
    tags, icon, imageClass: getImageClassFromIcon(icon),
    isCustom: true, isImported: true,
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    ingredients, instructions
  };

  customRecipes.push(newRecipe);
  source.importedRecipeCount += 1;
  source.lastCheckedAt = "Gerade eben";
  source.robotsAllowed = true;
  source.parserType = usedRealData ? "JSON-LD Recipe (echt)" : "simulierter Import";
  source.errorMessage = "";

  saveSources();
  saveCustomRecipes();

  addImportLog(
    `${usedRealData ? "Echter Import" : "Simulierter Import"}: „${recipeTitle}"`,
    usedRealData
      ? "Rezeptdaten wurden direkt von der Webseite geladen."
      : "Backend nicht erreichbar – Import wurde simuliert.",
    {
      status: usedRealData ? "success" : "warning",
      statusLabel: usedRealData ? "Importiert" : "Simuliert",
      sourceName: source.name, recipeTitle, url: parsedUrl.href,
      steps: usedRealData
        ? ["URL an Backend gesendet", `Seite geladen: ${parsedUrl.hostname}`,
           `${ingredients.length} Zutaten extrahiert`,
           `${instructions.length} Schritte importiert`, "Rezept gespeichert"]
        : createImportSteps(source.name, recipeTitle, importOptions)
    }
  );

  renderSourceFilterOptions();
  closeModal("importUrl");
  setView("recipes");
  elements.sortSelect.value = "recentImported";
  elements.recipeTypeSelect.value = "imported";
  renderRecipes();

  showToast(usedRealData
    ? `„${recipeTitle}" wurde importiert.`
    : "Import simuliert (Backend nicht erreichbar)."
  );
}

// Alten Listener entfernen und neuen setzen
window.addEventListener("load", () => {
  const form = document.getElementById("importUrlForm");
  if (form) {
    // Alten Listener durch Klonen des Elements entfernen
    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);

    // elements-Referenz aktualisieren
    elements.importUrlForm = newForm;
    elements.recipeUrlInput = newForm.querySelector("#recipeUrlInput");
    elements.recipeUrlTitleInput = newForm.querySelector("#recipeUrlTitleInput");
    elements.recipeUrlCategoryInput = newForm.querySelector("#recipeUrlCategoryInput");
    elements.recipeUrlDifficultyInput = newForm.querySelector("#recipeUrlDifficultyInput");
    elements.recipeUrlServingsInput = newForm.querySelector("#recipeUrlServingsInput");
    elements.recipeUrlTimeInput = newForm.querySelector("#recipeUrlTimeInput");

    // Neuen Listener mit echter Funktion registrieren
    newForm.addEventListener("submit", realUrlImport);
  }
});
