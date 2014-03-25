define(["../game"], function(Game){
    var constants = Game.constants;
    return {
        images : {
            'menuBG' : 'assets/menu/MENU_bg.jpg',  
            'simpleAventure' : 'assets/menu/MENU_adventure_idle.png',
            'hoverAventure' : 'assets/menu/MENU_adventure_hover.png',
            'simpleMusic' : 'assets/menu/MENU_musicrun_idle.png',
            'hoverMusic' : 'assets/menu/MENU_musicrun_hover.png',
            'simpleSettings' : 'assets/menu/MENU_settings_idle.png',
            'hoverSettings' : 'assets/menu/MENU_settings_hover.png',
            'level1' : 'assets/Cloud_Soul_Level_1_Spritesheet.png',
            'level1BG' : 'assets/Cloud_Soul_Level1_BG.jpg',
            'level1Builder' : 'Level 1.png',
            'level2' : 'assets/spritesheet_anim_level2.png',
            'level2Builder' : 'assets/Level 2.png',
            'level2BG' : 'assets/level2_bg.png',
            'level3' : 'assets/level-3.png',
            'level3Builder' : 'assets/Level 3.png',
            'paintPot' : 'assets/props/pot_de_peinture_grand.png',
            'totemIdle' : 'assets/totem_checkpoint_idle0.png',
            'gaugeLeft' : 'assets/hud_paintgauge_left.png',
            'gaugeRight' : 'assets/hud_paintgauge_right.png',
            'gaugeUp' : 'assets/hud_paintgauge_up.png',
            'gaugeDown' : 'assets/hud_paintgauge_down.png',
        },
    }
});