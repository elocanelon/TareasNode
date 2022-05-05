const Tarea = require("./tarea");
require('colors')


class Tareas {

    _listado = {};

    get listadoarr(){

        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key]
            listado.push( tarea )
        })
        return listado
    }


    constructor() {
        this._listado = {}
    }

    borrarTarea( id = " " ){
        if ( this._listado[id]){
            delete this._listado[id]
        }
    }


     CargarTareaDeArray( tareas = [] ){
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea; 
        })
     }   

    crearTarea( desc = ""){

    const tarea = new Tarea(desc);
    this._listado[tarea.id]= tarea;

    }

    listadoCompleto(){
        this.listadoarr.forEach((tarea, i) => {
            console.log();
            const indice = `${i + 1}`.green;
            const { desc, CompletadoEn } = tarea;
            const estado = (CompletadoEn)
                                ? "Completada".green
                                : "Pendiente".red

            console.log(`${ indice } ${ desc }  ${ estado } `)
    })
}
    listarPendientesCompletadas( completadas = true) {

        let contador = 0;
        console.log();
        this.listadoarr.forEach(tarea => {

       
        const { desc, CompletadoEn } = tarea;
               const estado = (CompletadoEn)
                            ? "Completada".green
                            : "Pendiente".red
         
        if ( completadas ){
            // Mostrar Completados
            if (CompletadoEn){
                contador += 1
                console.log(`${ contador.toString().green } ${ desc } :: ${ estado } :: ${ CompletadoEn }`)
            }
        } else {
            //Mostrar pendiente
            if (!CompletadoEn){
                contador += 1
                console.log(`${ contador.toString().red } ${ desc } :: ${ estado } `)
            
            }
        }
        })
    }  
    
    toglesCompletados = ( ids = [] ) => {
        ids.forEach( id => {
            const tarea = this._listado[id];
            if ( !tarea.CompletadoEn ){
                tarea.CompletadoEn = new Date().toISOString()
            }
        })

        this.listadoArr.forEach( tarea => {
            if ( !ids.includes(tarea.id) ){
                   this._listado[tarea.id].CompletadoEn = null;

            }
        })
    }        

}

    




module.exports = Tareas