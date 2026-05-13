// URL Module
/*
The core of the url module revolves around the URL class. The url module is globally available, so we do not need to import it to use its data.

Note: This is a rare case where we actually need to NOT import the module. Importing the url module activates the Legacy URL API, which is deprecated.
*/

const url = new URL('https://example.com/p/a/t/h?query=string');

/*
Once instantiated, different parts of the URL can be accessed and modified via various properties, which include:

 - hostname: Gets and sets the host name portion of the URL.

 - pathname: Gets and sets the path portion of the URL.

 - searchParams: Gets the search parameter object representing the query parameters contained within the URL. Returns an instance of the URLSearchParams class.

*/

/*
Using these properties, one can break the URL down into easily usable parts for processing the request.
*/

const host = url.hostname;
const pathname = url.pathname;
const searchParams = url.searchParams;

console.log(host); // Output: example.com
console.log(pathname); // Output: /p/a/t/h
console.log(searchParams); // Output: URLSearchParams { 'query' => 'string' }

// Constructing URL
const createdUrl = new URL('https://example.com');
createdUrl.pathname = 'p/a/t/h';
createdUrl.search = '?query=string';

console.log(createdUrl.toString()); // Output: https://example.com/p/a/t/h?query=string