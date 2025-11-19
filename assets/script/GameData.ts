import { _decorator, Component, resources, Sprite, SpriteFrame, Texture2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameDate')
export class GameDate extends Component {
    private static instance: GameDate | null = null;

    public static getData(): GameDate {
        if (GameDate.instance === null) {
            GameDate.instance = new GameDate();
        }
        return GameDate.instance;
    }

    //场景索引 默认为卧室
    scene_index = "bedroom"

    sceneList = ["bedroom","office_daytime"]
    

    start() {

    }

    update(deltaTime: number) {
        
    }



    /**
     * 异步加载 Sprite 并挂载到节点
     * @param sprite 挂载 Sprite
     * @param path 相对于 resources 的路径(注意要写"/spriteFrame")
     */
     async loadSprite(sprite: Sprite, path: string): Promise<void> {
        try {
            const spriteFrame = await new Promise<SpriteFrame>((resolve, reject) => {
                resources.load(path, SpriteFrame, (err, tex) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(tex);
                });
            });


            sprite.spriteFrame = spriteFrame;
        } catch (err) {
            console.error(`❌ 加载失败: ${path}`, err);
        }
    }
}