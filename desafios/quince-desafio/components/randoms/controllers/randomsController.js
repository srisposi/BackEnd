import { randomsService } from '../services/randomsService.js'

class Randoms {
    async getRandoms(req, res, next) {
        try {
            let forked = await randomsService.getRandoms(req)

            forked.on('message', msg => {
                if(msg == 'ready'){
                    console.log(msg)
                    forked.send("Esperando resultado.")
                } else {
                    res.render('randoms', {data: msg, cant: req.query.cant || 100000000} )
                }
            })

        } catch (error) {
            console.log(error)
        }

    }

}

export let randomsController = new Randoms()
