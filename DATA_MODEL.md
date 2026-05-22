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
