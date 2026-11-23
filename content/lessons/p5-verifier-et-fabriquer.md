# Vérifier et préparer la fabrication

Avant d'envoyer quoi que ce soit, on vérifie la carte. Une erreur découverte ici ne coûte rien ; découverte après fabrication, elle coûte une carte.

## Les contrôles automatiques

- **ERC** (*Electrical Rules Check*) : dans le schéma, détecte les erreurs électriques évidentes.
- **DRC** (*Design Rules Check*) : dans le PCB, détecte les pistes trop proches, les trous trop petits, les pistes non connectées. Il doit afficher **zéro erreur** avant de continuer.

Ces contrôles ne vérifient **pas** que ton circuit est juste. Ils vérifient que ce que tu as dessiné est fabricable.

## Les contrôles humains

1. Relis le schéma contre ton calcul (valeurs de résistances, polarité des LED et de la pile).
2. Ouvre la **visionneuse 3D** de KiCad pour voir la carte et ses composants.
3. Imprime à l'échelle 1:1, pose les vrais composants dessus.
4. Vérifie la polarité : anode et cathode des LED, sens de la pile.

## Les fichiers de fabrication

Le fabricant attend des fichiers **Gerber** (une image de chaque couche) et un fichier de **perçage** (*drill*). Dans KiCad : `Fichier → Fabrication → Gerbers` puis `Générer les fichiers de perçage`. Tu les compresses en un fichier `.zip` que tu envoies sur le site du fabricant, qui affiche un aperçu à vérifier.

## Choisir un fabricant

Compare les fabricants de prototypes (délais, prix, couleurs, règles minimales). Les prix et les règles changent : consulte leur site au moment de commander, et règle KiCad sur **leurs** limites.

## Ta première commande

Ne commande pas tant que :
- ton schéma est validé par ton calcul ;
- le DRC est à zéro ;
- tu as vérifié l'impression 1:1 avec de vrais composants ;
- tu as un budget et les composants (ou leur liste précise).

> **Prédis.** Le DRC annonce « 0 erreur ». Peut-il rester une erreur dans ta carte ? Donne un exemple.
