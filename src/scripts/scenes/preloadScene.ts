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
  }

  create() {
    this.scene.start('MainScene');
  }
}
