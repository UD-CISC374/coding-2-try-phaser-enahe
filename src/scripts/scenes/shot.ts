export class Shot extends Phaser.Physics.Arcade.Sprite{
    constructor(scene) {
        var x = scene.player.x;
        var y = scene.player.y;
        console.log("Adding new beam");
        super(scene, x, y, "shot");

        scene.add.existing(this);
  
        this.play("shot_anim");
        scene.physics.world.enableBody(this);
        this.body.velocity.y += 250;
        scene.player.body.setVelocityY(-250);
        scene.projectiles.add(this);
        
    }

    update(){

        if(this.y <  32) {
            this.destroy();
        }
    }
}