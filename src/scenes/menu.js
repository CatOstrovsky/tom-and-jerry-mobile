let config = {
	key: 'menu',
	active: false,
	preload: preload,
	create: create,
	update: update
},
music = null;

function preload ()
{
	this.load.image('logo', 'assets/logo.png');
	this.load.image('gameover', 'assets/gameover.png');
	this.load.image('gameovertext', 'assets/gameovertext.png');	
	this.load.bitmapFont('game', 'assets/fonts/font.png', 'assets/fonts/font.fnt');

	this.load.audio('coin', ['assets/audio/coin.mp3']);
	this.load.audio('game', ['assets/audio/game.mp3']);
	this.load.audio('jump', ['assets/audio/jump.mp3']);
	this.load.audio('menu', ['assets/audio/menu.mp3']);
	this.load.audio('over', ['assets/audio/over.mp3']);
	this.load.audio('pop',  ['assets/audio/pop.mp3']);
}

function create ()
{
	music = this.sound.add('menu');
	music.play();

	this.input.addPointer(1);

	let graphics = this.graphics = this.add.graphics();
	graphics.fillStyle(0x892015, 1).fillCircle(175, 195, 310);
	graphics.fillStyle(0xc0341c, 1).fillCircle(175, 195, 190);
	graphics.fillStyle(0xcf3e22, 1).fillCircle(175, 195, 160);
	graphics.fillStyle(0xd47e3b, 1).fillCircle(175, 195, 140);

	this.logo = this.add.image(0,0,'logo').setOrigin(.5,.5).setX(175).setY(-200).setScale(.9);
	this.playText = this.add.dynamicBitmapText(65, 500, 'game', `PRESS ENTER TO START GAME`, 22);
	this.intevalText = 0;

	this.tweens.add({
        targets: this.logo,
        y: 190,
        ease: 'Power1',
        duration: 1000,
        onComplete: () => {
        	this.tweens.add({
		        targets: this.playText,
		        y: 390,
		        ease: 'Power1',
		        duration: 300,
		        onComplete: () => {
		        	this.intevalText = setInterval(() => {
		        		this.playText.setAlpha((this.playText.alpha) ? 0 : 1);
		        	}, 700);
		        }
		    })
        }
    });

    this.keys = this.input.keyboard.addKeys('ENTER');
    this.lock = false;
}

function update() {
	if(( this.keys.ENTER.isDown || this.input.pointer1.isDown )&& !this.lock) {
		this.lock = true;

		this.playText.setAlpha(1);
		this.tweens.add({
			targets: this.logo,
			y: -300,
			duration: 500
		});
		this.tweens.add({
			targets: this.playText,
			y: 500,
			duration: 500
		});

		this.tweens.add({
			targets: this.graphics,
			scaleX: 5,
			scaleY: 5,
			x: -800,
			y: -800,
			duration: 500,
			alpha:0,
			onComplete: () => {
				this.scene.start('home');
				music.pause();
			}
		});

		
	}
}

export default config;