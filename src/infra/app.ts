import express from 'express';
import UserModule from '../modules/users/user.module';
import AuthenticationModule from 'src/modules/auth/authentication.module';


const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/user', UserModule.router)
app.use('/', AuthenticationModule.router)



app.listen(process.env.PORT, () =>{
  console.log("Listening on", process.env.PORT)
});


export default app;
