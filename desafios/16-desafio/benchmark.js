import autocanno from "autocannon"
import { PassThrough } from 'stream'
import logger from "./utils/winston/winston_config.js"

function run(url){
    const buf = []
    const outputStream = new PassThrough()

    const inst = autocanno({
        url,
        connections: 100,
        duration:20
    })

    autocanno.track(inst, {outputStream})

    outputStream.on('data', data => buf.push(data))

    inst.on('done', () => {
        process.stdout.write( Buffer.concat(buf) )
    })

}

logger.info("Running all benchmarks in parallel ...")

run('https://localhost:8080/api/info')
run('https://localhost:8080/api/info?verbose=1')
