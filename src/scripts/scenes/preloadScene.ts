export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image("background", "src/assets/Background.png");
    this.load.spritesheet("player", "src/assets/player.png", {
      frameWidth: 73,
      frameHeight: 69
    });
    this.load.spritesheet("drone", "src/assets/drone.png", {
      frameWidth: 55,
      frameHeight: 52
    });
    this.load.spritesheet("turret", "src/assets/turret.png", {
      frameWidth: 27,
      frameHeight: 25
    });
    this.load.spritesheet("explosion", "src/assets/explosion.png", {
      frameWidth: 57,
      frameHeight: 52
    });
    this.load.spritesheet("shotgun", "src/assets/shotgun.png", {
      frameWidth: 57,
      frameHeight: 57
    });
    this.load.spritesheet("machinegun", "src/assets/machinegun.png", {
      frameWidth: 57,
      frameHeight: 57
    });
    this.load.spritesheet("shot", "src/assets/shot.png", {
      frameWidth: 13,
      frameHeight: 13
    });
  }

  create() {
    
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

    this.anims.create({
      key: "shotgun",
      frames: this.anims.generateFrameNumbers("shotgun", { start: 0, end: 2}),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "machinegun",
      frames: this.anims.generateFrameNumbers("machinegun", { start: 0, end: 2}),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "shot_anim",
      frames: this.anims.generateFrameNumbers("shot", { start: 0, end: 2}),
      frameRate: 20,
      repeat: -1
    });


    this.scene.start('MainScene');
  }
}
