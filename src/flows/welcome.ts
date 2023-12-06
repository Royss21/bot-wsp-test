import { addKeyword, EVENTS } from "@bot-whatsapp/bot";
import { colaboradores } from "../data/bd";
import * as optionsList from "./optionsList";
import { readFileSync } from "fs";
import { writeFile } from "fs/promises";
import { downloadMediaMessage } from "@whiskeysockets/baileys";

module.exports = addKeyword(EVENTS.WELCOME)
  .addAction((_, { endFlow, globalState }) => {
    const currentGlobalState = globalState.getMyState();
    if (!currentGlobalState.status) return endFlow();
  })
  .addAction(async (ctx, { provider, state, gotoFlow, flowDynamic, globalState }) => {
    
    //BAILEYS

    //ENVIAR CONTACTO
    // const vcard =
    // 'BEGIN:VCARD\n'+
    // 'VERSION:3.0\n'+
    // 'FN:SOY UN BOT\n'+
    // 'ORG:ENVIO DESDE UN BOT\n'+
    // 'TEL;type=CELL;type=VOICE;waid=51980444507:+51 980 444 507\n'+
    // 'END:VCARD';
    // const sendMsg = await sock.sendMessage("51977641658@s.whatsapp.net", {
    //     contacts: {
    //         displayName: 'Bot',
    //         contacts: [{ vcard }]
    //     }
    // })
    // const wspId =  ctx.key.remoteJid;

    //ENVIAR TEXTO
    // const sock = await provider.getInstance();
    // // const sendMsg = await sock.sendMessage("Hc08ZIcrrerAAY60JyRbUa@g.us", {
    // //   text: "Giles, atte: bot",
    // // });
    // console.log(sock);
    // console.log(sock.authState.processedHistoryMessages);
    // console.log(sock.authState.accountSettings);
    // console.log(sock.authState.signalIdentities);
    // console.log(sock.ws.socket._events);
    // console.log(sock.ws.socket._events);
    // const group = await sock.groupCreate("My Fab Group", [
    //   "51980444507@s.whatsapp.net",
    //   "51997039472@s.whatsapp.net"
    // ]);
    // console.log(group)
    // sock.sendMessage(group.id, { text: "hello there" });

    //GUARDAR IMAGENES
    // const logger: any = null;
    // const buffer = await downloadMediaMessage(
    //     ctx,
    //     'buffer',
    //     { },
    //     {
    //         logger,
    //         reuploadRequest: sock.updateMediaMessage
    //     }
    // )
    // await writeFile('./my-download.jpeg', buffer);

    //ENVIAR IMAGENES
    // //const sock = await provider.getInstance();
    // await sock.sendMessage(
    //     "51989019533@s.whatsapp.net",
    //     {
    //         image: readFileSync("./my-download.jpeg"),
    //         caption: "una imagen enviado por tu papu hacia ti."
    //     }
    // )


    //VENOM
    //OBETENR LISTADO DE GRUPOS 
    // const sock = await provider.getInstance();
    // const chats = await sock.getAllChatsGroups();
    // console.log(chats)


    //VENOM-PROVIDER
    //OBETENR LISTADO DE GRUPOS 
    // const { venomProvider } = globalState.getMyState();
    // const chats = await venomProvider.getAllChatsGroups();
    // console.log({ venomProvider, chats})


    const currentState = state.getMyState();
    const ultimaInteraccion = currentState?.ultimaInteraccion;
    let phone = ctx.from;

    if (phone.startsWith("51")) phone = phone.substring(2, phone.lenght);

    state.update({ phone });

    if (ultimaInteraccion) {
      const fechaUltimaInteraccion = new Date(ultimaInteraccion);
      const fechaActual = new Date();
      fechaUltimaInteraccion.setMinutes(
        fechaUltimaInteraccion.getMinutes() + 1
      );

      if (fechaActual < fechaUltimaInteraccion) {
        await flowDynamic("Bienvenido de nuevo 😃");
        await gotoFlow(optionsList);
        return;
      }
    }
  })
  .addAnswer("🤖", null, async (_, { flowDynamic, gotoFlow, state }) => {
    const { phone } = state.getMyState();
    const colaborator = colaboradores.find((c) => c.numero == phone);
    const responseText = [
      `Hola, bienvenido ${colaborator.nombre || "estimado(a)"}`,
      "Digame. Como lo puedo ayudar? 😃",
    ];
    await flowDynamic(responseText.join("\n"));
    await gotoFlow(optionsList);
  });
