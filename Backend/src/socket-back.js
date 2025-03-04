import io from "./servidor.js";

io.on("connection", (socket) => {
  console.log("Um cliente se conectou!", socket.id);

  socket.on("selecionar_documento", (nomeDocumento) => {
    socket.join(nomeDocumento);
    console.log(nomeDocumento);
  });

  socket.on("texto-editor", ({texto, nomeDocumento}) => {
    console.log( nomeDocumento);
    // io.emit("texto-editor_clientes", texto); //Enviando para todos os clientes
    // socket.broadcast.emit("texto-editor_clientes", texto); //Enviando para todos os clientes, menos para o que enviou
    socket.to(nomeDocumento).emit("texto-editor_clientes", texto); //Enviando para todos os clientes, menos para o que enviou
  });

  socket.on("disconnect", (motivo) => {
    console.log(`Cliente "${socket.id}" desconectado!
    Motivo: ${motivo}`);
  });

});


