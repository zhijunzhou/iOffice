import './env'
import Koa from 'koa'
import json from 'koa-json'
import logger from 'koa-logger'
import auth from './server/routes/auth.js'
import api from './server/routes/api.js'
import socketUtils from './server/controllers/socket'
import jwt from 'koa-jwt'
import path from 'path'
import serve from 'koa-static'
import IO from 'koa-socket'
import historyApiFallback from 'koa2-history-api-fallback'
import koaRouter from 'koa-router'
import koaBodyparser from 'koa-bodyparser'
import cors from '@koa/cors'

const app = new Koa()
const router = koaRouter()
const io = new IO()

let port = process.env.PORT || 5000

io.attach(app)

app.use(koaBodyparser())
app.use(json())
app.use(logger())
app.use(cors())

app.use(async function(ctx, next) {
  let start = new Date()
  await next()
  let ms = new Date() - start
  console.log('%s %s - %s', ctx.method, ctx.url, ms)
})

var queue = {}

app._io.on('connection', socket => {
  socketUtils.listen(app, socket, queue)
})

app.use(async function(ctx, next) {
  //  如果JWT验证失败，返回验证失败信息
  try {
    await next()
  } catch (err) {
    if (err.status === 401) {
      ctx.status = 401
      ctx.body = {
        success: false,
        token: null,
        info: 'Protected resource, use Authorization header to get access'
      }
    } else {
      throw err
    }
  }
})

app.on('error', function(err, ctx) {
  console.log('server error', err)
})

router.use('/api', api.routes()) // 所有走/api/打头的请求都需要经过jwt验证。

app.use(router.routes()) // 将路由规则挂载到Koa上。
app.use(historyApiFallback())
app.use(serve(path.resolve('dist'))) // 将webpack打包好的项目目录作为Koa静态文件服务的目录
app.use(serve(path.resolve('uploads')))

export default app.listen(port, () => {
  console.log(`Koa is listening in ${port}`)
})
