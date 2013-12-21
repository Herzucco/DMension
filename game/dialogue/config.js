define(["../game"], function(Game){
    var constants = Game.constants;
    return {
        dialogueOne : {
            delay : 3,
            text : [
                 "player | Salut, jeune joueur!",
                 "player | Alors comme ça on veut jouer à Cloud Soul?",
                 "player | Pour peindre, utilise les touches A, Z, E, R.",
                 "player | Ca te fera aller respectivement vers la gauche,",
                 "player | le haut, la droite et le bas.",
                 "player | Tu peux traverser les blocs verts verticalement.",
                 "player | Essaie de peindre en violet quand tu es dessus. //textColor :purple",
                 "player | Ah, et évite de toucher les blocs bleu ciel. //textColor:rgb(0,255,255)",
                 "player | Cette couleur est démoniaque..."
                ],
            didascalies : []
        }
    }
});