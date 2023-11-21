import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import AuthenticationModule from 'src/modules/auth/authentication.module';
import UserModule from '../modules/users/user.module';
import taskModule from 'src/modules/tasks/task.module';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from '../swagger.json'

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use('/', AuthenticationModule.router)
app.use('/user', UserModule.router)
app.use('/task', taskModule.router)



app.listen(process.env.PORT, () =>{
  console.log("Listening on", process.env.PORT)
});


export default app;
