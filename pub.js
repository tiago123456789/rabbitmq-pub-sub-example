
const amqp = require('amqplib');

const publish = async () => {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const exchange = 'messages';
    const msg = process.argv.slice(2).join(' ') || 'Hello World!';

    await channel.assertExchange(exchange, 'fanout', {
        durable: false
    });

    channel.publish(exchange, '', Buffer.from(msg));
    console.log(" [x] Sent %s", msg);
    setTimeout(function () {
        process.exit(0);
    }, 500);
}

publish();