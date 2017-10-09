# Http Apikey Transorte

This is a transport http and https for winston whit authorization by apikey. It is a transport only for send logs.

## Example

```javascript
const winston = require('winston')
const HttpTransporte = require('http-apikey-transport')
const logger = new (winston.Logger)({
  rewriters: [],
  transports: [
    new HttpTransporte({
      uri: "http://it-is-your-api-route/logs",
      apikey: "thi is the apikey value",
      service: "It is a identifier"
    })
  ]
})
logger.info('Hello world', { anything: 'This is metadata' });
logger.warn('Warning message', { anything: 'This is metadata' });
logger.debug('Debugging info', { anything: 'This is metadata' });
logger.error('Error test', { anything: 'This is metadata' });
```

The transport will send the data by POST method with the following format:

```json
{
    "service": "It is a identifier",
    "level": "info",
    "message": "Hello world",
    "metadata": {
        "anything": "This is metadata"
    }
}
```
