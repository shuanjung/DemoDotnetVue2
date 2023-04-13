<template>
  <div class="home">
    <div class="fix">
      <form class="form-signin">
        <img class="mb-4" src="../assets/自來水logo.png" alt="自來水公司LOGO" width="72" height="72" />
        <h1 class="h4 mb-3 font-weight-bold">圖資查詢系統</h1>
        <h1 class="h5 mb-3 font-weight-bold">(行動版)</h1>
        <b-form-select class="form-control mb-4 font-weight-bold selectfix" v-model="selected" :options="options"></b-form-select>
        
      </form>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
