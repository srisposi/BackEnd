import express from 'express'
import { infoController } from './controllers/infoController.js'

export const infoApi = (app) => {

    let router = express.Router()
    app.use('/api/info', router)

    router.get('/', infoController.getInfo)

}
