// ============================================
// 📦 Built-in Modules List
// ============================================

// console.log(require("module").builtinModules);

/*
[
  '_http_agent', '_http_client', '_http_common',
  '_http_incoming', '_http_outgoing', '_http_server',
  '_stream_duplex', '_stream_passthrough', '_stream_readable',
  '_stream_transform', '_stream_wrap', '_stream_writable',
  '_tls_common', '_tls_wrap', 'assert',
  'assert/strict', 'async_hooks', 'buffer',
  'child_process', 'cluster', 'console',
  'constants', 'crypto', 'dgram',
  'diagnostics_channel', 'dns', 'dns/promises',
  'domain', 'events', 'fs',
  'fs/promises', 'http', 'http2',
  'https', 'inspector', 'inspector/promises',
  'module', 'net', 'os',
  'path', 'path/posix', 'path/win32',
  'perf_hooks', 'process', 'punycode',
  'querystring', 'readline', 'readline/promises',
  'repl', 'stream', 'stream/consumers',
  'stream/promises', 'stream/web', 'string_decoder',
  'sys', 'timers', 'timers/promises',
  'tls', 'trace_events', 'tty',
  'url', 'util', 'util/types',
  'v8', 'vm', 'wasi',
  'worker_threads', 'zlib'
]
*/


// ============================================
// 🖥️ Console Module
// ============================================

/*
The console object provides methods:

1. log — prints messages
2. table — prints table
3. assert — prints if falsy
*/

// console.log('Message in Terminal');

// const petsArray = ['dog', 'cat', 'bird', 'monkey'];
// console.table(petsArray);

// console.assert(petsArray[4]); // Assertion failed


// ============================================
// ⚙️ Process Module
// ============================================

// console.log(process.argv);

/*
First element → Node path
Second element → file path
*/

// console.log(process.env);

/*
process.env stores environment variables
*/


// ============================================
// 🌱 NODE_ENV Setup
// ============================================

// if (process.argv[2] === 'dev') {
//   process.env.NODE_ENV = 'development';
//   console.log('development');
// } else {
//   process.env.NODE_ENV = 'production';
//   console.log('production');
// }

// if (process.env.NODE_ENV === 'development') {
//   startDevelopmentServer();
//   console.log('Testing! Testing! Does everything work?');
// } else {
//   startProductionServer();
// }

// function startDevelopmentServer() {
//   console.log('Starting Development Server...');
// }

// function startProductionServer() {
//   console.log('Starting Production Server...');
// }


// ============================================
// 🧠 Memory Usage
// ============================================

// console.log(process.memoryUsage());

/*
Returns:
{
  rss,
  heapTotal,
  heapUsed,
  external,
  arrayBuffers
}
*/


// ============================================
// ⚠️ Process Warning
// ============================================

// process.emitWarning('Something Happened!!', {
//   code: 'MY_WARNING',
//   detail: 'Additional information'
// });


// ============================================
// 💻 OS Module
// ============================================

const os = require('os');

// console.log(os.type());        // OS type
// console.log(os.arch());        // CPU architecture
// console.log(os.networkInterfaces());
// console.log(os.homedir());
// console.log(os.hostname());
// console.log(os.uptime());
// console.log(os.freemem());


// ============================================
// 🧰 UTIL Module
// ============================================

const util = require('util');

// const today = new Date();
// const earthDay = 'April 16, 2026';

// console.log(util.types.isDate(today));     // true
// console.log(util.types.isDate(earthDay));  // false


// Shortcut import
// const types = require('util/types');
// console.log(types.isAsyncFunction(async () => {})); // true


// ============================================
// 🔄 Callback Example
// ============================================

function getUser(id, callback) {
  return setTimeout(() => {
    if (id == 5) {
      callback(null, { nickname: 'Kunal' });
    } else {
      callback(new Error('User not found.'));
    }
  }, 1000);
}

function callback(error, user) {
  if (error) {
    console.error(error.message);
    return;
  }
  console.log(`User found! Their Nickname is ${user.nickname}`);
}

// getUser(1, callback);
// getUser(5, callback);


// ============================================
// 🔁 Promisify (Modern Version)
// ============================================

const getUserPromise = util.promisify(getUser);

async function tryToGetUser(id) {
  try {
    const user = await getUserPromise(id);
    console.log(`User found! Their Nickname is ${user.nickname}`);
  } catch (error) {
    console.error("User not found.");
  }
}

// tryToGetUser(1);
// tryToGetUser(5);


// ============================================
// 📊 Console Count
// ============================================

// console.count();
// console.count('default');
// console.count('default');
// console.count('Kunal');
// console.count('Ram');
// console.count('Kunal');


// ============================================
// 🧾 util.format()
// ============================================

// console.log(util.format('%s:%s', 'foo'));
// Output: 'foo:%s'