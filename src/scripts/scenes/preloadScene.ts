export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image("background", "src/assets/ville.png");
    this.load.image("ship", "src/assets/Ship1.png");
    this.load.image("ship2", "src/assets/Ship2.png");
    this.load.image("ship3", "src/assets/Ship3.png");
  }

  create() {
    this.scene.start('MainScene');
  }
}
