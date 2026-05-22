# SPEC.md

# RecipeFinder – Produktspezifikation

## 1. Kurzbeschreibung

RecipeFinder ist eine moderne Rezept-App, mit der Nutzer Rezepte aus selbst ausgewählten Online-Quellen importieren, durchsuchen, analysieren, normalisieren, speichern und für ihre eigene Küchenplanung verwenden können.

Die App soll Rezepte nicht nur anzeigen, sondern deren Inhalte verstehen:

- Zutaten erkennen
- Lebensmittel vereinheitlichen
- Mengen in metrische Einheiten umrechnen
- Portionen logisch skalieren
- Rezepte filterbar und durchsuchbar machen
- Einkaufsliste automatisch erzeugen
- Quellen und Original-Links sauber erhalten

Die App orientiert sich funktional an hochwertigen Rezept-Apps wie Paprika, Samsung Food, Mela und Pestle, soll aber langfristig einen starken Fokus auf deutschsprachige Rezeptquellen, metrische Angaben und intuitive Bedienung legen.

---

## 2. Produktziel

Das Ziel ist eine persönliche Rezeptbibliothek mit intelligentem Web-Import.

Nutzer sollen eigene Rezeptquellen auswählen können. Die App soll daraus erlaubte Rezepte importieren, analysieren, standardisieren und in einer modernen Oberfläche verfügbar machen.

Die App soll besonders stark sein bei:

- automatischem Rezeptimport
- einheitlicher Rezeptstruktur
- intelligenter Suche
- metrischen Mengenangaben
- logischer Portionsskalierung
- moderner und intuitiver Benutzeroberfläche
- Einkaufsliste
- Favoriten
- eigenen Rezepten

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

### 4.1 Nutzerfreundlichkeit

Die App soll einfach, schnell und verständlich sein.

Der Nutzer soll ohne technische Kenntnisse:

- Rezepte suchen
- Quellen hinzufügen
- Rezepte importieren
- Zutaten verstehen
- Portionen anpassen
- Einkaufsliste erstellen
- Favoriten speichern

### 4.2 Transparenz

Jedes importierte Rezept muss die Originalquelle behalten.

Angezeigt werden soll immer:

- Name der Quelle
- Link zum Originalrezept
- Importdatum
- Importstatus
- Hinweis, ob Mengen normalisiert wurden

### 4.3 Rechtssicherheit und Fairness

Die App soll nur Quellen nutzen, bei denen der Zugriff erlaubt ist.

Anforderungen:

- `robots.txt` prüfen
- Nutzungsbedingungen beachten
- keine aggressiven Anfragen
- Rate Limiting verwenden
- Originalquelle immer verlinken
- Bilder nur nutzen, wenn erlaubt
- vollständige Fremdinhalte nicht ohne Erlaubnis kopieren
- Quellen bei Problemen deaktivierbar machen

---

## 5. Kernfunktionen

## 5.1 Automatischer Rezeptimport

Nutzer sollen selbst Homepages als Quellen hinzufügen können.

Beispiel:

```text
https://www.beispiel-rezeptseite.de
