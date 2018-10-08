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


let config = {
    scene: [],
    parent: 'root',
    type: Phaser.AUTO,
    width: 350,
    height: 450,
}

config.scene = [ __WEBPACK_IMPORTED_MODULE_0__scenes_home_js__["a" /* default */] ];
var Game = new Phaser.Game(config);
Game.scene.start('home');

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
let config = {
	key: 'home',
	active: true,
	preload: preload,
	create: create,
	update: update
},
keys = null;

function preload ()
{
	this.load.atlas('basescene', 'assets/spritesheet.png', 'assets/spritesheet.json', 'images');
	this.load.bitmapFont('game', 'assets/fonts/font.png', 'assets/fonts/font.fnt');
}

function generateAnimations() {

	let frameNames = this.anims.generateFrameNames('basescene', {
		start: 0, end: 3, prefix: 'jerry/sprite_', suffix: '.png'
	});
	this.anims.create({ key: 'jerry_normal', frames: frameNames, frameRate: 9, repeat: Infinity });


	frameNames = this.anims.generateFrameNames('basescene', {
		start: 2, end: 3, prefix: 'mini/sprite_', suffix: '.png'
	});
	this.anims.create({ key: 'mini_normal', frames: frameNames, frameRate: 2, repeat: Infinity });


	frameNames = this.anims.generateFrameNames('basescene', {
		start: 2, end: 3, prefix: 'tom/sprite_', suffix: '.png'
	});
	this.anims.create({ key: 'tom_normal', frames: frameNames, frameRate: 2, repeat: Infinity });


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

}

function create ()
{
	this.foods = [];

	var graphics = this.add.graphics();
	graphics.fillStyle(0xacc6b8, 1).fillRect(0, 0, 350, 400);
	graphics.fillStyle(0x96a9ce, 1).fillRect(0, 400, 350, 50);

	generateAnimations.call(this);

	this.add.sprite(330, 400, 'basescene', 'door.png').setScale(1.4).setOrigin(1, 1);
	this.add.sprite(220, 400, 'basescene', 'box.png').setScale(1.4).setOrigin(1, 1);
	this.add.sprite(340, 430, 'basescene', 'lll.png').setScale(1.4);
	this.add.sprite(20, 235, 'basescene', 'cold.png').setScale(1.4);

	this.add.sprite(330, 60, 'basescene', 'heart.png').setScale(1.4);
	this.add.sprite(300, 60, 'basescene', 'heart.png').setScale(1.4);
	this.add.sprite(270, 60, 'basescene', 'heart.png').setScale(1.4);

	this.jerry = this.add.sprite(100, 390, 'basescene', 'jerry/sprite_1.png');
    this.jerry.anims.play('jerry_normal');

    let tom = this.add.sprite(70, 200, 'basescene', 'tom/sprite_1.png');
    tom.anims.play('tom_normal');

    let mini = this.add.sprite(0, 190, 'basescene', 'mini/sprite_1.png').setOrigin(0, .5);
    mini.anims.play('mini_normal');

    let clock = this.add.sprite(30, 30, 'basescene', 'clock/sprite_1.png').setScale(1.2);
    clock.anims.play('clock_normal');

   for (var i = 3; i >= 1; i--) {
   	addFood.call(this, i);
   }

   let score = this.add.dynamicBitmapText(280, 10, 'game', `147851`, 22).setOrigin(1, 1);

   let t = 0;
	let time = this.add.dynamicBitmapText(50, 10, 'game', `${t}`, 22).setOrigin(0, 1);
	setInterval(() => {
		t++;
		time.setText(t);
	}, 500);

	keys = this.input.keyboard.addKeys('RIGHT,LEFT');
}

function addFood(num = 1) {
	let food = this.add.sprite(parseInt(Math.random() * 250), parseInt(Math.random() *250), 'basescene', `${num}/sprite_1.png`);
    food.anims.play(`food_${num}_normal`);
    this.foods.push(food);
}

function update() {
	
	if(keys.RIGHT.isDown) {
		this.jerry.x += 5;
		this.jerry.setScale(1,1)
	} else if(keys.LEFT.isDown) {
		this.jerry.x -= 5;
		this.jerry.setScale(-1,1)
	}

	if(this.foods) {
		for(let food of this.foods){
			food.setY(food.y + 2);
			if(food.y > 450){
				food.setY(-10);
				// addFood.call(this, 3);
			}
		}
	}
}

/* harmony default export */ __webpack_exports__["a"] = (config);

/***/ })
/******/ ]);