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
2. Strukturierte Rezeptdaten, z. B. JSON-LD Recipe
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
