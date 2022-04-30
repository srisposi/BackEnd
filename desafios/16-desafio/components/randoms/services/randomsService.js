//import { fork } from 'child_process'
import logger from '../../..//utils/winston/winston_config.js'



const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

const generateRandoms = (cant = 100000000) => {
    
    const data = {}
    let tmp = 0

    for (let i = 0; i < cant; i++) {
        tmp = getRandomIntInclusive(1, 1000)
        let str_tmp = String(tmp)
        data[str_tmp] ? data[str_tmp] = data[str_tmp] + 1 : data[str_tmp] = 1
    }

    return data
}

class Randoms {

    async getRandoms(req) {
        try {
            const { cant } = req.query

            //let url_randomsjs = process.cwd() + '/utils/js/randoms.js'
            //const forked = fork(url_randomsjs, [cant? cant : 100000000])
            //return forked

            let response = generateRandoms(cant)
            return response        
        } catch (error) {
            logger.error(error)
        }
    }

}

export let randomsService = new Randoms()