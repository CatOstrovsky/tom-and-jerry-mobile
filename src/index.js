import home from './scenes/home.js'

let config = {
    scene: [],
    parent: 'root',
    type: Phaser.AUTO,
    width: 350,
    height: 450,
}

config.scene = [ home ];
var Game = new Phaser.Game(config);
Game.scene.start('home');