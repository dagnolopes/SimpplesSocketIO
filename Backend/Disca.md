# O Socket.IO permite que qualquer dado serializável do JavaScript possa ser enviado junto com um evento. Um dado serializável é um dado que pode ser convertido em um determinado formato e, posteriormente, pode ser convertido de volta para sua forma original. Chamamos a recuperação do dado de desserialização.


# O JavaScript possui os métodos nativos JSON.stringify() e JSON.parse() para, respectivamente, serializar e desserializar diversos tipos de dados, como os tipos primitivos, arrays e objetos. Alguns tipos de dados, como undefined, Function, Symbol, Infinity, NaN, entre outros, não são serializados corretamente com estes métodos, pois não são dados aceitos no formato JSON.

# Entretanto, uma atenção especial deve ser tomada para os tipos Map e Set do JavaScript. Eles não são serializados corretamente se utilizarmos JSON.stringify(), mas possuem métodos próprios para serialização.

# Um objeto Map pode ser serializado e desserializado com o seguinte código:

const mapa = new Map();

const mapaSerializado = [...mapa.entries()];

const mapaOriginal = new Map(mapaSerializado);

# De forma semelhante, um objeto Set pode ser serializado e desserializado com o seguinte código:

const set = new Set();

const setSerializado = [...set.keys()];

const setOriginal = new Set(setSerializado);


# O tipo Date também merece atenção especial. Ao enviar um objeto Date como dado de um evento, ele será convertido para sua representação em string (por exemplo, 2022-11-03T19:11:54.073Z).

Então, ao receber esse dado do outro lado da comunicação, ele deve ser convertido de volta para o tipo Date. Para fazer isso, utilizamos o construtor Date(), passando a representação em string da data como parâmetro, como no exemplo a seguir:


const dataStr = "2022-11-03T19:11:54.073Z";

const data = new Date(dataStr);


# Existem diferentes tipos de dados válidos que podemos passar como parâmetro de URLSearchParams() para criar uma nova instância; como por exemplo uma string, um array de arrays ou um objeto. Os três exemplos abaixo são equivalentes:

// string como parâmetro
const parametros = new URLSearchParams("?nome=maria&sobrenome=eduarda");

// array de arrays como parâmetro
const parametros = new URLSearchParams([
  ["nome", "maria"],
  ["sobrenome", "eduarda"],
]);

// objeto como parâmetro
const parametros = new URLSearchParams({
  nome: "maria",
  sobrenome: "eduarda"
});


# Além disso, os clientes também podem entrar em diversas salas do Socket.IO. Com isso, no lado do servidor, podemos emitir eventos para clientes que estão, por exemplo, nas salas "sala1", "sala2", mas que não estão na "sala3", com auxílio do método except() (que significa “exceto”, do inglês):


io.to(["sala1", "sala2"]).except("sala3").emit("nome_do_evento");

// envia para todos os clientes, exceto os que estão na sala "sala_excluida"
io.except("sala_excluida").emit("nome_do_evento");

// envia para todos os clientes, exceto para o que está em `socket` e os que estão na sala "sala_excluida_1" e "sala_excluida_2"
io.on("connection", (socket) => {
  socket.broadcast.except(["sala_excluida_1", "sala_excluida_2"]).emit("nome_do_evento");
});