
import { _decorator, Component, Node, AudioSource } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = MapMoving
 * DateTime = Mon Apr 18 2022 12:03:46 GMT+0800 (中国标准时间)
 * Author = 我爱喜洋洋
 * FileBasename = map-moving.ts
 * FileBasenameNoExtension = map-moving
 * URL = db://assets/map-moving.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 
@ccclass('MapMoving')
export class MapMoving extends Component {

    zout = 20;

    @property
    speed = 5;

    @property(Node)
    bg01:Node = null;

    @property(Node)
    bg02:Node = null;

    start () {
    }

     update (deltaTime: number) {
         // [4]
        this.bg01.setPosition(this.bg01.position.x,this.bg01.position.y,this.bg01.position.z+deltaTime*this.speed)
        this.bg02.setPosition(this.bg02.position.x,this.bg02.position.y,this.bg02.position.z+deltaTime*this.speed)
        if(this.bg01.position.z > this.zout){
            this.bg01.setPosition(this.bg01.position.x,this.bg01.position.y,this.bg02.position.z)
            this.bg02.setPosition(this.bg02.position.x,this.bg02.position.y,this.bg02.position.z-this.zout)
        }
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
