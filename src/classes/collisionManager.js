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

		this.life.setLife(this.life.count - 1);
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

export default CollisionManager;