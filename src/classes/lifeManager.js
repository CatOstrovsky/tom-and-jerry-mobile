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

export default Life;