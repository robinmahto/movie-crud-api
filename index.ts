import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB

async function  main(){

    let user = {
        username:'robin',
        email:'robin@gmail.com',
        password:'12345678'
    } 
    const createUser = await prisma.user.create({data: user})
    console.log(createUser)
}

main().then(async ()=> await prisma.$disconnect()).catch(async (e)=> {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
})