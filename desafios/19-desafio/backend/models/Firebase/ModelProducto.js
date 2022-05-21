let {db: firebaseDB} = require("../../utils/Firebase/index");

let producto = firebaseDB.collection('producto');

module.exports = { producto }