import todo from '../controllers/todolist'
import koaRouter from 'koa-router'
import upload from '../controllers/upload'
import auth from '../controllers/auth'
const router = koaRouter()

router.get('/todolist/:id', todo.getTodolist)
router.post('/todolist', todo.createTodolist)
router.delete('/todolist/:userId/:id', todo.removeTodolist)
router.put('/todolist/:userId/:id/:status', todo.updateTodolist)

router.post('/upload', upload.uploadSetting.single('file'), upload.upload)
router.get('/token', auth.token)

export default router
