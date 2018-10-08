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

export default Jerry;