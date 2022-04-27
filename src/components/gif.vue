<template>
  <div class="kc_gif"  v-show="kcflag">
      <img src="../assets/img/kc.png">
  </div>
</template>

<script>
export default {
  name: 'gif',
  data() {
    return {
      setTime: '',
      kcflag: true,
      timer: null,
    }
  },
  created() { this.threeGo() },
  methods: {
    // 开场动画倒计时关闭
    threeGo() {
      const TIME_COUNT = 1;
      if (!this.timer) {
        this.setTime = TIME_COUNT;
        this.kcflag = true;
        this.timer = setInterval(() => {
          if (this.setTime > 0 && this.setTime <= TIME_COUNT) {
            this.setTime--;
          } else {
            this.kcflag = false;
            clearInterval(this.timer);
            this.timer = null;
            //跳转的页面写在此处
          }
        }, 1000)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.kc_gif {
  width: 100vw;
  height: 100vh;
  background: url("../assets/img/login_bg.png") no-repeat;
  background-size: 100% 100%;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}
.kc_gif img {
  width: 835px;
  height: 530px;
}
@media (max-width: 1600px) {
  .kc_gif img {
    width: 565px;
    height: 359px;
  }
}
</style>
