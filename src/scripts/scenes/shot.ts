export class Shot extends Phaser.GameObjects.Sprite{
    constructor(scene) {
        var x = scene.player.x;
        var y = scene.player.y;
        console.log("Adding new beam");
        super(scene, x, y, "shot");
        scene.projectiles.add(this);
        
    }
}