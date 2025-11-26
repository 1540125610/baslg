import { _decorator, Component, resources, Sprite, SpriteFrame, Texture2D } from 'cc';
import { GameTool } from './GameTool';
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


    /*************************************************** 场景 *************************************************/

    //场景名字 默认为卧室
    scene_name = "bedroom"


    /**
     * 设置当前场景名称
     * @param name 新场景名称
     */
    setSceneName(name: string) {
        if (this.sceneList.indexOf(name) !== -1) {
            this.scene_name = name;
        } else {
            console.error(`场景名称 "${name}" 不存在`);
        }
    }

    /** 场景索引数组 */
    sceneList = ["bedroom","office_daytime"]
    /**
     * 查找下一个场景索引
     * @returns -2:未找到当前场景 -1:当前是最后一个场景 
     */
    findNextSceneIndex(){
        let nowIndex = GameTool.findIndex(this.sceneList,p => p === this.scene_name);

            // 未找到当前场景
            if (nowIndex === -1) return -2;

            // 当前是最后一个场景
            if (nowIndex >= this.sceneList.length - 1) return -1;

            // 返回下一场景索引
            return nowIndex + 1;
    }

    /**
     * 查找下一个场景索引
     * @returns -2:未找到当前场景 -1:当前是最前一个场景 
     */
    findLastSceneIndex(){
        let nowIndex = GameTool.findIndex(this.sceneList,p => p === this.scene_name);

            // 未找到当前场景
            if (nowIndex === -1) return -2;

            // 当前是最前一个场景
            if (nowIndex === 0) return -1;

            // 返回上一场景索引
            return nowIndex - 1;
    }

    /**
     * 通过场景索引获得场景名字
     * @param index 场景索引
     * @returns 场景名字
     */
    findSceneNameByIndex(index:number){
        return this.sceneList[index];
    }


    /******************************************************** 时间消息 **********************************************************/

    /** 日期（天数） */
    days: number = 1;

    /** 小时 */
    hours: number = 8;

    /** 分钟 */
    minute: number = 0;

    /**
     * 增加时间（自动进位）
     * @param hours   要增加的小时数
     * @param minutes 要增加的分钟数
     */
    addTime(hours: number, minutes: number) {
        // 增加分钟
        this.minute += minutes;

        // 分钟满 60 进位为小时
        if (this.minute >= 60) {
            this.hours += Math.floor(this.minute / 60);
            this.minute = this.minute % 60;
        }

        // 增加小时
        this.hours += hours;

        // 小时满 24 进位为天数
        if (this.hours >= 24) {
            this.days += Math.floor(this.hours / 24);
            this.hours = this.hours % 24;
        }
    }








}