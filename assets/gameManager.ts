import { SlefPlane } from './slefPlane';
import { AudioManager } from './AudioManager';
import { UiMain } from './uiMain';
import { BulletProp } from './bulletProp';
import { Constants } from './Constants';

import { _decorator, Component, Node, systemEvent, SystemEvent, EventTouch, Touch, Prefab, instantiate, math, Vec3, Collider, macro, Label, Animation } from 'cc';
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
    isShotting = false
    isGameStart = false

    @property
    planeSpeed = 3

    // [2]
    @property(SlefPlane)
    plane: SlefPlane = null;

    @property(Node)
    blood: Node = null
    @property(Node)
    bloodRoot: Node = null

    @property(Prefab)
    bullet01 = null;
    @property(Prefab)
    bullet02 = null;
    @property(Prefab)
    bullet03 = null;
    @property(Prefab)
    bullet04 = null;
    @property(Prefab)
    bullet05 = null;

    @property(Node)
    bulletRoot: Node = null;

    @property(Prefab)
    enemy01 = null;
    @property(Prefab)
    enemy02 = null;

    @property(Prefab)
    bulletM = null;
    @property(Prefab)
    bulletH = null;
    @property(Prefab)
    bulletS = null;

    @property(Node)
    gamingPage: Node = null;
    @property(Node)
    gameEndPage: Node = null;
    @property(UiMain)
    uiMain: UiMain = null;

    @property(Animation)
    gameEndAnim: Animation = null
    @property(AudioManager)
    audioManager: AudioManager = null

    @property(Prefab)
    enemyPlaneExport = null;

    shoottime = 0.2;
    curShootTime = 0;

    enemyTime = 0.5; //0.5秒出一个敌机
    curEnemyTime = 0;
    curEnemyType = 0;

    curSocre = 0;
    curBlood = 5;

    @property(Label)
    socreLabel: Label = null;
    @property(Label)
    socreLabelEnd: Label = null;

    curBulletType = Constants.BulletType.BULLET_M

    start() {
        this.gameEndPage.active = false
        this.gamingPage.active = false
    }

    update(deltaTime: number) {
        if (!this.isGameStart) {
            return
        }

        // [4]
        this.curShootTime += deltaTime
        if (this.isShotting && this.curShootTime > this.shoottime) {
            if (this.curBulletType === Constants.BulletType.BULLET_H) {
                this._createBulletH()
                this.audioManager.play("bullet1")
            } else if (this.curBulletType === Constants.BulletType.BULLET_S) {
                this._createBulletS()
                this.audioManager.play("bullet2")
            } else {
                this._createBulletM()
                this.audioManager.play("bullet1")
            }
            this.curShootTime = 0
        }

        this.curEnemyTime += deltaTime
        if (this.curEnemyType === 0) {
            if (this.curEnemyTime > this.enemyTime) {
                this._createEnemy01(0.1)
                this.curEnemyTime = 0
            }
        } else if (this.curEnemyType === 1) {
            if (this.curEnemyTime > this.enemyTime * 0.9) {
                if (math.randomRangeInt(1, 6) === 1) {
                    this._createEnemy02(0.08)
                } else {
                    this._createEnemy01(0.13)
                }
                this.curEnemyTime = 0
            }
        } else if (this.curEnemyType === 2) {
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

    _createBulletM() {
        const bullet = instantiate<Node>(this.bullet01);
        bullet.setParent(this.bulletRoot)

        const pos = this.plane.node.position
        bullet.setPosition(pos.x, pos.y, pos.z - 1)

        const bulletComp = bullet.getComponent(Bullet)
        bulletComp._show(false, 0.1)
    }

    _createBulletH() {
        const pos = this.plane.node.position

        //left
        const bullet1 = instantiate<Node>(this.bullet03);
        bullet1.setParent(this.bulletRoot)

        bullet1.setPosition(pos.x - 0.3, pos.y, pos.z - 1)

        const bulletComp1 = bullet1.getComponent(Bullet)
        bulletComp1._show(false, 0.1)

        //right
        const bullet2 = instantiate<Node>(this.bullet03);
        bullet2.setParent(this.bulletRoot)

        bullet2.setPosition(pos.x + 0.3, pos.y, pos.z - 1)

        const bulletComp2 = bullet2.getComponent(Bullet)
        bulletComp2._show(false, 0.1)
    }

    _createBulletS() {
        const pos = this.plane.node.position

        //middle
        const bullet = instantiate<Node>(this.bullet05);
        bullet.setParent(this.bulletRoot)

        bullet.setPosition(pos.x, pos.y, pos.z - 1)

        const bulletComp = bullet.getComponent(Bullet)
        bulletComp._show(false, 0.1)

        //left
        const bullet1 = instantiate<Node>(this.bullet05);
        bullet1.setParent(this.bulletRoot)

        bullet1.setPosition(pos.x - 0.3, pos.y, pos.z - 1)

        const bulletComp1 = bullet1.getComponent(Bullet)
        bulletComp1._show(false, 0.1, Constants.Direction.LEFT)

        //right
        const bullet2 = instantiate<Node>(this.bullet05);
        bullet2.setParent(this.bulletRoot)

        bullet2.setPosition(pos.x + 0.3, pos.y, pos.z - 1)

        const bulletComp2 = bullet2.getComponent(Bullet)
        bulletComp2._show(false, 0.1, Constants.Direction.RIGHT)
    }

    _createBulletProp() {
        const type = math.randomRangeInt(1, 4)
        let bulletProp = null
        if (type === Constants.BulletType.BULLET_M) {
            bulletProp = instantiate<Node>(this.bulletM)
        } else if (type === Constants.BulletType.BULLET_S) {
            bulletProp = instantiate<Node>(this.bulletS)
        } else {
            bulletProp = instantiate<Node>(this.bulletH)
        }
        bulletProp.setParent(this.node)
        bulletProp.setPosition(4, 0, -10)

        const bulletComp = bulletProp.getComponent(BulletProp)
        bulletComp.show(this)
    }

    _createEnemyBullet01(posotion: Vec3) {
        const bullet = instantiate<Node>(this.bullet01);
        bullet.setParent(this.bulletRoot)

        bullet.setPosition(posotion.x, 3, posotion.z + 1)

        const bulletComp = bullet.getComponent(Bullet)
        bulletComp._show(true, 0.2)
        const collider = bullet.getComponent(Collider)
        collider.setGroup(Constants.CollisionT.ENEMY_BULLET)
        collider.setMask(Constants.CollisionT.SELF_PLANE)
    }

    createEnemyExpore(pos: Vec3) {
        const expore = instantiate<Node>(this.enemyPlaneExport);
        expore.setParent(this.node)
        expore.setPosition(pos)
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

    _changeEnemy() {
        this.curEnemyType++
        this.curEnemyType = this.curEnemyType % 3
        this._createBulletProp()
    }

    changeBulletType(bulletType) {
        this.curBulletType = bulletType
    }

    gameStart() {
        this.plane.hideExport()
        this.schedule(this._changeEnemy, 5, macro.REPEAT_FOREVER)
        this._createBulletProp()
        this.isShotting = true
        this.isGameStart = true
        this.curSocre = 0
        this.curBlood = 5
        this.socreLabel.string = this.curSocre.toString()
        this.gameEndPage.active = false
        this.gamingPage.active = true
    }

    gameEnd() {
        this.plane.showExpore()
        this.audioManager.play("player")
        this.curEnemyType = 0
        this.isShotting = false
        this.isGameStart = false
        this.gamingPage.active = false
        this.gameEndPage.active = true
        this.socreLabelEnd.string = this.curSocre.toString()
        this.unschedule(this._changeEnemy)
        this.node.destroyAllChildren()
        this.bulletRoot.destroyAllChildren()
        this.curBulletType = Constants.BulletType.BULLET_M
        this.uiMain.gameEnd()
        this.gameEndAnim.play()
    }

    restart() {
        this.audioManager.play("button")
        this.gameStart()
        this.uiMain.restart()
    }

    returnMain() {
        this.audioManager.play("button")
        this.isShotting = false
        this.isGameStart = false
        this.gamingPage.active = false
        this.gameEndPage.active = false
        const pos = this.plane.node.position
        this.plane.node.setPosition(0, pos.y, 0)
        this.uiMain.returnMain()
    }

    reduceBlood() {
        this.curBlood--;
        if (this.curBlood !== 5) {
            this.bloodRoot.active = true
        }
        this.blood.setScale(this.curBlood / 5, 1, 1)
        if (this.curBlood === 0) {
            this.bloodRoot.active = false
            this.gameEnd()
        }
    }

    addScore() {
        this.audioManager.play("enemy")
        this.curSocre++
        this.socreLabel.string = this.curSocre.toString()
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
