import { MongoClient } from "mongodb";

const cliente = new MongoClient(
  "mongodb://192.168.100.8:27017/"
//   "mongodb+srv://alura:123@aluracluster.lp6gdyc.mongodb.net/?retryWrites=true&w=majority"
);

let documentosColecao;

try {
  await cliente.connect();

  const db = cliente.db("websocketsBase");
  documentosColecao = db.collection("documentos");

  console.log("Conectado ao banco de dados com sucesso!");
} catch (erro) {
  console.log(erro);
}

export { documentosColecao };