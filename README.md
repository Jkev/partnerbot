# 🤖 DigyPartnerBot: Webhook para Dialogflow y Respond.io

Un webhook robusto y eficiente diseñado para conectar **Dialogflow** con la API de **Respond.io**, permitiendo el envío de plantillas de mensajes de WhatsApp de forma automatizada.

---

## ✨ Características

- **💬 Integración con Dialogflow:** Procesa las solicitudes de webhook de Dialogflow para una comunicación fluida.
- **📱 Conexión con Respond.io:** Envía plantillas de mensajes de WhatsApp, incluyendo mensajes con botones, a través de la API de Respond.io.
- **🔒 Seguro:** Maneja claves de API y tokens de forma segura a través de variables de entorno.
- **🚀 Despliegue Sencillo:** Configurado para un despliegue rápido y fácil en **Vercel**.

---

## 🛠️ Tecnologías Utilizadas

- **Node.js** 🟢
- **Express.js** 🌐
- **Dialogflow Fulfillment** 💬
- **Axios** 📡
- **Vercel** ▲

---

## ⚙️ Configuración e Instalación

Sigue estos pasos para configurar el proyecto en tu entorno local.

1.  **Clona el repositorio:**
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd digypartnerbot
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  **Configura las variables de entorno:**
    Crea un archivo `.env.local` en la raíz del proyecto y añade las siguientes variables:
    ```env
    # Token de tu webhook (si es necesario para alguna validación propia)
    TOKEN=TU_TOKEN_DE_VALIDACION

    # URL de la API de Mikrowisp (si la usas)
    URL_MIKROWISP=https://tu_url.dyndns.org

    # Token de la API de Respond.io
    RESPOND_IO_TOKEN=TU_TOKEN_DE_RESPOND_IO
    ```

4.  **Inicia el servidor local:**
    ```bash
    npm start
    ```
    *Nota: Necesitarás añadir un script `"start": "node index.js"` a tu `package.json`.*

---

## 🚀 Despliegue en Vercel

Este proyecto está pre-configurado para Vercel. Para desplegar:

1.  **Conecta tu repositorio a Vercel.**
2.  **Configura las Variables de Entorno** en el panel de control de tu proyecto en Vercel (Settings > Environment Variables) con los mismos valores de tu archivo `.env.local`.
3.  **Despliega.** Vercel detectará automáticamente la configuración en `vercel.json` y desplegará el webhook.

---

## 📞 API del Webhook

El webhook expone la siguiente ruta:

- `POST /webhook`

Esta es la URL que debes proporcionar en la configuración de tu agente de Dialogflow.

### Intents Manejados

- **Default Welcome Intent:** Saludo de bienvenida.
- **Enviar Plantilla con Botones:**
    - **Acción:** Llama a la API de Respond.io para enviar una plantilla de mensaje de WhatsApp.
    - **Configuración Requerida en `index.js`:** Debes actualizar la función `sendWhatsAppButtonTemplate` con el `channelId`, `contactIdentifier` y el `templateName` de tu plantilla aprobada en Respond.io.
