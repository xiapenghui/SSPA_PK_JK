<template>
  <div class="pkContainer">
    <Header></Header>
    <router-view></router-view>
  </div>
</template>
<script>
import Header from '@/components/header/header'
export default {
  components: { Header },
  data() {
    return {
      
    }
  }
}
</script>
