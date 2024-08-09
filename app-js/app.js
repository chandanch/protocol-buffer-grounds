const protobuf = require('protobufjs');

// 1. load the message defn file
protobuf.load('orderservice.proto').then((root) => {
    const Order = root.lookupType('roomservice.Order');
    const Size = root.lookupEnum('roomservice.Size');
    
    const Timestamp = root.lookupType('google.protobuf.Timestamp');
})