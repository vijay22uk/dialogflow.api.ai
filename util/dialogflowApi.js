const { SessionsClient } = require('dialogflow');

class DialogFlowApi{
    constructor (languageCode) {                
        this.languageCode = languageCode;        
      }
      init(socket,username){
        console.log(socket.id,username);
          this.sessionId = socket.id || 'OneBot';
          this.projectId = process.env.PROJECT_ID;
          this.keyPath = process.env.SERVICE_ACCOUNT_PATH

        this.client =  new SessionsClient({
            keyFilename: this.keyPath 
          });
          this.sessionPath = this.client.sessionPath(this.projectId, this.sessionId);

          //send welcome intent
         return this.client.detectIntent({    
            session: this.sessionPath,
            queryInput: {
              text:{
                text:username,
                languageCode: this.languageCode
              }
            }
          }).then(responses => {
            console.log('Detected intent');
            const result = responses[0].queryResult;
            console.log(`  Query: ${result.queryText}`);
            console.log(`  Response: ${result.fulfillmentText}`);
            if (result.intent) {
              console.log(`  Intent: ${result.intent.displayName}`);              
            } else {
              console.log(`  No intent matched.`);
            }
            return {
              speech: result.fulfillmentText,
              action: result.intent.displayName,              
            };
          }).catch(err=>console.error(err));          
      }
      handleResponse(query){
          console.log('sending command ',query);
        return this.client.detectIntent({
            session: this.sessionPath,
            queryInput: {
                text: {
                    text: query,
                    languageCode: this.languageCode,
                  }
            }
          }).then(responses => {
            console.log('Detected intent');
            const result = responses[0].queryResult;
            console.log(`  Query: ${result.queryText}`);
            console.log(`  Response: ${result.fulfillmentText}`);
            if (result.intent) {
              console.log(`  Intent: ${result.intent.displayName}`);
              return {
                speech: result.fulfillmentText,
                action: result.intent.displayName,
                actionIncomplete: true
              };
            } else {
              console.log(`  No intent matched.`);
            }
          })
          .catch(err => {
            console.error('ERROR:', err);
            return err;
          });;
      }
};

module.exports = DialogFlowApi;
