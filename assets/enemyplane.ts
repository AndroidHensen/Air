
import { _decorator, Component, Node, math, Collider, ITriggerEvent } from 'cc';
import { GameManager } from './gameManager';
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
    _speed = 0.1

    @property
    _needBullet = false

    _gameManager: GameManager = null


    _curEnemyShootTime = 0
    _enemyShootTime = 0.8

    start() {
       
    }

    onEnable(){
        const collision = this.getComponent(Collider)
        collision.on('onTriggerEnter', this._onTriggerEnter, this);
    }

    onDisable(){
        const collision = this.getComponent(Collider)
        collision.off('onTriggerEnter', this._onTriggerEnter, this);
    }

    _onTriggerEnter(event: ITriggerEvent) {
        console.log("EnemyPlane  _onTriggerEnter")
    }

    update(deltaTime: number) {
        const pos = this.node.position
        const moveLength = pos.z + this._speed
        this.node.setPosition(pos.x, pos.y, moveLength)

        this._curEnemyShootTime += deltaTime
        if (this._curEnemyShootTime > this._enemyShootTime) {
            this._gameManager._createEnemyBullet01(this.node.position)
            this._curEnemyShootTime = 0
        }

        if (moveLength > 20) {
            this.node.destroy()
        }
    }

    _show(gameManager, speed, needBullet) {
        this._gameManager = gameManager
        this._speed = speed
        this._needBullet = needBullet
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
