<template>
  <div class='wrapper'>
    <!-- webkit-playsinline="true" playsinline="true" -->
    <!-- <video-player :controls="false"  x5-video-player-type="h5" ref="test" id="video_watermark_element" class="vjs-custom-skin" :options="playerOptions" /> -->
    <!-- <div id="mui-player"></div> -->
    <div class="video-wrapper">
      <div id="vs">
        <!-- <div class="watermark">sdsgjdgsj</div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { Watermark } from '@/util/watermark.js'
import Player from 'xgplayer';


export default {
  components: {},
  data() {
    return {
      playerOptions: {
        autoplay: true,
        muted: false,
        loop: false,
        preload: 'metadata',
        language: 'en',
        aspectRatio: '16:9',
        fluid: true,
        sources: [
          {
            src: 'https://fl-01.vips100.com/v2/mts/video/preview?X-LENOVO-SESS-ID=401434f7a0aa46b49cacc57863b05a26_823390_2528155_meta&neid=5067747485&hash=bf509fcda515c2bf6b56ef650380c3b5&rev=f213541fdc404546881b493cee7a8e9b&type=av&bytes=7768145&path=%252F%25E7%258E%258B%25E5%2593%25AA%25E8%25B7%2591%25E6%25B5%258B%25E8%25AF%2595%25E6%2596%2587%25E4%25BB%25B6%25E5%25A4%25B9%252F%25E5%25B1%258F%25E5%25B9%2595%25E5%25BD%2595%25E5%2588%25B62022-04-21%2B21.24.39.mov&extension=.mov&nsid=2240128&atk=d662654e06fe8925d6801dedbdc6eab2&vt=1651124770877',
            type: 'video/mp4',
          },
        ],
        bigPlayButton: true,
        controlBar: {
          remainingTimeDisplay: false,
          fullscreenToggle: true, // 全屏按钮
        },
        playsinline: true,
        allowsInlineMediaPlayback: false
      },
      ids: ['HD', '极速'],
      currentMode: 'HD'
    };
  },
  methods: {
    resizeHandler() {
      setTimeout(() => {
      // this.$nextTick(() => {
        const body = document.body
        const videoElement = document.getElementById('vs')
        console.log('resize', body.offsetWidth, body.offsetHeight,
        videoElement.offsetWidth, videoElement.offsetHeight)
        const marginTop = (body.offsetHeight - videoElement.offsetHeight) / 2
        const marginLeft = (body.offsetWidth - videoElement.offsetWidth) / 2
        videoElement.style.marginTop = marginTop + 'px'
        videoElement.style.marginLeft = marginLeft + 'px'
      // })
      }, 500);
    },
  },
  updated() {
    // this.resizeHandler()
    console.log('upfate====', document.getElementsByClassName('xgplayer-loading'))
  },
  mounted() {
    // window.addEventListener('resize', this.resizeHandler)
    const player = new Player({
      id: 'vs',
      url: window.src,
      width: '100%',
      height: 'auto',
      fitVideoSize: 'fixWidth',
      // rotateFullscreen: true,
      cssFullscreen: true,
      definitionActive: 'click',
      playsinline: true,
      videoInit: true,
      ignores: ['fullscreen']
    })
    player.emit('resourceReady', [{name: '高清', url: window.src},
    {name: '超清', url: window.src}]);
    // this.resizeHandler()
    setTimeout(() => {
      console.log('upfate====', document.getElementsByClassName('xgplayer-loading')[0])
      // const loadingIcon = document.getElementsByClassName('xgplayer-loading')[0]
      // loadingIcon.classList.add('my-loading-icon')
      // loadingIcon.innerHTML = 'hadjhashdhhhhhh哈哈哈哈哈哈哈哈哈哈哈'
      // const errorIcon = document.getElementsByClassName('xgplayer-error')[0]
      // errorIcon.innerHTML = 'hadjhashdhhhhhh哈哈哈哈哈哈哈哈哈哈哈'

    }, 100);

  },
}
</script>
<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.wrapper .video-wrapper {
  /* width: 100%;
  height: 100%; */
  /* background-color: antiquewhite; */
  /* display: flex;
  flex-direction: column;
  justify-content: center; */
}
.wrapper .watermark {
  position: absolute;
  top: 0;
  left: 0;
  color: red;
}
#vs {
  /* width: 100%;
  height: 100%; */
  /* display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center; */
  /* margin-top: 50%; */
  /* margin-left: 50%; */
}
.xgplayer-skin-default .xgplayer-loading {
  display: block;
  background-color: red !important;
}
.my-loading-icon {
  background-color: red;
}
</style>
