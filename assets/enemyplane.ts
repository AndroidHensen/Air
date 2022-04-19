
import { _decorator, Component, Node, math } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = EnemyPlane
 * DateTime = Mon Apr 18 2022 13:47:19 GMT+0800 (中国标准时间)
 * Author = 我爱喜洋洋
 * FileBasename = bullet.ts
 * FileBasenameNoExtension = bullet
 * URL = db://assets/res/bullet.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 
@ccclass('EnemyPlane')
export class EnemyPlane extends Component {
    // [1]
    // dummy = '';

    @property
    speed = 0.1

    start () {
        // [3]
    }

    update (deltaTime: number) {
       const pos = this.node.position
       const moveLength = pos.z+this.speed
       this.node.setPosition(pos.x,pos.y,moveLength)
    
       if(moveLength>20){
        this.node.destroy()
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
