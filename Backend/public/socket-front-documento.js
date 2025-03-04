import { atualizarTextoEditor } from "./documento.js";


const socket = io();

function selecionarDocumento(nome) {
    socket.emit("selecionar_documento", nome);
  }

function emitirTextoEditor(dados) {  
  socket.emit("texto-editor", dados);
  console.log(dados.texto);
}

socket.on("texto-editor_clientes", (texto) => {
    console.log(texto);
    atualizarTextoEditor(texto);
});  

socket.on("disconnect", (motivo) => {
    console.log(`Servidor desconectado!
    Motivo: ${motivo}`);
  });


export { emitirTextoEditor, selecionarDocumento };