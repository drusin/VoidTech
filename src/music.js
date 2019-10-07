import music1 from './assets/music/void tech 1.ogg';
import music2 from './assets/music/void tech 2.ogg';
import music3 from './assets/music/void tech 3.ogg';

export default class Music {
    constructor(scene) {
        this.scene = scene;
        this.tracks = {};
        this.currentMusicTrack = null;
    };

    load() {
		this.scene.load.audio('music-1', music1);
		this.scene.load.audio('music-2', music2);
		this.scene.load.audio('music-3', music3);
    }

    init() {
		this.tracks.music1 = this.scene.sound.add('music-1');
		this.tracks.music2 = this.scene.sound.add('music-2');
        this.tracks.music3 = this.scene.sound.add('music-3');
        
		this.setTrack1();
    }

    setTrack1() {
        this.currentMusicTrack = this.tracks.music1;
    }

    setTrack2() {
        this.currentMusicTrack = this.tracks.music2;
    }

    setTrack3() {
        this.currentMusicTrack = this.tracks.music3;
    }

    makeSureCorrectMusicPlays() {
        if (!this.currentMusicTrack.isPlaying) {
            this.tracks.music1.stop();
            this.tracks.music2.stop();
            this.tracks.music3.stop();
            this.currentMusicTrack.play();
        }
    }
}