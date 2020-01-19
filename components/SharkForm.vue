<template>
  <el-dialog :visible.sync="visible" title="分享">
    <el-form ref="form" :model="form" :rules="rules" class="SharkForm">
      <el-form-item :label-width="formLabelWidth" label="项目地址" prop="content">
        <el-input v-model="form.content" autocomplete="off" placeholder="github、码云、CODING... 项目地址" maxlength="200" />
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="描述信息" prop="describe">
        <el-input
          v-model="form.describe"
          type="textarea"
          placeholder="请输入内容"
          maxlength="400"
          show-word-limit
        />
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="分类" prop="classify">
        <el-radio-group v-model="form.classify" class="mr10">
          <el-radio :label="item._id" :key="item._id" v-for="item in classifies" class="mb5">
            {{ item.name }}
          </el-radio>
        </el-radio-group>
        <template>
          <el-input
            ref="saveClassifyInput"
            v-if="inputClassifyVisible"
            v-model="inputClassifyValue"
            @keyup.enter.native="handleInputClassifyConfirm"
            @blur="handleInputClassifyConfirm"
            class="input-new-tag"
            size="small"
            maxlength="100"
          />
          <el-button v-else :loading="addClassifyLoading" @click="showClassifyInput" class="button-new-tag" size="small">
            + 分类
          </el-button>
        </template>
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="标签">
        <el-tag
          :key="tag"
          v-for="tag in dynamicTags"
          :disable-transitions="false"
          @close="handleClose(tag)"
          class="mr10"
          closable
        >
          {{ tag }}
        </el-tag>
        <template v-if="dynamicTags.length < 10">
          <el-input
            ref="saveTagInput"
            v-if="inputTagVisible"
            v-model="inputTagValue"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
            class="input-new-tag"
            size="small"
            maxlength="10"
          />
          <el-button v-else @click="showInput" class="button-new-tag" size="small">
            + 标签
          </el-button>
        </template>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">
        取 消
      </el-button>
      <el-button @click="submitForm" type="primary">
        确 定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean
    }
  },
  data() {
    return {
      visible: false,
      classifies: [],
      // visible: true,
      formLabelWidth: '120px',
      form: {
        content: '',
        describe: '',
        classify: ''
      },
      rules: {
        content: [
          { required: true, message: '必填项', trigger: ['blur', 'change'] },
          { type: 'url', message: '请输入正确的url地址，例如:https://github.com/vuejs/vue' }
        ],
        describe: [{ required: true, message: '必填项', trigger: ['blur', 'change'] }],
        classify: [{ required: true, message: '必填项', trigger: ['blur', 'change'] }]
      },
      dynamicTags: [],
      addClassifyLoading: false,
      inputTagVisible: false,
      inputTagValue: '',
      inputClassifyVisible: false,
      inputClassifyValue: ''
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  watch: {
    show(val) {
      if (val) {
        this.visible = true
      }
    },
    visible(val) {
      if (!val) {
        this.$emit('update:show', false)
      }
    }
  },
  created() {
    this.initClasify()
  },
  methods: {
    /** 初始化分类 */
    async initClasify() {
      const { list: classifies } = await this.$axios.$get(`/api/classifies?author=${this.user._id}`)
      this.classifies = classifies
    },
    submitForm() {
      this.$refs.form.validate(async(valid) => {
        if (valid) {
          const params = { ...this.form, tags: this.dynamicTags }
          this.submitLoading = true
          await this.$axios.$post(`/api/posts`, params).finally(() => {
            this.submitLoading = false
          })
          this.$message.success('添加成功！')
          this.dynamicTags = []
          this.$refs.form.resetFields()
          this.visible = false
        }
      })
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    showClassifyInput() {
      this.inputClassifyVisible = true
      this.$nextTick((_) => {
        this.$refs.saveClassifyInput.$refs.input.focus()
      })
    },
    showInput() {
      this.inputTagVisible = true
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    /** 添加分类 */
    async handleInputClassifyConfirm() {
      this.inputClassifyVisible = false
      if (this.addClassifyLoading || !this.inputClassifyValue) {
        return
      }
      this.addClassifyLoading = true
      const inputValue = this.inputClassifyValue
      this.inputClassifyValue = ''
      const newClassify = await this.$axios
        .$post(`/api/classifies`, { name: inputValue })
        .finally(() => {
          this.addClassifyLoading = false
        })
      this.classifies.push(newClassify)
    },
    handleInputConfirm() {
      const inputValue = this.inputTagValue
      if (this.dynamicTags.includes(inputValue)) {
        return this.$message.error(`标签【${inputValue}】已存在`)
      }
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputTagVisible = false
      this.inputTagValue = ''
    }
  }
}
</script>
<style lang="less">
.SharkForm {
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    // margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    // margin-left: 10px;
    vertical-align: bottom;
  }
}
</style>
