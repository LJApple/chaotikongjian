<template>
  <div id="app" class=“app”>
   <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'App'
}
</script>

<style scope lang="stylus" rel="stylesheet/stylus">
</style>
