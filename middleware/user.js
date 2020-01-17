// export default function (context) {
//   context.userAgent = process.server ? context.req.headers['user-agent'] : navigator.userAgent
// }
export default function({ store, req }) {
  if (process.server && req.ctx.session.user) {
    store.commit('setUser', req.ctx.session.user)
  }
}
