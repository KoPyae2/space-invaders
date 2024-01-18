import GameManager from "./GameManager";

const { regClass, property } = Laya;

@regClass()
export class Score extends Laya.Script {
    age: Laya.Label;
    level: Laya.Label;
    score: Laya.Label;
    onEnable(): void {
        this.age = this.owner.getChildByName('age') as Laya.Label;
        this.level = this.owner.getChildByName('level') as Laya.Label;
        this.score = this.owner.getChildByName('score') as Laya.Label;
    }
    onUpdate(): void {
        this.age.text ="Ages -" + GameManager.getInstance().ages;
        this.level.text ="Levels -" + GameManager.getInstance().levels;
        this.score.text ="Scores -" + GameManager.getInstance().scores;
    }
}