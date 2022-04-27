import { Constants } from './Constants';

import { _decorator, Component, Node, systemEvent, SystemEvent, EventTouch, Touch, Prefab, instantiate, math, Vec3, Collider } from 'cc';
import { Bullet } from './bullet';
import { EnemyPlane } from './enemyplane';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = GameManager
 * DateTime = Mon Apr 18 2022 14:39:04 GMT+0800 (中国标准时间)
 * Author = 我爱喜洋洋
 * FileBasename = gameManager.ts
 * FileBasenameNoExtension = gameManager
 * URL = db://assets/gameManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */

@ccclass('GameManager')
export class GameManager extends Component {
    isShotting = true

    @property
    planeSpeed = 3

    // [2]
    @property(Node)
    plane = null;

    @property(Prefab)
    bullet01 = null;

    @property(Node)
    bulletRoot = null;

    @property(Prefab)
    enemy01 = null;
    @property(Prefab)
    enemy02 = null;


    shoottime = 0.15;
    curShootTime = 0;

    enemyTime = 0.5; //0.5秒出一个敌机
    curEnemyTime = 0;
    curEnemyType = 1;

    start() {
        // [3]
        this._startEnemyTypeChangeLoop()
    }

    update(deltaTime: number) {
        // [4]
        this.curShootTime += deltaTime
        if (this.isShotting && this.curShootTime > this.shoottime) {
            this._createBullet01()
            this.curShootTime = 0
        }

        this.curEnemyTime += deltaTime
        if (this.curEnemyType === 1) {
            if (this.curEnemyTime > this.enemyTime) {
                this._createEnemy01(0.1)
                this.curEnemyTime = 0
            }
        } else if (this.curEnemyType === 2) {
            if (this.curEnemyTime > this.enemyTime * 0.9) {
                if (math.randomRangeInt(1, 6) === 1) {
                    this._createEnemy02(0.08)
                } else {
                    this._createEnemy01(0.13)
                }
                this.curEnemyTime = 0
            }
        } else if (this.curEnemyType === 3) {
            if (this.curEnemyTime > this.enemyTime * 0.8) {
                const i = math.randomRangeInt(1, 8)
                if (i === 1) {
                    this._createEnemy02(0.08)
                } else if (i === 2) {
                    this._createEnemy03(0.09)
                } else {
                    this._createEnemy01(0.16)
                }
                this.curEnemyTime = 0
            }
        }
    }

    _createBullet01() {
        const bullet = instantiate<Node>(this.bullet01);
        bullet.setParent(this.bulletRoot)

        const pos = this.plane.position
        bullet.setPosition(pos.x, pos.y, pos.z - 1)

        const bulletComp = bullet.getComponent(Bullet)
        bulletComp._show(false, 0.1)
    }

    _createEnemyBullet01(posotion: Vec3) {
        console.log("_createEnemyBullet01" + posotion)
        const bullet = instantiate<Node>(this.bullet01);
        bullet.setParent(this.bulletRoot)

        bullet.setPosition(posotion.x, 3, posotion.z + 1)

        const bulletComp = bullet.getComponent(Bullet)
        bulletComp._show(true, 0.2)
        const collider = bullet.getComponent(Collider)
        collider.setGroup(Constants.CollisionT.ENEMY_BULLET)
        collider.setMask(Constants.CollisionT.SELF_PLANE)
    }

    _createEnemy01(enmyPlaneSpeed) {
        const plane = math.randomRangeInt(1, 3)
        let enmyPlane = null

        if (plane === 1) {
            enmyPlane = instantiate<Node>(this.enemy01)
        } else if (plane === 2) {
            enmyPlane = instantiate<Node>(this.enemy02)
        }

        enmyPlane.setParent(this.node)
        enmyPlane.setPosition(math.randomRangeInt(-4, 5), 0, -10)

        const comp = enmyPlane.getComponent(EnemyPlane)
        comp._show(this, enmyPlaneSpeed, true)
    }

    _createEnemy02(enmyPlaneSpeed) {
        let enmyPlane = new Array<Node>(5)

        for (let index = 0; index < enmyPlane.length; index++) {
            enmyPlane[index] = instantiate(this.enemy01)
            enmyPlane[index].setParent(this.node)
            enmyPlane[index].setPosition(-4 + 2 * index, 0, -10)
            const comp = enmyPlane[index].getComponent(EnemyPlane)
            comp._show(this, enmyPlaneSpeed, false)
        }
    }

    _createEnemy03(enmyPlaneSpeed) {
        let enmyPlane = new Array<Node>(9)
        let pos = [
            -4, 0, -14,
            -3, 0, -13,
            -2, 0, -12,
            -1, 0, -11,
            0, 0, -10,
            1, 0, -11,
            2, 0, -12,
            3, 0, -13,
            4, 0, -14
        ]

        let start = 0
        for (let index = 0; index < enmyPlane.length; index++) {
            enmyPlane[index] = instantiate(this.enemy02)
            enmyPlane[index].setParent(this.node)
            start = index * 3
            enmyPlane[index].setPosition(pos[start], pos[start + 1], pos[start + 2])
            const comp = enmyPlane[index].getComponent(EnemyPlane)
            comp._show(this, enmyPlaneSpeed, false)
        }
    }

    _startEnemyTypeChangeLoop() {
        this.schedule(this._changeEnemy, 10, 3)
    }

    _changeEnemy() {
        this.curEnemyType++
    }

    addScore(){

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
