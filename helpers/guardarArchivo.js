const fs = require('fs')

 
 const archivo = "./Database/data.json"
const guardarInfo = ( data ) => {
   
    fs.writeFileSync( archivo, JSON.stringify(data) )
    
        
    }

const leerDB = () => {

    if (!fs.existsSync(archivo) ){
        return null;
    }

    const info = fs.readFileSync(archivo, { encoding: "utf-8"});
    const data = JSON.parse(info);
    //console.log(data)

    return data;
}

module.exports = {
    guardarInfo,
    leerDB
}