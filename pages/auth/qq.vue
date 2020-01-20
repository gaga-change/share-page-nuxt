<template>
  <div>
    登录中...
  </div>
</template>
<script>
export default {
  async mounted() {
    const hash = window.location.hash
    const accessToken = hash.match(/access_token=(.+)&/)[1]
    const user = await this.$axios.$get('/api/qq', { params: { 'access_token': accessToken } })
    this.$store.commit('setUser', user)
  }
}
</script>
