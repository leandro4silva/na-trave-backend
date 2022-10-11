import {Request, Response} from "express";
import { AppError } from "../utils/AppError";

import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();


class HunchController{
    async create(request: Request, response: Response){
        const {user_id}= request.user;
        const {gameId, homeTeamScore = 0, awayTeamScore = 0} = request.body;

        if(!homeTeamScore && !awayTeamScore){
            throw new AppError("Insira o palpite, por favor!");
        }

        try{
            const [hunch] = await prisma.hunch.findMany({
                where: {
                    userId: user_id,
                    gameId
                }
            })

            if(hunch){

                const hunchUpdate = await prisma.hunch.update({
                    where: {
                        id: hunch.id
                    },
                    data:{
                        homeTeamScore: parseInt(homeTeamScore),
                        awayTeamScore: parseInt(awayTeamScore), 
                    }
                })
                return response.status(201).json(hunchUpdate)
            }else{
                
                const hunchCreate = await prisma.hunch.create({
                    data: {
                       homeTeamScore: parseInt(homeTeamScore),
                       awayTeamScore: parseInt(awayTeamScore), 
                       userId: user_id,
                       gameId
                    }
                })
                return response.status(201).json(hunchCreate);
            }
            
        }catch(error){
            console.log(error);
            throw new AppError("Erro inesperado ao criar palpite!");
        }
    }
}

export {
    HunchController
}