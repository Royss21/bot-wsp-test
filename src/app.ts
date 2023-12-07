import { createFlow, createProvider, createBot } from "@bot-whatsapp/bot";
import QRPortalWeb from "@bot-whatsapp/portal";

import {
  createTicket,
  historyTickets,
  optionsList,
  welcome,
} from "./flows/index";
// import { createVenomClient } from "./providers/venom.provider";

const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MockAdapter = require("@bot-whatsapp/database/mock");

const flowsPrincipal = [createTicket, historyTickets, optionsList, welcome];

const main = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = createFlow([...flowsPrincipal]);
  const adapterProvider = createProvider(BaileysProvider);
  //const venomProvider = await createVenomClient();
  
  createBot(
    {
      flow: adapterFlow,
      provider: adapterProvider,
      database: adapterDB,
    },
    {
      globalState: {
        //venomProvider,
        status: true,
        data: {
          tipoRequerimiento: [
            { id: 1, nombre: "Requerimiento" },
            { id: 2, nombre: "Incidente" },
            { id: 3, nombre: "Alarma" },
          ],
          ambito: [
            { id: 1, nombre: "Casino Fisico" },
            { id: 2, nombre: "Casino Online" },
          ],
          grupo: [
            { id: 1, nombre: "Arquitectura TI" },
            { id: 2, nombre: "Base de datos" },
            { id: 3, nombre: "Casino Fisico" },
            { id: 4, nombre: "Casino Online" },
          ],
          tipo: [
            { id: 1, nombre: "Seguridad" },
            { id: 2, nombre: "Networking" },
            { id: 3, nombre: "Infraestructura" },
            { id: 4, nombre: "Software" },
            { id: 5, nombre: "Pasarela" },
          ],
          categoria: [
            { id: 1, nombre: "Aplicaciones" },
            { id: 2, nombre: "Replica de datos" },
          ],
          subCategoria: [
            { id: 1, nombre: "Lentitud de aplicaciones" },
            { id: 2, nombre: "Problemas de Job/ETL" },
          ],
        },
      },
    }
  );

  QRPortalWeb();
};

main();
