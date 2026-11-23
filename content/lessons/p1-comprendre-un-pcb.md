# Comprendre un PCB

Un PCB (*Printed Circuit Board*, circuit imprimé) est la plaque qui remplace les fils d'une platine d'essai. Les composants y sont soudés, et des **pistes** de cuivre les relient.

## De quoi est fait un PCB

- **Le substrat** : une plaque isolante (souvent FR-4, un composite verre-époxy) qui sert de support.
- **Le cuivre** : une ou plusieurs couches gravées en pistes et en surfaces. Un PCB « 2 couches » a du cuivre dessus et dessous.
- **Le vernis épargne** (*solder mask*) : la couche verte (ou autre couleur) qui protège le cuivre et laisse apparaître seulement les zones à souder.
- **La sérigraphie** (*silkscreen*) : les textes et contours imprimés (références, polarité).
- **Les pastilles** (*pads*) : les zones de cuivre où l'on soude une patte.
- **Les vias** : de petits trous métallisés qui font passer une piste d'une couche à l'autre.

## Les deux familles de composants

- **Traversants** (*THT*) : leurs pattes passent dans des trous. Faciles à souder à la main : c'est le bon choix pour débuter.
- **CMS** (*SMD*) : montés en surface, sans trou. Plus petits, plus durs à souder à la main.

## Le chemin complet

1. **Schéma** : on dessine les connexions électriques (sans se soucier de la position).
2. **Empreintes** : on associe à chaque symbole la forme réelle des pattes.
3. **Placement** : on positionne les composants sur la carte.
4. **Routage** : on trace les pistes.
5. **Vérifications**, puis **fichiers de fabrication**.

## Les unités

En PCB, on mélange le millimètre et le **mil** (un millième de pouce) : `1 mil = 0,0254 mm`. Beaucoup de règles de fabrication sont données en mil.

> **Prédis.** Selon toi, pourquoi dessine-t-on d'abord le schéma avant de placer les composants ? Qu'est-ce qui se passerait si on traçait directement les pistes ?
