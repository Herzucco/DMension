define(["../game"], function(Game){
    var constants = Game.constants;
    return {
        dialogueOne : {
            delay : 3,
            text : [
                 "speaker | Salut!",
                 "speaker | Bienvenue dans Cloud Soul!",
                 "speaker | Tu ne peux pas bouger?",
                 "speaker | Essaie de peindre avec ta souris!",
                 "speaker | Utilise Z, Q, S, D pour choisir la direction.",
                 "speaker | Dans l'ordre, tu te déplacera vers le haut,",
                 "speaker | la gauche, le bas et la droite.",
                 "speaker | Va à droite pour continuer!"
                ],
            didascalies : []
        },
        dialogueTwo : {
            delay : 3,
            text : [
                 "speaker | Tu vois ce bloc vert là haut?",
                 "speaker | Essaie de le percuter assez vite.",
                 "speaker | Ca devrait être intéressant."
                ],
            didascalies : []
        },
        dialogueThree : {
            delay : 3,
            text : [
                 "speaker | Attention!",
                 "speaker | Ne touche pas ce bloc bleu ciel!"
                ],
            didascalies : []
        },
        dialogueFour : {
            delay : 3,
            text : [
                 "speaker | Tiens, un autre bloc vert.",
                 "speaker | Tu sais que tu peux le traverser dans les deux sens?",
                 "speaker | Un indice : utilise une de tes peintures pour",
                 "speaker | 'forcer' le passage à travers."
                ],
            didascalies : []
        },
        dialogueFive : {
            delay : 3,
            text : [
                 "speaker | Qu'est ce que...?",
                 "speaker | Tu sais ce que c'est que ça?",
                 "speaker | Ca ne m'a pas l'air dangereux.",
                 "speaker | Essaie de le toucher?"
                ],
            didascalies : []
        },
        dialogueSix : {
            delay : 3,
            text : [
                 "speaker | Wooooooow!",
                 "speaker | On dirait que tu retrouves la mémoire!",
                 "speaker | Mais c'est un cul-de-sac.",
                 "speaker | Attends... Appuie sur X et peint le mur de droite?"
                ],
            didascalies : []
        },
        dialogueSeven : {
            delay : 3,
            text : [
                 "speaker | C'est génial! Tu as traversé le mur!",
                 "speaker | Il y a sûrement d'autres souvenirs par ici!",
                 "speaker | Et pense à vérifier les murs suspects.",
                 "speaker | Ca ne doit pas être le seul mur comme ça."
                ],
            didascalies : []
        },
        dialogueEight : {
            delay : 3,
            text : [
                 "speaker | Ca ressemble à une sortie!",
                 "speaker | Bon, on a plus qu'à attendre le jeu complet.",
                 "speaker | On va pouvoir discuter pendant des mois!",
                 "speaker | C'est super non?... Non?"
                ],
            didascalies : []
        }

    }
});