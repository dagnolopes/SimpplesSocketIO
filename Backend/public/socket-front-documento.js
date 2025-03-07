import {alertarERedirecionar, atualizarTextoEditor } from "./documento.js";


const socket = io();

function selecionarDocumento(nome) {
    socket.emit("selecionar_documento", nome, 
        (texto) => {
            atualizarTextoEditor(texto);
        }   
    );
  }

function emitirTextoEditor(dados) {  
  socket.emit("texto-editor", dados);
  console.log(dados.texto);
}

socket.on("texto-editor_clientes", (texto) => {
    console.log(texto);
    atualizarTextoEditor(texto);
});  

// socket.on("texto-documento", (texto) => {
//     // console.log(texto);
//     atualizarTextoEditor(texto);
// });  

function emitirExcluirDocumento(nome) {
  socket.emit("excluir_documento", nome);
}

socket.on("excluir_documento_sucesso", (nome) => {
  alertarERedirecionar(nome);
});

socket.on("disconnect", (motivo) => {
    console.log(`Servidor desconectado!
    Motivo: ${motivo}`);
  });


export { emitirTextoEditor, selecionarDocumento, emitirExcluirDocumento  };