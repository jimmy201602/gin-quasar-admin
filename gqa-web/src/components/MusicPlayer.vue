<template>
    <!-- <div style="width: 100%"> -->
    <APlayer :audio="musicList" :lrc-type="3"></APlayer>
    <!-- </div> -->
</template>

<script>
import { APlayer } from '@moefe/vue-aplayer'

export default {
    name: 'musicPlayer',
    components: {
        APlayer,
    },
    data() {
        return {
            musicList: [
                {
                    name: '我怀疑你曾来过',
                    artist: '买辣椒也用券',
                    url: 'http://music.163.com/song/media/outer/url?id=1396377448.mp3',
                    cover: 'http://p2.music.126.net/PZmylpauJ5IU53TzwGlFhQ==/109951164421487591.jpg?param=130y130', // prettier-ignore
                    lrc: 'https://cdn.moefe.org/music/lrc/kiss.lrc',
                },
                {
                    name: 'Like A Bullet',
                    artist: 'Stefanie Heinzmann',
                    url: 'http://music.163.com/song/media/outer/url?id=19160471.mp3',
                    cover: 'http://p2.music.126.net/FRycyF6Akme9zl4Y8WDnNA==/2540971372048370.jpg?param=130y130', // prettier-ignore
                },
                {
                    name: '白夜（Cover 尹姝贻）',
                    artist: '凯瑟喵',
                    url: 'http://music.163.com/song/media/outer/url?id=512365425.mp3',
                    cover: 'http://p2.music.126.net/KFd0HzvhsMraliwfnRus6g==/109951163041466077.jpg?param=130y130', // prettier-ignore
                },
            ],
        }
    },
}
</script>

<style scoped>
</style>
