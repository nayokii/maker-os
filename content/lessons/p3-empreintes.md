# Les empreintes (footprints)

Un symbole dit **quoi** est connecté. Une **empreinte** dit **où et comment** le composant se soude : position des pastilles, diamètre des trous, contour.

## Associer une empreinte

Dans l'éditeur de schéma, ouvre `Outils → Attribuer les empreintes`. Pour chaque symbole, choisis l'empreinte qui correspond au composant **réel** que tu achèteras. Quelques exemples de noms (cherche par mot-clé si ta version diffère) :

- Résistance traversante 1/4 W : `Resistor_THT` (cherche « Axial » et « 10.16mm »).
- LED 5 mm : `LED_THT` (cherche « D5.0mm »).

## Les mesures qui comptent

- **Le pas** (*pitch*) : la distance entre deux pattes. Une résistance 1/4 W a souvent 10,16 mm de pas (soit 0,4 pouce).
- **Le diamètre du trou** : il doit être plus grand que la patte, avec un jeu d'environ `0,2 à 0,3 mm`. Si le trou est trop petit, la patte n'entre pas ; trop grand, la soudure est fragile.
- **Le contour de sérigraphie** : il doit refléter la taille réelle du composant, pour ne pas en placer deux au même endroit.

## Vérifie avant de fabriquer

Une erreur d'empreinte (mauvais pas, polarité inversée) n'apparaît qu'une fois la carte reçue. Deux habitudes sauvent des cartes :

1. Mesure ton **vrai** composant au pied à coulisse ou lis sa fiche technique.
2. Imprime le PCB à l'**échelle 1:1** sur papier, puis pose les composants dessus.

> **Prédis.** Une LED 5 mm a des pattes de 0,6 mm environ. Quel diamètre de trou choisirais-tu, et pourquoi pas exactement 0,6 mm ?
