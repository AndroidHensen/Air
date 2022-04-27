import { GameManager } from './gameManager';
import { Constants } from './Constants';

import { _decorator, Component, Node, Collider, ITriggerEvent } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = BulletProp
 * DateTime = Wed Apr 27 2022 16:48:08 GMT+0800 (中国标准时间)
 * Author = 我爱喜洋洋
 * FileBasename = bulletProp.ts
 * FileBasenameNoExtension = bulletProp
 * URL = db://assets/res/bulletProp.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */

@ccclass('BulletProp')
export class BulletProp extends Component {

    speed = 0.05
    moveX = 0
    delX = 0.05

    _gameManager: GameManager = null

    start() {
        // [3]
    }

    update(deltaTime: number) {
        // [4]
        const pos = this.node.getPosition()

        if (this.moveX >= 4) {
            this.delX = -0.05
        } else if (this.moveX <= -4) {
            this.delX = 0.05
        }

        this.moveX = pos.x + this.delX
        const moveLength = pos.z + this.speed
        this.node.setPosition(this.moveX, pos.y, moveLength)

        if (moveLength > 15) {
            this.node.destroy()
        }
    }

    show(gameManager) {
        this._gameManager = gameManager
    }


    onEnable() {
        const collision = this.getComponent(Collider)
        collision.on('onTriggerEnter', this._onTriggerEnter, this);
    }

    onDisable() {
        const collision = this.getComponent(Collider)
        collision.off('onTriggerEnter', this._onTriggerEnter, this);
    }

    _onTriggerEnter(event: ITriggerEvent) {
        const group = event.otherCollider.getGroup()
        const name = event.selfCollider.node.name
        if (group === Constants.CollisionT.SELF_PLANE) {
            this.node.destroy()
            if (name === "BulletM") {
                this._gameManager.changeBulletType(Constants.BulletType.BULLET_M)
            } else if (name === "BulletS") {
                this._gameManager.changeBulletType(Constants.BulletType.BULLET_S)
            } else {
                this._gameManager.changeBulletType(Constants.BulletType.BULLET_H)
            }
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
