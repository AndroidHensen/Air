
import { _decorator, Component, Node, BoxColliderComponent, Collider, ITriggerEvent } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = SlefPlane
 * DateTime = Fri Apr 22 2022 19:42:12 GMT+0800 (中国标准时间)
 * Author = 我爱喜洋洋
 * FileBasename = slefPlane.ts
 * FileBasenameNoExtension = slefPlane
 * URL = db://assets/slefPlane.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 
@ccclass('SlefPlane')
export class SlefPlane extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    start () {
        
    }

    onEnable(){
        const collision = this.getComponent(Collider)
        collision.on('onTriggerEnter', this._onTriggerEnter, this);
    }

    onDisable(){
        const collision = this.getComponent(Collider)
        collision.off('onTriggerEnter', this._onTriggerEnter, this);
    }

    _onTriggerEnter(event:ITriggerEvent){
        console.log("SlefPlane  _onTriggerEnter")
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
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
