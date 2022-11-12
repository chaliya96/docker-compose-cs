#!/usr/bin/env node

const amqp = require('amqplib/callback_api');

amqp.connect('amqp://rabbitmq_go_net', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
          throw error1;
        }
        var exchange = "compse140";
        var key = "compse140.o"
    
        channel.assertExchange(exchange, 'topic', {
          durable: false
        });

        const timer = ms => new Promise(res => setTimeout(res, ms))
        async function sendMsg () { // We need to wrap the loop into an async function for this to work
            for (var i = 1; i < 4; i++) {
              let msg = "MSG_"
              await timer(3000)
              msg = msg + i.toString();;
              channel.publish(exchange, key, Buffer.from(msg));
              console.log(" [x] Sent %s:'%s'", key, msg);
               // then the created Promise can be awaited
            }
          }
        sendMsg();
      });

    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 15000);
});