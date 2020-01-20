<template>
  <div class="container">
    <PostList :posts="posts" />
  </div>
</template>

<script>
import PostList from '@/components/PostList'
export default {
  components: { PostList },
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
