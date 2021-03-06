const api = require('gaga-api')
const axios = require('axios')
const mongoose = require('mongoose')
const prefix = 'share_git_'
const user = {
  dbName: 'gaga_test_user',
  schema: {
    openid: { type: String },
    unionid: { type: String }
  },
  timestamps: true // 默认true
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
    dbName: prefix + 'classify',
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
    dbName: prefix + 'post',
    apiName: 'posts',
    timestamps: true,
    apiConfig: {
      // private: true,
      defaultIndexSelect: '-classify',
      defaultIndexSort: { '_id': -1 },
      defaultIndexPopulates: ['author'],

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
  const { Classify, Post, User } = models
  router.delete('/api/classifies/:id/andRemovePost', async(ctx) => {
    const { user } = ctx.session
    const { id } = ctx.params
    ctx.assert(user, 401, '未登录')
    const temp = await Classify.deleteOne({ _id: id, author: ctx.session.user._id })
    await Post.deleteMany({ classify: id })
    ctx.assert(temp.deletedCount === 1, 404, '资源不存在')
    ctx.body = null
  })
  router.get('/api/qq', async(ctx) => {
    const { access_token: accessToken } = ctx.query
    const url = `https://graph.qq.com/oauth2.0/me?access_token=${accessToken}&unionid=1`
    const { data } = await axios.get(url)
    const jsonStr = data.match(/^callback\((.+)\);/)[1]
    const { openid, unionid } = JSON.parse(jsonStr)
    const findUser = await User.findOne({ openid })
    if (findUser) {
      ctx.session.user = findUser
    } else {
      const { data: qqUserDetail } = await axios.get('https://graph.qq.com/user/get_user_info', {
        params: {
          access_token: accessToken,
          openid,
          oauth_consumer_key: 101844921
        }
      })
      const newUser = new User({ avatar: qqUserDetail.figureurl_qq_1, openid, unionid })
      await newUser.save()
      ctx.session.user = newUser
    }
    ctx.body = ctx.session.user
  })
}, { getKoaApp: true })

module.exports = app
