// Querystring Module
/*
While the url module can handle query strings attached to URLs, Node offers another built-in module that specializes in this task: querystring. querystring is not a global module, so we must import it before it can be used
*/

const querystring = require('querystring');

/*
The querystring module is dedicated to providing utilities solely focused on parsing and formatting URL query strings. As such, the module provides a much smaller number of 
methods to use.
*/

/*
parse: This method is used for parsing a URL query string into a collection of key:value pairs. The decode method is an alias for parse.
*/
const str1 = 'prop1=value1&prop2=value2';
console.log(querystring.parse(str1)); 
// Output: [Object: null prototype] { prop1: 'value1', prop2: 'value2' }

/*
stringify: This method is used for producing a URL query string from a given object via iteration of the object’s “own properties.” The encode method is an alias for stringify.
*/

const props = {"prop1": "value1", "prop2": "value2"};
console.log(querystring.stringify(props));
// Output: prop1=value1&prop2=value2

/*
 - escape: This method is used for performing percent-encoding on a given query string.

 - unescape: This method is used to decode percent-encoded characters within a given query string.

*/

/*
Note: While querystring performs better than URLSearchParams from the url module, URLSearchParams is a standardized API. Web browsers also implement the same URLSearchParams interface, meaning we can use it to write code that looks similar in front-end and back-end scenarios. 
querystring is not standardized, and there is no browser-based equivalent. You are most likely to see querystring used where performance is critical, or in code that predates the addition of URLSearchParams.
*/