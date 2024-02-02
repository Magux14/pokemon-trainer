class Music {
    static audio;
    static loadMusic = (file) => {
        if (this.audio) {
            this.audio.pause();
            this.audio.currentTime = 0;
        }
        this.audio = new Audio(file);
    }

    static playMusic = () => {
        if (this.audio) {
            this.audio.play();
        }
    }

    static stopMusic = () => {
        if (this.audio) {
            this.audio.pause();
            this.audio.currentTime = 0;
        }
    }
}
export default Music;