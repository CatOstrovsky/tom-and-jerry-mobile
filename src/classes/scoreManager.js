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
   	this.scoreObject = this.ctx.add.dynamicBitmapText(10, 40, 'game', `0`, 20).setOrigin(0, 0);

    this.clock.anims.play('clock_normal');

		this.objectTime = this.ctx.add.dynamicBitmapText(40, 25, 'game', `${this.time}`, 20).setOrigin(0, 1);

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

export default Score;
