<template>
  <div>
    <el-form ref="form" :model="form" label-width="100px" class="">
      <el-form-item
        :rules="[
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change']
          }
        ]"
        prop="email"
        label="邮箱"
      >
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item
        :rules="[
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在6-20位', trigger: 'blur' }
        ]"
        prop="password"
        label="密码"
      >
        <el-input v-model="form.password" type="password" />
      </el-form-item>
      <div>
        <el-button @click="login" type="primary">
          登录
        </el-button>
        <router-link to="/auth/register">
          去注册
        </router-link>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      this.$refs.form.validate(async(valid) => {
        if (valid) {
          const user = await this.$axios.$post('/api/auth/login', this.form)
          this.$store.commit('setUser', user)
          this.$message.success('登录成功')
          this.$router.push('/')
        }
      })
    }
  }
}
</script>
