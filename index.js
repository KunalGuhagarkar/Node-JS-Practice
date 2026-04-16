// console.log(require("module").builtinModules);
// Output:
/* 
[
  '_http_agent',         '_http_client',        '_http_common',
  '_http_incoming',      '_http_outgoing',      '_http_server',
  '_stream_duplex',      '_stream_passthrough', '_stream_readable',
  '_stream_transform',   '_stream_wrap',        '_stream_writable',
  '_tls_common',         '_tls_wrap',           'assert',
  'assert/strict',       'async_hooks',         'buffer',
  'child_process',       'cluster',             'console',
  'constants',           'crypto',              'dgram',
  'diagnostics_channel', 'dns',                 'dns/promises',
  'domain',              'events',              'fs',
  'fs/promises',         'http',                'http2',
  'https',               'inspector',           'inspector/promises',
  'module',              'net',                 'os',
  'path',                'path/posix',          'path/win32',
  'perf_hooks',          'process',             'punycode',
  'querystring',         'readline',            'readline/promises',
  'repl',                'stream',              'stream/consumers',
  'stream/promises',     'stream/web',          'string_decoder',
  'sys',                 'timers',              'timers/promises',
  'tls',                 'trace_events',        'tty',
  'url',                 'util',                'util/types',
  'v8',                  'vm',                  'wasi',
  'worker_threads',      'zlib'
] 
*/

// Console Module
/*
The console object provides many of the same familiar methods, such as:

1. log — prints messages to the terminal

2. table — prints out a table in the terminal from an object or array

3. assert — prints a message to the terminal if the value is falsy (i.e., if the assertion fails)
*/

// console.log('Message in Terminal'); // Output: Message in Terminal

// const petsArray = ['dog', 'cat', 'bird', 'monkey'];
// console.table(petsArray);
// // Output:
// /*
// ┌─────────┬──────────┐
// │ (index) │ Values   │
// ├─────────┼──────────┤
// │ 0       │ 'dog'    │
// │ 1       │ 'cat'    │
// │ 2       │ 'bird'   │
// │ 3       │ 'monkey' │
// └─────────┴──────────┘
// */

// console.assert(petsArray[4]); // falsy value
// // Output: Assertion failed

/* Process Module */
// console.log(process.argv);
/*
The first element in the array is the absolute path to where Node is installed on the machine. The second element in the array is the path to the file that was executed to start the process.
*/
/* Output: 
[
  'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\KUNAL\\Desktop\\Node\\Practice\\index.js'
]
*/

// console.log(process.env);
/*
The process.env property is an object that stores and controls information about the environment in which the process is currently running. For example, the process.env object contains a PWD property, which holds a string indicating the absolute path of the directory from which the current process was executed.
*/

/* 
One convention is to add a property to process.env with the key NODE_ENV and a value of either production or development. First, we can use a command-line argument to set the NODE_ENV property:
*/
// if (process.argv[2] && process.argv[2] === 'dev') {
//     process.env.NODE_ENV = 'development';
//     console.log('development');
// } else {
//     process.env.NODE_ENV = 'production';
//     console.log('production');
// }

// if (process.env.NODE_ENV === 'development') {
//   startDevelopmentServer();
//   console.log('Testing! Testing! Does everything work?');
// } else if (process.env.NODE_ENV === 'production') {
//   startProductionServer();
// }

// function startDevelopmentServer() {
//     console.log('Starting Development Server...');
// }

// function startProductionServer() {
//     console.log('Starting Production Server...');
// }

/* The process.memoryUsage() method returns information on the CPU demands of the current process. It returns a property that looks similar to this: */

// console.log(process.memoryUsage());
/* Output:
{
  rss: 29044736,
  heapTotal: 5296128,
  heapUsed: 3811104,
  external: 1226186,
  arrayBuffers: 10515
}
*/

// OS Module
/* 
Unlike process and console, the os module is not global, so it must be imported into a file in order to gain access to its methods. We can include the os module like this:
*/
// const os = require('os');
// os methods
/*
With the os module saved to the os variable, we can access methods such as:

type — returns the computer’s operating system
arch — returns the operating system CPU architecture
networkInterfaces — returns information about the network interfaces of the computer, such as IP and MAC addresses
homedir — returns the current user’s home directory
hostname — returns the hostname of the operating system
uptime — returns the system uptime, in seconds
*/
// console.log(os.type()); // Output: Windows_NT
// console.log(os.arch()); // Output: x64
// console.log(os.networkInterfaces());
// /* Output
// {
//   'Wi-Fi': [
//     {
//       address: '2401:4900:88b2:f959:6cb8:d44b:e888:5d54',
//       netmask: 'ffff:ffff:ffff:ffff::',
//       family: 'IPv6',
//       mac: 'dc:21:5c:e4:93:a0',
//       internal: false,
//       cidr: '2401:4900:88b2:f959:6cb8:d44b:e888:5d54/64',
//       scopeid: 0
//     },
//     {
//       address: '2401:4900:88b2:f959:941:f160:dc5:db90',
//       netmask: 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff',
//       family: 'IPv6',
//       mac: 'dc:21:5c:e4:93:a0',
//       internal: false,
//       cidr: '2401:4900:88b2:f959:941:f160:dc5:db90/128',
//       scopeid: 0
//     },
//     {
//       address: 'fe80::de31:c322:bda0:4164',
//       netmask: 'ffff:ffff:ffff:ffff::',
//       family: 'IPv6',
//       mac: 'dc:21:5c:e4:93:a0',
//       internal: false,
//       cidr: 'fe80::de31:c322:bda0:4164/64',
//       scopeid: 15
//     },
//     {
//       address: '192.168.1.8',
//       netmask: '255.255.255.0',
//       family: 'IPv4',
//       mac: 'dc:21:5c:e4:93:a0',
//       internal: false,
//       cidr: '192.168.1.8/24'
//     }
//   ],
//   'Loopback Pseudo-Interface 1': [
//     {
//       address: '::1',
//       netmask: 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff',
//       family: 'IPv6',
//       mac: '00:00:00:00:00:00',
//       internal: true,
//       cidr: '::1/128',
//       scopeid: 0
//     },
//     {
//       address: '127.0.0.1',
//       netmask: '255.0.0.0',
//       family: 'IPv4',
//       mac: '00:00:00:00:00:00',
//       internal: true,
//       cidr: '127.0.0.1/8'
//     }
//   ]
// }
// */
// console.log(os.homedir()); // Output: C:\Users\KUNAL
// console.log(os.hostname()); // Output: LAPTOP-62CEBGRA
// console.log(os.uptime()); // Output: 137598.25

// UTIL Module
const util = require('util');

// util.types
const today = new Date();
const earthDay = 'April 16, 2026';
console.log(util.types.isDate(today)); // true
console.log(util.types.isDate(earthDay)); // false

/*
There is also a shortcut for directly importing the types object. This is particularly useful if you plan to use type-checking functions, but not any other functionality from util.
*/
const types = require('util/types');
console.log(types.isAsyncFunction(async() => {})); // true
