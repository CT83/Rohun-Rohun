import dotenv from 'dotenv'
dotenv.config()
import dialogflow from "dialogflow";

// Instantiates a session client

export class IntentManager {
    projectId = null;

    constructor(_projectId) {
        this.projectId = _projectId;
    }

    async _detectIntent(
        projectId,
        sessionId,
        query,
        languageCode
    ) {
        var sessionClient = new dialogflow.SessionsClient();
        const sessionPath = sessionClient.sessionPath(
            projectId,
            "12345"
        );

        // The text query request.
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: query,
                    languageCode: languageCode,
                },
            },
        };

        const responses = await sessionClient.detectIntent(request);
        return responses[0];
    }

    async executeQueries(projectId, sessionId, queries, languageCode) {
        // Keeping the context across queries let's us simulate an ongoing conversation with the bot
        let context;
        let intentResponse;
        for (const query of queries) {
            try {
                console.log(`Sending Query: ${query}`);
                intentResponse = this._detectIntent(
                    projectId,
                    sessionId,
                    query,
                    context,
                    languageCode
                );
                console.log('Detected intent');
                console.log(intentResponse);
                console.log(
                    `Fulfillment Text: ${intentResponse.queryResult.fulfillmentText}`
                );
                // Use the context from this response for next queries
                context = intentResponse.queryResult.outputContexts;
            } catch (error) {
                console.log(error);
            }
        }
    }

    getResponse(query) {
        var sessionId = '123456';

        // languageCode: Indicates the language Dialogflow agent should use to detect intents
        var languageCode = 'en';
        let context;
        let intentResponse;
        try {
            console.log(`Sending Query: ${query}`);
            intentResponse = this._detectIntent(
                this.projectId,
                sessionId,
                query,
                languageCode
            ).then((intentResponse) => {
                console.log('Detected intent');
                console.log(
                    `Fulfillment Text: ${intentResponse.queryResult.fulfillmentText}`
                );
            });
        } catch (error) {
            console.log(error);
        }

    }
}

// im = new IntentManager(process.env.PROJECT_ID);
// im.getResponse("Hello, can you hear me?");
