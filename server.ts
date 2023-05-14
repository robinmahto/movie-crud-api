import { PrismaClient } from '@prisma/client';
import express from 'express';
import router from './routes';
const app = express();
const prisma = new PrismaClient();

async function  main(){

    let user = {
        username:'robin',
        email:'robin@gmail.com',
        password:'12345678'
    } 
    const createUser = await prisma.user.create({data: user})
    console.log(createUser)

    // router
    app.use(router);

}

main().then(async ()=>{
    app.listen(3000, ()=> console.log(`port running on 3000`))
    await prisma.$disconnect()
}).catch(async (e)=> {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
})