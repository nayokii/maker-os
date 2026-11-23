# Dimensionner un boîtier

Un boîtier protège ton circuit et lui donne une forme d'objet. On le conçoit **autour** du PCB, donc ses dimensions viennent de celles de la carte.

## Les mesures de départ

- **Dimensions du PCB** : longueur, largeur et **hauteur composants compris** (une LED ou un support de pile dépassent de la carte).
- **Jeu** (*clearance*) : un espace autour de la carte, pour qu'elle entre sans forcer. Un jeu de `0,5 à 1 mm` est courant.
- **Paroi** : l'épaisseur du boîtier. En impression 3D, `2 mm` est une valeur de départ courante.

## Le calcul

Dimension extérieure = dimension du PCB + 2 × (jeu + paroi).

Exemple : une carte de 40 × 20 mm, un jeu de 1 mm et des parois de 2 mm donnent `40 + 2 × (1 + 2) = 46 mm` de long et `20 + 2 × 3 = 26 mm` de large.

## Les points à prévoir

- **Ouvertures** : pour une LED, un connecteur USB, un bouton. Mesure leur position sur le PCB.
- **Fixation** : des plots de vis, des clips ou une carte simplement maintenue par la forme.
- **Tolérances d'impression 3D** : une imprimante ne produit pas des dimensions parfaites. Prévois quelques dixièmes de millimètre de marge, et imprime un test.
- **Chaleur** : un composant qui chauffe ne doit pas être enfermé sans aération.

> **Prédis.** Si tu oublies le jeu autour de la carte, qu'arrive-t-il le jour où l'impression est légèrement trop petite ?
