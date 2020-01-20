import SharkItem from '@/components/SharkItem';
<template>
  <div
    ref="grid"
    :class="{hidden: hidden}"
    class="PostList"
  >
    <div
      v-for="item in posts"
      :key="item._id"
      class="grid-item"
    >
      <SharkItem :post="item" />
    </div>
  </div>
</template>
<script>
import SharkItem from '@/components/SharkItem'
let Masonry = null
if (process.client) {
  Masonry = require('masonry-layout')
}
export default {
  components: { SharkItem },
  props: {
    posts: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      hidden: true
    }
  },
  mounted() {
    const grid = this.$refs.grid
    this.msnry = new Masonry(grid, {
      gutter: 18,
      itemSelector: '.grid-item',
      columnWidth: 236
    })
    this.hidden = false
  }
}
</script>
<style lang="less">
.PostList {
  overflow: hidden;
  &.hidden {
    visibility: hidden;
    max-height: 100px;
  }
  .grid-item {
    width: 236px;
     margin-bottom: 10px;
  }
}
</style>
