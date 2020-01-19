<template>
  <div class="container">
    <div>
      <el-row :gutter="20">
        <el-col
          :xs="24"
          :sm="12"
          :md="8"
          :lg="8"
          v-for="item in posts"
          :key="item._id"
        >
          <SharkItem :post="item" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import SharkItem from '@/components/SharkItem'
export default {
  components: { SharkItem },
  data() {
    return {
      posts: []
    }
  },
  async asyncData({ $axios }) {
    const { list: posts } = await $axios.$get('/api/posts')
    return {
      posts
    }
  },
  created() {

  },
  methods: {

  }
}
</script>
