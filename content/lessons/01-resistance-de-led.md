# Calculer la résistance d'une LED

Au Module 0, ton test de départ disait qu'une LED sans résistance « grille ». Voici pourquoi, et comment l'éviter.

## Pourquoi une LED a besoin d'une résistance

Une LED n'est pas un simple tuyau : une fois allumée, elle laisse passer beaucoup de courant pour très peu de tension. Elle garde à ses bornes une tension à peu près fixe, appelée **tension directe** (`Vf`). Pour une LED rouge, elle vaut environ `2 V` (voir la fiche technique de ta LED).

Si on la branche directement sur `5 V`, rien ne limite le courant : il monte, la LED chauffe, et elle est détruite. Ce n'est donc pas la tension seule qui la tue, c'est le courant qu'on n'a pas limité.

La solution : une résistance **en série** avec la LED, qui absorbe la tension en trop.

## La formule

La résistance doit absorber `Valim − Vf`. Avec la loi d'Ohm :

`R = (Valim − Vf) / I`

## Exemple pas à pas

Alimentation `5 V`, LED rouge `Vf = 2 V`, courant voulu `20 mA`.

1. Tension à absorber : `5 − 2 = 3 V`.
2. Courant en ampères : `20 mA = 0,02 A`.
3. Résistance : `R = 3 / 0,02 = 150 Ω`.

## Valeurs normalisées

On ne trouve pas toutes les valeurs en magasin. La série **E12** propose : 10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82 (puis × 10, × 100…). On arrondit **vers le haut** : un peu moins de courant, donc moins de risque.

## Vérifier la puissance

La résistance chauffe aussi : `P = R × I²`. Ici `150 × 0,02² = 0,06 W`. Une résistance classique supporte `0,25 W`, donc c'est suffisant.

## Précaution

Ces valeurs sont des ordres de grandeur. Avant de brancher une vraie LED sur une vraie carte (Arduino, ESP32), **vérifie la tension directe de ta LED et le courant maximal qu'une broche de la carte peut fournir**, dans leurs fiches techniques. Un circuit n'est jamais « sûr » sans cette vérification.

> **Prédis.** Avec une alimentation de `3,3 V` (ESP32) au lieu de `5 V`, la résistance de la LED doit-elle être plus grande ou plus petite ? Teste ta réponse avec le calculateur.
