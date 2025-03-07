import { MongoClient } from "mongodb";

const cliente = new MongoClient(
  "mongodb://192.168.100.8:27017"
//   "mongodb+srv://alura:123@aluracluster.lp6gdyc.mongodb.net/?retryWrites=true&w=majority"
);

let documentosColecao;

try {
  await cliente.connect();

  const db = cliente.db("testdb");
  documentosColecao = db.collection("people");

  console.log("Conectado ao banco de dados com sucesso!");
} catch (erro) {
  console.log(erro);
}

export { documentosColecao };