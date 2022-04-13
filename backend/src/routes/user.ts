import express, { Request, Response } from 'express'
import { not_found, success, conflict } from '../models/message'
import { Plant } from '../models/plant'
import { User } from '../models/user'

const router = express.Router()

router.get("/user/:username", async (req: Request, res: Response) => {
    const name = req.params.username

    const user = await User.findOne({ username: name })

    if (!user) {
        return res.status(404).json(not_found("User not found"))
    }
    else {
        return res.status(200).json({
            username: user.username,
            plants: user.plants
        })
    }
})

router.post("/user", async (req: Request, res: Response) => {
    const { username, password, plants } = req.body

    if (await User.exists({ username: username })) {
        return res.status(409).json(conflict(`User already exists`))
    }
    else {
        const user = new User({
            username: username,
            password: password,
            plants: plants
        })
        return user.save().then(() => res.status(201).json(success("User created")))
    }
})

router.delete("/user/:username",async (req:Request, res: Response) => {
    const username = req.params.username
    
    if(!await User.exists({username: username})) {
        return res.status(404).json(not_found("User not found"))
    }
    else {
        return User.deleteOne({username: username})
        .then(() => res.sendStatus(204))
    }
    
})

export { router as userRouter }