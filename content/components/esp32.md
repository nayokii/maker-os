## Description

L'ESP32 est un microcontrôleur avec Wi-Fi et Bluetooth intégrés. On l'utilise sur une carte de développement (DevKit), qui ajoute la prise USB et le régulateur de tension.

## Fonctionnement

Il se programme en C++ avec les mêmes outils qu'Arduino. Sa logique fonctionne en **3,3 V** : ses broches ne supportent pas du 5 V. Plus puissant que l'Uno, il permet de créer des objets connectés (serveur web, capteurs envoyant leurs mesures).

## Exemples d'utilisation

- Afficher la température d'un capteur sur une page web.
- Envoyer des mesures vers Internet.
