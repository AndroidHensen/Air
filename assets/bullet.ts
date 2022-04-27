import { Constants } from './Constants';

import { _decorator, Component, Node, Collider, ITriggerEvent } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Bullet
 * DateTime = Mon Apr 18 2022 13:47:19 GMT+0800 (中国标准时间)
 * Author = 我爱喜洋洋
 * FileBasename = bullet.ts
 * FileBasenameNoExtension = bullet
 * URL = db://assets/res/bullet.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */

@ccclass('Bullet')
export class Bullet extends Component {
    // [1]
    // dummy = '';

    _isEnemy = false
    _speed = 0.1
    _direction = Constants.Direction.MIDDLE

    start() {

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
        this.node.destroy()
    }

    update(deltaTime: number) {
        const pos = this.node.position
        if (this._isEnemy) {
            const moveLength = pos.z + this._speed
            this.node.setPosition(pos.x, pos.y, moveLength)
            if (moveLength > 15) {
                this.node.destroy()
            }

        } else {
            const moveLength = pos.z - this._speed

            if (this._direction === Constants.Direction.LEFT) {
                this.node.setPosition(pos.x - this._speed * 0.2, pos.y, moveLength)
            } else if (this._direction === Constants.Direction.RIGHT) {
                this.node.setPosition(pos.x + this._speed * 0.2, pos.y, moveLength)
            } else {
                this.node.setPosition(pos.x, pos.y, moveLength)
            }

            if (moveLength < -15) {
                this.node.destroy()
            }
        }
    }

    _show(isEnemy, speed, direction = Constants.Direction.MIDDLE) {
        this._isEnemy = isEnemy
        this._speed = speed
        this._direction = direction
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
