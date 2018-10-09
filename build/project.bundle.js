/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scenes_home_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scenes_menu_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scenes_boot_js__ = __webpack_require__(9);




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

config.scene = [ __WEBPACK_IMPORTED_MODULE_2__scenes_boot_js__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__scenes_menu_js__["a" /* default */], __WEBPACK_IMPORTED_MODULE_0__scenes_home_js__["a" /* default */] ];
var Game = new Phaser.Game(config);
Game.scene.start('boot');

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classes_lifeManager_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__classes_scoreManager_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__classes_foodManager_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__classes_jerryManager_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__classes_collisionManager_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__classes_tomManager_js__ = __webpack_require__(7);







let config = {
	key: 'home',
	active: false,
	preload: preload,
	create: create,
	update: update
},
tomTimer = 0,
overed = false,
graphics = null;

function preload ()
{
	
}

function drawScene() {


	graphics = this.add.graphics();
	graphics.fillStyle(0xacc6b8, 1).fillRect(0, -550, 350, 950);
	graphics.fillStyle(0x96a9ce, 1).fillRect(0, 400, 350, 50);
	graphics.fillStyle(0x96a9ce, 1).fillRect(0, 450, 350, 550);

	graphics.setAlpha(0);

	this.tweens.add({
		targets: graphics,
		alpha: 1,
		duration: 300
	})

	this.add.sprite(330, 400, 'basescene', 'door.png').setScale(1.4).setOrigin(1, 1);
	this.add.sprite(220, 400, 'basescene', 'box.png').setScale(1.4).setOrigin(1, 1);
	this.add.sprite(340, 430, 'basescene', 'lll.png').setScale(1.4);
	this.add.sprite(20, 235, 'basescene', 'cold.png').setScale(1.4);

}

function startGame() {
	this.FoodManager.addFood();
	tomTimer = setInterval(() => {
		if(Math.random() > .5)
			this.TomManager.addBomb();
	}, 6000);
}

function gameOver() {
	clearTimeout(tomTimer);
	this.FoodManager.destroy();
	this.CollisionManager.destroy();
	this.ScoreManager.destroy();
	overed = true;

	this.audio.over.play();
	this.audio.game.pause();

	this.tweens.add({
		targets: this.cameras.main,
		scrollY: 550,
		duration: 1000,
		onComplete: () => {
			setTimeout(() => {

				let over = this.add.image(350, 1000, 'gameover').setOrigin(1, 1).setScale(0,0);
				this.tweens.add({
					targets: over,
					scaleX: 1,
					scaleY:1,
					duration: 200
				});

				let gameovertext = this.add.image(175, 550, 'gameovertext').setOrigin(.5, 0);

				let scroretext = this.add.text(175, 730, 'YOU SCORE 0', { fontFamily: 'Arial', fontSize: 22, color: '#ffffff' })
				.setOrigin(.5,.5)
				.setStroke('#000000', 4);
				let currentScore = 0;
				let needScore = this.ScoreManager.score;

				let intervalScore = setInterval(() => {
					if(currentScore < needScore) {
						currentScore++;
						scroretext.setText(`YOU SCORE ${currentScore}`);
						this.audio.pop.play();
					}else{
						clearInterval(intervalScore);

						setTimeout(() => {
							this.tweens.add({
								targets: [over, scroretext, graphics, gameovertext],
								alpha: 0,
								duration: 1000,
								onComplete: () => {
									this.scene.start('menu');
								}
							})
						}, 2000);
					}
				}, 4);

			}, 1000);
		}
	});

}

function create ()
{
	overed = false;
	
	this.audio = {
		coin:this.sound.add('coin'),
		game:this.sound.add('game'),
		jump:this.sound.add('jump'),
		over:this.sound.add('over'),
		pop:this.sound.add('pop'),
		boom:this.sound.add('boom')
	};

	this.audio.game.loop = true;
	this.audio.game.play();

	this.cameras.main.scrollY = -550;
	this.tweens.add({
		targets: this.cameras.main,
		scrollY: 0,
		duration: 1000,
		onComplete: () => {
			this.played = true;
			startGame.call(this);
		}
	});
	this.gameOver = gameOver;

	drawScene.call(this);

	this.LifeManager = new __WEBPACK_IMPORTED_MODULE_0__classes_lifeManager_js__["a" /* default */](this);
	this.ScoreManager = new __WEBPACK_IMPORTED_MODULE_1__classes_scoreManager_js__["a" /* default */](this);
	this.JerryManager = new __WEBPACK_IMPORTED_MODULE_3__classes_jerryManager_js__["a" /* default */](this);
	this.FoodManager = new __WEBPACK_IMPORTED_MODULE_2__classes_foodManager_js__["a" /* default */](this);
	this.TomManager = new __WEBPACK_IMPORTED_MODULE_5__classes_tomManager_js__["a" /* default */](this);
	
	this.CollisionManager = new __WEBPACK_IMPORTED_MODULE_4__classes_collisionManager_js__["a" /* default */](this);

	this.played = false;

}

function update() {
	if(!overed){

		this.JerryManager.update();
		this.TomManager.update();
		this.LifeManager.update();
		this.ScoreManager.update();
		this.FoodManager.update();

		this.CollisionManager.update();
	}

}

/* harmony default export */ __webpack_exports__["a"] = (config);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Life {
	constructor(ctx) {
		this.ctx = ctx;
		this.count = 3;
		this.lifes = [];
		this.drawLife();
	}

	drawLife() {
		let x  = 335;
		for (var i = 0; i <= 6; i++) {
			let life = this.ctx.add.sprite(x, 20, 'basescene', 'heart.png').setScale(1.4);
			x -= 30;
			
			if(i > this.count-1) life.alpha = 0;

			this.lifes.push(life);

		}
	}

	setLife(count = 3) {
		
		if(count == 0) this.ctx.gameOver();

		this.count = count;
		for(let key in this.lifes) {
			let life = this.lifes[key];
			life.alpha = 1;
			if(key > this.count-1) {
				life.alpha = 0;
			}
		}
	}

	update() {
		
	}
}

/* harmony default export */ __webpack_exports__["a"] = (Life);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Score {
	constructor(ctx) {
		this.ctx = ctx;
		this.scoreObject = null;
		this.score = 0;
		this.clock = null;
		this.time = 0;
		this.objectTime = null;
		this.timer = 0;
		this.drawScore();
	}

	drawScore() {
		this.clock = this.ctx.add.sprite(20, 20, 'basescene', 'clock/sprite_1.png').setScale(1);
   		this.scoreObject = this.ctx.add.dynamicBitmapText(10, 40, 'game', `0`, 20).setOrigin(1, 1);

    	this.clock.anims.play('clock_normal');

		this.objectTime = this.ctx.add.dynamicBitmapText(35, 5, 'game', `${this.time}`, 20).setOrigin(0, 1);
		
		this.timer = setInterval(() => {
			this.time++;
			this.objectTime.setText(this.time);
		}, 1000);
	}

	addScore() {
		this.score += parseInt(this.time / 5);
		this.scoreObject.setText(this.score);
	}

	destroy() {
		clearInterval(this.timer);
	}

	update() {
	}
}

/* harmony default export */ __webpack_exports__["a"] = (Score);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Food {
	constructor(ctx) {
		this.ctx = ctx;
		this.foods = null;
		this.mini = null;
		this.locked = false;
		
		this.drawFood();
	}

	drawFood() {
	   	this.mini = this.ctx.add.sprite(0, 190, 'basescene', 'mini/sprite_1.png').setOrigin(0, .5).setAlpha(0);
	    this.foods = this.ctx.physics.add.group({collideWorldBounds: false});

	    for (var i = 12; i >= 1; i--){
	    	let item = this.ctx.physics.add.sprite(100, -100, 'basescene', `1/sprite_1.png`);
	    	this.foods.add(item);
	    }

	    this.foods.clear(true, true);
	}

	addFood() {
		return new Promise((resolve,reject) => {

			if(this.locked){
				resolve();
				return;
			}

			this.locked = true;

			this.mini.setAlpha(1);
			this.mini.anims.play('mini_normal');

			setTimeout(() => {
				let food = this.foods.getFirstDead(true, 35, 190);
				food.setVelocityX(0).setVelocityY(0).setVisible(1).setActive(1);
				
				let itemId = Math.ceil(Math.random() * 6);
				food.anims.play(`food_${itemId}_normal`);

			    this.ctx.tweens.add({
			        targets: food,
			        x: 80,
			        y: 160,
			        ease: 'Power1',
			        duration: 450
			    });

			    setTimeout(() => { 
			    	this.locked = false; 
				}, 300);
			    
			    resolve(food);

			}, 200);
		})
		
	}

	destroy() {
		this.foods.clear(true, true);
	}

	update() {	
		
	}
}

/* harmony default export */ __webpack_exports__["a"] = (Food);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Jerry {
	constructor(ctx) {
		this.ctx = ctx;
		this.state = 0;
		this.stepsState = [ {x: 70, y: 390}, {x: 160, y: 390}, {x: 250, y: 390}  ];
		this.locked = false;

	    this.keys = this.ctx.input.keyboard.addKeys('RIGHT,LEFT');
	    this.ctx.input.addPointer(1);

	    this.drawJerry();
	}

	drawJerry() {
		this.jerry = this.ctx.physics.add.sprite(70, 390, 'basescene', 'jerry/sprite_1.png');
		this.jerry.setMaxVelocity(0,0);

		this.jerry.on('animationcomplete', (animationName) => {
			if(animationName.key == "jerry_collision") {
				this.jerry.anims.play('jerry_normal');
			}
		});
	    this.jerry.anims.play('jerry_normal');
	}

	moveJerry(x = 70) {
		this.jerry.anims.play('jerry_sprint');
		return new Promise((resolve, reject) => {
			this.ctx.tweens.add({
		        targets: this.jerry,
		        x: x,
		        ease: 'Power1',
		        duration: 250,
		        onComplete: () => { this.jerry.anims.play('jerry_normal'); resolve() }
		    });
		})
	}

	lockTo(time = 200) {
		this.locked = true;
		setTimeout(() => {
			this.locked = false;
		}, time);
	}

	update() {
		if(this.keys.RIGHT.isDown || (this.ctx.input.pointer1.isDown && this.ctx.input.pointer1.x > 175)) {
			if(this.state < 2 && !this.locked) {
				this.state++;
				this.locked = true;
				this.moveJerry(this.stepsState[this.state].x).then(() => {
					this.locked = false;
				});
			}
		} else if(this.keys.LEFT.isDown || (this.ctx.input.pointer1.isDown && this.ctx.input.pointer1.x < 175)) {
			if(this.state > 0 && !this.locked) {
				this.state--;
				this.locked = true;
				this.moveJerry(this.stepsState[this.state].x).then(() => {
					this.locked = false;
					this.jerry.anims.play('jerry_collision');
				});
			}
		}
		
	}
}

/* harmony default export */ __webpack_exports__["a"] = (Jerry);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class CollisionManager {
	constructor(ctx) {
		this.ctx = ctx;

		this.jerry = this.ctx.JerryManager.jerry;
		this.foods = this.ctx.FoodManager.foods;
		this.bombs = this.ctx.TomManager.bombs;
		this.life = this.ctx.LifeManager;

		this.ctx.physics.add.collider(this.jerry, this.foods, (jerry, food) => this.collider(jerry, food));
		this.collisionBomb = this.ctx.physics.add.collider(this.jerry, this.bombs, (jerry, bomb) => this.colliderBomb(jerry, bomb));
	
		this.levelManager = setInterval(() => {
			this.checkFood();
		}, 5000);
	}

	checkFood() {

		// LEVEL MANAGER
		if(this.foods.countActive(1) < this.ctx.ScoreManager.time / 50 
			&& this.foods.countActive(1) < 6
			&& this.ctx.played)
			this.ctx.FoodManager.addFood().then(() => this.collisionBomb.update());
	}

	colliderBomb(jerry, bomb) {
		jerry.anims.play('jerry_fail');
		bomb.destroy();
		this.ctx.JerryManager.lockTo(500);

		this.ctx.cameras.main.shake(250)
		this.ctx.audio.boom.play();
	}

	collider(jerry, food) {
		if(food.x < 100){
			food.setVelocityX(39);
			food.setVelocityY(-250);
		}else if(food.x < 200){
			food.setVelocityX(40);
			food.setVelocityY(-210);
		}else {
			food.setVelocityX(70);
			food.setVelocityY(-150);
		}
		if(!this.ctx.JerryManager.locked){
			jerry.setY(390);
			this.ctx.audio.jump.play();
			jerry.anims.play('jerry_collision');
		}
	}

	destroy() {
		clearInterval(this.levelManager);
	}

	update() {	
		if(this.foods) {

			for(let food of this.foods.getChildren()){
				if(food.active) {
					
					if(food.x > 350) {

						this.foods.killAndHide(food);
						
						if(this.life.count > 0)
							this.ctx.FoodManager.addFood().then(() => this.collisionBomb.update());
						
						this.ctx.ScoreManager.addScore();

						this.ctx.audio.coin.play();
						
					}
					if(food.y > 450 && food.x < 350) {
						this.life.setLife(this.life.count - 1);

						this.foods.killAndHide(food);
						if(this.life.count > 0)
							this.ctx.FoodManager.addFood().then(() => this.collisionBomb.update());

						this.jerry.anims.play('jerry_fail');
						this.ctx.JerryManager.lockTo(500);

						this.ctx.audio.pop.play();
					}
				}
			}
		}
	}
}

/* harmony default export */ __webpack_exports__["a"] = (CollisionManager);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Tom {
	constructor(ctx) {
		this.ctx = ctx;
		this.tom = null;
		this.bombs = this.ctx.physics.add.group({collideWorldBounds: false});;
		this.drawTom();
	}

	drawTom() {
		this.tom = this.ctx.add.sprite(75, 200, 'basescene', 'tom/sprite_1.png').setAlpha(0);
		this.tom.on('animationcomplete', (animationName) => {
			if(animationName.key == "tom_normal") {
				this.tom.setAlpha(0);
			}
		});
	}

	addBomb() {
		this.tom.setAlpha(1);
		this.tom.anims.play('tom_normal');
		setTimeout(() => {
			let bomb = this.ctx.physics.add.sprite(90, 185, 'basescene', `bomb/sprite_1.png`).setMass(.4);
			this.bombs.add(bomb);
		}, 450);

	}

	update() {
		
	}
}

/* harmony default export */ __webpack_exports__["a"] = (Tom);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = (config);

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = (config);

/***/ })
/******/ ]);