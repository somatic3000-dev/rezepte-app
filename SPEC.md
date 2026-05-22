# SPEC.md

# RecipeFinder – Produktspezifikation

## 1. Kurzbeschreibung

RecipeFinder ist eine moderne Rezept-App, mit der Nutzer Rezepte aus selbst ausgewählten Online-Quellen importieren, durchsuchen, analysieren, normalisieren, speichern und für ihre Küchenplanung verwenden können.

Die App soll Rezepte nicht nur anzeigen, sondern deren Inhalte strukturiert verstehen:

- Zutaten erkennen
- Lebensmittel vereinheitlichen
- Mengen in metrische Einheiten umrechnen
- Portionen logisch skalieren
- Rezepte filterbar und durchsuchbar machen
- Einkaufslisten automatisch erzeugen
- Originalquellen erhalten

Die App orientiert sich funktional an hochwertigen Rezept-Apps wie Paprika, Samsung Food, Mela und Pestle. Der Fokus liegt langfristig auf deutschsprachigen Rezeptquellen, metrischen Angaben und einer intuitiven Benutzeroberfläche.

---

## 2. Produktziel

Das Ziel ist eine persönliche Rezeptbibliothek mit intelligentem Web-Import.

Nutzer sollen eigene Rezeptquellen auswählen können. Die App soll daraus erlaubte Rezepte importieren, analysieren, standardisieren und in einer modernen Oberfläche verfügbar machen.

RecipeFinder soll besonders stark sein bei:

- automatischem Rezeptimport
- einheitlicher Rezeptstruktur
- intelligenter Suche
- metrischen Mengenangaben
- logischer Portionsskalierung
- moderner und intuitiver Benutzeroberfläche
- Einkaufsliste
- Favoriten
- eigenen Rezepten
- Quellenverwaltung

---

## 3. Zielgruppe

Die App richtet sich an Menschen, die regelmäßig kochen und Rezepte aus verschiedenen Webseiten zentral sammeln möchten.

Typische Nutzer:

- Hobbyköche
- Familien
- Meal-Prep-Nutzer
- Menschen mit bestimmten Ernährungsformen
- Nutzer, die viele Rezepte aus Blogs oder Webseiten speichern
- Nutzer, die Einkaufslisten und Portionsgrößen effizient planen möchten

---

## 4. Grundprinzipien

## 4.1 Nutzerfreundlichkeit

Die App soll einfach, schnell und verständlich sein.

Der Nutzer soll ohne technische Kenntnisse:

- Rezepte suchen
- Quellen hinzufügen
- Rezepte importieren
- Zutaten verstehen
- Portionen anpassen
- Einkaufslisten erstellen
- Favoriten speichern
- eigene Rezepte verwalten

---

## 4.2 Transparenz

Jedes importierte Rezept muss die Originalquelle behalten.

Angezeigt werden soll:

- Name der Quelle
- Link zum Originalrezept
- Importdatum
- Importstatus
- Hinweis, ob Mengen normalisiert wurden
- Hinweis, ob ein Import simuliert oder echt ist

---

## 4.3 Rechtssicherheit und Fairness

Die App soll nur Quellen nutzen, bei denen der Zugriff erlaubt ist.

Anforderungen:

- `robots.txt` prüfen
- Nutzungsbedingungen beachten
- keine aggressiven Anfragen
- Rate Limiting verwenden
- Originalquelle immer verlinken
- Bilder nur nutzen, wenn erlaubt
- vollständige Fremdinhalte nicht ungeprüft kopieren
- Quellen bei Problemen deaktivierbar machen

---

## 5. Kernfunktionen

## 5.1 Automatischer Rezeptimport

Nutzer sollen selbst Homepages als Quellen hinzufügen können.

Beispiel:

```text
https://www.beispiel-rezeptseite.de
```

Die App soll später prüfen:

- Ist die Quelle erreichbar?
- Erlaubt `robots.txt` den Zugriff?
- Gibt es strukturierte Rezeptdaten?
- Gibt es Rezeptseiten?
- Gibt es Sitemaps oder Feeds?
- Gibt es bekannte Importfehler?
- Wie oft darf die Quelle geprüft werden?

Import-Ablauf:

```text
Quelle hinzufügen
→ Quelle prüfen
→ Rezeptseiten finden
→ Rezeptdaten auslesen
→ Zutaten analysieren
→ Mengen normalisieren
→ Duplikate prüfen
→ Rezept speichern
→ Importstatus anzeigen
```

Importmethoden nach Priorität:

1. Offizielle API, falls vorhanden
2. Strukturierte Daten, zum Beispiel JSON-LD Recipe
3. RSS-Feed oder Sitemap
4. HTML-Parsing nur, wenn erlaubt und stabil möglich
5. Manueller Import per Rezept-URL

---

## 5.2 Rezept-URL-Import

Nutzer sollen eine konkrete Rezept-URL eingeben können.

Im aktuellen Browser-Prototyp ist dies eine Simulation.

Aktueller Ablauf im Prototyp:

```text
URL eingeben
→ URL validieren
→ Quelle erkennen oder erstellen
→ Importlog schreiben
→ Beispielrezept erzeugen
→ Original-Link speichern
→ Rezept in Bibliothek anzeigen
```

Späterer echter Ablauf mit Backend:

```text
URL eingeben
→ Backend validiert URL
→ robots.txt prüfen
→ Webseite abrufen
→ strukturierte Rezeptdaten suchen
→ Rezept extrahieren
→ Zutaten analysieren
→ Mengen normalisieren
→ Rezept speichern
```

---

## 5.3 Quellen-Manager

Die App braucht einen eigenen Bereich für Rezeptquellen.

Funktionen:

- Quelle hinzufügen
- Quelle bearbeiten
- Quelle deaktivieren
- Quelle löschen
- letzte Prüfung anzeigen
- Anzahl importierter Rezepte anzeigen
- Importfehler anzeigen
- manuelle Aktualisierung starten

Daten pro Quelle:

| Feld | Beschreibung |
|---|---|
| Name | Anzeigename der Quelle |
| URL | Basis-URL der Homepage |
| Status | Aktiv, pausiert, fehlerhaft, blockiert |
| robots_allowed | Zugriff erlaubt |
| parser_type | API, JSON-LD, RSS, Sitemap, HTML |
| last_checked_at | Letzte Prüfung |
| imported_recipe_count | Anzahl importierter Rezepte |
| notes | interne Hinweise |

---

## 5.4 Rezeptanalyse

Importierte Rezepte sollen analysiert und vereinheitlicht werden.

Die App soll erkennen:

- Rezeptname
- Beschreibung
- Zutaten
- Arbeitsschritte
- Portionen
- Gesamtzeit
- Vorbereitungszeit
- Kochzeit
- Kategorie
- Küche / Land
- Ernährungsform
- Schwierigkeit
- Lebensmittelgruppen
- Allergene
- Quelle
- Bild, falls erlaubt

---

## 5.5 Zutatenanalyse

Jede Zutat soll in strukturierte Bestandteile zerlegt werden.

Beispiel:

```text
250 g gehackte Tomaten
```

wird zu:

```json
{
  "amount": 250,
  "unit": "g",
  "food": "Tomaten",
  "preparation": "gehackt",
  "note": "",
  "scalable": true
}
```

Beispiel:

```text
Salz nach Geschmack
```

wird zu:

```json
{
  "amount": null,
  "unit": "",
  "food": "Salz",
  "preparation": "",
  "note": "nach Geschmack",
  "scalable": false
}
```

Die Zutatenanalyse soll erkennen:

- Menge
- Einheit
- Lebensmittel
- Zubereitungsform
- optionale Hinweise
- Skalierbarkeit
- Lebensmittelkategorie
- Synonyme
- mögliche Allergene
- Ernährungsrelevanz

---

## 5.6 Einheitliche Lebensmittel

Die App soll unterschiedliche Schreibweisen vereinheitlichen.

Beispiele:

| Original | Normalisiert |
|---|---|
| Tomate | Tomaten |
| gehackte Tomaten | Tomaten |
| Paradeiser | Tomaten |
| Mehl | Weizenmehl |
| Pasta | Nudeln |
| Spaghetti | Nudeln |

Ziel:

- bessere Suche
- bessere Filter
- bessere Einkaufsliste
- bessere Zusammenfassung ähnlicher Zutaten
- bessere Portionslogik

---

## 5.7 Metrisches System

Die App verwendet standardmäßig metrische Angaben.

Unterstützte Einheiten:

- g
- kg
- ml
- l
- TL
- EL
- Stück
- Prise
- Bund
- Dose
- Packung

Nicht-metrische Angaben sollen nach Möglichkeit umgerechnet werden.

Beispiele:

```text
1 cup water → 240 ml Wasser
1 cup flour → 120 g Mehl
1 oz butter → 28 g Butter
```

Wichtig:

Umrechnungen müssen lebensmittelabhängig sein. Die App darf nicht jede Volumeneinheit pauschal in Gramm umrechnen.

Beispiel:

```text
1 cup Wasser ≠ 1 cup Mehl
```

Deshalb braucht die App eine Lebensmittel-Umrechnungstabelle.

---

## 5.8 Originaldaten erhalten

Die App soll niemals nur die normalisierte Version speichern.

Gespeichert werden müssen:

- Original-Zutatenzeile
- analysierte Zutatenzeile
- normalisierte Zutatenzeile
- Quelle der Umrechnung
- Skalierungsregeln

Beispiel:

```json
{
  "original": "1 cup flour",
  "normalized": {
    "amount": 120,
    "unit": "g",
    "food": "Mehl"
  },
  "conversion_note": "cup flour converted using flour density table"
}
```

---

## 5.9 Portionsskalierung

Nutzer sollen die Anzahl der Portionen ändern können.

Beispiel:

```text
Original: 2 Portionen
Ziel: 4 Portionen
Faktor: 2
```

Dann:

| Original | Skaliert |
|---|---|
| 200 g Pasta | 400 g Pasta |
| 1 Dose Tomaten | 2 Dosen Tomaten |
| 1 EL Olivenöl | 2 EL Olivenöl |
| 1 Ei | 2 Eier |

Die Skalierung muss logisch bleiben.

Nicht alles darf blind vervielfältigt werden.

Nicht oder vorsichtig skalieren:

| Zutat / Angabe | Verhalten |
|---|---|
| Salz nach Geschmack | bleibt nach Geschmack |
| Pfeffer nach Geschmack | bleibt nach Geschmack |
| Öl zum Anbraten | bleibt qualitativ |
| 1 Prise Salz | vorsichtig skalieren oder unverändert lassen |
| Wasser zum Kochen | nicht skalieren |
| Backform | nicht automatisch skalieren |
| Kochzeit | nicht automatisch proportional skalieren |

Rundungsregeln:

| Rechenwert | Anzeige |
|---|---|
| 1000 g | 1 kg |
| 1500 g | 1,5 kg |
| 1000 ml | 1 l |
| 2,5 EL | 2 1/2 EL |
| 0,5 TL | 1/2 TL |

Einheitenschwellen:

```text
3 TL → 1 EL
1000 g → 1 kg
1000 ml → 1 l
```

---

## 5.10 Rezeptsuche

Die Suche soll über normalisierte Inhalte laufen.

Suchfelder:

- Rezeptname
- Beschreibung
- Zutaten
- normalisierte Lebensmittel
- Tags
- Kategorie
- Küche
- Ernährungsform
- Quelle
- Kochzeit
- Schwierigkeit

Beispiele:

```text
tomaten pasta
vegan unter 30 minuten
reis hähnchen
schnell vegetarisch
ohne nüsse
```

Die Suche soll Synonyme unterstützen.

Beispiel:

```text
Pasta → Nudeln
Paradeiser → Tomaten
```

---

## 5.11 Filter

Filter:

- Kategorie
- Ernährungsform
- Kochzeit
- Schwierigkeit
- Quelle
- Zutaten
- Allergene
- Küche
- Favoriten
- eigene Rezepte
- importierte Rezepte

---

## 5.12 Sortierung

Sortieroptionen:

- Relevanz
- Kochzeit
- Alphabetisch
- Neueste Rezepte
- Favoriten zuerst
- Einfachste zuerst
- Quelle
- Beliebtheit, falls später vorhanden

---

## 5.13 Favoriten

Nutzer sollen Rezepte speichern können.

Funktionen:

- Rezept als Favorit markieren
- Favoriten anzeigen
- Favoriten durchsuchen
- Favoriten entfernen
- Favoriten lokal speichern
- später optional mit Konto synchronisieren

---

## 5.14 Einkaufsliste

Nutzer sollen Zutaten aus Rezepten zur Einkaufsliste hinzufügen können.

Funktionen:

- Zutaten aus Rezept übernehmen
- Zutaten zusammenfassen
- Mengen addieren
- Einheiten logisch kombinieren
- Zutaten abhaken
- Zutaten entfernen
- Liste leeren
- eigene Zutaten hinzufügen

Beispiel:

```text
Rezept A: 200 g Tomaten
Rezept B: 300 g Tomaten
Einkaufsliste: 500 g Tomaten
```

Bei unklaren Einheiten:

```text
1 Dose Tomaten
300 g Tomaten
```

soll die App nicht blind addieren, sondern getrennt anzeigen oder nur dann zusammenführen, wenn eine sichere Umrechnung bekannt ist.

---

## 5.15 Eigene Rezepte

Nutzer sollen eigene Rezepte manuell hinzufügen können.

Felder:

- Rezeptname
- Beschreibung
- Kategorie
- Schwierigkeit
- Portionen
- Kochzeit
- Zutaten
- Tags
- Quelle optional
- Symbol oder Bild
- Notizen optional

Eigene Rezepte sollen:

- gespeichert werden
- durchsuchbar sein
- favorisiert werden können
- zur Einkaufsliste hinzugefügt werden können
- gelöscht werden können
- später bearbeitet werden können

---

## 5.16 Datenverwaltung

Der Prototyp soll lokale Daten verwalten können.

Funktionen:

- Daten exportieren
- Daten kopieren
- Daten importieren
- eigene Daten löschen
- Prototyp zurücksetzen

Gespeichert werden im aktuellen Browser-Prototyp:

- eigene Rezepte
- Favoriten
- Einkaufsliste
- Quellen
- Importprotokoll

---

## 5.17 Moderne Benutzeroberfläche

Die App soll modern, klar und intuitiv sein.

UI-Anforderungen:

- mobile-first
- große Suchleiste
- klare Filter-Chips
- übersichtliche Rezeptkarten
- hochwertige Detailansicht
- Portionsregler in der Detailansicht
- Zutatenliste mit skalierten Mengen
- Originalmengen optional anzeigen
- Einkaufsliste als klare Checkliste
- Quellen-Manager als eigener Bereich
- Importstatus sichtbar
- Datenverwaltung sichtbar
- klare Fehlermeldungen
- keine überladenen Menüs
- barrierearme Bedienung
- Tastaturbedienung für Modals
- gute Kontraste
- verständliche Buttons

---

## 6. Hauptscreens

## 6.1 Startseite

Inhalte:

- App-Name
- kurze Erklärung
- große Suche
- Schnellaktionen
- Statistiken
- empfohlene Rezepte

---

## 6.2 Rezeptbibliothek

Inhalte:

- Suchfeld
- Filter
- Sortierung
- Rezeptkarten
- Ergebnisanzahl
- Favoritenfilter
- Quellenfilter
- URL-Import-Aktion

---

## 6.3 Rezeptdetails

Inhalte:

- Rezeptbild oder Symbol
- Titel
- Quelle
- Beschreibung
- Tags
- Zeit
- Schwierigkeit
- Portionsregler
- Zutatenliste mit angepassten Mengen
- Originalmengen optional anzeigen
- Button für Einkaufsliste
- Favoritenbutton
- Originalquelle öffnen

---

## 6.4 Quellen-Manager

Inhalte:

- Liste aller Quellen
- neue Quelle hinzufügen
- Status pro Quelle
- letzte Prüfung
- importierte Rezepte
- Fehleranzeige
- manuelle Aktualisierung
- Import-Warteschlange

---

## 6.5 Import-Warteschlange

Inhalte:

- laufende Imports
- erfolgreiche Imports
- fehlgeschlagene Imports
- Fehlerdetails
- erneut versuchen

---

## 6.6 Einkaufsliste

Inhalte:

- zusammengefasste Zutaten
- Mengen
- Einheiten
- abhaken
- entfernen
- eigene Zutat hinzufügen
- Liste leeren

---

## 6.7 Eigenes Rezept hinzufügen

Inhalte:

- Formular
- Zutatenfeld
- Kategorie
- Tags
- Kochzeit
- Portionen
- Quelle optional
- Speichern

---

## 6.8 Datenverwaltung

Inhalte:

- Exportfeld
- Importfeld
- Kopieren-Button
- lokale Daten löschen
- Prototyp zurücksetzen
- Hinweis zu localStorage

---

## 7. Datenmodell

## 7.1 Recipe

| Feld | Typ | Beschreibung |
|---|---|---|
| id | string | eindeutige ID |
| title | string | Rezeptname |
| description | string | Kurzbeschreibung |
| source_id | string | Quelle |
| source_name | string | Anzeigename der Quelle |
| source_url | string | Original-Link |
| image_url | string | Bildlink, falls erlaubt |
| icon | string | Symbol |
| category | string | Kategorie |
| cuisine | string | Küche |
| difficulty | string | Einfach, Mittel, Schwer |
| servings | number | Originalportionen |
| prep_time | number | Vorbereitungszeit |
| cook_time | number | Kochzeit |
| total_time | number | Gesamtzeit |
| ingredients | array | analysierte Zutaten |
| instructions | array | Arbeitsschritte |
| tags | array | Such-Tags |
| diet_tags | array | Ernährungs-Tags |
| allergen_tags | array | Allergene |
| imported_at | datetime | Importdatum |
| updated_at | datetime | letztes Update |
| is_custom | boolean | eigenes Rezept |
| is_imported | boolean | importiertes Rezept |

---

## 7.2 Ingredient

| Feld | Typ | Beschreibung |
|---|---|---|
| id | string | eindeutige ID |
| original_text | string | originale Zutatenzeile |
| amount | number/null | Menge |
| unit | string | Einheit |
| normalized_amount | number/null | normalisierte Menge |
| normalized_unit | string | normalisierte Einheit |
| food | string | erkanntes Lebensmittel |
| normalized_food | string | normalisiertes Lebensmittel |
| preparation | string | z. B. gehackt, gerieben |
| note | string | Zusatzinfo |
| scalable | boolean | darf skaliert werden |
| scaling_group | string | normal, spice, qualitative, cooking_medium |
| allergen_tags | array | mögliche Allergene |
| food_group | string | Lebensmittelgruppe |

---

## 7.3 Source

| Feld | Typ | Beschreibung |
|---|---|---|
| id | string | eindeutige ID |
| name | string | Name |
| base_url | string | Homepage |
| status | string | aktiv, pausiert, fehlerhaft |
| robots_allowed | boolean | Zugriff erlaubt |
| parser_type | string | API, JSON-LD, RSS, Sitemap, HTML |
| import_frequency | string | manuell, täglich, wöchentlich |
| last_checked_at | datetime | letzte Prüfung |
| last_import_at | datetime | letzter Import |
| imported_recipe_count | number | Anzahl Rezepte |
| error_message | string | letzter Fehler |

---

## 7.4 ImportJob

| Feld | Typ | Beschreibung |
|---|---|---|
| id | string | eindeutige ID |
| source_id | string | Quelle |
| status | string | waiting, running, success, failed |
| started_at | datetime | Startzeit |
| finished_at | datetime | Endzeit |
| recipes_found | number | gefundene Rezepte |
| recipes_imported | number | importierte Rezepte |
| recipes_skipped | number | übersprungene Rezepte |
| error_message | string | Fehler |

---

## 7.5 ShoppingListItem

| Feld | Typ | Beschreibung |
|---|---|---|
| id | string | eindeutige ID |
| food | string | Lebensmittel |
| amount | number/null | Menge |
| unit | string | Einheit |
| checked | boolean | abgehakt |
| source_recipe_ids | array | aus welchen Rezepten |
| note | string | Zusatzinfo |

---

## 8. Technische Architektur

## 8.1 Aktueller Prototyp

Aktuell wird die App als reine Browser-App umgesetzt.

Technologien:

- HTML
- CSS
- JavaScript
- GitHub Pages
- localStorage

Der Prototyp kann:

- Rezepte anzeigen
- Suche
- Filter
- Sortierung
- Favoriten
- Einkaufsliste
- eigene Rezepte
- simulierte Datenanalyse
- simulierte Portionsskalierung
- Quellen-Manager
- URL-Import-Simulation
- Datenexport und Datenimport

Der Prototyp kann noch nicht:

- echte Webseiten automatisch importieren
- serverseitig `robots.txt` prüfen
- Hintergrundjobs ausführen
- Datenbank nutzen
- CORS-Probleme umgehen

---

## 8.2 Zielarchitektur

Für die echte Version wird benötigt:

### Frontend

- moderne Web-App
- Rezeptbibliothek
- Quellen-Manager
- Importstatus
- Rezeptdetails
- Einkaufsliste
- Einstellungen

Mögliche Technologien:

- React
- Next.js
- Tailwind CSS

### Backend

Aufgaben:

- Quellen prüfen
- Webseiten abrufen
- `robots.txt` beachten
- strukturierte Daten extrahieren
- Zutaten analysieren
- Mengen normalisieren
- Portionen skalieren
- Importjobs verwalten
- Daten speichern

Mögliche Technologien:

- Node.js
- Python
- FastAPI
- Express

### Datenbank

Mögliche Optionen:

- PostgreSQL
- Supabase
- SQLite für lokalen Prototyp

### Suche

Mögliche Optionen:

- PostgreSQL Full Text Search
- Meilisearch
- Typesense

---

## 9. Import-Regeln

Die App darf nicht unkontrolliert crawlen.

Regeln:

- maximal erlaubte Frequenz pro Quelle
- keine parallelen aggressiven Requests
- Cache verwenden
- Fehler sauber anzeigen
- Import abbrechen, wenn Quelle nicht erlaubt
- Originalquelle immer speichern
- kein Import aus Paywalls
- kein Import aus geschlossenen Bereichen
- keine Umgehung technischer Sperren

---

## 10. Zutaten- und Mengenlogik

Der Parser soll folgende Muster erkennen:

```text
200 g Pasta
1 EL Olivenöl
2 Dosen Tomaten
Salz nach Geschmack
1 Prise Pfeffer
500 ml Gemüsebrühe
```

Skalierbar:

- Pasta
- Reis
- Gemüse
- Mehl
- Zucker
- Milch
- Wasser als direkte Rezeptzutat
- Eier
- Dosen
- Packungen

Nicht oder vorsichtig skalierbar:

- Salz nach Geschmack
- Pfeffer nach Geschmack
- Öl zum Braten
- Wasser zum Kochen
- Backform
- Garnitur
- Gewürze in kleinen Mengen

Rundung:

```text
333.333333 g → 335 g
0.666 EL → 2/3 EL
1.5 kg → 1,5 kg
```

Einheitliche Anzeige:

```text
250 g Tomaten
1,5 kg Kartoffeln
2 EL Olivenöl
nach Geschmack Salz
```

---

## 11. Datenschutz

Im Prototyp werden Daten lokal im Browser gespeichert.

Gespeichert werden können:

- eigene Rezepte
- Favoriten
- Einkaufsliste
- Quellenliste
- Importprotokoll
- Einstellungen

Für eine spätere Cloud-Version:

- Nutzerkonto optional
- Datenexport
- Datenlöschung
- klare Datenschutzhinweise
- keine unnötige Datensammlung

---

## 12. MVP

Die aktuelle Prototyp-Version soll folgende Funktionen enthalten:

- moderne Oberfläche
- Rezeptkarten
- Suche
- Filter
- Sortierung
- Favoriten
- Einkaufsliste
- eigene Rezepte
- Rezeptdetails
- Portionsregler
- metrische Mengenanzeige
- logische Skalierung im Frontend
- Quellen-Manager als UI
- Import-Simulation
- Rezept-URL-Import-Simulation
- Zutatenanalyse-Simulation
- Datenexport
- Datenimport

---

## 13. Nicht im aktuellen Browser-Prototyp

Noch nicht enthalten:

- echter automatischer Web-Import
- echtes Backend
- echte Datenbank
- echte KI-Analyse
- echte robots.txt-Prüfung
- echte regelmäßige Importjobs
- Nutzerkonto
- Synchronisierung zwischen Geräten

Diese Funktionen gehören zur nächsten technischen Ausbaustufe.

---

## 14. Akzeptanzkriterien für den nächsten Prototyp

Der Prototyp gilt als verbessert, wenn:

- die Oberfläche modern und intuitiv wirkt
- Nutzer Rezepte schnell finden können
- Filter klar verständlich sind
- Rezeptdetails professionell aussehen
- Zutaten metrisch angezeigt werden
- Portionen verändert werden können
- Mengen logisch skaliert werden
- Favoriten funktionieren
- Einkaufsliste funktioniert
- eigene Rezepte gespeichert werden können
- Quellen-Manager sichtbar ist
- Importfunktion als Simulation verständlich ist
- URL-Import klar als Simulation erkennbar ist
- Daten exportiert und importiert werden können
- die App auf Smartphone und Desktop nutzbar ist

---

## 15. Roadmap

## Phase 1 – Browser-Prototyp

- modernes UI
- Such- und Filterlogik
- Favoriten
- Einkaufsliste
- eigene Rezepte
- Portionsskalierung
- Quellen-Manager als Simulation
- URL-Import-Simulation
- Datenverwaltung

## Phase 2 – Datenmodell und Parser

- strukturierte Zutaten
- Mengenparser
- Normalisierung
- Synonyme
- metrische Umrechnung
- bessere Einkaufsliste

## Phase 3 – Backend

- Import-Service
- Quellenprüfung
- robots.txt-Check
- Parser-Service
- Datenbank
- Importjobs

## Phase 4 – Echter Import

- ausgewählte Quellen anbinden
- Rezeptdaten extrahieren
- Importfehler anzeigen
- Updates erkennen
- Duplikate vermeiden

## Phase 5 – Nutzerkonten und Synchronisierung

- Login
- Cloud-Speicherung
- geräteübergreifende Favoriten
- geteilte Einkaufslisten
- Exportfunktion

---

## 16. Offene Fragen

- Soll die App primär deutschsprachige Quellen nutzen?
- Welche Homepages sollen zuerst unterstützt werden?
- Soll es Nutzerkonten geben?
- Soll die App später als mobile App erscheinen?
- Soll die App Nährwerte analysieren?
- Soll es Allergie-Filter geben?
- Soll eine KI beim Tagging helfen?
- Soll die App eigene Rezeptbilder erlauben?
- Soll es Wochenplanung geben?
