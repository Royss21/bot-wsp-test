import { addKeyword, EVENTS } from "@bot-whatsapp/bot";

module.exports = addKeyword(EVENTS.ACTION)
  .addAction((_, { endFlow, globalState }) => {
    const currentGlobalState = globalState.getMyState();
    if (!currentGlobalState.status) return endFlow();
  })
  .addAnswer(
    "Por favor digite su *DNI*",
    { capture: true },
    async (ctx, { flowDynamic, endFlow, state }) => {
      console.log("DNI INGRESADO", ctx.body);
    }
  )
  .addAction(async (_, { flowDynamic, globalState }) => {
    const currentGlobalState = globalState.getMyState();
    const { tipoRequerimiento } = currentGlobalState.data;
    const text = tipoRequerimiento.map(
      (item) => `*${item.id}.* ${item.nombre}`
    );
    const responseText = ["Que tipo de ticket deseas crear?\n", ...text];

    await flowDynamic(responseText.join("\n"));
  })
  .addAnswer(
    "_Escribe solo el número de la opción que desees._",
    { capture: true },
    async (ctx, { flowDynamic, endFlow, state }) => {
      console.log("TIPO DE TICKET", ctx.body);
    }
  )
  .addAction(async (_, { flowDynamic, globalState }) => {
    const currentGlobalState = globalState.getMyState();
    const { ambito } = currentGlobalState.data;
    const text = ambito.map((item) => `*${item.id}.* ${item.nombre}`);
    const responseText = ["A que ambito va dirigido?\n", ...text];

    await flowDynamic(responseText.join("\n"));
  })
  .addAnswer(
    "_Escribe solo el número de la opción que desees._",
    { capture: true },
    async (ctx, { flowDynamic, endFlow, state }) => {
      console.log("AMBITO SELECCIONADO", ctx.body);
    }
  )
  .addAction(async (_, { flowDynamic, globalState }) => {
    const currentGlobalState = globalState.getMyState();
    const { grupo } = currentGlobalState.data;
    const text = grupo.map((item) => `*${item.id}.* ${item.nombre}`);
    const responseText = ["A que grupo va dirigido?\n", ...text];

    await flowDynamic(responseText.join("\n"));
  })
  .addAnswer(
    "_Escribe solo el número de la opción que desees._",
    { capture: true },
    async (ctx, { flowDynamic, endFlow, state }) => {
      console.log("GRUPO SELECCIONADO", ctx.body);
    }
  )
  .addAnswer(
    "Falta muy poco, por favor detallame el caso en un solo mensaje.",
    { capture: true },
    async (ctx, { flowDynamic, endFlow, state }) => {
      console.log("MENSAJE", ctx.body);
    }
  )
  .addAnswer(
    "Por ultimo, en el caso de querer adjuntar archivos enviamelos o escribe *omitir*",
    { capture: true },
    async (ctx, { flowDynamic, endFlow, state }) => {
      console.log("MENSAJE", ctx.body);

      await flowDynamic(
        "Listo! tu ticket ha sido creado con exito con el siguiente codigo:"
      );
      await flowDynamic("*INNG-2023-00790*");
      await endFlow();
    }
  );
