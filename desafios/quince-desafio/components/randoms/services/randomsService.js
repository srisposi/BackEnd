import { fork } from 'child_process'

class Randoms {

    async getRandoms(req) {
        try {
            const { cant } = req.query            
            let url_randomsjs = process.cwd() + '/utils/js/randoms.js'
            const forked = fork(url_randomsjs, [cant? cant : 100000000])

            return forked
        
        } catch (error) {
            console.log(error)
        }
    }

}

export let randomsService = new Randoms()