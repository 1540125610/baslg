import { _decorator, Component, director, instantiate, Node, Prefab, resources, UI } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UI_Manage')
export class UI_Manage extends Component {
    private static _instance: UI_Manage | null = null;

    /** 单例获取 */
    public static getInstance(): UI_Manage {
        if (!this._instance) {
            this._instance = new UI_Manage();
            this._instance.init();
        }
        return this._instance;
    }

    /** 私有构造函数，防止外部 new */
    private constructor() {
        super();
    }


    //节点——页面
    private static node_View:Node = null;
    //所有打开的页面索引
    private openedViews: Map<string, Node> = new Map();
    //节点——提示
    private static node_Tip:Node = null;
    //所有打开的提示索引
    private openedTips: Map<string, Node> = new Map();

    init() {
        this.createNodeView();
        this.createTipNode();
    }

    /** 创建 ui_view 页面节点 */
    private createNodeView() {
        if (!UI_Manage.node_View) {
            let newNode = new Node("ui_view");

            // 挂在 Canvas 下
            let canvas = director.getScene().getChildByName("Canvas");
            if (canvas) {
                newNode.parent = canvas;
            } else {
                console.warn("没有找到 Canvas 节点，ui_view 将挂在场景根节点下");
                newNode.parent = director.getScene();
            }

            UI_Manage.node_View = newNode;
        }
    }

    /** 创建 ui_tip 提示层，并始终在 ui_view 之上 */
    private createTipNode() {
        if (!UI_Manage.node_Tip) {
            let tipNode = new Node("ui_tip");

            // 挂在和 ui_view 相同的父节点下
            let parent = UI_Manage.node_View?.parent ?? director.getScene();
            tipNode.parent = parent;

            // 确保 ui_tip 在 ui_view 之上
            if (UI_Manage.node_View) {
                tipNode.setSiblingIndex(UI_Manage.node_View.getSiblingIndex() + 1);
            }

            UI_Manage.node_Tip = tipNode;
        }
    }

    start() {

    }

    update(deltaTime: number) {
        
    }



    /** 创建页面 */
    public createUIView(name: string){
        this.createPrefabToView(name);
    }

    /** 
     * 加载 prefab 并挂到 view 层
     * @param name 页面名字
     */
    public createPrefabToView(name: string) {
        let path = "ui/View/"+name;
        resources.load(path, Prefab, async (err, prefab) => {
            if (err) {
                console.error(`加载 prefab 失败: ${path}`, err);
                return;
            }
            let node = await instantiate(prefab);
            node.parent = UI_Manage.node_View; // 挂到 view 层
            this.openedViews.set(name, node);
        });
    }


    /** 创建提示 */
    public createUITip(name: string){
        this.createPrefabToTip(name);
    }

    /** 
     * 加载 prefab 并挂到 view 层
     * @param name 页面名字
     */
    public createPrefabToTip(name: string) {
        let path = "ui/Tip/"+name;
        resources.load(path, Prefab, async (err, prefab) => {
            if (err) {
                console.error(`加载 prefab 失败: ${path}`, err);
                return;
            }
            let node = await instantiate(prefab);
            node.parent = UI_Manage.node_Tip; // 挂到 view 层
            this.openedTips.set(name, node);
        });
    }


    /** 关闭界面 */
    public closeView(name: string) {
        let node = this.openedViews.get(name);
        if (node && node.isValid) {
            node.destroy();
            this.openedViews.delete(name);
        }
    }

    /** 关闭提示 */
    public closeTip(name: string) {
        let node = this.openedTips.get(name);
        if (node && node.isValid) {
            node.destroy();
            this.openedTips.delete(name);
        }
    }


}


