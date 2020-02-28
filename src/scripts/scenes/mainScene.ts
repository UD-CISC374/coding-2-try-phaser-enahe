import ExampleObject from '../objects/exampleObject';
import { Shot } from './shot';


export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
  background: Phaser.GameObjects.TileSprite;
  player: Phaser.Physics.Arcade.Sprite;
  turret: Phaser.GameObjects.Sprite;
  drone: Phaser.GameObjects.Sprite;
  powerUps: Phaser.Physics.Arcade.Group;
  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  spacebar: Phaser.Input.Keyboard.Key;
  projectiles: Phaser.GameObjects.Group;
  powerUp: Phaser.Physics.Arcade.Sprite;
  enemies: Phaser.Physics.Arcade.Group;
  





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
    this.projectiles = this.add.group();
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
    this.turret.play("turret_anim");
    this.drone.play("drone_anim");

    this.player.setInteractive();
    this.turret.setInteractive();
    this.drone.setInteractive();

    this.input.on("gameobjectdown", this.destroyShip, this);

    this.physics.add.collider(this.projectiles, this.powerUps, function(projectile, powerUp){
      projectile.destroy();
    });

    this.physics.add.overlap(this.player, this.powerUps, this.pickPowerUp);

    this.enemies = this.physics.add.group();
    this.enemies.add(this.drone);
    this.enemies.add(this.turret);

    this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer);

    this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy);
    this.player.setGravityY(100);
  }

  resetShipPos(ship) {
    ship.y = 400;
    var randomX = Phaser.Math.Between(0, 400);
    ship.x = randomX;
  }


  moveShip(ship, speed) {
    ship.y -= speed;
    console.log(ship.y);
    if (ship.y < 0) {
      this.resetShipPos(ship);
    }
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
    for (let i = 0; i < this.projectiles.getChildren().length; i++) {
      let shot = this.projectiles.getChildren()[i];
      shot.update();
    }
  }

  shootBeam() {
    var shot = new Shot(this);
    console.log("Shooting");
  }

  movePlayerManager(){

    if(this.cursorKeys.left?.isDown) {
        this.player.setVelocityX(-200);
          this.player.setFlipX(true);
          this.player.anims.play("player_run", true);
        
    }
    else if (this.cursorKeys.right?.isDown) {
        this.player.setVelocityX(200);
        this.player.setFlipX(false);
        this.player.anims.play("player_run", true);
    }
    else {
      this.player.setVelocityX(0);
      this.player.setFlipX(false);
      this.player.anims.play("player_anim", true);
    }
    

    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
        this.player.anims.play("player_jump", true)
        this.shootBeam();
    }
    
  }
  pickPowerUp(player, powerUp) {
    powerUp.disableBody(true, true) ;
  }

  hurtPlayer(player, enemy) {
    enemy.destroy;
    player.x = 400/2 - 8;
    player.y = 400 - 64;
  }

  hitEnemy(projectile, enemy) {
    projectile.destroy();
    enemy.destroy();
  }
}
