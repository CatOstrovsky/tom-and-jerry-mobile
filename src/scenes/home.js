import LifeManager from '../classes/lifeManager.js'
import ScoreManager from '../classes/scoreManager.js'
import FoodManager from '../classes/foodManager.js'
import JerryManager from '../classes/jerryManager.js'
import CollisionManager from '../classes/collisionManager.js'
import TomManager from '../classes/tomManager.js'

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

	this.LifeManager = new LifeManager(this);
	this.ScoreManager = new ScoreManager(this);
	this.JerryManager = new JerryManager(this);
	this.FoodManager = new FoodManager(this);
	this.TomManager = new TomManager(this);
	
	this.CollisionManager = new CollisionManager(this);

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

export default config;