# Dessiner le schéma dans KiCad

**KiCad** est un logiciel de CAO électronique gratuit, qui s'installe sur ton ordinateur (kicad.org), sans compte. On va dessiner un petit projet : un **porte-clé à 2 LED**.

## Le projet

- Alimentation : 2 piles AAA en série, soit environ `3 V`.
- 2 LED rouges (`Vf ≈ 2 V`), chacune avec sa résistance.
- Courant visé : `5 mA` par LED (suffisant pour être visible, et la pile dure plus longtemps).

Calcul de la résistance : `R = (3 − 2) / 0,005 = 200 Ω`. On prend la valeur E12 au-dessus : `220 Ω`. Courant réel : `1 / 220 ≈ 4,5 mA`. Vérifie la tension directe de ta LED dans sa fiche technique.

## Les gestes dans l'éditeur de schéma

1. Crée un projet (`Fichier → Nouveau projet`) et ouvre l'**éditeur de schéma**.
2. Touche `A` : ajoute un symbole. Cherche `R` (bibliothèque `Device`), `LED` et un connecteur ou support de pile.
3. Touche `W` : trace un fil entre deux broches.
4. Touche `P` : ajoute un symbole d'alimentation (`GND`, etc.). Deux symboles de même nom sont reliés entre eux.
5. Touche `R` : fait pivoter un symbole. Touche `M` : le déplace.
6. `Outils → Annoter le schéma` : donne leur nom aux composants (R1, R2, D1, D2…).
7. `Inspection → Contrôle des règles électriques` (**ERC**) : détecte les broches non connectées ou les erreurs d'alimentation.

## Le vocabulaire

- **Symbole** : le dessin du composant dans le schéma (un rectangle, un triangle…).
- **Net** : un ensemble de broches reliées électriquement entre elles. Ce sont les nets qui deviendront des pistes.
- **Référence** : l'identifiant unique (R1, D2).

> **Prédis.** Si tu oublies de relier la masse d'une LED, que dira le contrôle ERC, et pourquoi la LED ne s'allumera-t-elle pas ?
