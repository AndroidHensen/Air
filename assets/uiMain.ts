import { GameManager } from './gameManager';

import { _decorator, Component, Node, systemEvent, SystemEvent, EventTouch, Touch, Prefab, instantiate } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = UiMain
 * DateTime = Tue Apr 19 2022 19:25:58 GMT+0800 (中国标准时间)
 * Author = 我爱喜洋洋
 * FileBasename = uiMain.ts
 * FileBasenameNoExtension = uiMain
 * URL = db://assets/res/uiMain.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */

@ccclass('UiMain')
export class UiMain extends Component {
    @property
    planeSpeed = 3

    // [2]
    @property(Node)
    plane = null;
    @property(Node)
    gameStart: Node = null;
    @property(GameManager)
    gameManager: GameManager = null;

    _gameStart = false;

    start() {
        // [3]
        this.returnMain()
    }

    _touchMove(touch: Touch, event: EventTouch) {
        if (this._gameStart) {
            const delta = touch.getDelta();
            this.plane.setPosition(this.plane.position.x + 0.01 * delta.x * this.planeSpeed,
                this.plane.position.y,
                this.plane.position.z - 0.01 * delta.y * this.planeSpeed)
        }
    }

    _touchStart(touch: Touch, event: EventTouch) {
        if (!this._gameStart) {
            this._gameStart = true
            this.gameStart.active = false
            this.gameManager.gameStart()
        }
    }

    restart() {
        this.node.on(SystemEvent.EventType.TOUCH_START, this._touchStart, this);
        this.node.on(SystemEvent.EventType.TOUCH_MOVE, this._touchMove, this);
        this._gameStart = true
    }

    returnMain() {
        this.node.on(SystemEvent.EventType.TOUCH_START, this._touchStart, this);
        this.node.on(SystemEvent.EventType.TOUCH_MOVE, this._touchMove, this);
        this.gameStart.active = true
        this._gameStart = false
    }

    gameEnd() {
        this.node.off(SystemEvent.EventType.TOUCH_START, this._touchStart, this);
        this.node.off(SystemEvent.EventType.TOUCH_MOVE, this._touchMove, this);
        this._gameStart = false
    }

    update(deltaTime: number) {
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
