const fs = require("fs");

let listadoToDo = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoToDo);
    fs.writeFile("db/data.json", data, (err) => {
        if (err) throw new Error("No se pudo grabar", err);
    })
}

const cargarDB = () => {
    try {
        listadoToDo = require("../db/data.json");
    } catch (err) {
        listadoToDo = [];
    }

}

const crear = (descripcion) => {
    let toDo = {
        descripcion,
        completado: false
    }

    cargarDB();

    listadoToDo.push(toDo);
    guardarDB();
    return toDo;
}

const getListado = () => {
    cargarDB();
    return listadoToDo;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();

    let index = listadoToDo.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    })

    if (index >= 0) {
        listadoToDo[index].completado = completado;
        guardarDB();
        return true;
    }

    return false;
}

const borrar = (descripcion) => {
    cargarDB();
    let index = listadoToDo.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    })

    if (index !== -1) {
        listadoToDo.splice(index, 1);
        guardarDB();
        return true;
    }

    return false;
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}