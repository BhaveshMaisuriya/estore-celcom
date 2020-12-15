const request = require('request');
/**
 * Uncomment first line to use proxy
 */
// export const proxiedRequest = request.defaults({'proxy': 'http://proxy.celcom.com.my:8080'});
export const proxiedRequest = request.defaults({});
