#!/usr/bin/env node

const amqp = require('amqplib/callback_api');

amqp.connect('amqp://rabbitmqserver', function(error0, connection) {
    if (error0) {
        throw error0;
    }

    connection.createChannel(function(error1, channel) {
        if (error1) {
          throw error1;
        }
        let exchange = "compse140";
        let routingKey1 = "compse140.o"
        let routingKey2 = "compse140.i"
    
        channel.assertExchange(exchange, 'topic', {
          durable: false
        });
    
        channel.assertQueue('', {
          exclusive: true
        }, function(error2, q) {
          if (error2) {
            throw error2;
          }
          console.log(' [*] Waiting for logs. To exit press CTRL+C');

          const timer = ms => new Promise(res => setTimeout(res, ms))
          async function sendMsg (message) { // We need to wrap the loop into an async function for this to work
              await timer(1000);
              channel.publish(exchange, routingKey2, Buffer.from(message));
              console.log(" [x] Sent %s:'%s'", routingKey2, message);
               // then the created Promise can be awaited
          }
    
          channel.bindQueue(q.queue, exchange, routingKey1);
    
          channel.consume(q.queue, function(msg) {
            console.log(" [x] %s:'%s'", routingKey1, msg.content.toString());
            sendMsg(msg.content.toString())

          }, {
            noAck: true
          });
        });
      });

});