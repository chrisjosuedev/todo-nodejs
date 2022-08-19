const colors = require("colors");
const Tarea = require("./tarea");

class Tareas {
    _listado = {};

    constructor() {
        this._listado = {};
    }

    borrarTarea(id) {
        if (this._listado[id]) {
            delete this._listado[id]
        }
    }

    get listadoArr() {
        const listado = [];
        // Object.key -> Obtener Key del Objeto Ej. [a: {}] = retorna 'a'
        Object.keys(this._listado).forEach((key) => {
            listado.push(this._listado[key]);
        });
        return listado;
    }

    cargarTareas(tareas) {
        tareas.forEach((item) => {
            this._listado[item.id] = item;
        });
    }

    crearTarea(desc) {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        console.log();
        this.listadoArr.forEach((item, index) => {
            console.log(
                `${colors.green(`${index + 1}.`)} ${item.desc} :: ${
                    item.completadoEn !== null
                        ? "Completada".green
                        : "Pendiente".red
                }`
            );
        });
    }

    listarPendientesCompletadas(estatus = true) {
        console.log();
        let index = 0;
        this.listadoArr.forEach((item) => {
            if (estatus) {
                if (item.completadoEn) {
                    console.log(
                        `${colors.green(`${(index += 1)}.`)} ${
                            item.desc
                        } :: ${item.completadoEn.green}`
                    );
                }
            } else {
                if (!item.completadoEn) {
                    console.log(
                        `${colors.green(`${(index += 1)}.`)} ${
                            item.desc
                        } :: ${"Pendiente".red}`
                    );
                }
            }
        });
    }

    toggleCompletadas (ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id]
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString()
            }
        })

        this.listadoArr.forEach( tarea => {
            // includes -> Verifica si el item esta en el arreglo
            if (!ids.includes(tarea.id)) {
                const tareaSelected = this._listado[tarea.id]
                tareaSelected.completadoEn = null
            }
        })
    }

}

module.exports = Tareas;
