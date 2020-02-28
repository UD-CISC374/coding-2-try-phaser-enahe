import ExampleObject from '../objects/exampleObject';

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
  background: Phaser.GameObjects.TileSprite;
  player: Phaser.GameObjects.Sprite;
  turret: Phaser.GameObjects.Sprite;
  drone: Phaser.GameObjects.Sprite;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.background = this.add.tileSprite(0,0, 400, 400, "background");
    this.background.setOrigin(0,0);

    this.player = this.add.sprite(400/2 - 50, 400/2, "player");
    this.turret = this.add.sprite(400/2, 400/2, "turret");
    this.drone = this.add.sprite(400/2 + 50, 400/2, "drone");

    this.anims.create({
      key: "player_anim",
      frames: this.anims.generateFrameNumbers("player", { start: 8, end: 11}),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "turret_anim",
      frames: this.anims.generateFrameNumbers("turret", {start: 0, end : 5}),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "drone_anim",
      frames: this.anims.generateFrameNumbers("drone", { start: 0, end: 4}),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "explode",
      frames: this.anims.generateFrameNumbers("explosion", { start: 0, end: 5}),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true
    });

    this.player.play("player_anim");
    this.turret.play("turret_anim");
    this.drone.play("drone_anim");

    this.player.setInteractive();
    this.turret.setInteractive();
    this.drone.setInteractive();

    this.input.on("gameobjectdown", this.destroyShip, this);

    
  }

  moveShip(ship,speed) {
    ship.y += speed; 
    if (ship.y > 400) {
      this.resetShipPos(ship);
    }
  }

  resetShipPos(ship) {
    ship.y = 0;
    var randomX = Phaser.Math.Between(0, 400);
    ship.x = randomX; 
  }

  destroyShip(pointer, gameObject) {
    gameObject.setTexture("explosion");
    gameObject.play("explode");
  }

  update() {
    this.moveShip(this.player, 2);
    this.moveShip(this.turret, 3);
    this.moveShip(this.drone, 4);
    this.background.tilePositionY -= 0.5;
  }
}
