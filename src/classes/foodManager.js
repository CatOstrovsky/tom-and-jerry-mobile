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

export default Food;