import express from 'express'
import cors from 'cors'
import { config as configAtlas } from './config/mongodbAtlas.js'
import { engine } from 'express-handlebars';
import { serverRoutes } from './routes/index.js'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import { serverPassport } from './config/passport.js'
import cluster from 'cluster'
import fs from 'fs'
import https from 'https'
import logger from './utils/winston/winston_config.js';
import compression from 'compression'
//import { Server as HttpServer } from 'http'
import os from 'os'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { serverSocketsEvents } from './config/socketEvents.js';
import { setupMaster, setupWorker } from "@socket.io/sticky";
import { createAdapter, setupPrimary } from "@socket.io/cluster-adapter";


const app = express()
// SERVER HTTPS
const credentials = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};


// Middlewares
app.use(compression())
app.use(cors("*"));
app.use(cookieParser())
// Settings
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(express.static('node_modules/bootstrap/dist'))


// defino el motor de plantilla
app.engine('.hbs', engine({
    extname: ".hbs",
    defaultLayout: 'index.hbs',
    layoutDir: "views/layouts/",
    partialsDir: "views/partials/"
})
)

app.set('views', './views'); // especifica el directorio de vistas
app.set('view engine', '.hbs'); // registra el motor de plantillas


const httpsServer = https.createServer(credentials, app);

// const httpServer = new HttpServer(app)

// CONFIG SESION WITH MONGO STORE
const advanceOptions = { useNewUrlParser: true, useUnifiedTopology: true }

const DB_PASS = configAtlas.db_pass
const DB_DOMAIN = configAtlas.db_domain
const DB_NAME = configAtlas.db_name
const DB_USER = configAtlas.db_user


app.use(session({
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_DOMAIN}/${DB_NAME}?retryWrites=true&w=majority`,
        mongoOptions: advanceOptions
    }),
    secret: 'secreto',
    saveUninitialized: false,
    resave: false,
    rolling: true,
    cookie: {
        httpOnly: false,
        secure: true,
        maxAge: 600 * 1000,
        sameSite: 'none'
    }
}))


// CONFIG PASSPORTS
const passport = serverPassport(app)

// CONFIG SERVER ROUTERS 
serverRoutes(app, passport)



const numCPUs = os.cpus().length

const argv = yargs(hideBin(process.argv))
    .default({
        modo: 'FORK',
        puerto: 8080
    })
    .alias({
        m: 'modo',
        p: 'puerto'
    })
    .argv

const PORT = argv.puerto

logger.info(`Valor de entorno NODE_ENV: ${process.env.NODE_ENV}`);


if (argv.modo.toUpperCase() == 'CLUSTER') {

    if (cluster.isPrimary) {
        logger.log(`Master Cluster PID ${process.pid} is running.`)

        // setup sticky sessions
        setupMaster(httpsServer, {
            loadBalancingMethod: "least-connection",
        });

        // setup connections between the workers
        setupPrimary();

        // FORK WORKER
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork()
        }

        cluster.on('exit', (worker, code, signal) => {
            logger.warn(`worker ${worker.process.pid} died.`)
            cluster.fork()
        })

    } else {

        let io = serverSocketsEvents(httpsServer)

        const server = httpsServer.listen(PORT, (err) => {
            if (err) {
                logger.error("Error while starting server")
            } else {
                logger.info(
                    `
                    ------------------------------------------------------------
                    WORKER ${server.address().port}  Process Pid: ${process.pid}
                    Open link to https://localhost:${server.address().port}     
                    -------------------------------------------------------------
                    `
                )
            }
        })

        // use the cluster adapter
        io.adapter(createAdapter());

        // setup connection with the primary process
        setupWorker(io);

        server.on('error', error => logger.error(`Error en servidorProcess Pid: ${process.pid}: ${error}`))
    }
    
} else {

    serverSocketsEvents(httpsServer)

    const server = httpsServer.listen(PORT, 'localhost', (err) => {
        if (err) {
            logger.error("Error while starting server")
        } else {
            logger.info(
                `
                ------------------------------------------------------------
                Servidor http escuchando en el puerto ${server.address().port}
                Open link to https://localhost:${server.address().port}      
                -------------------------------------------------------------
                `
            )
        }
    })

    server.on('error', error => logger.error(`Error en servidor ${error}`))

}











