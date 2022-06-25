<template>
  <div class='wrapper' id="wrapper" >
    <!-- webkit-playsinline="true" playsinline="true" -->
    <video-player ref="test" id="video_watermark_element" class="vjs-custom-skin" :options="playerOptions" />
  </div>
</template>

<script>
import { Watermark } from '@/util/watermark.js'

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
        controls: true,
        sources: [
          {
            src: window.src,//'https://fl-01.vips100.com/v2/mts/video/preview?X-LENOVO-SESS-ID=401434f7a0aa46b49cacc57863b05a26_823390_2528155_meta&neid=5067747485&hash=bf509fcda515c2bf6b56ef650380c3b5&rev=f213541fdc404546881b493cee7a8e9b&type=av&bytes=7768145&path=%252F%25E7%258E%258B%25E5%2593%25AA%25E8%25B7%2591%25E6%25B5%258B%25E8%25AF%2595%25E6%2596%2587%25E4%25BB%25B6%25E5%25A4%25B9%252F%25E5%25B1%258F%25E5%25B9%2595%25E5%25BD%2595%25E5%2588%25B62022-04-21%2B21.24.39.mov&extension=.mov&nsid=2240128&atk=60b7a5dd4da4f17eb965e6f9d808f6b6&vt=1651140112551',
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
    addwatermarkElement() {
      setTimeout(() => {
        this.drawWatermark()
        console.log('====')
        document.addEventListener('click', this.handleClick)
        const fullScreenBtn = document.getElementsByClassName('vjs-fullscreen-control')[0]
        const playModeBtn = document.createElement('div')
        playModeBtn.id = 'video-player-element'
        // 增加清晰度切换按钮
        playModeBtn.classList.add(
          'vjs-subs-caps-button',
          'vjs-menu-button',
          'vjs-menu-button-popup',
          'vjs-control',
          'vjs-button'
        )
        let modeBtnListStr = ''
        this.ids.forEach(item => {
          modeBtnListStr += `
            <li
              id="${item}"
              ${item === this.currentMode ? 'class="menu-item-selected"' : ''}
              role="menuitem">
              ${item}
            </li>
          `
        })
        const innerText = `
          <button
            id="current_mode_text"
            class="vjs-subs-caps-button vjs-menu-button vjs-menu-button-popup vjs-button"
            type="button"
            aria-disabled="false"
            aria-haspopup="true"
            aria-expanded="false"
          >
            ${this.currentMode}
          </button>
          <div class="vjs-menu" id="video_mode_menu">
            <ul class="vjs-menu-content" role="menu">
              ${modeBtnListStr}
            </ul>
          </div>
        `
        playModeBtn.innerHTML = innerText
        fullScreenBtn.parentNode.insertBefore(playModeBtn, fullScreenBtn)
      }, 100);
    },
    drawWatermark() {
      setTimeout(() => {
        const realVideoElement = document.getElementsByClassName('vjs-tech')[0]
        const exist = document.getElementById('watermark-canvas')
        if(exist) {
          exist.parentNode.removeChild(exist)
        }
        const waterMarkVideo = document.getElementById('video_watermark_element')
        const watermarkParam = {
          alpha: 0.6,
          angle: -45,
          color: "#F9C405",
          size: 25,
          watermarkText:
            "zxl-test桃子 zxl@test.com 20220420 15:45/zxl-test桃子 zxl@test.com 20220420 16:08/噢噢噢噢感结核杆菌咕叽咕叽过",
          top: 0,
          left: 0,
          waterWidth: realVideoElement.offsetWidth,
          waterHeight: realVideoElement.offsetHeight,
          offsetX: 30,
          offsetY: 30,
          lineY: 6,
        };
        const watermarkElement = new Watermark(
          watermarkParam
        ).getWatermarkElement()
        waterMarkVideo.firstChild.appendChild(watermarkElement)
      }, 100);
    },
    handleClick(event) {
      const id = event.target.id
      console.log('this.$refs.test.player', this.$refs.test.player.currentTime())
      if(id==='current_mode_text') {
        if(document.fullscreenElement) {
          document.exitFullscreen()
        } else {
          document.getElementById('wrapper').requestFullscreen()
        }
      }

      // 切换模式按钮 -- 展示/隐藏menu
      const videoModeMenu = document.getElementById('video_mode_menu')
      if (id === 'current_mode_text') {
        if (videoModeMenu.classList.contains('vjs-lock-showing')) {
          videoModeMenu.classList.remove('vjs-lock-showing')
          // test.requestFullscreen()
          // efs.call(document)
        } else {
          videoModeMenu.classList.add('vjs-lock-showing')
          // rfs.call(document)
          // test.exitFullscreen()
        }
      } else if (id === 'HD') {
        this.currentMode = 'HD'
      } else if (id === '极速') {
        this.currentMode = '极速'
      }
    },
    /**
     * resize 事件 用于重画水印
     */
    handleResize(event) {
      const realVideoElement = document.getElementsByClassName('vjs-tech')[0]
      this.drawWatermark()
    },
  },
  mounted() {
    this.addwatermarkElement()
    window.addEventListener('resize', this.handleResize, false)
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
#video_watermark_element {
  max-width: 100%;
  max-height: 100%;
}

</style>
