<template>
  <div>
<compHeader></compHeader>
<router-view></router-view>
<compFooter></compFooter>
  </div>
</template>

<script>
import  compHeader from '../src/components/header/Header.vue';
import  compFooter from '../src/components/header/Footer.vue';
export default {
  components : {
  compHeader,
  compFooter
},
created (){ 
  this.$store.dispatch('admin/refreshToken')
 }
}
</script>

<style>
@import './assets/style.css';
</style>
