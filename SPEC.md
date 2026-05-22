# SPEC.md

## 1. Projektname

RecipeFinder

## 2. Projektziel

Die App soll kostenlose und öffentlich zugängliche Rezepte aus verschiedenen erlaubten Online-Quellen sammeln, strukturieren und für Nutzer einfach durchsuchbar machen.

Nutzer sollen Rezepte schnell finden, sortieren, filtern und speichern können. Die App soll besonders intuitiv, übersichtlich und benutzerfreundlich sein.

## 3. Zielgruppe

Die App richtet sich an Menschen, die regelmäßig kochen und schnell passende Rezepte finden möchten, zum Beispiel nach Zutaten, Kochzeit, Ernährungsform oder Gerichtstyp.

## 4. Kernidee

Die App importiert Rezeptinformationen aus erlaubten Quellen automatisch oder halbautomatisch.

Dabei werden bevorzugt strukturierte Rezeptdaten verwendet, zum Beispiel:

- Rezeptname
- Zutaten
- Zubereitungszeit
- Portionen
- Kategorie
- Küche / Land
- Schwierigkeitsgrad
- Bild-URL, falls erlaubt
- Originalquelle
- Link zum Originalrezept

Die App soll nicht einfach ungeprüft komplette Webseiten kopieren. Jede Rezeptquelle muss geprüft werden.

## 5. Rechtliche und technische Leitplinien

Die App soll nur Quellen verwenden, bei denen das Auslesen erlaubt ist.

Anforderungen:

- `robots.txt` der jeweiligen Website prüfen
- Nutzungsbedingungen der Website beachten
- Quellenangabe immer anzeigen
- Link zum Originalrezept immer anzeigen
- Keine Bilder lokal speichern, wenn keine Erlaubnis vorliegt
- Keine vollständigen Rezepttexte kopieren, wenn keine Erlaubnis vorliegt
- Pro Quelle eigene Import-Regeln definieren
- Keine aggressiven oder häufigen Anfragen an Websites senden
- Rate Limiting einbauen
- Quellen bei Problemen deaktivierbar machen

## 6. Hauptfunktionen

### 6.1 Rezeptimport

- [ ] Rezepte aus erlaubten Quellen importieren
- [ ] Strukturierte Daten erkennen, z. B. Recipe JSON-LD
- [ ] Rezeptdaten normalisieren
- [ ] Doppelte Rezepte erkennen
- [ ] Originalquelle speichern
- [ ] Importstatus pro Quelle anzeigen
- [ ] Fehler beim Import protokollieren

### 6.2 Rezeptsuche

Nutzer sollen Rezepte suchen können nach:

- Rezeptname
- Zutaten
- Kategorie
- Küche
- Zubereitungszeit
- Ernährungsform
- Schwierigkeit
- Quelle

Beispiele:

- „Pasta“
- „vegetarisch“
- „unter 30 Minuten“
- „Hähnchen Reis“
- „vegan schnell“

### 6.3 Sortierfunktion

Nutzer sollen Rezepte sortieren können nach:

- Relevanz
- Zubereitungszeit
- Neueste Rezepte
- Beliebtheit
- Bewertung
- Schwierigkeit
- Alphabetisch

### 6.4 Filterfunktion

Filter:

- Zubereitungszeit
- Zutaten
- Kategorie
- Ernährungsform
- Schwierigkeit
- Quelle
- Portionen
- Kalorien, falls vorhanden

### 6.5 Rezeptdetails

Auf der Detailseite sollen angezeigt werden:

- Rezeptname
- Bild, falls erlaubt
- Zutaten
- Kurzbeschreibung
- Zubereitungszeit
- Portionen
- Schwierigkeit
- Kategorie
- Quelle
- Button: „Originalrezept öffnen“

Optional:

- Favorit speichern
- Notizen hinzufügen
- Einkaufsliste erzeugen

### 6.6 Favoriten

Nutzer sollen Rezepte speichern können.

- [ ] Rezept als Favorit markieren
- [ ] Favoritenliste anzeigen
- [ ] Favoriten durchsuchen
- [ ] Favoriten entfernen

### 6.7 Einkaufsliste

Aus einem Rezept soll optional eine Einkaufsliste erstellt werden können.

- [ ] Zutaten eines Rezepts übernehmen
- [ ] Zutaten abhaken
- [ ] Mengen anzeigen
- [ ] Manuelle Zutaten hinzufügen
- [ ] Einkaufsliste löschen

## 7. Benutzerfreundlichkeit

Die App soll sehr einfach zu bedienen sein.

Design-Anforderungen:

- Klare Startseite
- Große Suchleiste
- Verständliche Filter
- Schnelle Ladezeiten
- Mobile-first Design
- Übersichtliche Rezeptkarten
- Wenige Klicks bis zum Rezept
- Keine überladenen Menüs
- Gute Lesbarkeit
- Barrierearme Bedienung

## 8. Nutzerfluss

### Standardfluss

1. Nutzer öffnet die App.
2. Nutzer sieht eine große Suchleiste.
3. Nutzer gibt Suchbegriff oder Zutat ein.
4. App zeigt passende Rezeptkarten.
5. Nutzer kann filtern oder sortieren.
6. Nutzer öffnet ein Rezept.
7. Nutzer sieht Zusammenfassung und Link zur Originalquelle.
8. Nutzer kann Rezept speichern oder Einkaufsliste erstellen.

### Beispiel

Nutzer sucht nach „vegetarische Pasta unter 30 Minuten“.

Die App zeigt passende Rezepte und sortiert sie nach Relevanz oder Kochzeit.

## 9. Datenmodell

### Recipe

| Feld | Typ | Beschreibung |
|---|---|---|
| id | string | Eindeutige ID |
| title | string | Rezeptname |
| slug | string | URL-freundlicher Name |
| description | string | Kurze Beschreibung |
| ingredients | array | Zutatenliste |
| instructions_summary | string | Kurze Zusammenfassung, falls erlaubt |
| source_name | string | Name der Quelle |
| source_url | string | Link zum Originalrezept |
| image_url | string | Bildlink, falls erlaubt |
| prep_time | number | Vorbereitungszeit in Minuten |
| cook_time | number | Kochzeit in Minuten |
| total_time | number | Gesamtzeit in Minuten |
| servings | number | Portionen |
| difficulty | string | Einfach, mittel, schwer |
| category | string | Kategorie, z. B. Hauptgericht |
| cuisine | string | Küche, z. B. italienisch |
| diet_tags | array | Tags, z. B. vegan, vegetarisch |
| rating | number | Bewertung |
| created_at | datetime | Erstellungsdatum |
| updated_at | datetime | Aktualisierung |

### Source

| Feld | Typ | Beschreibung |
|---|---|---|
| id | string | Eindeutige ID |
| name | string | Name der Quelle |
| base_url | string | Website-URL |
| is_active | boolean | Quelle aktiv/inaktiv |
| robots_allowed | boolean | Import erlaubt |
| parser_type | string | JSON-LD, RSS, API, HTML |
| last_checked_at | datetime | Letzte Prüfung |
| notes | string | Hinweise zur Quelle |

### User

| Feld | Typ | Beschreibung |
|---|---|---|
| id | string | Eindeutige ID |
| email | string | E-Mail |
| name | string | Name |
| created_at | datetime | Registrierungsdatum |

### Favorite

| Feld | Typ | Beschreibung |
|---|---|---|
| id | string | Eindeutige ID |
| user_id | string | Nutzer-ID |
| recipe_id | string | Rezept-ID |
| created_at | datetime | Zeitpunkt des Speicherns |

## 10. Technische Architektur

### Frontend

Mögliche Technologien:

- React
- Next.js
- Tailwind CSS

### Backend

Mögliche Technologien:

- Node.js
- Python
- FastAPI
- Express

### Datenbank

Mögliche Optionen:

- PostgreSQL
- Supabase
- SQLite für ersten Prototyp

### Suche

Mögliche Optionen:

- PostgreSQL Full Text Search
- Meilisearch
- Typesense
- Elasticsearch

### Import-Service

Der Import-Service übernimmt:

- Quellenprüfung
- Abruf erlaubter Seiten
- Extraktion strukturierter Rezeptdaten
- Normalisierung der Daten
- Speicherung in Datenbank
- Fehlerprotokollierung

## 11. MVP-Version

Die erste Version soll bewusst einfach bleiben.

### MVP-Funktionen

- [ ] Startseite mit Suchleiste
- [ ] Rezeptliste
- [ ] Rezeptdetailseite
- [ ] Sortierung nach Kochzeit und Relevanz
- [ ] Filter nach Kategorie und Zubereitungszeit
- [ ] Import aus 1 bis 3 erlaubten Quellen
- [ ] Quellenangabe und Original-Link
- [ ] Favoritenfunktion
- [ ] Mobile Ansicht

### Nicht im MVP

- Kein automatischer Import aus beliebig vielen Websites
- Kein User-Login nötig, falls Favoriten lokal gespeichert werden
- Keine KI-Rezeptgenerierung
- Keine Social-Funktionen
- Keine Bewertungen durch Nutzer
- Keine vollständige Kopie fremder Rezeptseiten

## 12. Spätere Erweiterungen

- [ ] Nutzerkonto
- [ ] Synchronisierte Favoriten
- [ ] Einkaufsliste
- [ ] Wochenplaner
- [ ] Rezeptempfehlungen
- [ ] Allergie-Filter
- [ ] Kalorien- und Nährwertfilter
- [ ] Import per Rezept-URL
- [ ] Browser-Extension
- [ ] App für iOS und Android
- [ ] Eigene Rezepte speichern

## 13. Akzeptanzkriterien

Die App gilt als erste Version fertig, wenn:

- Nutzer Rezepte suchen können
- Nutzer Rezepte sortieren können
- Nutzer Rezepte filtern können
- Rezeptkarten übersichtlich dargestellt werden
- Rezeptdetails angezeigt werden
- Originalquelle klar sichtbar ist
- Mindestens eine erlaubte Quelle funktioniert
- Die App auf Handy und Desktop nutzbar ist
- Keine nicht erlaubten Inhalte gespeichert werden

## 14. Offene Fragen

- Welche Rezeptquellen dürfen verwendet werden?
- Soll die App nur deutschsprachige Rezepte anzeigen?
- Soll ein Login eingebaut werden?
- Sollen Nutzer eigene Rezepte speichern können?
- Soll die App später als mobile App veröffentlicht werden?
- Soll es eine Einkaufsliste geben?
- Welche Ernährungsformen sollen unterstützt werden?
- Wie oft sollen neue Rezepte importiert werden?

## 15. Erste Umsetzungsschritte

- [ ] GitHub-Repository erstellen
- [ ] README.md erstellen
- [ ] SPEC.md erstellen
- [ ] Projektstruktur anlegen
- [ ] Frontend-Grundlayout bauen
- [ ] Rezept-Datenmodell erstellen
- [ ] Beispielrezepte manuell einfügen
- [ ] Suche und Sortierung bauen
- [ ] Rezeptdetailseite bauen
- [ ] Erste erlaubte Quelle prüfen
- [ ] Import-Prototyp bauen
