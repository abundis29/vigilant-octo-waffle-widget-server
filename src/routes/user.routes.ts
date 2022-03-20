import { Router } from "express";
import { getRepository } from "typeorm";
import { User } from "../orm/entity/User";
const userRoutes = Router()

userRoutes.get('/', async (req: any, res: any) => {
    const users = await   getRepository(User).find();
    console.log(users)
    res.json(users);
})
userRoutes.get('/:id', async (req: any, res: any) => {
    const users = await getRepository(User).findOne(req.params.id);
    console.log(users)
    res.json(users);
})
userRoutes.put('/:id', async (req: any, res: any) => {
    const user = await getRepository(User).findOne(req.params.id);
    if (!user) return
    getRepository(User).merge(user, req.body);
    const results = await getRepository(User).save(user);
    return res.send(results);
})
userRoutes.delete('/:id', async (req: any, res: any) => {
    const results = await getRepository(User).delete(req.params.id);
    return res.send(results);
})
userRoutes.post('/', async (req: any, res: any) => {
    const user = await getRepository(User).create(req.body);
    const results = await getRepository(User).save(user);
    return res.send(results);
})
export default userRoutes


