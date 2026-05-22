# RecipeFinder

RecipeFinder ist ein moderner Prototyp für eine intelligente Rezept-App.

Die App soll langfristig Rezepte aus ausgewählten Online-Quellen importieren, Zutaten analysieren, Mengen metrisch normalisieren, Portionen logisch skalieren und daraus eine intuitive Rezeptbibliothek mit Einkaufsliste erstellen.

---

## Ziel der App

RecipeFinder soll Nutzern helfen, Rezepte aus verschiedenen Quellen an einem Ort zu sammeln und besser nutzbar zu machen.

Die App konzentriert sich auf:

- moderne Rezeptsuche
- Rezeptimport aus ausgewählten Quellen
- Zutatenanalyse
- metrische Mengenangaben
- logische Portionsskalierung
- Favoriten
- Einkaufsliste
- eigene Rezepte
- Quellenverwaltung
- Datenexport und Datenimport
- intuitive Benutzeroberfläche

---

## Aktueller Stand

Der aktuelle Stand ist ein Browser-Prototyp auf Basis von:

- HTML
- CSS
- JavaScript
- localStorage
- GitHub Pages

Die App läuft vollständig im Browser und benötigt aktuell kein Backend.

---

## Aktuelle Funktionen

Der Prototyp kann bereits:

- Rezepte anzeigen
- Rezepte durchsuchen
- nach Kategorie filtern
- nach Schwierigkeit filtern
- nach maximaler Kochzeit filtern
- nach Kochzeit, Name oder Neuheit sortieren
- Schnellfilter verwenden
- Rezeptdetails anzeigen
- Portionen erhöhen oder reduzieren
- Zutatenmengen logisch anpassen
- Zutaten in metrischen Einheiten anzeigen
- Originalzutaten anzeigen
- Favoriten speichern
- Einkaufsliste erstellen
- Mengen in der Einkaufsliste zusammenfassen
- eigene Zutaten zur Einkaufsliste hinzufügen
- eigene Rezepte hinzufügen
- eigene Rezepte löschen
- Rezeptquellen verwalten
- Importstatus simulieren
- Rezept-URL-Import simulieren
- lokale Daten exportieren
- lokale Daten importieren
- Prototyp-Daten zurücksetzen

---

## Wichtiger Hinweis zum URL-Import

Der aktuelle URL-Import ist eine Simulation.

Das bedeutet:

- Die eingegebene URL wird geprüft.
- Eine Quelle wird erkannt oder erstellt.
- Ein Importstatus wird erzeugt.
- Ein Beispielrezept wird gespeichert.
- Der Original-Link bleibt erhalten.
- Zutaten werden im Prototyp analysiert und metrisch dargestellt.

Die App lädt aktuell noch keine echten fremden Webseiten herunter.

---

## Warum der echte Web-Import später ein Backend braucht

Ein echter automatischer Rezeptimport kann nicht zuverlässig nur im Browser umgesetzt werden.

Dafür braucht die App später ein Backend, weil:

- viele Webseiten CORS-Zugriffe aus dem Browser blockieren
- robots.txt serverseitig geprüft werden muss
- Webseiten strukturiert ausgelesen werden müssen
- Rezeptdaten aus HTML oder JSON-LD extrahiert werden müssen
- Importjobs regelmäßig laufen sollen
- Fehler, Duplikate und Quellenstatus verwaltet werden müssen
- rechtliche und technische Regeln eingehalten werden müssen

---

## Geplante Zielarchitektur

Langfristig soll RecipeFinder aus diesen Teilen bestehen:

```text
Frontend
- moderne Web-App
- Rezeptbibliothek
- Rezeptdetails
- Quellen-Manager
- Einkaufsliste
- Datenverwaltung
- Einstellungen

Backend
- Import-Service
- Parser-Service
- robots.txt-Prüfung
- Zutatenanalyse
- Mengen-Normalisierung
- Portionsskalierung
- Importjobs
- Fehlerbehandlung

Datenbank
- Rezepte
- Zutaten
- Quellen
- Importprotokolle
- Favoriten
- Einkaufslisten
- Nutzerkonten, falls später benötigt
```

---

## Projektdateien

Aktuell besteht das Projekt aus:

```text
RecipeFinder/
├── README.md
├── SPEC.md
├── BACKEND_PLAN.md
├── DATA_MODEL.md
├── IMPORT_RULES.md
├── INGREDIENT_LOGIC.md
├── index.html
├── styles.css
└── script.js
```

---

## Bedeutung der wichtigsten Dateien

| Datei | Zweck |
|---|---|
| README.md | Projektübersicht für GitHub |
| SPEC.md | Produktspezifikation |
| BACKEND_PLAN.md | Planung für späteres Backend |
| DATA_MODEL.md | Datenmodell für Rezepte, Zutaten, Quellen und Listen |
| IMPORT_RULES.md | Regeln für fairen und transparenten Import |
| INGREDIENT_LOGIC.md | Regeln für Zutatenanalyse und Mengenskalierung |
| index.html | Struktur der App |
| styles.css | Design der App |
| script.js | App-Logik |

---

## Lokale Speicherung

Der Prototyp speichert Daten im Browser über localStorage.

Gespeichert werden können:

- eigene Rezepte
- Favoriten
- Einkaufsliste
- Quellen
- Importprotokoll

Diese Daten liegen nur im jeweiligen Browser.

---

## Datenverwaltung

Die App enthält einen Bereich für Datenverwaltung.

Dort kann der Nutzer:

- lokale Daten exportieren
- Exportdaten kopieren
- exportierte Daten wieder importieren
- eigene Daten löschen
- den Prototyp zurücksetzen

Der Datenexport ist besonders nützlich, weil localStorage nicht automatisch zwischen Geräten synchronisiert wird.

---

## Rezeptimport

Langfristig soll RecipeFinder verschiedene Importarten unterstützen.

Priorität:

1. Offizielle APIs
2. Strukturierte Rezeptdaten, zum Beispiel JSON-LD Recipe
3. RSS-Feeds
4. Sitemaps
5. Einzelne Rezept-URL
6. HTML-Parsing nur, wenn erlaubt und stabil möglich
7. Manueller Import

Der aktuelle Browser-Prototyp unterstützt nur:

```text
manuelle Rezepte
simulierten Beispiel-Import
simulierten Rezept-URL-Import
```

---

## Zutatenanalyse

Zutaten sollen in strukturierte Bestandteile zerlegt werden.

Beispiel:

```text
250 g gehackte Tomaten
```

wird intern zu:

```text
Menge: 250
Einheit: g
Lebensmittel: Tomaten
Zubereitung: gehackt
skalierbar: ja
```

Diese Struktur ist wichtig für:

- Suche
- Filter
- Portionsskalierung
- Einkaufsliste
- metrische Normalisierung
- spätere Allergie- und Nährwertfunktionen

---

## Metrische Normalisierung

Die App soll Mengen standardmäßig metrisch anzeigen.

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

Nicht-metrische Einheiten wie `cup` oder `oz` sollen später möglichst lebensmittelabhängig umgerechnet werden.

Beispiele:

```text
1 cup Wasser → 240 ml Wasser
1 cup Mehl → 120 g Mehl
1 cup Zucker → 200 g Zucker
1 oz Butter → 28 g Butter
```

---

## Portionsskalierung

Die App soll Zutatenmengen logisch anpassen.

Beispiel:

```text
2 Portionen → 4 Portionen
200 g Pasta → 400 g Pasta
1 EL Olivenöl → 2 EL Olivenöl
Salz nach Geschmack → bleibt nach Geschmack
```

Nicht jede Angabe wird blind skaliert.

Nicht oder vorsichtig skalierbar:

- Salz nach Geschmack
- Pfeffer nach Geschmack
- Öl zum Anbraten
- Wasser zum Kochen
- 1 Prise Salz
- Backform
- Garnitur

---

## Suche und Filter

Die App soll Rezepte nicht nur nach Titel durchsuchen, sondern auch nach strukturierten Inhalten.

Suchfelder:

- Rezeptname
- Beschreibung
- Zutaten
- normalisierte Lebensmittel
- Tags
- Kategorie
- Schwierigkeit
- Quelle
- Kochzeit

Beispiele:

```text
Pasta
Tomaten
vegan
unter 30 Minuten
Reis
schnell
```

---

## Einkaufsliste

Aus Rezepten können Zutaten zur Einkaufsliste hinzugefügt werden.

Die App soll gleiche Zutaten zusammenfassen, wenn dies sinnvoll möglich ist.

Beispiel:

```text
Rezept A: 200 g Tomaten
Rezept B: 300 g Tomaten
Einkaufsliste: 500 g Tomaten
```

Nicht blind zusammenfassen:

```text
1 Dose Tomaten
300 g Tomaten
```

Solche Angaben bleiben getrennt, wenn keine sichere Umrechnung bekannt ist.

---

## Fairer Umgang mit Quellen

RecipeFinder soll keine fremden Webseiten aggressiv oder ungeprüft auslesen.

Für den späteren echten Import gelten diese Regeln:

- robots.txt prüfen
- keine Paywalls umgehen
- keine Login-Bereiche scrapen
- keine technischen Sperren umgehen
- Rate Limits einhalten
- Originalquelle immer speichern
- Original-Link immer anzeigen
- Quellen bei Problemen pausieren
- Importfehler transparent anzeigen

---

## Roadmap

## Phase 1: Browser-Prototyp

Status: in Arbeit

- moderne Oberfläche
- Suche
- Filter
- Sortierung
- Favoriten
- Einkaufsliste
- eigene Rezepte
- Quellen-Manager
- URL-Import-Simulation
- Datenverwaltung
- Portionsskalierung

---

## Phase 2: Bessere Zutatenlogik

Geplant:

- bessere Erkennung von Mengen
- bessere Erkennung von Einheiten
- bessere Normalisierung von Lebensmitteln
- mehr Synonyme
- bessere Rundungsregeln
- bessere Einkaufsliste
- sicherere Skalierungsgruppen

---

## Phase 3: Backend-Konzept

Geplant:

- Backend-Struktur definieren
- Import-Service planen
- Parser-Service planen
- Datenbankmodell festlegen
- API-Endpunkte definieren
- Deployment-Optionen prüfen

---

## Phase 4: Echter Web-Import

Geplant:

- echte Quellenprüfung
- robots.txt-Check
- JSON-LD Recipe Parsing
- Sitemap-Import
- RSS-Import
- Importjobs
- Fehlerprotokollierung
- Duplikaterkennung

---

## Phase 5: Nutzerkonten und Synchronisierung

Geplant:

- Login
- Cloud-Speicherung
- geräteübergreifende Favoriten
- synchronisierte Einkaufsliste
- Datenexport
- Datenlöschung

---

## Status

RecipeFinder befindet sich aktuell im Prototyp-Stadium.

Der aktuelle Fokus liegt darauf, eine gute App-Struktur, eine intuitive Benutzeroberfläche und eine solide fachliche Grundlage für Rezeptimport, Zutatenanalyse und Portionsskalierung zu schaffen.
