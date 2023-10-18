import express from 'express';
import UserModule from 'src/modules/users/user.module';


const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/users')



app.listen(process.env.PORT, () =>{
  console.log("Listening on", process.env.PORT)
});


export default app;
