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
    name: 'Bill',
    dbName: 'test_bill',
    apiName: 'bills',
    apiConfig: {
      private: true,
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
    name: 'Task',
    dbName: 'test_task',
    apiName: 'tasks',
    timestamps: true,
    apiConfig: {
      private: true,
      defaultIndexSelect: '-author -bill',
      defaultIndexSort: { '_id': -1 },
      // defaultIndexPopulates: ['bill'],

      defaultShowSelect: '-author'
      // defaultShowPopulates: ['bill'],
    },

    schema: {
      bill: { type: mongoose.Schema.Types.ObjectId, ref: 'Bill', checkExist: true }, // 关联清单
      name: { default: '', type: String, trim: true, maxlength: 100 }, // 任务名称
      content: { default: '', type: String, maxlength: 1000 }, // 主内容
      close: { default: false, type: Boolean }, // 是否关闭
      closeAt: { type: Date }, // 关闭时间
      delete: { default: false, type: Boolean } // 是否删除
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
  const { Bill, Task } = models
  router.delete('/api/bills/:id/removeTask', async(ctx) => {
    const { user } = ctx.session
    const { id } = ctx.params
    ctx.assert(user, 401, '未登录')
    const temp = await Bill.deleteOne({ _id: id, author: ctx.session.user._id })
    ctx.assert(temp.deletedCount === 1, 404, '资源不存在')
    await Task.deleteMany({ bill: id })
    ctx.body = null
  })
}, { getKoaApp: true })

module.exports = app
