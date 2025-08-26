const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const { WebhookClient } = require("dialogflow-fulfillment");

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

const urlMikrowisp = process.env.URL_MIKROWISP;
const token = process.env.TOKEN;

app.get("/", (req, res) => {
  res.send("SERVIDOR ENLACEWIFI OLD FUNCIONANDO CORRECTAMENTE");
});

app.post("/webhook", (request, response) => {
  dialogflowFulfillment(request, response);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const dialogflowFulfillment = (request, response) => {
  const agent = new WebhookClient({ request, response });

  function welcome(agent) {
    agent.add(`Bienvenido a EnlaceWifi, ¿en qué puedo ayudarte?`);
  }

  // --- INICIO: Ejemplo para enviar plantilla de WhatsApp con botones ---
  async function sendWhatsAppButtonTemplate(agent) {
    // TODO: Reemplaza estos valores con los tuyos
    const respondIoToken = process.env.RESPOND_IO_TOKEN; // ¡Crea esta variable de entorno!
    const channelId = "YOUR_WHATSAPP_CHANNEL_ID"; // El ID de tu canal de WhatsApp en Respond.io
    const contactIdentifier = "PHONE_NUMBER_FROM_DIALOGFLOW"; // El número de teléfono del contacto (ej. "+5215512345678")
    const templateName = "your_approved_template_name"; // El nombre de tu plantilla aprobada

    const respondIoApiUrl = `https://api.respond.io/v2/contact/${contactIdentifier}/message`;

    const headers = {
      "Authorization": `Bearer ${respondIoToken}`,
      "Content-Type": "application/json",
    };

    const payload = {
      "channelId": channelId,
      "message": {
        "type": "WhatsAppTemplate",
        "templateName": templateName,
        // "parameters": { // Descomenta y usa esto si tu plantilla tiene variables
        //   "body": [
        //     { "type": "text", "text": "valor_dinamico_1" },
        //     { "type": "text", "text": "valor_dinamico_2" }
        //   ]
        // }
      }
    };

    try {
      await axios.post(respondIoApiUrl, payload, { headers });
      agent.add("Se ha enviado un mensaje con botones a tu WhatsApp.");
    } catch (error) {
      console.error("Error al enviar el mensaje a Respond.io:", error.response ? error.response.data : error.message);
      agent.add("Lo siento, hubo un problema al intentar enviar el mensaje.");
    }
  }
  // --- FIN: Ejemplo para enviar plantilla de WhatsApp con botones ---


  let intentMap = new Map();
  intentMap.set("Default Welcome Intent", welcome);
  // TODO: Crea un Intent en Dialogflow con este nombre para activar la función
  intentMap.set("Enviar Plantilla con Botones", sendWhatsAppButtonTemplate);
  agent.handleRequest(intentMap);
};
