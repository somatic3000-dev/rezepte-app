# INGREDIENT_LOGIC.md

# RecipeFinder – Zutaten- und Mengenlogik

## 1. Ziel

Dieses Dokument beschreibt, wie RecipeFinder Zutaten erkennen, strukturieren, normalisieren, metrisch anzeigen und logisch skalieren soll.

Die App soll nicht nur Text anzeigen, sondern Zutaten fachlich verstehen.

Beispiel:

```text
250 g gehackte Tomaten
```

soll intern werden zu:

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

---

## 2. Grundstruktur einer Zutat

Jede Zutat soll diese Felder haben:

| Feld | Bedeutung |
|---|---|
| original_text | ursprüngliche Zutatenzeile |
| amount | erkannte Menge |
| unit | erkannte Einheit |
| food | erkanntes Lebensmittel |
| normalized_food | vereinheitlichtes Lebensmittel |
| preparation | Zubereitungsform |
| note | Zusatzinfo |
| scalable | darf automatisch skaliert werden |
| scaling_group | Skalierungsverhalten |
| conversion_note | Hinweis zur Umrechnung |

---

## 3. Unterstützte Einheiten

Standardmäßig unterstützt die App:

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

Zusätzlich sollen später erkannt werden:

```text
cup
cups
oz
lb
pint
quart
```

Nicht-metrische Einheiten sollen nach Möglichkeit in metrische Einheiten umgerechnet werden.

---

## 4. Mengenformate

Die App soll folgende Mengen erkennen:

```text
200 g Pasta
1 EL Olivenöl
1,5 kg Kartoffeln
0,5 TL Salz
1/2 TL Pfeffer
2 Dosen Tomaten
1 Stück Zwiebel
Salz nach Geschmack
```

Erkennung:

| Text | Menge | Einheit | Lebensmittel |
|---|---:|---|---|
| 200 g Pasta | 200 | g | Pasta |
| 1 EL Olivenöl | 1 | EL | Olivenöl |
| 1,5 kg Kartoffeln | 1.5 | kg | Kartoffeln |
| 1/2 TL Pfeffer | 0.5 | TL | Pfeffer |
| Salz nach Geschmack | null |  | Salz |

---

## 5. Metrische Normalisierung

Die App verwendet metrische Mengen als Standard.

Beispiele:

| Original | Normalisiert |
|---|---|
| 1000 g Kartoffeln | 1 kg Kartoffeln |
| 1500 g Tomaten | 1,5 kg Tomaten |
| 1000 ml Brühe | 1 l Brühe |
| 3 TL Öl | 1 EL Öl |
| 1 cup Wasser | 240 ml Wasser |
| 1 cup Mehl | 120 g Mehl |
| 1 cup Zucker | 200 g Zucker |
| 1 oz Butter | 28 g Butter |

Wichtig:

```text
1 cup Wasser ist nicht dasselbe wie 1 cup Mehl.
```

Umrechnungen müssen lebensmittelabhängig sein.

---

## 6. Lebensmittel-Normalisierung

Unterschiedliche Begriffe sollen vereinheitlicht werden.

| Original | Normalisiert |
|---|---|
| Pasta | Nudeln |
| Spaghetti | Nudeln |
| Nudeln | Nudeln |
| Tomate | Tomaten |
| Paradeiser | Tomaten |
| gehackte Tomaten | Tomaten |
| Mehl | Weizenmehl |
| Huhn | Hähnchen |
| Knoblauchzehe | Knoblauch |

Ziel:

- bessere Suche
- bessere Filter
- bessere Einkaufsliste
- bessere Duplikaterkennung

---

## 7. Zubereitungsformen

Die App soll einfache Zubereitungsformen erkennen.

Beispiele:

| Text | Zubereitung |
|---|---|
| gehackte Tomaten | gehackt |
| geriebener Käse | gerieben |
| gewürfelte Zwiebeln | gewürfelt |
| geschnittene Paprika | geschnitten |
| frischer Basilikum | frisch |

Die Zubereitung soll getrennt vom Lebensmittel gespeichert werden.

Beispiel:

```text
gehackte Tomaten
```

wird:

```json
{
  "food": "Tomaten",
  "preparation": "gehackt"
}
```

---

## 8. Skalierungsgruppen

Nicht jede Zutat darf gleich skaliert werden.

| Gruppe | Verhalten |
|---|---|
| normal | proportional skalieren |
| spice | vorsichtig skalieren oder fix lassen |
| qualitative | nicht skalieren |
| cooking_medium | nicht skalieren |
| container | nicht automatisch skalieren |
| garnish | nicht oder vorsichtig skalieren |

---

## 9. Normal skalierbare Zutaten

Diese Zutaten werden proportional skaliert:

```text
Pasta
Reis
Kartoffeln
Tomaten
Gemüse
Mehl
Zucker
Milch
Wasser als Rezeptbestandteil
Kokosmilch
Brühe
Eier
Dosen
Packungen
```

Beispiel:

```text
2 Portionen → 4 Portionen
200 g Pasta → 400 g Pasta
1 Dose Tomaten → 2 Dosen Tomaten
```

---

## 10. Nicht automatisch skalierbare Zutaten

Diese Angaben bleiben unverändert oder werden nur sehr vorsichtig behandelt:

```text
Salz nach Geschmack
Pfeffer nach Geschmack
Öl zum Anbraten
Wasser zum Kochen
Basilikum zum Garnieren
1 Prise Salz
1 Backform
Butter für die Form
```

Beispiel:

```text
2 Portionen → 4 Portionen
Salz nach Geschmack → Salz nach Geschmack
Öl zum Anbraten → Öl zum Anbraten
```

---

## 11. Gewürze

Gewürze sollen vorsichtig skaliert werden.

Beispiele:

| Original | Ziel | Anzeige |
|---|---:|---|
| 1 TL Curry | 2x | 2 TL Curry |
| 1 Prise Salz | 2x | 1 Prise Salz oder nach Geschmack |
| Pfeffer nach Geschmack | 2x | Pfeffer nach Geschmack |

Regel:

- konkrete Gewürzmengen können skaliert werden
- qualitative Gewürze bleiben fix
- Prisen bleiben meist fix

---

## 12. Rundungsregeln

Skalierte Mengen sollen lesbar bleiben.

| Rechenwert | Anzeige |
|---:|---|
| 333.333 g | 335 g |
| 666.666 g | 665 g oder 670 g |
| 1000 g | 1 kg |
| 1500 g | 1,5 kg |
| 1000 ml | 1 l |
| 2.5 EL | 2 1/2 EL |
| 0.5 TL | 1/2 TL |

---

## 13. Einheitenschwellen

Die App soll Einheiten sinnvoll umwandeln.

| Wert | Anzeige |
|---|---|
| 1000 g | 1 kg |
| 1000 ml | 1 l |
| 3 TL | 1 EL |
| 6 TL | 2 EL |

Nicht jede Einheit soll automatisch geändert werden.

Beispiele:

```text
2 Dosen Tomaten bleibt 2 Dosen Tomaten
2 Stück Eier bleibt 2 Stück Eier
```

---

## 14. Einkaufsliste

Die Einkaufsliste soll gleiche Zutaten zusammenfassen.

Beispiel:

```text
Rezept A: 200 g Tomaten
Rezept B: 300 g Tomaten
```

wird:

```text
500 g Tomaten
```

Zusammenfassen nur, wenn:

- Lebensmittel gleich normalisiert wurde
- Einheit gleich ist
- Mengen sinnvoll addierbar sind
- keine widersprüchliche Notiz vorhanden ist

Nicht blind zusammenfassen:

```text
1 Dose Tomaten
300 g Tomaten
```

Diese sollen getrennt bleiben, wenn keine sichere Umrechnung bekannt ist.

---

## 15. Originaldaten erhalten

Die App darf Originaldaten niemals verlieren.

Beispiel:

```json
{
  "original_text": "1 cup flour",
  "amount": 120,
  "unit": "g",
  "food": "Mehl",
  "conversion_note": "cup Mehl wurde mit 120 g pro cup umgerechnet"
}
```

Warum:

- bessere Nachvollziehbarkeit
- Fehlerkorrektur möglich
- spätere Parser-Verbesserung möglich
- Vergleich mit Originalquelle möglich

---

## 16. Fehlerhafte oder unklare Zutaten

Wenn eine Zutat nicht sicher erkannt wird, soll die App sie trotzdem speichern.

Beispiel:

```text
eine Handvoll Kräuter
```

wird:

```json
{
  "original_text": "eine Handvoll Kräuter",
  "amount": null,
  "unit": "",
  "food": "Kräuter",
  "note": "unklare Menge",
  "scalable": false
}
```

Regel:

```text
Lieber sicher unskaliert speichern als falsch skalieren.
```

---

## 17. Akzeptanzkriterien

Die Zutatenlogik gilt als verbessert, wenn:

- Mengen mit Komma erkannt werden
- Brüche erkannt werden
- g, kg, ml, l, TL, EL erkannt werden
- einfache Synonyme erkannt werden
- Zubereitungsformen erkannt werden
- nach Geschmack nicht skaliert wird
- Öl zum Anbraten nicht skaliert wird
- Prisen nicht blind skaliert werden
- 1000 g zu 1 kg wird
- 1000 ml zu 1 l wird
- 3 TL zu 1 EL wird
- Einkaufsliste gleiche Zutaten addiert
- Originaltext erhalten bleibt
