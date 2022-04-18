
import { _decorator, Component, Node, systemEvent, SystemEvent, EventTouch ,Touch, Prefab, instantiate} from 'cc';
import { Bullet } from './res/bullet';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = uiMain
 * DateTime = Mon Apr 18 2022 12:31:01 GMT+0800 (中国标准时间)
 * Author = 我爱喜洋洋
 * FileBasename = plane01-controller.ts
 * FileBasenameNoExtension = plane01-controller
 * URL = db://assets/plane01-controller.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 
@ccclass('uiMain')
export class uiMain extends Component {
    @property
    planeSpeed = 3

    // [2]
    @property(Node)
    plane = null;

    start () {
        // [3]
        this.node.on(SystemEvent.EventType.TOUCH_MOVE,this._touchMove,this);
    }

    _touchMove(touch:Touch,event:EventTouch){
        console.info("AAAAAAAAAAAAA")
        const delta = touch.getDelta();
        this.plane.setPosition(this.plane.position.x+0.01*delta.x*this.planeSpeed,
            this.plane.position.y,
            this.plane.position.z-0.01*delta.y*this.planeSpeed)
    }


    update (deltaTime: number) {
         // [4]
         
    }

}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/en/scripting/life-cycle-callbacks.html
 */
