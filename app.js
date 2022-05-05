require('colors');
const { guardarInfo, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, 
    pausa, 
    leerInput, 
    borrarTarea, 
    confirmar, 
    MostrarListadoCheckList
} = require('./helpers/inquirer');
const Tareas = require("./models/tareas")


const main = async() =>{

    console.clear();

   let Opciones = "";

    const tareas = new Tareas()
    const tareasdb = leerDB();

    if( tareasdb ){ //cargar tareas
        tareas.CargarTareaDeArray( tareasdb )
     }
    
 
    
    do {
        Opciones = await inquirerMenu()
        
       switch (Opciones){
           case "1":
              const desc = await leerInput("descripcion")
              tareas.crearTarea( desc );
           break;
           case "2":
              tareas.listadoCompleto()
           break;
           case "3":
              tareas.listarPendientesCompletadas(true)
           break;
           case "4":
              tareas.listarPendientesCompletadas(false)
           break;  
           case "5":
               const ids = await MostrarListadoCheckList(tareas.listadoarr)
               tareas.toglesCompletados( ids )
           break;
           case "6":
               const id = await borrarTarea(tareas.listadoarr)
               if (id !== "0"){
                   const ok = confirmar("Estas seguro de querer borrar la tarea?")
               if ( ok ){
                   tareas.borrarTarea(id);
                   console.log("Tarea borrada correctamente")
               } 
               }
            break;
       }
     
      guardarInfo( tareas.listadoarr );


        await pausa()
        
    } while(Opciones !== "0");

   


}

main()