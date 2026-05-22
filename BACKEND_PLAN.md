# BACKEND_PLAN.md

# RecipeFinder – Backend-Plan

## 1. Ziel

Das Backend soll den echten automatischen Rezeptimport ermöglichen.

Der aktuelle Browser-Prototyp kann Rezept-Imports nur simulieren. Für den echten Import braucht RecipeFinder ein Backend, das Webseiten prüfen, erlaubte Inhalte abrufen, Rezeptdaten extrahieren, Zutaten analysieren, Mengen normalisieren und Importjobs verwalten kann.

---

## 2. Warum ein Backend nötig ist

Ein echter Rezeptimport kann nicht zuverlässig nur im Browser laufen.

Gründe:

- Viele Webseiten blockieren direkte Browser-Zugriffe durch CORS.
- `robots.txt` muss serverseitig geprüft werden.
- Webseiten müssen stabil und kontrolliert abgerufen werden.
- Importjobs sollen regelmäßig laufen können.
- HTML, JSON-LD, RSS und Sitemaps müssen analysiert werden.
- Fehler und Importstatus müssen gespeichert werden.
- Duplikate müssen erkannt werden.
- Rezeptdaten müssen dauerhaft in einer Datenbank gespeichert werden.
- Zugriffe auf Webseiten müssen fair und begrenzt erfolgen.

---

## 3. Zielarchitektur

```text
Frontend
↓
API
↓
Backend
├── Source Service
├── Import Service
├── Parser Service
├── Ingredient Analyzer
├── Unit Normalizer
├── Scaling Engine
├── Search Service
└── Database
```

---

## 4. Backend-Komponenten

## 4.1 API

Die API verbindet Frontend und Backend.

Aufgaben:

- Rezepte liefern
- Rezeptdetails liefern
- Quellen verwalten
- Importjobs starten
- Importstatus anzeigen
- Einkaufsliste verwalten
- Favoriten verwalten
- eigene Rezepte speichern
- Daten exportieren
- Daten importieren

Mögliche Technologien:

- Node.js mit Express
- Python mit FastAPI
- Next.js API Routes

Empfehlung für später:

```text
FastAPI oder Node.js/Express
```

---

## 4.2 Source Service

Der Source Service verwaltet Rezeptquellen.

Aufgaben:

- Quelle speichern
- Quelle prüfen
- Quelle aktivieren
- Quelle deaktivieren
- Basis-URL normalisieren
- Status speichern
- letzte Prüfung speichern
- Importfrequenz speichern
- Fehler anzeigen

Daten pro Quelle:

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
  "last_import_at": null,
  "imported_recipe_count": 0,
  "error_message": ""
}
```

---

## 4.3 Robots Checker

Der Robots Checker prüft, ob automatischer Zugriff erlaubt ist.

Aufgaben:

- `robots.txt` abrufen
- Regeln für den eigenen User-Agent prüfen
- Zugriff auf Rezeptseiten prüfen
- Crawl-Delay beachten, falls vorhanden
- Ergebnis speichern
- Quelle bei Blockierung markieren

Beispiel-Ablauf:

```text
Quelle hinzugefügt
→ robots.txt abrufen
→ Regeln prüfen
→ Zugriff erlaubt oder blockiert
→ Ergebnis speichern
```

Status:

```text
allowed
blocked
unknown
error
```

Wichtig:

Wenn Zugriff nicht erlaubt ist, darf die Quelle nicht automatisch importiert werden.

---

## 4.4 Import Service

Der Import Service startet und verwaltet Importjobs.

Aufgaben:

- Importjob erstellen
- aktive Quellen abrufen
- Rezeptseiten finden
- Parser auswählen
- Rezepte speichern
- Duplikate erkennen
- Fehler protokollieren
- Importstatus aktualisieren
- Quelle bei Fehlerhäufung pausieren

Importjob-Beispiel:

```json
{
  "id": "import_123",
  "source_id": "source_123",
  "status": "running",
  "started_at": "2026-05-22T12:00:00Z",
  "finished_at": null,
  "recipes_found": 0,
  "recipes_imported": 0,
  "recipes_skipped": 0,
  "error_message": ""
}
```

Statuswerte:

```text
waiting
running
success
partial_success
failed
cancelled
skipped
```

---

## 4.5 URL Import

Der URL Import importiert ein einzelnes Rezept aus einer konkreten URL.

Ablauf:

```text
Nutzer gibt Rezept-URL ein
→ URL validieren
→ Quelle erkennen oder erstellen
→ robots.txt prüfen
→ Seite abrufen
→ strukturierte Rezeptdaten suchen
→ Rezeptdaten extrahieren
→ Zutaten analysieren
→ Mengen normalisieren
→ Duplikate prüfen
→ Rezept speichern
```

API-Endpunkt:

```text
POST /api/import-url
```

Request:

```json
{
  "url": "https://example.com/rezept/pasta",
  "preferred_title": "Cremige Pasta"
}
```

Response bei Erfolg:

```json
{
  "status": "success",
  "recipe_id": "recipe_123",
  "message": "Rezept wurde importiert."
}
```

Response bei Fehler:

```json
{
  "status": "failed",
  "recipe_id": null,
  "message": "Keine strukturierten Rezeptdaten gefunden.",
  "error_code": "NO_RECIPE_DATA"
}
```

---

## 4.6 Parser Service

Der Parser Service extrahiert Rezeptdaten aus Webseiten.

Priorität der Parser:

1. Offizielle API
2. JSON-LD Recipe
3. Microdata Recipe
4. RSS
5. Sitemap
6. HTML-Parsing, nur wenn erlaubt und stabil

Der wichtigste Parser ist zunächst:

```text
JSON-LD Recipe Parser
```

Zu extrahierende Felder:

- Name
- Beschreibung
- Bild
- Zutaten
- Zubereitungsschritte
- Portionen
- Vorbereitungszeit
- Kochzeit
- Gesamtzeit
- Kategorie
- Küche
- Ernährungstypen
- Nährwerte, falls vorhanden
- Quelle
- Original-URL

---

## 4.7 JSON-LD Recipe Parser

Viele Rezeptseiten enthalten strukturierte Daten im JSON-LD-Format.

Der Parser sucht nach:

```html
<script type="application/ld+json">
```

Dann prüft er, ob darin ein Recipe-Objekt enthalten ist.

Wichtige Felder:

```json
{
  "@type": "Recipe",
  "name": "Rezeptname",
  "description": "Beschreibung",
  "recipeIngredient": [],
  "recipeInstructions": [],
  "recipeYield": "2 Portionen",
  "prepTime": "PT10M",
  "cookTime": "PT20M",
  "totalTime": "PT30M",
  "recipeCategory": "Hauptgericht",
  "recipeCuisine": "Italienisch"
}
```

Der Parser muss auch Fälle unterstützen, in denen Recipe-Daten innerhalb von `@graph` liegen.

Beispiel:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Recipe",
      "name": "Tomatensuppe"
    }
  ]
}
```

---

## 4.8 Ingredient Analyzer

Der Ingredient Analyzer zerlegt Zutaten in strukturierte Bestandteile.

Beispiel:

```text
250 g gehackte Tomaten
```

wird zu:

```json
{
  "original_text": "250 g gehackte Tomaten",
  "amount": 250,
  "unit": "g",
  "food": "Tomaten",
  "normalized_food": "Tomaten",
  "preparation": "gehackt",
  "note": "",
  "scalable": true,
  "scaling_group": "normal"
}
```

Beispiel:

```text
Salz nach Geschmack
```

wird zu:

```json
{
  "original_text": "Salz nach Geschmack",
  "amount": null,
  "unit": "",
  "food": "Salz",
  "normalized_food": "Salz",
  "preparation": "",
  "note": "nach Geschmack",
  "scalable": false,
  "scaling_group": "qualitative"
}
```

---

## 4.9 Unit Normalizer

Der Unit Normalizer wandelt Einheiten in ein einheitliches System um.

Standard-Einheiten:

```text
g
kg
ml
l
TL
EL
Stück
Prise
Bund
Dose
Packung
```

Nicht-metrische Einheiten:

```text
cup
oz
lb
fl oz
pint
quart
```

Wichtig:

Umrechnung muss lebensmittelabhängig sein.

Beispiele:

```text
1 cup Wasser → 240 ml Wasser
1 cup Mehl → 120 g Mehl
1 cup Zucker → 200 g Zucker
1 oz Butter → 28 g Butter
```

Die App darf nicht jede Volumeneinheit pauschal in Gramm umrechnen.

---

## 4.10 Scaling Engine

Die Scaling Engine passt Zutaten an neue Portionsgrößen an.

Beispiel:

```text
Original: 2 Portionen
Ziel: 4 Portionen
Faktor: 2
```

Dann:

```text
200 g Pasta → 400 g Pasta
1 EL Olivenöl → 2 EL Olivenöl
1 Dose Tomaten → 2 Dosen Tomaten
```

Nicht blind skalieren:

```text
Salz nach Geschmack
Pfeffer nach Geschmack
Öl zum Anbraten
Wasser zum Kochen
1 Prise Salz
Backform
Garnitur
```

Rundungsregeln:

```text
1000 g → 1 kg
1000 ml → 1 l
3 TL → 1 EL
2.5 EL → 2 1/2 EL
0.5 TL → 1/2 TL
```

---

## 4.11 Search Service

Die Suche soll nicht nur über Text laufen, sondern über normalisierte Rezeptdaten.

Suchfelder:

- Rezeptname
- Beschreibung
- Originalzutaten
- normalisierte Zutaten
- Tags
- Quelle
- Kategorie
- Schwierigkeit
- Küche
- Ernährungstypen
- Allergene

Beispiel:

```text
Pasta
```

findet auch:

```text
Nudeln
Spaghetti
```

Beispiel:

```text
Tomate
```

findet auch:

```text
Tomaten
gehackte Tomaten
Paradeiser
```

---

## 4.12 Duplicate Detection

Beim Import müssen doppelte Rezepte erkannt werden.

Mögliche Regeln:

- gleiche Original-URL
- gleicher Rezeptname und gleiche Quelle
- sehr ähnliche Zutatenliste
- gleicher canonical link
- gleicher strukturierter Identifier, falls vorhanden

Status:

```text
new
duplicate
updated
skipped
```

Wenn ein Duplikat erkannt wird, soll der Import nicht unkontrolliert ein zweites Rezept anlegen.

---

## 4.13 Rate Limiting

Das Backend darf Webseiten nicht aggressiv abrufen.

Regeln:

- begrenzte Abrufe pro Quelle
- kein paralleles Crawling derselben Quelle
- Wartezeit zwischen Requests
- Crawl-Delay beachten
- Import abbrechen bei Fehlerhäufung
- Quelle pausieren bei wiederholten Fehlern

Empfohlene erste Standardwerte:

```text
max_requests_per_source_per_minute: 6
min_delay_between_requests_seconds: 10
max_parallel_requests_per_source: 1
max_errors_before_pause: 5
```

---

## 4.14 Fehlerbehandlung

Fehler müssen verständlich gespeichert werden.

Beispiele:

```text
robots.txt blockiert Zugriff
Seite nicht erreichbar
Keine Rezeptdaten gefunden
Ungültiges JSON-LD
Parser fehlgeschlagen
Duplikat erkannt
Zeitüberschreitung
Quelle pausiert
```

Fehler sollten im Quellen-Manager sichtbar sein.

Jeder Fehler sollte enthalten:

- Quelle
- URL
- Zeitpunkt
- Fehlercode
- verständliche Meldung
- technisches Detail
- empfohlene nächste Aktion

---

## 5. Datenbankmodell

## 5.1 sources

```sql
CREATE TABLE sources (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  base_url TEXT NOT NULL,
  status TEXT NOT NULL,
  robots_allowed BOOLEAN DEFAULT FALSE,
  parser_type TEXT,
  import_frequency TEXT,
  last_checked_at TIMESTAMP,
  last_import_at TIMESTAMP,
  imported_recipe_count INTEGER DEFAULT 0,
  error_message TEXT
);
```

---

## 5.2 recipes

```sql
CREATE TABLE recipes (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  source_id TEXT,
  source_name TEXT,
  source_url TEXT,
  image_url TEXT,
  category TEXT,
  cuisine TEXT,
  difficulty TEXT,
  servings INTEGER,
  prep_time INTEGER,
  cook_time INTEGER,
  total_time INTEGER,
  tags JSON,
  diet_tags JSON,
  allergen_tags JSON,
  is_custom BOOLEAN DEFAULT FALSE,
  is_imported BOOLEAN DEFAULT TRUE,
  imported_at TIMESTAMP,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

---

## 5.3 ingredients

```sql
CREATE TABLE ingredients (
  id TEXT PRIMARY KEY,
  recipe_id TEXT NOT NULL,
  original_text TEXT NOT NULL,
  amount REAL,
  unit TEXT,
  normalized_amount REAL,
  normalized_unit TEXT,
  food TEXT,
  normalized_food TEXT,
  preparation TEXT,
  note TEXT,
  scalable BOOLEAN DEFAULT TRUE,
  scaling_group TEXT,
  allergen_tags JSON,
  food_group TEXT
);
```

---

## 5.4 import_jobs

```sql
CREATE TABLE import_jobs (
  id TEXT PRIMARY KEY,
  source_id TEXT,
  url TEXT,
  status TEXT NOT NULL,
  started_at TIMESTAMP,
  finished_at TIMESTAMP,
  recipes_found INTEGER DEFAULT 0,
  recipes_imported INTEGER DEFAULT 0,
  recipes_skipped INTEGER DEFAULT 0,
  error_message TEXT,
  log JSON
);
```

---

## 5.5 shopping_list_items

```sql
CREATE TABLE shopping_list_items (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  food TEXT NOT NULL,
  normalized_food TEXT,
  amount REAL,
  unit TEXT,
  checked BOOLEAN DEFAULT FALSE,
  note TEXT,
  source_recipe_ids JSON,
  created_at TIMESTAMP
);
```

---

## 5.6 favorites

```sql
CREATE TABLE favorites (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  recipe_id TEXT NOT NULL,
  created_at TIMESTAMP
);
```

---

## 6. API-Endpunkte

## 6.1 Rezepte

```text
GET /api/recipes
GET /api/recipes/:id
POST /api/recipes
PATCH /api/recipes/:id
DELETE /api/recipes/:id
```

---

## 6.2 Quellen

```text
GET /api/sources
POST /api/sources
PATCH /api/sources/:id
DELETE /api/sources/:id
POST /api/sources/:id/check
POST /api/sources/:id/import
```

---

## 6.3 URL-Import

```text
POST /api/import-url
```

---

## 6.4 Importjobs

```text
GET /api/import-jobs
GET /api/import-jobs/:id
POST /api/import-jobs/:id/retry
```

---

## 6.5 Einkaufsliste

```text
GET /api/shopping-list
POST /api/shopping-list
PATCH /api/shopping-list/:id
DELETE /api/shopping-list/:id
POST /api/shopping-list/clear
```

---

## 6.6 Favoriten

```text
GET /api/favorites
POST /api/favorites
DELETE /api/favorites/:recipeId
```

---

## 6.7 Datenexport

```text
GET /api/export
POST /api/import
```

---

## 7. Sicherheits- und Fairnessregeln

Das Backend darf nicht:

- Paywalls umgehen
- Login-Bereiche scrapen
- technische Sperren umgehen
- Inhalte ohne Quellenangabe übernehmen
- Webseiten aggressiv abrufen
- Bilder ohne Erlaubnis lokal speichern
- robots.txt ignorieren

Das Backend soll:

- Quellen fair abrufen
- Original-URLs speichern
- Importfehler transparent anzeigen
- Quellen deaktivierbar machen
- Rate Limits respektieren
- nur erlaubte Inhalte importieren

---

## 8. Empfohlener Technologiepfad

Für den nächsten großen technischen Schritt:

```text
Frontend:
Next.js oder bestehende HTML/CSS/JS-App als Vorlage

Backend:
FastAPI oder Node.js/Express

Datenbank:
PostgreSQL oder Supabase

Suche:
PostgreSQL Full Text Search zuerst
später optional Meilisearch oder Typesense

Deployment:
Frontend auf Vercel oder GitHub Pages
Backend auf Render, Fly.io, Railway oder Supabase Edge Functions
```

---

## 9. MVP-Backend

Das erste echte Backend sollte nur diese Funktionen können:

- einzelne Rezept-URL importieren
- robots.txt prüfen
- HTML abrufen
- JSON-LD Recipe finden
- Rezeptdaten extrahieren
- Zutaten einfach analysieren
- Mengen metrisch speichern
- Rezept in Datenbank speichern
- Fehler zurückgeben

Noch nicht nötig im ersten Backend:

- komplette Website crawlen
- tägliche Importjobs
- Nutzerkonten
- KI-Analyse
- Bildspeicherung
- komplexe Allergieerkennung

---

## 10. Nächste Umsetzungsschritte

1. Backend-Technologie auswählen
2. Datenbank auswählen
3. erstes Datenmodell erstellen
4. API für Rezeptliste bauen
5. API für URL-Import bauen
6. JSON-LD Parser bauen
7. Zutatenparser aus dem Frontend ins Backend übertragen
8. Frontend mit Backend verbinden
9. echten Import testen
10. Fehlerbehandlung verbessern

---

## 11. Aktueller Status

Der echte Backend-Import ist geplant, aber noch nicht implementiert.

Der aktuelle Browser-Prototyp bleibt wichtig, weil er die Nutzeroberfläche, die Rezeptlogik und die Produktidee sichtbar macht.
