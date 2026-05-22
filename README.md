# RecipeFinder

RecipeFinder ist ein moderner Prototyp für eine intelligente Rezept-App.

Die App soll langfristig Rezepte aus ausgewählten Online-Quellen importieren, Zutaten analysieren, Mengen metrisch normalisieren, Portionen logisch skalieren und daraus eine intuitive Rezeptbibliothek mit Einkaufsliste erstellen.

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
- intuitive Benutzeroberfläche

## Aktueller Stand

Der aktuelle Stand ist ein Browser-Prototyp auf Basis von:

- HTML
- CSS
- JavaScript
- localStorage
- GitHub Pages

Die App läuft vollständig im Browser und benötigt aktuell kein Backend.

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

## Geplante Zielarchitektur

Langfristig soll RecipeFinder aus diesen Teilen bestehen:

```text
Frontend
- moderne Web-App
- Rezeptbibliothek
- Rezeptdetails
- Quellen-Manager
- Einkaufsliste
- Einstellungen

Backend
- Import-Service
- Parser-Service
- robots.txt-Prüfung
- Zutatenanalyse
- Mengen-Normalisierung
- Portionsskalierung
- Importjobs

Datenbank
- Rezepte
- Zutaten
- Quellen
- Importprotokolle
- Favoriten
- Einkaufslisten
