import os from 'os'

class Info {

    async getInfo() {
        try {

            const info = [
                {
                    key: 'Argumentos de entrada',
                    value: process.argv.slice(2).join(' ')
                },
                {
                    key: 'Sistema Operativo',
                    value: process.platform
                },
                {
                    key: 'Cantidad de Procesadores',
                    value: os.cpus().length
                },
                {
                    key: 'Versión de node.js',
                    value: process.version
                },
                {
                    key: 'Memoria total reservada',
                    value: (Math.round(process.memoryUsage().rss / 1024 / 1024 * 100) / 100) + " Mb"
                },
                {
                    key: 'Path de ejecución',
                    value: process.argv[1]
                },
                {
                    key: 'Process id',
                    value: process.pid
                },
                {
                    key: 'Carpeta del proyecto',
                    value: process.cwd
                }
            ]

            return { status: "OK", info: info }

        } catch (error) {
            console.log(error)
        }
    }

}

export let infoService = new Info()