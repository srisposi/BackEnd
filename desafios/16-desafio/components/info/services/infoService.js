import { fork } from 'child_process'
import getInfo from '../../../utils/js/getInfo.js'
import logger from '../../..//utils/winston/winston_config.js'

class Info {

    async getInfo() {
        try {

            let info = getInfo()
            return { status: "OK", info: info }

            // let url_getinfo = process.cwd() + '/utils/js/getInfo.js'
            // const forked = fork(url_getinfo)
            // return forked

        } catch (error) {
            logger.error(error)
        }
    }

}

export let infoService = new Info()