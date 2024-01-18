"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
  var __decorateClass = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
    for (var i = decorators.length - 1, decorator; i >= 0; i--)
      if (decorator = decorators[i])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result)
      __defProp(target, key, result);
    return result;
  };

  // src/Bullet.ts
  var { regClass, property } = Laya;
  var Bullet = class extends Laya.Script {
    constructor() {
      super(...arguments);
      this.speed = 1e3;
    }
    onEnable() {
      this.owner.pos(this.x, this.y);
      Laya.Tween.to(
        this.owner,
        { x: this.x, y: -40 },
        this.speed,
        Laya.Ease.linearNone
      );
    }
    initBullet(x, y) {
      this.x = x;
      this.y = y;
      this.owner.pos(this.x, this.y);
    }
    onUpdate() {
      this.owner.y -= this.speed * Laya.timer.delta / 1e3;
      if (this.owner.y < -40)
        this.owner.destroy(true);
    }
    handleCollision() {
      console.log("Bullet hit enemy!");
    }
  };
  __name(Bullet, "Bullet");
  Bullet = __decorateClass([
    regClass("0e604b54-93cc-4f3a-834c-0805d77a5122", "../src/Bullet.ts")
  ], Bullet);

  // src/GameManager.ts
  var _GameManager = class _GameManager {
    constructor() {
      this.ages = 5;
      this.scores = 0;
      this.levels = 1;
    }
    static getInstance() {
      return _GameManager.instance;
    }
  };
  __name(_GameManager, "GameManager");
  _GameManager.instance = new _GameManager();
  var GameManager = _GameManager;

  // src/Enemy.ts
  var { regClass: regClass2, property: property2 } = Laya;
  var Enemy = class extends Laya.Script {
    constructor() {
      super(...arguments);
      this.speed = 1e3;
    }
    onEnable() {
      this.owner.pos(this.x, this.y);
      this.image = this.owner.getChildByName("Image");
      this.image.skin = this.data.skin.fly;
      this.owner.name = (parseInt((/* @__PURE__ */ new Date()).getTime().toString()) * Math.random()).toString();
    }
    initEnemy(x, y, data, bulletContainer) {
      this.x = x;
      this.y = y;
      this.data = data;
      this.owner.dataSource = data;
      this.owner.width = data.width;
      this.owner.height = data.height;
    }
    onUpdate() {
      this.owner.y++;
      if (this.owner.y > Laya.stage.height + this.data.height)
        this.owner.destroy(true);
    }
    attack() {
      console.log("attackkkk");
      Laya.SoundManager.playSound("resources/sound/invaderkilled.wav", 1);
    }
    finalAttack() {
      console.log("final attack", this.owner.dataSource);
      if (this.owner.dataSource.name == "enemy3" || this.owner.dataSource.name === "enemy4") {
        GameManager.getInstance().levels++;
      }
      let animation = new Laya.Animation();
      let images = [
        this.data.skin.hit1,
        this.data.skin.hit2,
        this.data.skin.hit3,
        this.data.skin.hit4
      ];
      animation.loadImages(images);
      this.owner.removeChild(this.image);
      this.owner.addChild(animation);
      animation.interval = 60;
      animation.wrapMode = Laya.Animation.WRAP_POSITIVE;
      animation.play(null, false);
      animation.once(Laya.Event.COMPLETE, this, () => {
        Laya.SoundManager.playSound("resources/sound/explosion.wav", 1);
        GameManager.getInstance().scores++;
        this.owner.destroy();
      });
    }
  };
  __name(Enemy, "Enemy");
  Enemy = __decorateClass([
    regClass2("519eec7b-40cc-40d1-a325-184ab6def1fc", "../src/Enemy.ts")
  ], Enemy);

  // src/Play.ts
  var { regClass: regClass3, property: property3 } = Laya;
  var enemyPath = "./resources/prefab/Enemy.lh";
  var bulletpPth = "./resources/prefab/Bullet.lh";
  var Play = class extends Laya.Script {
    constructor() {
      super(...arguments);
      this.y = 1;
      this.playerImg = [
        "resources/img/hero_fly1.png",
        "resources/img/hero_fly2.png"
      ];
      this.enemyPlane = [
        {
          name: "enemy1",
          age: 1,
          skin: {
            fly: "resources/img/enemy1_fly1.png",
            hit1: "resources/img/enemy1_down1.png",
            hit2: "resources/img/enemy1_down2.png",
            hit3: "resources/img/enemy1_down3.png",
            hit4: "resources/img/enemy1_down4.png"
          },
          mode: 1,
          // 1 normal , 2 bonus age , 3 bonus bullet,
          score: 1,
          width: 57,
          height: 51
        },
        {
          name: "enemy2",
          age: 2,
          skin: {
            fly: "resources/img/enemy2_fly1.png",
            hit1: "resources/img/enemy2_down1.png",
            hit2: "resources/img/enemy2_down2.png",
            hit3: "resources/img/enemy2_down3.png",
            hit4: "resources/img/enemy2_down4.png"
          },
          mode: 1,
          // 1 normal , 2 bonus age , 3 bonus bullet,
          score: 1,
          width: 69,
          height: 95
        },
        {
          name: "enemy3",
          age: 10,
          skin: {
            fly: "resources/img/enemy3_fly1.png",
            hit1: "resources/img/enemy3_down1.png",
            hit2: "resources/img/enemy3_down2.png",
            hit3: "resources/img/enemy3_down3.png",
            hit4: "resources/img/enemy3_down4.png"
          },
          mode: 2,
          // 1 normal , 2 bonus age , 3 bonus bullet,
          score: 1,
          width: 165,
          height: 261
        },
        {
          name: "enemy4",
          age: 10,
          skin: {
            fly: "resources/img/enemy3_fly1.png",
            hit1: "resources/img/enemy3_down1.png",
            hit2: "resources/img/enemy3_down2.png",
            hit3: "resources/img/enemy3_down3.png",
            hit4: "resources/img/enemy3_down4.png"
          },
          mode: 3,
          // 1 normal , 2 bonus age , 3 bonus bullet,
          score: 1,
          width: 165,
          height: 261
        }
      ];
      this.armos = [];
      this.isPlaying = false;
      this.hittedEnemy = [];
    }
    onEnable() {
      this.mainParent = this.owner.getChildByName("Box");
      this.bulletContainer = this.mainParent.getChildByName(
        "bulletContainer"
      );
      this.enemyContainer = this.mainParent.getChildByName(
        "enemyContainer"
      );
      Laya.loader.load(bulletpPth).then((res) => {
        this.bulletPrf = res;
      });
      Laya.loader.load(enemyPath).then((res) => {
        this.enemyPrf = res;
      });
      this.initBackground();
      this.initPlayer();
      this.playBtn = this.mainParent.getChildByName("playBtn");
      this.playBtn.on(Laya.Event.CLICK, this, this.startPlay);
    }
    startPlay() {
      this.playBtn.visible = false;
      this.isPlaying = true;
      Laya.timer.loop(400, this, this.shootBullet);
      Laya.timer.loop(1e3, this, () => {
        this.createEnemy(this.enemyPlane[0]);
      });
      Laya.timer.loop(6e4, this, () => {
        this.createEnemy(this.enemyPlane[this.randomNumberGenerator(2, 3)]);
      });
    }
    initBackground() {
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
    backgroundLoop() {
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
    initPlayer() {
      this.playerPlane = this.mainParent.getChildByName("player");
      let animation = new Laya.Animation();
      animation.loadImages(this.playerImg);
      animation.scale(1.4, 1.4);
      this.playerPlane.addChild(animation);
      animation.interval = 70;
      animation.play();
    }
    onMouseMove(evt) {
      if (!this.isPlaying)
        return;
      if (this.mainParent.hitTestPoint(evt.stageX, evt.stageY)) {
        this.playerPlane.pos(evt.target.mouseX - 72, evt.target.mouseY);
      }
    }
    shootBullet() {
      Laya.SoundManager.playSound("resources/sound/shoot.wav", 1);
      let bullet = Laya.Pool.getItemByCreateFun(
        "bullet",
        this.bulletPrf.create,
        this.bulletPrf
      );
      let bulletSp = bullet.getComponent(Bullet);
      bulletSp.initBullet(this.playerPlane.x + 66, this.playerPlane.y);
      this.bulletContainer.addChild(bullet);
    }
    createEnemy(data) {
      let enemy = Laya.Pool.getItemByCreateFun(
        "enemy",
        this.enemyPrf.create,
        this.enemyPrf
      );
      let enemyScript = enemy.getComponent(Enemy);
      enemyScript.initEnemy(
        this.randomNumberGenerator(0, this.mainParent.width - data.width),
        0,
        data,
        this.bulletContainer
      );
      this.enemyContainer.addChild(enemy);
    }
    randomNumberGenerator(min, max) {
      return Math.round(Math.random() * (max - min)) === 0 ? min + 1 : Math.round(Math.random() * (max - min)) + min;
    }
    onKeyDown(evt) {
      this.shootBullet();
    }
    onUpdate() {
      if (!this.isPlaying)
        return;
      for (let i = 0; i < this.enemyContainer.numChildren; i++) {
        let enemy = this.enemyContainer.getChildAt(i);
        let enemyScript = enemy.getComponent(Enemy);
        enemyScript.onUpdate();
        if (this.playerPlane.getBounds().intersects(enemy.getBounds())) {
          this.playerHitByEnemy(enemy);
          enemyScript.finalAttack();
        }
      }
      for (let i = 0; i < this.bulletContainer.numChildren; i++) {
        let bullet = this.bulletContainer.getChildAt(i);
        let bulletScript = bullet.getComponent(Bullet);
        bulletScript.onUpdate();
      }
      for (let i = this.enemyContainer.numChildren - 1; i >= 0; i--) {
        let enemy = this.enemyContainer.getChildAt(i);
        let enemyScript = enemy.getComponent(Enemy);
        for (let j = this.bulletContainer.numChildren - 1; j >= 0; j--) {
          let bullet = this.bulletContainer.getChildAt(j);
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
    playerHitByEnemy(enemy) {
      enemy.destroy();
      this.playerHit();
      GameManager.getInstance().ages--;
      console.log("Player hit by enemy!");
      if (GameManager.getInstance().ages <= 0) {
      }
    }
    playerHit() {
      let playerAnimation = this.playerPlane.getChildAt(1);
      playerAnimation.stop();
      let hitAnimation = new Laya.Animation();
      hitAnimation.loadImages(["resources/img/hero_down1.png", "resources/img/hero_down2.png"]);
      hitAnimation.interval = 70;
      this.playerPlane.addChild(hitAnimation);
    }
    enemySpawn() {
      let score = GameManager.getInstance().scores;
      this.createEnemy(this.enemyPlane[this.randomNumberGenerator(0, 1)]);
    }
  };
  __name(Play, "Play");
  __decorateClass([
    property3(Laya.Prefab)
  ], Play.prototype, "bullet", 2);
  __decorateClass([
    property3(Laya.Prefab)
  ], Play.prototype, "enemy", 2);
  Play = __decorateClass([
    regClass3("05f19e06-e062-408a-bdb2-b4704ff12869", "../src/Play.ts")
  ], Play);

  // src/Score.ts
  var { regClass: regClass4, property: property4 } = Laya;
  var Score = class extends Laya.Script {
    onEnable() {
      this.age = this.owner.getChildByName("age");
      this.level = this.owner.getChildByName("level");
      this.score = this.owner.getChildByName("score");
    }
    onUpdate() {
      this.age.text = "Ages -" + GameManager.getInstance().ages;
      this.level.text = "Levels -" + GameManager.getInstance().levels;
      this.score.text = "Scores -" + GameManager.getInstance().scores;
    }
  };
  __name(Score, "Score");
  Score = __decorateClass([
    regClass4("5489284c-05a2-4d72-b7f2-d41f38179cb9", "../src/Score.ts")
  ], Score);
})();
//# sourceMappingURL=bundle.js.map
