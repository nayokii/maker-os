# Placement et routage

Une fois les empreintes attribuées, on passe à l'**éditeur de PCB** : touche `F8` pour mettre à jour le PCB depuis le schéma. Les composants arrivent en tas, reliés par des traits fins (le **chevelu**, *ratsnest*) qui montrent les connexions à tracer.

## Le placement

1. Dessine le **contour de la carte** (couche `Edge.Cuts`). Pour notre porte-clé, quelque chose comme 40 × 20 mm.
2. Place d'abord les composants qui contraignent (support de pile, LED visibles), puis les autres.
3. Rapproche les composants qui sont reliés : des pistes courtes sont plus simples et plus fiables.

## Le routage

- Touche `X` : trace une piste. `V` : place un via (changement de couche).
- Préfère les angles à **45°** aux angles droits.
- Ne laisse jamais deux pistes différentes se toucher ou se croiser sur la même couche.

## Largeur et espacement

- **La largeur** d'une piste dépend du courant. Elle peut être petite pour un signal, plus large pour une alimentation. Le calculateur de **Circuit Designer** donne un minimum selon la norme IPC-2221.
- **L'espacement** entre pistes dépend du fabricant : chaque fabricant publie ses minimums (largeur de piste et distance minimale). **Règle toujours KiCad sur les valeurs de ton fabricant**, et prends de la marge.

## Le plan de masse

Une grande surface de cuivre reliée à la masse (`Ajouter une zone`) simplifie le routage de `GND` et protège le circuit des perturbations. Sur un petit montage à 2 LED, tu peux t'en passer.

> **Prédis.** 0,3 A dans une piste de cuivre 35 µm, sur une couche externe, avec 10 °C d'échauffement accepté : la piste doit-elle être fine ou large ? Calcule-la ensuite avec l'outil.
