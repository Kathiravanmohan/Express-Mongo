const express= require('express')
const indexRouter= require('./Routes/index')
const userRouter= require('./Routes/user')
const PORT=process.env.PORT || 8003
const app=express()
app.use(express.json())

app.use('/',indexRouter)
app.use('/user',userRouter)

app.listen(PORT,console.log('server listening' +PORT ))