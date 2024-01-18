export default class GameManager{
    private static instance:GameManager = new GameManager();

    ages:number = 5;
    scores:number = 0;
    levels:number = 1;

    public static getInstance() : GameManager{
        return GameManager.instance;
    }
}