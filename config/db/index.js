const mongoose = require('mongoose')
// mongoose.set('strictQuery', false);

async function connect() {
    // console.log(mongoose.connection.readyState);

    try {
        await mongoose.connect('mongodb://localhost:27017/asm1', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('connect successfull!!!!');
    } catch (err) {
        console.log('connect fail!!!!');

    }
}

module.exports = { connect }