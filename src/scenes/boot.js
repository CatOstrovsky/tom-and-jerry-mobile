let config = {
	key: 'boot',
	active: true,
	preload: preload,
	create: create
},
music = null;

function preload ()
{
	this.load.image('logo', 'assets/logo.png');
	this.load.image('gameover', 'assets/gameover.png');
	this.load.image('gameovertext', 'assets/gameovertext.png');	
	this.load.bitmapFont('game', 'assets/fonts/font.png', 'assets/fonts/font.fnt');

	this.load.atlas('basescene', 'assets/spritesheet.png', 'assets/spritesheet.json', 'images');

	this.load.audio('coin', ['assets/audio/coin.mp3']);
	this.load.audio('game', ['assets/audio/game.mp3']);
	this.load.audio('jump', ['assets/audio/jump.mp3']);
	this.load.audio('menu', ['assets/audio/menu.mp3']);
	this.load.audio('over', ['assets/audio/over.mp3']);
	this.load.audio('pop',  ['assets/audio/pop.mp3']);
	this.load.audio('boom',  ['assets/audio/boom.mp3']);
}


function create() {
	generateAnimations.call(this);
	this.scene.start('menu');
}

function generateAnimations() {

	let frameNames = this.anims.generateFrameNames('basescene', {
		start: 0, end: 3, prefix: 'jerry/sprite_', suffix: '.png'
	});
	this.anims.create({ key: 'jerry_normal', frames: frameNames, frameRate: 9, repeat: Infinity });

	frameNames = this.anims.generateFrameNames('basescene', {
		start: 9, end: 9, prefix: 'jerry/sprite_', suffix: '.png'
	});
	this.anims.create({ key: 'jerry_sprint', frames: frameNames, frameRate: 9, repeat: Infinity });

	frameNames = this.anims.generateFrameNames('basescene', {
		start: 6, end: 8, prefix: 'jerry/sprite_', suffix: '.png'
	});
	this.anims.create({ key: 'jerry_fail', frames: frameNames, frameRate: 9});

	frameNames = this.anims.generateFrameNames('basescene', {
		start: 4, end: 5, prefix: 'jerry/sprite_', suffix: '.png'
	});
	this.anims.create({ key: 'jerry_collision', frames: frameNames, frameRate: 9});


	frameNames = this.anims.generateFrameNames('basescene', {
		start: 2, end: 3, prefix: 'mini/sprite_', suffix: '.png'
	});
	this.anims.create({ key: 'mini_normal', frames: frameNames, frameRate: 2, repeat: 0 });


	frameNames = this.anims.generateFrameNames('basescene', {
		start: 2, end: 3, prefix: 'tom/sprite_', suffix: '.png'
	});
	this.anims.create({ key: 'tom_normal', frames: frameNames, frameRate: 2 });


	frameNames = this.anims.generateFrameNames('basescene', {
		start: 0, end: 3, prefix: 'clock/sprite_', suffix: '.png'
	});
	this.anims.create({ key: 'clock_normal', frames: frameNames, frameRate: 9, repeat: Infinity });


	frameNames = this.anims.generateFrameNames('basescene', {
		start: 0, end: 3, prefix: '1/sprite_', suffix: '.png'
	});
	this.anims.create({ key: 'food_1_normal', frames: frameNames, frameRate: 9, repeat: Infinity });

	frameNames = this.anims.generateFrameNames('basescene', {
		start: 0, end: 3, prefix: '2/sprite_', suffix: '.png'
	});
	this.anims.create({ key: 'food_2_normal', frames: frameNames, frameRate: 9, repeat: Infinity });

	frameNames = this.anims.generateFrameNames('basescene', {
		start: 0, end: 3, prefix: '3/sprite_', suffix: '.png'
	});
	this.anims.create({ key: 'food_3_normal', frames: frameNames, frameRate: 9, repeat: Infinity });

	frameNames = this.anims.generateFrameNames('basescene', {
		start: 0, end: 3, prefix: '4/sprite_', suffix: '.png'
	});
	this.anims.create({ key: 'food_4_normal', frames: frameNames, frameRate: 9, repeat: Infinity });

	frameNames = this.anims.generateFrameNames('basescene', {
		start: 0, end: 3, prefix: '5/sprite_', suffix: '.png'
	});
	this.anims.create({ key: 'food_5_normal', frames: frameNames, frameRate: 9, repeat: Infinity });

	frameNames = this.anims.generateFrameNames('basescene', {
		start: 0, end: 3, prefix: '6/sprite_', suffix: '.png'
	});
	this.anims.create({ key: 'food_6_normal', frames: frameNames, frameRate: 9, repeat: Infinity });

}

export default config;