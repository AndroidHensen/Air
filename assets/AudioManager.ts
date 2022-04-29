
import { _decorator, Component, Node, AudioClip, AudioSource } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = AudioManager
 * DateTime = Fri Apr 29 2022 11:41:57 GMT+0800 (中国标准时间)
 * Author = 我爱喜洋洋
 * FileBasename = AudioManager.ts
 * FileBasenameNoExtension = AudioManager
 * URL = db://assets/AudioManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */

interface IAudioBean {
    [name: string]: AudioClip
}

@ccclass('AudioManager')
export class AudioManager extends Component {

    @property([AudioClip])
    audios: AudioClip[] = []

    beans: IAudioBean = {}

    source: AudioSource = null

    start() {
        // [3]
        this.source = this.getComponent(AudioSource)
        for (let index = 0; index < this.audios.length; index++) {
            const element = this.audios[index];
            this.beans[element.name] = element
        }
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    play(name) {
        const audio = this.beans[name]
        if (audio !== undefined) {
            this.source.playOneShot(audio)
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
