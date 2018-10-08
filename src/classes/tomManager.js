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

export default Tom;