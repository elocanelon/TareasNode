const inquirer = require('inquirer')

require('colors');

const questionsObj = [
    {
        type: "list",
        name: "Opciones",
        message: "¿Que desea hacer?",
        choices: [
        {
            value: '1',
            name: `${'1.'.blue}. Crear Tareas`,
        },
        {
            value: '2',
            name: `${'2.'.blue}. Listar Tareas`

        },
        {
            value: '3',
            name: `${'3.'.blue}. Listar tareas Compleatadas`
        },
        {
            value: '4',
            name: `${'4.'.blue}. Listar tareas pendientes`
        },
        {
            value: '5',
            name: `${'5.'.blue}. Completar tarea(s)`
        },
        {
            value: '6',
            name: `${'6.'.blue}. Borrar Tareas`
        },
        {
            value: '0',
            name: `${'0.'.blue}. Salir \n`
        }
    ]
    }
]
const inquirerMenu = async() =>{

    console.clear();
    console.log("==========================".blue);
    console.log("   Seleccione una opcion  ")
    console.log("==========================\n".blue);

    const{ Opciones } = await inquirer.prompt(questionsObj);

    return Opciones

}
const pausa = async() => {
    const question = [
        {
            type: "input",
            name: "Enter",
            message: `Presione ${"Enter".blue} para continuar`
        }
    ]
    console.log(`\n`)
    await inquirer.prompt(question)
}

const leerInput = async(message) => {
    const question = [
        {
            type: "input",
            name: "desc",
            message,
            validate( value ){
                if( value.length === 0){
                    return "Por favor ingrese un valor"
                } return true;
            }
        }
    ];

    const { desc} = await inquirer.prompt(question)
    return  desc 
}


const borrarTarea = async( tareas = [] ) => {

    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}.`.green;

        return{
            value: tarea.id,
            name: `${ idx } ${ tarea.desc}`    
        }
    });

    choices.unshift({
        value: "0",
        name: "0.".green + "Cancelar"
    })
    const question = [
        {
            type: "list",
            name: "id",
            message: "Borrar",
            choices 
        }
    ]
    const { id } = await inquirer.prompt(question)
    return id;
}

const confirmar = async(message) => { 
    const question = [
        {
            type: "confirm",
            name: "Ok",
            message
    }
];

    const { ok } = await inquirer.prompt(question);
    return ok;
}

const MostrarListadoCheckList = async( tareas = [] ) => {

    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}.`.green;

        return{
            value: tarea.id,
            name: `${ idx } ${ tarea.desc}`, 
            checked: ( tarea.CompletadoEn ) ? true : false    
        }
    });

    
    const question = [
        {
            type: "checkbox",
            name: "ids",
            message: "seleccione",
            choices 
        }
    ]
    const { ids } = await inquirer.prompt(question)
    return ids;
}

module.exports={
    inquirerMenu,
    pausa,
    leerInput,
    borrarTarea,
    confirmar,
    MostrarListadoCheckList
}


