import Vue from 'vue'
import Router from 'vue-router'
import VideoWaterMark from '@/components/video-watermark/index.vue'
import VideoWaterMark3 from '@/components/video-watermark3/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'VideoWaterMark',
      component: VideoWaterMark
    },
    {
      path: '/test3',
      name: 'VideoWaterMark3',
      component: VideoWaterMark3
    }
  ]
})
