import {Request, Response} from "express";
import {addDays, formatISO} from "date-fns"
import {PrismaClient} from "@prisma/client"; 
const prisma = new PrismaClient()

class GameController{
    async index(request: Request, response: Response){
        const {gameTime} = request.query

        let games

        if(gameTime){
            games = await prisma.game.findMany({
                where:{
                    gameTime:{
                        gte: String(gameTime),
                        lt: formatISO(addDays(new Date(String(gameTime)), 1))
                    }
                }
            })
            return response.json(games)
        }else{           
            games = await prisma.game.findMany()
            return response.json(games)
        }

    }
}

export {
    GameController
}