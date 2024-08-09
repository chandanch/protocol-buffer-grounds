const protobuf = require("protobufjs");

// 1. load the message defn file
protobuf.load("orderservice.proto").then((root) => {
  // root object contains all the message types and other elements
  // defined in the defn file
  const Order = root.lookupType("roomservice.Order");
  const Size = root.lookupEnum("roomservice.Size");
  const Timestamp = root.lookupType("google.protobuf.Timestamp");

  // create payload - this is where we create the message
  const payload = {
    order_id: 12322,
    order_time: Timestamp.create({ seconds: new Date().getTime() / 1000 }),
    cost: 23.32,
    meal: {
      "chandio": {
        entree: {
          food: 'Burger',
          notes: ['extra cheese'],
          size: ''
        },
        drink: {
          name: 'cola',
          size: ''
        },
        sides: [
          {
            type: 'fries',
            notes: ["extra zest"],
            size: ''
          }
        ]
      }
    }
  };
});
