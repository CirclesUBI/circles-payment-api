const server = require('./app')({
  logger: true,
});

server.register(require('./routes'));
server.listen({ port: 3000 }, (err) => {
  if (err) {
    server.log.error(err);
    // process.exit(1);
  }
});
