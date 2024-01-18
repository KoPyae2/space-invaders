import { Bullet } from "./Bullet";
import GameManager from "./GameManager";

const { regClass, property } = Laya;

@regClass()
export class Enemy extends Laya.Script {
  declare owner: Laya.Box;
  x: number;
  y: number;
  data: any;
  speed: number = 1000;
  bulletContainer: Laya.Sprite;
  image: Laya.Image;
  onEnable(): void {
    this.owner.pos(this.x, this.y);
    this.image = this.owner.getChildByName("Image") as Laya.Image;
    this.image.skin = this.data.skin.fly;
    this.owner.name = (
      parseInt(new Date().getTime().toString()) * Math.random()
    ).toString();
  }

  public initEnemy(
    x: number,
    y: number,
    data: any,
    bulletContainer: Laya.Sprite
  ): void {
    this.x = x;
    this.y = y;
    this.data = data;
    this.owner.dataSource = data;
    this.owner.width = data.width;
    this.owner.height = data.height;
  }

  onUpdate(): void {
    this.owner.y++;
    if (this.owner.y > Laya.stage.height + this.data.height)
      this.owner.destroy(true);
  }
  public attack(): void {
    console.log("attackkkk");
    Laya.SoundManager.playSound('resources/sound/invaderkilled.wav',1)
  }

  public finalAttack():void {
    console.log('final attack',this.owner.dataSource);
    if(this.owner.dataSource.name == 'enemy3' || this.owner.dataSource.name ==='enemy4'){
      GameManager.getInstance().levels ++
    }
    let animation = new Laya.Animation()
    let images = [
      this.data.skin.hit1,this.data.skin.hit2,this.data.skin.hit3,this.data.skin.hit4
    ]
    animation.loadImages(images);
    this.owner.removeChild(this.image);
    this.owner.addChild(animation)
    animation.interval = 60;
    animation.play(null, false);
    animation.once(Laya.Event.COMPLETE, this, () => {
      Laya.SoundManager.playSound('resources/sound/explosion.wav',1)
      GameManager.getInstance().scores ++
      this.owner.destroy()
  });

  }
}
