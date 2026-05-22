# IMPORT_RULES.md

# RecipeFinder – Import-Regeln

## 1. Ziel

Dieses Dokument definiert Regeln für den späteren echten Rezeptimport aus externen Webseiten.

Der aktuelle Browser-Prototyp simuliert den Import nur. Der echte Import darf erst umgesetzt werden, wenn ein Backend vorhanden ist, das Quellen fair, kontrolliert und transparent prüft.

---

## 2. Grundsatz

RecipeFinder soll keine fremden Webseiten aggressiv oder ungeprüft auslesen.

Jeder Import muss diese Prinzipien beachten:

- Zugriff nur auf öffentlich erreichbare Inhalte
- keine Paywalls umgehen
- keine Login-Bereiche scrapen
- keine technischen Sperren umgehen
- `robots.txt` prüfen
- Nutzungsbedingungen beachten
- Originalquelle immer speichern
- Original-Link immer anzeigen
- Rate Limits einhalten
- Fehler transparent anzeigen
- Quelle bei Problemen pausieren
- vollständige fremde Inhalte nicht ungeprüft kopieren

---

## 3. Importarten

RecipeFinder soll langfristig mehrere Importarten unterstützen.

Priorität:

1. Offizielle API
2. Strukturierte Rezeptdaten, zum Beispiel JSON-LD Recipe
3. RSS-Feeds
4. Sitemaps
5. Einzelne Rezept-URL
6. HTML-Parsing nur, wenn erlaubt und stabil möglich
7. Manueller Import durch Nutzer

---

## 4. Erlaubte Quellen

Eine Quelle darf importiert werden, wenn:

- die Seite öffentlich erreichbar ist
- `robots.txt` den Zugriff nicht verbietet
- keine Paywall vorliegt
- keine Anmeldung erforderlich ist
- keine technischen Sperren umgangen werden müssen
- die Nutzungsbedingungen den Zugriff nicht untersagen
- die Quelle nicht deaktiviert wurde
- die App die Quelle fair und langsam abruft

---

## 5. Nicht erlaubte Quellen

Eine Quelle darf nicht automatisch importiert werden, wenn:

- `robots.txt` den Zugriff blockiert
- Inhalte nur nach Login sichtbar sind
- Inhalte hinter einer Paywall liegen
- die Seite Scraping ausdrücklich verbietet
- die Seite technische Schutzmaßnahmen nutzt
- Zugriff nur durch Umgehung von Sperren möglich wäre
- die Quelle wiederholt Fehler oder Blockierungen liefert
- der Betreiber eine Entfernung verlangt

---

## 6. robots.txt-Regeln

Vor jedem automatischen Import muss das Backend prüfen:

```text
https://domain.de/robots.txt
```

Geprüft werden muss:

- Gibt es Regeln für den RecipeFinder-Crawler?
- Gibt es Regeln für allgemeine User-Agents?
- Ist die konkrete URL erlaubt?
- Gibt es Crawl-Delay-Hinweise?
- Gibt es Sitemap-Hinweise?
- Ist die robots.txt erreichbar?

Mögliche Ergebnisse:

```text
allowed
blocked
unknown
error
```

Verhalten:

| Ergebnis | Verhalten |
|---|---|
| allowed | Import darf fortgesetzt werden |
| blocked | Import abbrechen |
| unknown | Quelle zur manuellen Prüfung markieren |
| error | Import abbrechen oder später erneut prüfen |

---

## 7. User-Agent

Der spätere Backend-Crawler soll einen klaren User-Agent nutzen.

Beispiel:

```text
RecipeFinderBot/1.0 (+https://example.com/about)
```

Der User-Agent soll nicht verschleiern, wer zugreift.

Nicht erlaubt:

```text
Googlebot fälschen
Browser-User-Agent missbrauchen
Identität verschleiern
```

---

## 8. Rate Limiting

RecipeFinder soll Webseiten fair abrufen.

Mindestregeln:

- keine parallelen Abrufe derselben Quelle
- mindestens einige Sekunden Abstand zwischen Requests
- Crawl-Delay beachten, falls angegeben
- Importjob abbrechen bei wiederholten Fehlern
- Quelle pausieren bei Blockierungen
- keine massenhaften Abrufe ohne ausdrückliche Erlaubnis

Empfohlene erste Standardwerte:

```text
max_requests_per_source_per_minute: 6
min_delay_between_requests_seconds: 10
max_parallel_requests_per_source: 1
max_errors_before_pause: 5
```

---

## 9. Inhalte, die gespeichert werden dürfen

Standardmäßig speichern:

- Rezeptname
- kurze Beschreibung, falls erlaubt
- Zutaten
- Mengenangaben
- Zeiten
- Portionen
- Kategorie
- Tags
- Quelle
- Original-URL
- Importdatum
- strukturierte Metadaten

Nur speichern, wenn erlaubt:

- Bilder
- vollständige Anleitungstexte
- lange Beschreibungstexte
- komplette Artikeltexte
- urheberrechtlich besonders kreative Texte

Sicherer Standard:

```text
Original-Link anzeigen
Rezeptdaten strukturiert speichern
keinen kompletten Blogartikel kopieren
```

---

## 10. Bilder

Bilder sollen besonders vorsichtig behandelt werden.

Standardverhalten:

- keine fremden Bilder lokal herunterladen
- Bild-URL nur speichern, wenn Nutzung erlaubt ist
- Bildquelle anzeigen
- bei Unsicherheit nur Symbol oder Platzhalter anzeigen

Nicht erlaubt:

- fremde Bilder ohne Erlaubnis lokal speichern
- Bildrechte ignorieren
- Bilder aus geschützten Bereichen übernehmen

---

## 11. Rezeptanleitungen

Zubereitungsschritte können urheberrechtlich sensibler sein als reine Zutatenlisten.

Standardregel:

- Zutaten und technische Rezeptdaten dürfen strukturiert verarbeitet werden, wenn Import erlaubt ist.
- Vollständige Anleitungstexte nur speichern, wenn Quelle und Nutzungsbedingungen dies zulassen.
- Bei Unsicherheit nur Zusammenfassung oder Original-Link anzeigen.
- Originalquelle immer gut sichtbar verlinken.

---

## 12. Zutatenlisten

Zutaten sollen analysiert und normalisiert werden.

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
  "scalable": true
}
```

Originaldaten müssen erhalten bleiben.

Nicht erlaubt:

```text
Originaldaten überschreiben
Herkunft der Daten entfernen
Quelle verlieren
```

---

## 13. Metrische Normalisierung

Nicht-metrische Einheiten sollen nur mit nachvollziehbaren Regeln umgerechnet werden.

Beispiele:

```text
1 cup Wasser → 240 ml Wasser
1 cup Mehl → 120 g Mehl
1 cup Zucker → 200 g Zucker
1 oz Butter → 28 g Butter
```

Regeln:

- Umrechnung lebensmittelabhängig durchführen
- Originalwert behalten
- Umrechnungshinweis speichern
- bei Unsicherheit nicht blind umrechnen
- unsichere Umrechnung markieren

---

## 14. Portionsskalierung

Importierte Rezepte müssen so gespeichert werden, dass Portionen später logisch skaliert werden können.

Jede Zutat braucht:

```json
{
  "amount": 200,
  "unit": "g",
  "food": "Pasta",
  "scalable": true,
  "scaling_group": "normal"
}
```

Nicht oder vorsichtig skalierbar:

- Salz nach Geschmack
- Pfeffer nach Geschmack
- Öl zum Anbraten
- Wasser zum Kochen
- 1 Prise Salz
- Backform
- Garnitur

---

## 15. Duplikate

Beim Import müssen Duplikate erkannt werden.

Prüfreihenfolge:

1. gleiche Original-URL
2. gleicher Canonical-Link
3. gleicher Titel und gleiche Quelle
4. sehr ähnliche Zutatenliste
5. gleicher strukturierter Identifier, falls vorhanden

Mögliche Aktionen:

```text
new
duplicate
updated
skipped
```

Wenn ein Duplikat erkannt wird, soll kein unkontrolliertes zweites Rezept angelegt werden.

---

## 16. Fehlerbehandlung

Fehler müssen gespeichert und verständlich angezeigt werden.

Typische Fehler:

```text
robots.txt blockiert Zugriff
Quelle nicht erreichbar
URL ungültig
Keine Rezeptdaten gefunden
JSON-LD ungültig
Parser fehlgeschlagen
Duplikat erkannt
Zeitüberschreitung
Rate Limit erreicht
Quelle pausiert
```

Jeder Fehler sollte enthalten:

- Quelle
- URL
- Zeitpunkt
- Fehlercode
- verständliche Meldung
- technisches Detail
- empfohlene nächste Aktion

---

## 17. Quellenstatus

Eine Quelle kann diese Status haben:

| Status | Bedeutung |
|---|---|
| active | Quelle darf importiert werden |
| paused | Quelle ist manuell pausiert |
| blocked | Import ist nicht erlaubt |
| error | Quelle hat technische Probleme |
| review_required | Quelle muss manuell geprüft werden |

---

## 18. Importjob-Status

Ein Importjob kann diese Status haben:

| Status | Bedeutung |
|---|---|
| waiting | wartet |
| running | läuft |
| success | erfolgreich |
| partial_success | teilweise erfolgreich |
| failed | fehlgeschlagen |
| cancelled | abgebrochen |
| skipped | übersprungen |

---

## 19. Entfernung und Deaktivierung

RecipeFinder muss Quellen und Rezepte entfernen oder deaktivieren können.

Mögliche Gründe:

- Betreiber verlangt Entfernung
- Quelle ändert Nutzungsbedingungen
- robots.txt blockiert später Zugriff
- technische Fehler häufen sich
- Inhalte sind nicht mehr erreichbar
- Nutzer möchte Quelle löschen

Aktionen:

- Quelle pausieren
- Quelle löschen
- importierte Rezepte deaktivieren
- Originaldaten löschen
- Importjobs stoppen

---

## 20. Transparenz in der App

Die App soll Nutzer klar informieren:

- ob ein Rezept importiert wurde
- von welcher Quelle es stammt
- wann es importiert wurde
- ob Mengen normalisiert wurden
- ob der Import simuliert oder echt war
- ob eine Quelle aktiv, pausiert oder blockiert ist

---

## 21. Browser-Prototyp

Im aktuellen Browser-Prototyp gilt:

- kein echter Webseitenabruf
- kein echtes Crawling
- keine echte robots.txt-Prüfung
- keine echte Rechteprüfung
- kein echter Parser
- nur Import-Simulation

Die Simulation darf:

- URL validieren
- Quelle anlegen
- Importlog schreiben
- Beispielrezept erzeugen
- Mengenanalyse simulieren
- Original-Link speichern

Die Simulation darf nicht behaupten:

- dass die fremde Webseite wirklich ausgelesen wurde
- dass robots.txt wirklich geprüft wurde
- dass Nutzungsbedingungen wirklich geprüft wurden
- dass echte Rezeptdaten extrahiert wurden

---

## 22. Backend-Version

Erst die spätere Backend-Version darf echte Imports durchführen.

Voraussetzungen:

- robots.txt-Checker
- HTTP-Client mit Rate Limiting
- JSON-LD Parser
- Fehlerbehandlung
- Datenbank
- Importjobs
- Quellenstatus
- Logging
- Deaktivierungsfunktion

---

## 23. Minimaler echter Import

Der erste echte Backend-Import soll nur einzelne Rezept-URLs unterstützen.

Ablauf:

```text
Nutzer gibt URL ein
→ Backend validiert URL
→ Backend prüft robots.txt
→ Backend ruft Seite ab
→ Backend sucht JSON-LD Recipe
→ Backend extrahiert Rezeptdaten
→ Backend analysiert Zutaten
→ Backend normalisiert Mengen
→ Backend speichert Rezept
→ Frontend zeigt Ergebnis
```

Noch nicht im ersten echten Import:

- komplette Website crawlen
- tägliche Importjobs
- mehrere Seiten parallel abrufen
- Bilder speichern
- Login-Bereiche
- Paywall-Inhalte

---

## 24. Manuelle Rezepte

Nutzer dürfen Rezepte manuell eintragen.

Manuelle Rezepte:

- brauchen keine externe Quelle
- brauchen keine robots.txt-Prüfung
- müssen trotzdem strukturiert gespeichert werden
- sollen ebenfalls Zutatenanalyse und Portionsskalierung nutzen
- sollen als eigene Rezepte erkennbar sein

---

## 25. Datenexport und Datenimport

Der aktuelle Prototyp kann Daten lokal exportieren und importieren.

Exportierte Daten können enthalten:

- eigene Rezepte
- Favoriten
- Einkaufsliste
- Quellen
- Importprotokoll

Regeln:

- Export muss klar als lokale Prototyp-Daten erkennbar sein
- Import darf vorhandene lokale Daten nur nach Bestätigung ersetzen
- fehlerhaftes JSON darf nicht importiert werden
- unbekannte Felder sollen ignoriert oder sicher behandelt werden

---

## 26. Grundsatz für Produktentscheidungen

Wenn unklar ist, ob ein Import erlaubt oder technisch sauber ist:

```text
nicht importieren
Quelle zur Prüfung markieren
Original-Link anzeigen
Nutzer informieren
```

Sicherheit, Fairness und Transparenz sind wichtiger als möglichst viele automatisch importierte Rezepte.
