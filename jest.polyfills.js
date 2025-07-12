// Polyfill TextEncoder/TextDecoder for Node environment
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Add fetch polyfill
require('whatwg-fetch');
global.TransformStream = require('web-streams-polyfill').TransformStream;
global.BroadcastChannel = class BroadcastChannel {
  constructor() {}
  postMessage() {}
  addEventListener() {}
  removeEventListener() {}
  close() {}
}; 