const { regClass, property } = Laya;
import { Bullet } from "./Bullet";
import Sprite = Laya.Sprite;
import { Enemy } from "./Enemy";
import GameManager from "./GameManager";
const enemyPath: string = "./resources/prefab/Enemy.lh";
const bulletpPth: string = "./resources/prefab/Bullet.lh";

@regClass()
export class Play extends Laya.Script {
  bg1: Laya.Sprite;
  mainParent: Laya.Box;
  bg2: Laya.Sprite;
  y: number = 1;

  playerPlane: Laya.Box;
  playerImg: string[] = [
    "resources/img/hero_fly1.png",
    "resources/img/hero_fly2.png",
  ];
  enemyPlane: any = [
    {
      name: "enemy1",
      age: 1,
      skin: {
        fly: "resources/img/enemy1_fly1.png",
        hit1: "resources/img/enemy1_down1.png",
        hit2: "resources/img/enemy1_down2.png",
        hit3: "resources/img/enemy1_down3.png",
        hit4: "resources/img/enemy1_down4.png",
      },
      mode: 1, // 1 normal , 2 bonus age , 3 bonus bullet,
      score: 1,
      width: 57,
      height: 51,
    },
    {
      name: "enemy2",
      age: 2,
      skin: {
        fly: "resources/img/enemy2_fly1.png",
        hit1: "resources/img/enemy2_down1.png",
        hit2: "resources/img/enemy2_down2.png",
        hit3: "resources/img/enemy2_down3.png",
        hit4: "resources/img/enemy2_down4.png",
      },
      mode: 1, // 1 normal , 2 bonus age , 3 bonus bullet,
      score: 1,
      width: 69,
      height: 95,
    },
    {
      name: "enemy3",
      age: 10,
      skin: {
        fly: "resources/img/enemy3_fly1.png",
        hit1: "resources/img/enemy3_down1.png",
        hit2: "resources/img/enemy3_down2.png",
        hit3: "resources/img/enemy3_down3.png",
        hit4: "resources/img/enemy3_down4.png",
      },
      mode: 2, // 1 normal , 2 bonus age , 3 bonus bullet,
      score: 1,
      width: 165,
      height: 261,
    },
    {
      name: "enemy4",
      age: 10,
      skin: {
        fly: "resources/img/enemy3_fly1.png",
        hit1: "resources/img/enemy3_down1.png",
        hit2: "resources/img/enemy3_down2.png",
        hit3: "resources/img/enemy3_down3.png",
        hit4: "resources/img/enemy3_down4.png",
      },
      mode: 3, // 1 normal , 2 bonus age , 3 bonus bullet,
      score: 1,
      width: 165,
      height: 261,
    },
  ];
  armos: any = [];
  isPlaying: boolean = false;
  @property(Laya.Prefab)
  bullet: Laya.Prefab;

  @property(Laya.Prefab)
  enemy: Laya.Prefab;

  bulletPrf: Laya.Prefab;
  enemyPrf: Laya.Prefab;
  bulletContainer: Sprite;
  enemyContainer: Sprite;
  playBtn: Laya.Button;
  public hittedEnemy: string[] = [];

  onEnable(): void {
    this.mainParent = this.owner.getChildByName("Box") as Laya.Box;
    this.bulletContainer = this.mainParent.getChildByName(
      "bulletContainer"
    ) as Laya.Sprite;

    this.enemyContainer = this.mainParent.getChildByName(
      "enemyContainer"
    ) as Laya.Sprite;

    Laya.loader.load(bulletpPth).then((res) => {
      this.bulletPrf = res;
    });

    Laya.loader.load(enemyPath).then((res) => {
      this.enemyPrf = res;
    });

    this.initBackground();
    this.initPlayer();
    this.playBtn = this.mainParent.getChildByName("playBtn") as Laya.Button;
    this.playBtn.on(Laya.Event.CLICK, this, this.startPlay);
  }

  startPlay(): void {
    this.playBtn.visible = false;
    this.isPlaying = true;
    Laya.timer.loop(400, this, this.shootBullet);
    Laya.timer.loop(1000, this, () => {
      this.createEnemy(this.enemyPlane[0]);
    });
    Laya.timer.loop(60000, this, () => {
      this.createEnemy(this.enemyPlane[this.randomNumberGenerator(2, 3)]);
    });
  }

  initBackground(): void {
    let bg = this.mainParent.getChildByName("bg");
    this.bg1 = new Laya.Sprite();
    this.bg1.loadImage("resources/img/background.png");
    this.bg1.width = 700;
    this.bg1.height = Laya.stage.height;
    bg.addChild(this.bg1);
    this.bg2 = new Laya.Sprite();
    this.bg2.loadImage("resources/img/background.png");
    this.bg2.pos(0, -Laya.stage.height);
    this.bg2.width = 700;
    this.bg2.height = Laya.stage.height;
    bg.addChild(this.bg2);
    Laya.timer.frameLoop(1, this, this.backgroundLoop);
  }

  backgroundLoop(): void {
    this.y += 1;
    this.y += 1;
    this.bg1.y = this.y;
    this.bg2.y = this.y - Laya.stage.height;
    if (this.y > Laya.stage.height) {
      this.bg1.y = -(Laya.stage.height - (this.y - Laya.stage.height));
    }
    if (this.y >= Laya.stage.height * 2) {
      this.bg2.y = -Laya.stage.height;
      this.y = 0;
      this.bg1.y = 0;
    }
  }

  initPlayer(): void {
    this.playerPlane = this.mainParent.getChildByName("player") as Laya.Box;
    let animation = new Laya.Animation();
    animation.loadImages(this.playerImg);
    animation.scale(1.4, 1.4);
    this.playerPlane.addChild(animation);
    animation.interval = 70;
    animation.play();
  }

  onMouseMove(evt: Laya.Event): void {
    if (!this.isPlaying) return;
    if (this.mainParent.hitTestPoint(evt.stageX, evt.stageY)) {
      //   this.playerPlane.pos(
      //     evt.target.mouseX - this.mainParent.x - 72,
      //     evt.target.mouseY
      //   );
      this.playerPlane.pos(evt.target.mouseX - 72, evt.target.mouseY);
    }
  }

  shootBullet(): void {
    Laya.SoundManager.playSound("resources/sound/shoot.wav", 1);
    let bullet = Laya.Pool.getItemByCreateFun(
      "bullet",
      this.bulletPrf.create,
      this.bulletPrf
    ) as Laya.Sprite;
    let bulletSp = bullet.getComponent(Bullet);
    bulletSp.initBullet(this.playerPlane.x + 66, this.playerPlane.y);
    this.bulletContainer.addChild(bullet);
  }

  createEnemy(data: any): void {
    let enemy = Laya.Pool.getItemByCreateFun(
      "enemy",
      this.enemyPrf.create,
      this.enemyPrf
    ) as Laya.Sprite;
    let enemyScript = enemy.getComponent(Enemy);
    enemyScript.initEnemy(
      this.randomNumberGenerator(0, this.mainParent.width - data.width),
      0,
      data,
      this.bulletContainer
    );

    this.enemyContainer.addChild(enemy);
  }

  randomNumberGenerator(min: number, max: number): number {
    return Math.round(Math.random() * (max - min)) === 0
      ? min + 1
      : Math.round(Math.random() * (max - min)) + min;
  }

  onKeyDown(evt: Laya.Event): void {
    this.shootBullet();
  }

  onUpdate(): void {
    if (!this.isPlaying) return;

    // Move enemies
    for (let i = 0; i < this.enemyContainer.numChildren; i++) {
      let enemy = this.enemyContainer.getChildAt(i) as Laya.Box;
      let enemyScript = enemy.getComponent(Enemy);
      enemyScript.onUpdate();
      if (this.playerPlane.getBounds().intersects(enemy.getBounds())) {
        this.playerHitByEnemy(enemy);
        enemyScript.finalAttack(); // You can perform any action on the enemy when it hits the player
      }
    }

    // Move bullets
    for (let i = 0; i < this.bulletContainer.numChildren; i++) {
      let bullet = this.bulletContainer.getChildAt(i) as Laya.Sprite;
      let bulletScript = bullet.getComponent(Bullet);
      bulletScript.onUpdate();
    }

    // Check for collisions
    for (let i = this.enemyContainer.numChildren - 1; i >= 0; i--) {
      let enemy = this.enemyContainer.getChildAt(i) as Laya.Box;
      let enemyScript = enemy.getComponent(Enemy);

      for (let j = this.bulletContainer.numChildren - 1; j >= 0; j--) {
        let bullet = this.bulletContainer.getChildAt(j) as Laya.Sprite;
        // Check for collision
        if (bullet.getBounds().intersects(enemy.getBounds())) {
          console.log(enemy.name);
          enemyScript.attack();
          this.hittedEnemy.push(enemy.name);
          let count = 0;
          this.hittedEnemy.forEach((ele) => {
            if (ele == enemy.name) {
              count++;
            }
            if (count >= enemy.dataSource.age) {
              console.log("really hit");
              count = 0;
              this.hittedEnemy = this.hittedEnemy.filter(
                (item) => item !== enemy.name
              );
              enemyScript.finalAttack();
              this.enemySpawn();
            }
          });
          bullet.destroy();
        }
      }
    }
  }

  playerHitByEnemy(enemy: Laya.Box): void {
    enemy.destroy();
    GameManager.getInstance().ages--;
    // Handle player hit logic here
    // For example, decrease player health or trigger game over
    console.log("Player hit by enemy!");
    // Implement your logic here...
    if(GameManager.getInstance().ages <= 0){

    }
  }


  enemySpawn(): void {
    let score = GameManager.getInstance().scores;
    this.createEnemy(this.enemyPlane[this.randomNumberGenerator(0, 1)]);
  }
}
