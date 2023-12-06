

import { addKeyword, EVENTS } from "@bot-whatsapp/bot";
import { historialTickets } from "../data/bd";

module.exports = addKeyword(EVENTS.ACTION)
    .addAction(( _, { endFlow, globalState }) => {
            
        const currentGlobalState = globalState.getMyState();
        if (!currentGlobalState.status) 
            return endFlow();  
    })
    .addAnswer('⏱️🤖 Dame unos momentos...', 
    null,
    async (_, { flowDynamic, endFlow, state }) => {

        const historialText = historialTickets.map(m => `*Ticket*: ${m.ticket} \n*Titulo*: ${m.titulo} \n*Estado*: ${m.estado} \n`)
        await flowDynamic(historialText.join('\n'));
        await flowDynamic('Si necesitas que te ayude con otra opcion, no dudes en escribirme.');
        state.update({ultimaInteraccion: new Date().getTime()});
        return endFlow();
    })
    // .addAnswer([
    //     'Escribe *pedido* para realizar tu pedido'
    // ],
    // { capture: true },
    // async (ctx, { fallBack, state, flowDynamic, endFlow, gotoFlow, extensions }) => {
    //     console.log('acaa')
        
    // });