import { addKeyword, EVENTS } from "@bot-whatsapp/bot";
import { opcionesBienvenido } from "../data/bd";
import * as createTicket from "./createTicket";
import * as historyTickets from "./historyTickets";


module.exports = addKeyword(EVENTS.ACTION)
    .addAction(( _, { endFlow, globalState }) => {
            
        const currentGlobalState = globalState.getMyState();
        if (!currentGlobalState.status) 
            return endFlow();  
    })
    .addAnswer(
    [
        '1️⃣ Crear ticket 📄',
        '2️⃣ Historial ultimos 5 tickets 🗒️',
        '3️⃣ Hablar con alguien 🧑🏻‍💻',
        '',
        '_Escribe solo el número de la opción que desees._'
    ], 
    { capture: true },
    async (ctx, { fallBack, state, endFlow , gotoFlow }) => {

        const currentState = state.getMyState();
        const optionSelected = isNaN(ctx.body) ? 0 : parseInt(ctx.body);
        const idsOpciones = Object.keys(opcionesBienvenido).map( f => opcionesBienvenido[f]);
        
        let fallBackWelcome = currentState?.fallBackWelcome ?? 0

        if( !idsOpciones.includes( optionSelected ) ) {

            fallBackWelcome = fallBackWelcome + 1;

            if( fallBackWelcome > 2 ){
                state.update({ fallBackWelcome : 0 });
                return endFlow('Lo sentimos, muchos intentos fallidos, volvamos a empezar de nuevo 😄')
            }

            state.update({ fallBackWelcome });
            return fallBack('Debes digitar una opcion válida.')
        }

        if(optionSelected == opcionesBienvenido.HISTORIAL_TICKET)
            await gotoFlow(historyTickets);
        if(optionSelected == opcionesBienvenido.CREAR_TICKET)
            await gotoFlow(createTicket);
    });