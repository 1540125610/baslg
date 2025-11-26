import { _decorator, Component, resources, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameTool')
export class GameTool extends Component {

    /**
     * 在数组中查找第一个满足条件的元素索引。
     * @template T 数组元素的类型
     * @param array 要查找的数组
     * @param predicate 判断函数，接收每一项作为参数,返回 true 表示找到目标元素     
     * @returns 第一个满足条件的元素索引，未找到则返回 -1
     */
    static findIndex<T>(array: T[], predicate: (item: T) => boolean): number {
        return array.findIndex(predicate);
    }

    /**
     * 异步加载 Sprite 并挂载到节点
     * @param sprite 挂载 Sprite
     * @param path 相对于 resources 的路径(注意要写"/spriteFrame")
     */
    static async loadSprite(sprite: Sprite, path: string): Promise<void> {
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


