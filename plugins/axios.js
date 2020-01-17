import { Message } from 'element-ui'
export default function({ $axios, redirect }) {
  // Change URL only for client
  if (process.client) {
    $axios.setBaseURL('http://localhost:9911/')
  }
  // Change URL only for server
  if (process.server) {
    $axios.setBaseURL('http://localhost:9911/')
  }
  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    // console.log(error.response)
    if (code === 401) {
      redirect('/auth/login')
    } else {
      Message.error(error.response.data)
    }
  })
}