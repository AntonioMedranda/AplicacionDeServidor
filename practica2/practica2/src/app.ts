import {consult, CrearVista, insertarUser, update, userdelete, viewdelete} from './crud';
import {initDatabase} from './database';
import { ConsulAll } from './crud';
import { view } from './models/view';

async function main() {
    await initDatabase()
    const newUser = await insertarUser("walter"," walterG@gmail.com")
    console.log("Usuario creado",newUser.id)
    const vista = await CrearVista("Vista Reporte De Productos",newUser.id)
    console.log(vista);

    const vistadelete = await viewdelete(vista!.id)
    console.log(vistadelete)

        const users  = await ConsulAll();
    console.log("Consulta general",users);
    const userOne = await consult(newUser.id)
    console.log("Consulta individual",userOne)
    const userUpdated= await update(newUser.id,"Jusan","Trump");
    console.log("Usuario actualizado",userUpdated)
    const userDeleted = await userdelete(newUser.id);
    console.log("usuario eliminado",userDeleted)


}

main()