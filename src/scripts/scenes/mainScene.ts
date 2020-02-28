import ExampleObject from '../objects/exampleObject';

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
  background: Phaser.GameObjects.TileSprite;
  player: Phaser.Physics.Arcade.Sprite;
  turret: Phaser.GameObjects.Sprite;
  drone: Phaser.GameObjects.Sprite;
  powerUps: Phaser.Physics.Arcade.Group;
  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  spacebar: Phaser.Input.Keyboard.Key;


  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.background = this.add.tileSprite(0,0, 400, 400, "background");
    this.background.setOrigin(0,0);

    this.player = this.physics.add.sprite(400/2 - 8, 400 - 64, "player");
    this.turret = this.add.sprite(400/2, 400/2, "turret");
    this.drone = this.add.sprite(400/2 + 50, 400/2, "drone");
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.player.setCollideWorldBounds(true);

    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.powerUps = this.physics.add.group();

    let maxObjects : number = 4;
    for (let i : number = 0; i <= maxObjects; i++){
      if (Math.random() >= 0.5) {
        let powerUp = this.physics.add.sprite(57, 58, "machinegun");
        this.powerUps.add(powerUp);
        powerUp.setRandomPosition(0,0, 400, 400);
        powerUp.play("machinegun");
        powerUp.setVelocity(100, 100);
        powerUp.setCollideWorldBounds(true);
        powerUp.setBounce(1);
      }
      else {
        let powerUp = this.physics.add.sprite(57, 57, "shotgun");
        this.powerUps.add(powerUp);
        powerUp.setRandomPosition(0,0, 400, 400);
        powerUp.play("shotgun");
        powerUp.setVelocity(100, 100);
        powerUp.setCollideWorldBounds(true);
        powerUp.setBounce(1);
      }
      
    }

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
    this.moveShip(this.turret, 3);
    this.moveShip(this.drone, 4);
    this.background.tilePositionY -= 0.5;

    this.movePlayerManager();
  }

  movePlayerManager(){

    if(this.cursorKeys.left?.isDown) {
        this.player.setVelocityX(-200);
    }
    else if (this.cursorKeys.right?.isDown) {
      this.player.setVelocityX(200);
    }

    if(this.cursorKeys.up?.isDown) {
      this.player.setVelocityY(-200);
    }
    else if (this.cursorKeys.down?.isDown) {
      this.player.setVelocityY(200);
    }

    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      console.log("Fire!");
    }
    
  }
}
