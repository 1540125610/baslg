import { _decorator, Component, Node, Sprite } from 'cc';
import { GameDate } from './GameData';
import { GameTool } from './GameTool';
const { ccclass, property } = _decorator;

@ccclass('scr_gameStart')
export class scr_gameStart extends Component {

    /** 图片-场景 */
    @property({ type: Sprite })
    public spr_sceneImage:Sprite = null;

    @property({ type: Node })
    public node_nextBtn:Node = null;

    @property({ type: Node })
    public node_lastBtn:Node = null;
    

    start() {
        let sceneIndex = GameDate.getData().scene_name;
        this.changeScene(sceneIndex);
    }

    update(deltaTime: number) {
        
    }


    /** 切换场景 */
    changeScene(sceneName:string){
        GameDate.getData().setSceneName(sceneName);

        let mapUrl = "images/scene/" + sceneName + "/spriteFrame";
        GameTool.loadSprite(this.spr_sceneImage,mapUrl);

        this.refreshUI();
    }

    /************************************************************ btn *********************************************************************/
    /**
     * 按下 上一个场景按钮
     */
    clickLastSceneBtn(){
        let lastIndex = GameDate.getData().findLastSceneIndex();

        if (lastIndex === -2) {
            console.error("当前场景未找到，无法切换到上一个场景");
            return;
        }
        if (lastIndex === -1) {
            console.log("已经是最后一个场景，无上一场景");
            return;
        }

        let lastName =  GameDate.getData().findSceneNameByIndex(lastIndex);
        this.changeScene(lastName);

        /** 测试时+10.实际+1 */
        GameDate.getData().addTime(0,10);
    }

    /**
     * 按下 下一个场景按钮
     */
    clickNextSceneBtn(){
        let nextIndex = GameDate.getData().findNextSceneIndex();
        
        if (nextIndex === -2) {
            console.error("当前场景未找到，无法切换到下一个场景");
            return;
        }
        if (nextIndex === -1) {
            console.log("已经是最后一个场景，无下一场景");
            return;
        }


        let nextName =  GameDate.getData().findSceneNameByIndex(nextIndex);
        this.changeScene(nextName);

        /** 测试时+10.实际+1 */
        GameDate.getData().addTime(0,10);
    }


    /************************************************************ UI *********************************************************************/

    /** 刷新ui */
    refreshUI(){
        this.shouldShowLastBtn();
        this.shouldShowNextBtn();
    }

    /** 是否应该展示上个场景 */
    shouldShowLastBtn(){
        let lastIndex = GameDate.getData().findLastSceneIndex();
        if(lastIndex < 0){
            this.node_lastBtn.active = false;
        }
        else{
            this.node_lastBtn.active = true;
        }
    }

    /** 是否应该展示下个场景 */
    shouldShowNextBtn(){
        let nextIndex = GameDate.getData().findNextSceneIndex();
        if(nextIndex < 0){
            this.node_nextBtn.active = false;
        }
        else{
            this.node_nextBtn.active = true;
        }
    }

}


