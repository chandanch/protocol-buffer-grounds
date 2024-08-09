const protobuf = require('protobufjs');

// 1. load the message defn file
protobuf.load('../order-service/orderservice.proto').then((root) => {
	// root object contains all the message types and other elements
	// defined in the defn file
	const Order = root.lookupType('orderservice.Order');
	const Size = root.lookupEnum('orderservice.Size');
	const Timestamp = root.lookupType('google.protobuf.Timestamp');

	// create payload - this is where we create the message data
	const payload = {
		order_id: 12322,
		order_time: Timestamp.create({ seconds: new Date().getTime() / 1000 }),
		cost: 23.32,
		meal: {
			chandio: {
				entree: {
					food: 'Burger',
					notes: ['extra cheese'],
					size: Size.values.Size_MEDIUM,
				},
				drink: {
					name: 'cola',
					size: Size.values.Size_MEDIUM,
				},
				sides: [
					{
						type: 'fries',
						notes: ['extra zest'],
						size: Size.values.Size_MEDIUM,
					},
				],
			},
		},
	};

	// create the Order Protobuf message
	// serializes the message (coverts it to binary)
	const message = Order.create(payload);

	// encode the message and wait till it finishes
	const encodedMessage = Order.encode(message).finish();

	console.log('Serialized Message:');
	console.log(Buffer.from(encodedMessage).toString('ascii'));

	// de-serialize the message - reconstitute into an object
	console.log('De-Serialized Message:');
	const order2 = Order.decode(encodedMessage);
	console.log(order2.toJSON(order2));
});
