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
