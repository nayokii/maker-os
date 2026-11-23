# Ton premier boîtier en 3D

On modélise le boîtier dans un logiciel de CAO 3D, puis on l'imprime ou on le fait imprimer. Tu as plusieurs outils gratuits :

- **Tinkercad** (dans le navigateur, avec un compte gratuit) : le plus simple pour débuter. On assemble des formes de base.
- **FreeCAD** (sur ton ordinateur, gratuit) : paramétrique, donc plus précis, avec un temps d'apprentissage plus long.
- **OpenSCAD** (gratuit) : on décrit la pièce avec du **code**. Idéal si tu veux relier le boîtier aux dimensions de ta carte.

## Le fil conducteur

1. **Exporte la carte depuis KiCad** : dans l'éditeur de PCB, `Fichier → Exporter → STEP`. Ce fichier 3D contient la carte et ses composants.
2. **Importe-la** dans ton logiciel 3D comme référence. Tu modélises le boîtier autour, avec la bonne taille.
3. Crée **deux pièces** : une base et un couvercle, qui s'emboîtent.
4. Ajoute les **ouvertures** à la bonne position.
5. Exporte en **STL** pour l'imprimante.

## Imprimer

Les réglages de ton imprimante comptent : hauteur de couche, remplissage, orientation. Pour un premier essai, imprime une version simplifiée pour vérifier que la carte rentre.

## Avant de croire que ça marche

Mesure ta carte **réelle** après fabrication : elle peut différer légèrement du modèle. Ajuste le jeu si besoin, puis refais un essai.

> **Prédis.** Pourquoi vaut-il mieux imprimer d'abord un essai court avant de lancer la pièce complète ?
