# SKO 2024 Flex Transcription and AI Suggestions Demo

This repository contains several componenet deployments to use in for demonstrating real-time voice transcription with AI suggestions to the agent based on conversation between the customer and agent.

The following elements and their file/folder location (parathensis), are part of this demonstration:

1. Flex Plugin (src) - Custom UI interface that summarized the Customer data and more.
2. Studio Voice Flow (studio) - This is raw JSON for the inbound Studio flow and must be imported into the Flex account.
3. Serverless Package (serverless) - This serverless package contains a single Twilio Function that is called by the Flex Plugin
4. Real-Time Transcription App - This is a node package that interacts with the Twilio Media Stream, Microsoft Speech Service and Twilio Sync Stream.

### Demonstration Architecture

The following image hightlight the architecture of this demonstation and the components above.

![Demo](docs/demoArchitecture.jpg)

### Screenshots - Transcription and AI Suggestions
This screenshot illustrates the agent experience with real-time transcription of the 'customer/agent' conversation.  "Agent Assist" capabilites are displayed to the agent as well to aid in solving the customer's inquiry.

![Demo](docs/FlexScreenShot.jpg)

## Setup

The following steps are necessary to use this plugin package.  These are:

1. Real-time Transcription Engine (apps/transcriptionEngine): Setup/Configure
2. Plugin Serverless (apps/serverless) - Setup & Configure
3. Import Studio Flow (app/studio)
4. Flex Plugin (src) - Setup & Configure

### Real-time Transcription Engine - Setup/Configure
This package is located within 'apps/transcriptionEngine'. Follow the README instructions inclusive to this package.

After setup and configuration, run this app ( node index.js ) to launch the service on port 8080.

### Plugin Serverless - Setup/Configure
This package is located within 'apps/serverless'. Follow the README instructions inclusive to this package.

After setup and configuration, launch the serverless ( twilio serverless:start ) to run locally on port 3000.

[Serverless deployment](https://www.twilio.com/docs/labs/serverless-toolkit/deploying) to the Twilio account is possible.  The serverless domain should be noted for update of the Flex Plugin .env variable.

### Import Studio Flow
This package is located within 'apps/studio'. Within Twilio Studio, create a "New Flow" and import the JSON (copy/paste) from this resource.

NOTE:  Be sure to revisit the Studio Flow to configure the Media Stream wss URI and SendToFlex Taskrouter configuration.

### Flex Plugin - Setup and Configure

The following steps are necessary to configure and test the Flex Plugin.

1. Build the package dependencies.

```sh
npm i
```

2. Install necessary pre-requisites ( [Twilio CLI](https://www.twilio.com/docs/twilio-cli/getting-started/install), [Flex Plugins CLI](https://www.twilio.com/docs/flex/developer/plugins/cli) & [Twilio Serverless Toolkit](https://www.twilio.com/docs/labs/serverless-toolkit) )

3. Create a Twilio [account profile](https://www.twilio.com/docs/twilio-cli/general-usage/profiles) and mark it [active](https://www.twilio.com/docs/twilio-cli/general-usage/profiles#set-an-active-profile)

4. Launch the Flex Plugin

While logged into the Twilio Flex account via Twilio Console, launch the Flex Plugin on port 3001.

```sh
twilio flex:plugins:start
```
[Deployment of the Flex plugin](https://www.twilio.com/docs/flex/developer/plugins/cli/deploy-and-release) to the Twilio Account can be achieved. Be assured that the .env variables are configured appropriately prior to deployment.

