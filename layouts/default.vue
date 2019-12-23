<template>
  <div class="LayoutDefault">
    <el-container>
      <el-header>
        <v-header />
      </el-header>
      <el-container>
        <el-main>
          <nuxt />
        </el-main>
        <el-aside width="220px">
          <v-aside />
        </el-aside>
      </el-container>
      <el-footer>
        <v-footer />
      </el-footer>
    </el-container>
    <el-backtop></el-backtop>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Aside from "@/components/Aside";
export default {
  components: {
    "v-header": Header,
    "v-footer": Footer,
    "v-aside": Aside
  }
};
</script>

<style lang="less">
.LayoutDefault {
  width: 100%;
  @media (min-width: 1140px) {
    width: 1140px;
    margin: auto;
  }
}
</style>
