let testingService = require("../services/Service");

class Testing {
    async test(req, res, next) {
        try {         
            let response = await testingService.getUsers(Number(5));
            res.json(response);
        } catch (error) {
            console.log(error);
        }
    }

    async get(req, res, next) {
        try {
            let { cant } = req.params;     
            let response = await testingService.getUsers(Number(cant));
            res.json(response);
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = new Testing();