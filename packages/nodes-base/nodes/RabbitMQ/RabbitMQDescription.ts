import {
	INodeProperties,
	INodePropertyCollection,
	INodePropertyOptions,
} from 'n8n-workflow';

const amqpOptions: Record<string, INodePropertyOptions | INodeProperties | INodePropertyCollection> = {
	alternateExchange: {
		displayName: 'Alternate Exchange',
		name: 'alternateExchange',
		type: 'string',
		default: '',
		description: 'An exchange to send messages to if this exchange can\'t route them to any queues',
	},

	autoDelete: {
		displayName: 'Auto Delete',
		name: 'autoDelete',
		type: 'boolean',
		default: false,
		description: 'Whether the queue will be deleted when the number of consumers drops to zero',
	},

	arguments: {
		displayName: 'Arguments',
		name: 'arguments',
		placeholder: 'Add Argument',
		description: 'Arguments to add',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		default: {},
		options: [
			{
				name: 'argument',
				displayName: 'Argument',
				values: [
					{
						displayName: 'Key',
						name: 'key',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
					},
				],
			},
		],
	},

	durable: {
		displayName: 'Durable',
		name: 'durable',
		type: 'boolean',
		default: true,
		description: 'Whether the queue will survive broker restarts',
	},

	exclusive: {
		displayName: 'Exclusive',
		name: 'exclusive',
		type: 'boolean',
		default: false,
		description: 'Whether to scope the queue to the connection',
	},
};

// TODO add defaults to match best practices like queue expiration (currently old queues with subscriptions can pile up messages forever)
export const queueOptions: INodeProperties = {
	displayName: 'Queue Options',
	name: 'queueOptions',
	type: 'collection',
	default: {},
	placeholder: 'Add Queue Option',
	options: ['arguments', 'autoDelete', 'durable', 'exclusive'  ].map(name => amqpOptions[name]),
};

export const exchangeOptions: INodeProperties = {
	displayName: 'Exchange Options',
	name: 'exchangeOptions',
	type: 'collection',
	default: {},
	placeholder: 'Add Exchange Option',
	options: [ 'alternateExchange', 'arguments', 'autoDelete', 'durable'].map(name => amqpOptions[name]),
};

export const messageOptions: INodeProperties = {
	displayName: 'Message Options',
	name: 'options',
	type: 'collection',
	default: {},
	placeholder: 'Add Message Option',
	options: [
		{
			displayName: 'App ID',
			name: 'appId',
			type: 'string',
			description: 'An arbitrary identifier for the originating application',
			default: '',
		},

		{
			displayName: 'CC',
			name: 'CC',
			type: 'string',
			description: 'An array of routing keys as strings; messages will be routed to these routing keys in addition to that given as the routingKey parameter. A string will be implicitly treated as an array containing just that string. This will override any value given for CC in the headers parameter. NB The property names CC and BCC are case-sensitive.',
			default: '',
		},

		{
			displayName: 'BCC',
			name: 'BCC',
			type: 'string',
			description: 'Like CC, except that the value will not be sent in the message headers to consumers',
			default: '',
		},

		{
			displayName: 'Content Encoding',
			name: 'contentEncoding',
			type: 'string',
			description: 'A MIME encoding for the message content',
			default: 'utf-8',
		},

		{
			displayName: 'Content Type',
			name: 'contentType',
			type: 'string',
			description: 'A MIME type for the message content',
			default: 'application/json',
		},

		{
			displayName: 'Expiration',
			name: 'expiration',
			type: 'string',
			description: 'If supplied, the message will be discarded from a queue once it\'s been there longer than the given number of milliseconds',
			default: '',
		},

		{
			displayName: 'Headers',
			name: 'headers',
			placeholder: 'Add Message Header',
			description: 'Headers to add to the message',
			type: 'fixedCollection',
			typeOptions: {
				multipleValues: true,
			},
			default: {},
			options: [
				{
					name: 'header',
					displayName: 'Header',
					values: [
						{
							displayName: 'Key',
							name: 'key',
							type: 'string',
							default: '',
						},
						{
							displayName: 'Value',
							name: 'value',
							type: 'string',
							default: '',
						},
					],
				},
			],
		},

		{
			displayName: 'Mandatory',
			name: 'mandatory',
			type: 'boolean',
			description: 'Whether the message will be returned if it is not routed to a queue (i.e., if there are no bindings that match its routing key)',
			default: true,
		},

		{
			displayName: 'Message ID',
			name: 'messageId',
			type: 'string',
			description: 'Arbitrary application-specific identifier for the message',
			default: '',
		},

		{
			displayName: 'Persistent',
			name: 'persistent',
			type: 'boolean',
			description: 'Whether is true, the message will survive broker restarts provided it\'s in a queue that also survives restarts',
			default: true,
		},

		{
			displayName: 'Priority',
			name: 'priority',
			type: 'number',
			description: 'A priority for the message; ignored by versions of RabbitMQ older than 3.5.0, or if the queue is not a priority queue',
			default: 0,
		},

		// TODO implement RabbitMQ's RPC
		//{
		//	displayName: 'correlationId',
		//	name: 'correlationId',
		//	type: 'string',
		//	description: 'Usually used to match replies to requests, or similar',
		//	default: '',
		//},
		//{
		//	displayName: 'replyTo',
		//	name: 'replyTo',
		//	type: 'string',
		//	description: 'Often used to name a queue to which the receiving application must send replies, in an RPC scenario (many libraries assume this pattern)',
		//	default: '',
		//},

		{
			displayName: 'Timestamp',
			name: 'timestamp',
			type: 'number',
			description: 'A timestamp for the message',
			default: 0,
		},

		{
			displayName: 'Type',
			name: 'type',
			type: 'string',
			description: 'An arbitrary application-specific type for the message',
			default: '',
		},

		{
			displayName: 'User ID',
			name: 'userId',
			type: 'string',
			description: 'If supplied, RabbitMQ will compare it to the username supplied when opening the connection, and reject messages for which it does not match',
			default: '',
		},
	],
};