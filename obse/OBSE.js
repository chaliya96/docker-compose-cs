#!/usr/bin/env node

const amqp = require('amqplib/callback_api');
const fs = require('fs');

amqp.connect('amqp://rabbitmqserver', function(error0, connection) {
    if (error0) {
        throw error0;
    }

    connection.createChannel(function(error1, channel) {
        if (error1) {
          throw error1;
        }
        let exchange = "compse140";
        let routingKey = "compse140.*"
    
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
    
          channel.bindQueue(q.queue, exchange, routingKey);
          let n = 1;

          channel.consume(q.queue, function(msg) {
            console.log(" [x] %s:'%s'", msg.fields.routingKey, msg.content.toString());
            let formatMsg = new Date().toISOString()+" "+n.toString()+" "+msg.content.toString()+" to "+msg.fields.routingKey;
            fs.appendFile('/logs/file.log', formatMsg + "\n", err => {
                if (err) {
                  console.error(err);
                }
                // done!
              });

          }, {
            noAck: true
          });
        });
      });

});