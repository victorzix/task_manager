import express from 'express';
import UserModule from '../modules/users/user.module';
import AuthenticationModule from 'src/modules/auth/authentication.module';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import taskModule from 'src/modules/tasks/task.module';

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/', AuthenticationModule.router)
app.use('/user', UserModule.router)
app.use('/task', taskModule.router)



app.listen(process.env.PORT, () =>{
  console.log("Listening on", process.env.PORT)
});


export default app;
