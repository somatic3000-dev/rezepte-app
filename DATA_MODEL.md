# DATA_MODEL.md

# RecipeFinder – Datenmodell

## 1. Ziel

Dieses Dokument beschreibt die wichtigsten Datenstrukturen für RecipeFinder.

Das Datenmodell soll sicherstellen, dass Rezepte aus unterschiedlichen Quellen einheitlich gespeichert, durchsucht, analysiert, skaliert und für Einkaufslisten verwendet werden können.

---

## 2. Grundprinzip

Jedes Rezept besteht aus zwei Ebenen:

```text
Originaldaten
Normalisierte Daten
```

Die Originaldaten bleiben erhalten, damit jederzeit nachvollziehbar ist, was aus der Quelle importiert oder manuell eingegeben wurde.

Die normalisierten Daten werden für Suche, Filter, Portionsskalierung, metrische Mengen und Einkaufslisten verwendet.

---

## 3. Recipe

Ein Rezept ist die zentrale Einheit der App.

### Felder

| Feld | Typ | Beschreibung |
|---|---|---|
| id | string | Eindeutige Rezept-ID |
| title | string | Rezeptname |
| description | string | Kurzbeschreibung |
| source_id | string/null | Zugehörige Quelle |
| source_name | string | Anzeigename der Quelle |
| source_url | string | Original-URL |
| image_url | string/null | Bild-URL, falls erlaubt |
| icon | string | Symbol für Prototyp oder Fallback |
| category | string | Kategorie, z. B. Hauptgericht |
| cuisine | string/null | Küche, z. B. Italienisch |
| difficulty | string | Einfach, Mittel, Schwer |
| servings | number | Original-Portionen |
| prep_time | number/null | Vorbereitungszeit in Minuten |
| cook_time | number/null | Kochzeit in Minuten |
| total_time | number | Gesamtzeit in Minuten |
| ingredients | Ingredient[] | Zutatenliste |
| instructions | Instruction[] | Zubereitungsschritte |
| tags | string[] | Such- und Filter-Tags |
| diet_tags | string[] | Vegan, vegetarisch usw. |
| allergen_tags | string[] | Enthaltene Allergene |
| is_custom | boolean | Wurde manuell erstellt |
| is_imported | boolean | Wurde importiert |
| import_type | string | manual, simulated_url, simulated_source, backend_url, backend_source |
| imported_at | datetime/null | Importzeitpunkt |
| created_at | datetime | Erstellungszeitpunkt |
| updated_at | datetime | Änderungszeitpunkt |

### Beispiel

```json
{
  "id": "recipe_123",
  "title": "Vegetarische Pasta",
  "description": "Schnelle Pasta mit Tomaten und Gemüse.",
  "source_id": "source_123",
  "source_name": "Beispiel-Foodblog",
  "source_url": "https://example.com/vegetarische-pasta",
  "image_url": null,
  "icon": "🍝",
  "category": "Hauptgericht",
  "cuisine": "Italienisch",
  "difficulty": "Einfach",
  "servings": 2,
  "prep_time": 10,
  "cook_time": 15,
  "total_time": 25,
  "ingredients": [],
  "instructions": [],
  "tags": ["pasta", "vegetarisch", "schnell"],
  "diet_tags": ["vegetarisch"],
  "allergen_tags": ["gluten"],
  "is_custom": false,
  "is_imported": true,
  "import_type": "backend_url",
  "imported_at": "2026-05-22T12:00:00Z",
  "created_at": "2026-05-22T12:00:00Z",
  "updated_at": "2026-05-22T12:00:00Z"
}
```

---

## 4. Ingredient

Eine Zutat wird nicht nur als Text gespeichert, sondern strukturiert analysiert.

### Felder

| Feld | Typ | Beschreibung |
|---|---|---|
| id | string | Eindeutige Zutaten-ID |
| recipe_id | string | Zugehöriges Rezept |
| original_text | string | Originale Zutatenzeile |
| amount | number/null | Erkannte Menge |
| unit | string | Erkannte Einheit |
| normalized_amount | number/null | Normalisierte Menge |
| normalized_unit | string | Normalisierte Einheit |
| food | string | Erkanntes Lebensmittel |
| normalized_food | string | Vereinheitlichtes Lebensmittel |
| preparation | string | Zubereitungsform, z. B. gehackt |
| note | string | Zusatzinfo |
| scalable | boolean | Darf automatisch skaliert werden |
| scaling_group | string | Skalierungsgruppe |
| food_group | string | Lebensmittelgruppe |
| allergen_tags | string[] | Mögliche Allergene |
| conversion_note | string | Hinweis zur Umrechnung |
| confidence | string | high, medium, low |

### Beispiel

```json
{
  "id": "ingredient_123",
  "recipe_id": "recipe_123",
  "original_text": "250 g gehackte Tomaten",
  "amount": 250,
  "unit": "g",
  "normalized_amount": 250,
  "normalized_unit": "g",
  "food": "Tomaten",
  "normalized_food": "Tomaten",
  "preparation": "gehackt",
  "note": "",
  "scalable": true,
  "scaling_group": "normal",
  "food_group": "Gemüse",
  "allergen_tags": [],
  "conversion_note": "",
  "confidence": "high"
}
```

### Nicht skalierbare Zutat

```json
{
  "id": "ingredient_456",
  "recipe_id": "recipe_123",
  "original_text": "Salz nach Geschmack",
  "amount": null,
  "unit": "",
  "normalized_amount": null,
  "normalized_unit": "",
  "food": "Salz",
  "normalized_food": "Salz",
  "preparation": "",
  "note": "nach Geschmack",
  "scalable": false,
  "scaling_group": "qualitative",
  "food_group": "Gewürz",
  "allergen_tags": [],
  "conversion_note": "",
  "confidence": "high"
}
```

---

## 5. Scaling Groups

Zutaten werden in Skalierungsgruppen eingeteilt.

| Gruppe | Verhalten |
|---|---|
| normal | Wird proportional skaliert |
| spice | Wird vorsichtig oder gar nicht skaliert |
| qualitative | Wird nicht skaliert |
| cooking_medium | Wird nicht skaliert |
| container | Wird nur mit Vorsicht skaliert |
| garnish | Wird nicht oder vorsichtig skaliert |
| unknown | Wird aus Sicherheitsgründen nicht skaliert |

### Beispiele

| Original | Gruppe | Verhalten |
|---|---|---|
| 200 g Pasta | normal | skaliert |
| 1 EL Olivenöl | normal | skaliert |
| Salz nach Geschmack | qualitative | nicht skaliert |
| Pfeffer nach Geschmack | qualitative | nicht skaliert |
| Öl zum Anbraten | cooking_medium | nicht skaliert |
| 1 Prise Salz | spice | vorsichtig / nicht skaliert |
| 1 Backform | container | nicht automatisch skaliert |
| eine Handvoll Kräuter | unknown | nicht skaliert |

---

## 6. Source

Eine Quelle ist eine Homepage oder Sammlung, aus der Rezepte stammen.

### Felder

| Feld | Typ | Beschreibung |
|---|---|---|
| id | string | Eindeutige Quellen-ID |
| name | string | Anzeigename |
| base_url | string | Basis-URL |
| status | string | active, paused, error, blocked, review_required |
| robots_allowed | boolean/null | Automatischer Zugriff erlaubt |
| parser_type | string | api, json_ld, rss, sitemap, html, manual, simulated |
| import_frequency | string | manual, daily, weekly |
| last_checked_at | datetime/null | Letzte Prüfung |
| last_import_at | datetime/null | Letzter Import |
| imported_recipe_count | number | Anzahl importierter Rezepte |
| error_message | string | Letzter Fehler |
| notes | string | Interne Hinweise |

### Beispiel

```json
{
  "id": "source_123",
  "name": "Beispiel-Foodblog",
  "base_url": "https://example.com",
  "status": "active",
  "robots_allowed": true,
  "parser_type": "json_ld",
  "import_frequency": "weekly",
  "last_checked_at": "2026-05-22T12:00:00Z",
  "last_import_at": "2026-05-22T12:10:00Z",
  "imported_recipe_count": 25,
  "error_message": "",
  "notes": ""
}
```

---

## 7. ImportJob

Ein ImportJob beschreibt einen Importvorgang.

### Felder

| Feld | Typ | Beschreibung |
|---|---|---|
| id | string | Eindeutige Job-ID |
| source_id | string/null | Quelle |
| url | string/null | Einzelne Rezept-URL |
| status | string | waiting, running, success, partial_success, failed, cancelled, skipped |
| started_at | datetime/null | Startzeit |
| finished_at | datetime/null | Endzeit |
| recipes_found | number | Gefundene Rezepte |
| recipes_imported | number | Importierte Rezepte |
| recipes_skipped | number | Übersprungene Rezepte |
| error_message | string | Fehler |
| error_code | string/null | Technischer Fehlercode |
| log | string[] | Schritte des Imports |
| is_simulated | boolean | Ob es nur eine Simulation war |

### Beispiel

```json
{
  "id": "import_123",
  "source_id": "source_123",
  "url": "https://example.com/rezept/pasta",
  "status": "success",
  "started_at": "2026-05-22T12:00:00Z",
  "finished_at": "2026-05-22T12:01:00Z",
  "recipes_found": 1,
  "recipes_imported": 1,
  "recipes_skipped": 0,
  "error_message": "",
  "error_code": null,
  "log": [
    "URL geprüft",
    "robots.txt erlaubt Zugriff",
    "JSON-LD Recipe gefunden",
    "Zutaten analysiert",
    "Mengen normalisiert",
    "Rezept gespeichert"
  ],
  "is_simulated": false
}
```

---

## 8. ShoppingListItem

Ein Eintrag in der Einkaufsliste.

### Felder

| Feld | Typ | Beschreibung |
|---|---|---|
| id | string | Eindeutige ID |
| user_id | string/null | Späterer Nutzerbezug |
| food | string | Lebensmittel |
| normalized_food | string | Normalisiertes Lebensmittel |
| amount | number/null | Menge |
| unit | string | Einheit |
| checked | boolean | Abgehakt |
| note | string | Zusatzinfo |
| source_recipe_ids | string[] | Aus welchen Rezepten |
| created_at | datetime | Erstellungszeitpunkt |

### Beispiel

```json
{
  "id": "shopping_123",
  "user_id": null,
  "food": "Tomaten",
  "normalized_food": "Tomaten",
  "amount": 500,
  "unit": "g",
  "checked": false,
  "note": "",
  "source_recipe_ids": ["recipe_123", "recipe_456"],
  "created_at": "2026-05-22T12:00:00Z"
}
```

---

## 9. Instruction

Ein Zubereitungsschritt.

### Felder

| Feld | Typ | Beschreibung |
|---|---|---|
| id | string | Eindeutige ID |
| recipe_id | string | Zugehöriges Rezept |
| position | number | Reihenfolge |
| text | string | Schrittbeschreibung |
| timer_minutes | number/null | Optionaler Timer |
| ingredients_used | string[] | Optional verknüpfte Zutaten |

### Beispiel

```json
{
  "id": "instruction_123",
  "recipe_id": "recipe_123",
  "position": 1,
  "text": "Pasta in Salzwasser bissfest kochen.",
  "timer_minutes": 10,
  "ingredients_used": ["ingredient_pasta"]
}
```

---

## 10. UnitConversion

Umrechnungen müssen lebensmittelabhängig sein.

### Felder

| Feld | Typ | Beschreibung |
|---|---|---|
| id | string | Eindeutige ID |
| from_unit | string | Ausgangseinheit |
| to_unit | string | Zieleinheit |
| food | string/null | Lebensmittelbezug |
| factor | number | Faktor |
| note | string | Hinweis |
| confidence | string | high, medium, low |

### Beispiele

```json
{
  "id": "conversion_cup_water",
  "from_unit": "cup",
  "to_unit": "ml",
  "food": "Wasser",
  "factor": 240,
  "note": "1 cup Wasser ≈ 240 ml",
  "confidence": "high"
}
```

```json
{
  "id": "conversion_cup_flour",
  "from_unit": "cup",
  "to_unit": "g",
  "food": "Mehl",
  "factor": 120,
  "note": "1 cup Mehl ≈ 120 g",
  "confidence": "medium"
}
```

---

## 11. FoodSynonym

Synonyme verbessern Suche, Normalisierung und Einkaufslisten.

### Felder

| Feld | Typ | Beschreibung |
|---|---|---|
| id | string | Eindeutige ID |
| term | string | Such-/Originalbegriff |
| normalized_food | string | Normalisierter Begriff |
| language | string | Sprache |
| confidence | string | high, medium, low |

### Beispiele

```json
{
  "id": "synonym_pasta",
  "term": "Pasta",
  "normalized_food": "Nudeln",
  "language": "de",
  "confidence": "high"
}
```

```json
{
  "id": "synonym_paradeiser",
  "term": "Paradeiser",
  "normalized_food": "Tomaten",
  "language": "de",
  "confidence": "high"
}
```

---

## 12. AllergenTag

Allergene sollen später aus Zutaten abgeleitet werden können.

### Beispiele

| Lebensmittel | Allergen |
|---|---|
| Weizenmehl | gluten |
| Pasta | gluten |
| Milch | milch |
| Joghurt | milch |
| Ei | ei |
| Erdnüsse | erdnuss |
| Mandeln | schalenfrüchte |
| Sojasauce | soja |

---

## 13. Favorite

Favoriten speichern, welche Rezepte ein Nutzer markiert hat.

### Felder

| Feld | Typ | Beschreibung |
|---|---|---|
| id | string | Eindeutige ID |
| user_id | string/null | Späterer Nutzerbezug |
| recipe_id | string | Rezept-ID |
| created_at | datetime | Zeitpunkt der Markierung |

### Beispiel

```json
{
  "id": "favorite_123",
  "user_id": null,
  "recipe_id": "recipe_123",
  "created_at": "2026-05-22T12:00:00Z"
}
```

---

## 14. AppExport

Der aktuelle Prototyp kann lokale Daten exportieren.

### Felder

| Feld | Typ | Beschreibung |
|---|---|---|
| app | string | Name der App |
| schemaVersion | number | Version des Exportformats |
| exportedAt | datetime | Exportzeitpunkt |
| data | object | Exportierte Nutzerdaten |

### Beispiel

```json
{
  "app": "RecipeFinder",
  "schemaVersion": 1,
  "exportedAt": "2026-05-22T12:00:00Z",
  "data": {
    "customRecipes": [],
    "favorites": [],
    "shoppingList": [],
    "sources": [],
    "importLog": []
  }
}
```

---

## 15. Validierungsregeln

### Recipe

- `title` darf nicht leer sein
- `servings` muss mindestens 1 sein
- `total_time` muss mindestens 1 sein
- `ingredients` muss mindestens eine Zutat enthalten
- `source_url` muss eine gültige URL sein, falls vorhanden

### Ingredient

- `original_text` darf nicht leer sein
- wenn `amount` vorhanden ist, muss `unit` sinnvoll sein
- qualitative Zutaten dürfen `amount: null` haben
- `normalized_food` sollte möglichst gesetzt sein
- unsichere Zutaten sollen nicht automatisch skaliert werden

### Source

- `base_url` muss gültig sein, außer bei lokalen Quellen
- `status` muss einer definierten Statusliste entsprechen
- `parser_type` muss einer definierten Parserliste entsprechen

### ImportJob

- `status` muss einer definierten Statusliste entsprechen
- echte Importjobs müssen Quelle oder URL haben
- Fehler müssen verständlich protokolliert werden

---

## 16. Speicherstrategie im aktuellen Prototyp

Der aktuelle Browser-Prototyp nutzt `localStorage`.

Gespeichert werden:

```text
rf_customRecipes
rf_favorites
rf_shoppingList
rf_sources
rf_importLog
```

Diese Speicherung ist lokal im Browser und nicht geräteübergreifend.

---

## 17. Speicherstrategie für spätere Backend-Version

In der späteren Backend-Version sollten die Daten in einer Datenbank gespeichert werden.

Empfohlen:

```text
PostgreSQL
```

Tabellen:

```text
users
recipes
ingredients
instructions
sources
import_jobs
shopping_list_items
favorites
unit_conversions
food_synonyms
```

---

## 18. Wichtige Designentscheidung

Die App darf Zutaten nicht nur als Text behandeln.

Schlecht:

```json
{
  "ingredients": [
    "250 g gehackte Tomaten",
    "Salz nach Geschmack"
  ]
}
```

Besser:

```json
{
  "ingredients": [
    {
      "original_text": "250 g gehackte Tomaten",
      "amount": 250,
      "unit": "g",
      "food": "Tomaten",
      "normalized_food": "Tomaten",
      "preparation": "gehackt",
      "scalable": true
    },
    {
      "original_text": "Salz nach Geschmack",
      "amount": null,
      "unit": "",
      "food": "Salz",
      "normalized_food": "Salz",
      "note": "nach Geschmack",
      "scalable": false
    }
  ]
}
```

Diese Struktur ist notwendig für:

- intelligente Suche
- metrische Normalisierung
- logische Portionsskalierung
- Einkaufsliste
- Allergene
- spätere KI-Analyse
