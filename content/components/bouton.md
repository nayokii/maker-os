## Description

Le bouton poussoir (tactile) ferme un circuit tant qu'on appuie dessus. C'est l'entrée la plus simple pour interagir avec un microcontrôleur.

## Fonctionnement

Les modèles à 4 pattes ont leurs contacts reliés par paires : appuyer relie les deux côtés. Sur une entrée de microcontrôleur, on ajoute une résistance de **pull-up** ou de **pull-down** pour que l'entrée ne « flotte » pas quand le bouton est relâché. Au moment du contact, le signal rebondit quelques millisecondes : c'est le **rebond** (*bounce*), à filtrer par le code ou par un composant.

## Exemples d'utilisation

- Allumer ou éteindre une LED.
- Changer de mode dans un programme.
