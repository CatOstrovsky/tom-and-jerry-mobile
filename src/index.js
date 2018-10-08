import home from './scenes/home.js'
import menu from './scenes/menu.js'
import boot from './scenes/boot.js'

let config = {
    scene: [],
    parent: 'root',
    type: Phaser.AUTO,
    width: 350,
    height: 450,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            // debug: true
        }
    }
}

config.scene = [ boot, menu, home ];
var Game = new Phaser.Game(config);
Game.scene.start('boot');