const api = require('gaga-api')
const mongoose = require('mongoose')
const user = {

}

const plugin = {
  mongodb: {
    link: 'mongodb://localhost:27017/test'
  },
  logger: {
    enable: false
  }
}

const model = [
  {
    name: 'Classify',
    dbName: 'shark_git_classify',
    apiName: 'classifies',
    apiConfig: {
      // private: true,
      defaultIndexSelect: '-author',
      defaultIndexSort: { '_id': -1 },
      delete: ['destroy']
    },
    timestamps: true,
    schema: {
      name: { default: '', type: String, trim: true, maxlength: 100 }, // 名称
      order: { type: Number } // 排序
    }
  },
  {
    name: 'Post',
    dbName: 'shark_git_post',
    apiName: 'posts',
    timestamps: true,
    apiConfig: {
      // private: true,
      defaultIndexSelect: '-author -classify',
      defaultIndexSort: { '_id': -1 },
      // defaultIndexPopulates: ['bill'],

      defaultShowSelect: '-author'
      // defaultShowPopulates: ['bill'],
    },

    schema: {
      classify: { type: mongoose.Schema.Types.ObjectId, ref: 'Classify', checkExist: true }, // 关联分类
      content: { default: '', type: String, trim: true, maxlength: 200 }, // 主内容
      describe: { default: '', type: String, trim: true, maxlength: 400 }, // 描述
      tags: [{ type: String, trim: true, maxlength: 10 }] // 标签
    }
  }
]

const project = {
  port: 8660,
  prefix: '/api'
}

const config = {
  plugin,
  user,
  model,
  project
}

const app = api(config, (router, models) => {
  const { Classify, Post } = models
  router.delete('/api/classifies/:id/andRemovePost', async(ctx) => {
    const { user } = ctx.session
    const { id } = ctx.params
    ctx.assert(user, 401, '未登录')
    const temp = await Classify.deleteOne({ _id: id, author: ctx.session.user._id })
    await Post.deleteMany({ classify: id })
    ctx.assert(temp.deletedCount === 1, 404, '资源不存在')
    ctx.body = null
  })
}, { getKoaApp: true })

module.exports = app
