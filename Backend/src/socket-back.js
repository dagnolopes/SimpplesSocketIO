import {
  adicionarDocumento,
  atualizaDocumento,
  encontrarDocumento,
  excluirDocumento,
  obterDocumentos,
} from "./documentosDb.js";

import io from "./servidor.js";

const documentos = [
  {
    nome: "JavaScript",
    texto: "texto de javascript...",
  },
  {
    nome: "Node",
    texto: "texto de node...",
  },
  {
    nome: "Socket.io",
    texto: "texto de socket.io...",
  },
];

//connection
io.on("connection", (socket) => {
  console.log("Um cliente se conectou!", socket.id);

  socket.on("obter_documentos", async (devolverDocumentos) => {
    const documentos = await obterDocumentos();

    devolverDocumentos(documentos);
  });

  socket.on("adicionar_documento", async (nome) => {
    const documentoExiste = (await encontrarDocumento(nome)) !== null;

    if (documentoExiste) {
      socket.emit("documento_existente", nome);
    } else {
      const resultado = await adicionarDocumento(nome);

      if (resultado.acknowledged) {
        io.emit("adicionar_documento_interface", nome);
      }
    }
  });

  //selecionar_documento
  socket.on("selecionar_documento", async (nomeDocumento, callbackDevolverTexto) => {
    socket.join(nomeDocumento);

    const documento = await encontrarDocumento(nomeDocumento);

    console.log(documento);

    if(documento){
      callbackDevolverTexto(documento.texto);
      // socket.emit("texto-documento", documento.texto);  
    }
    console.log(documento);



    // console.log(nomeDocumento);
  });

  //editor-texto
  socket.on("texto-editor", async ({texto, nomeDocumento}) => {

    const documento = await atualizaDocumento(nomeDocumento, texto);
    // const documento = encontrarDocumento(nomeDocumento);

    if(documento){
      documento.texto = texto;
    } else {  
      documentos.push({nome: nomeDocumento, texto});
    }

    // console.log( nomeDocumento);
    // io.emit("texto-editor_clientes", texto); //Enviando para todos os clientes
    // socket.broadcast.emit("texto-editor_clientes", texto); //Enviando para todos os clientes, menos para o que enviou
    socket.to(nomeDocumento).emit("texto-editor_clientes", texto); //Enviando para todos os clientes, menos para o que enviou
  });

  socket.on("excluir_documento", async (nome) => {
    const resultado = await excluirDocumento(nome);

    if (resultado.deletedCount) {
      io.emit("excluir_documento_sucesso", nome);
    }
  });

  //disconnect
  socket.on("disconnect", (motivo) => {
    console.log(`Cliente "${socket.id}" desconectado!
    Motivo: ${motivo}`);
  });

});


// function encontrarDocumento(nome){
//   const documento = documentosColecao.findOne({nome:nome});
//   return documento;
//   //  const documento = documentos.find(doc => doc.nome === nome); 
//   //  return documento;
// }