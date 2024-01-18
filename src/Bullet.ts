const { regClass, property } = Laya;

@regClass()
export class Bullet extends Laya.Script {
  declare owner: Laya.Box;
  x: number;
  y: number;
  speed: number = 1000;
  onEnable(): void {
    this.owner.pos(this.x, this.y);
    Laya.Tween.to(
      this.owner,
      { x: this.x, y: -40 },
      this.speed,
      Laya.Ease.linearNone
    );
  }

  public initBullet(x: number, y: number): void {
    this.x = x;
    this.y = y;
    this.owner.pos(this.x, this.y);
  }

  onUpdate(): void {
    this.owner.y -= (this.speed * Laya.timer.delta) / 1000;

    if (this.owner.y < -40) this.owner.destroy(true);
  }
  handleCollision(): void {
    // Handle bullet-enemy collision
    console.log('Bullet hit enemy!');
    // Add additional logic as needed
  }
}
