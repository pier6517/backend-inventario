const mongoose = require('mongoose');

const getConnection = async () => {
    try{

        const url = 'mongodb://pier-ruiz:z2EmOPUiSotVxOtu@ac-ljvokgq-shard-00-00.fzpgsjd.mongodb.net:27017,ac-ljvokgq-shard-00-01.fzpgsjd.mongodb.net:27017,ac-ljvokgq-shard-00-02.fzpgsjd.mongodb.net:27017/api-rest?ssl=true&replicaSet=atlas-e0j6il-shard-0&authSource=admin&retryWrites=true&w=majority'
          
        await mongoose.connect(url);

        console.log('conexion exitosa');

    }catch (error){
        console.log(error);
    }
}

module.exports = {
    getConnection,
}