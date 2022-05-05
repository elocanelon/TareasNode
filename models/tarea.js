const { v4: uudiv4 } = require('uuid')

class Tarea {
    id='';
    desc = '';
    CompletadaEn = null;

    constructor ( desc ){
        this.id = uudiv4(); 
        this.desc = desc;
        this.CompletadaEn = null;
    }

}

module.exports = Tarea