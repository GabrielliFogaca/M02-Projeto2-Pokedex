const express = require("express");

const port = process.env.PORT || 3000;
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded()); //navegador envia informações pelo json e vem do body, pegar as informações do body (informações do input), vem do name e cria o json

const listaPokemons = [
  {
    id: 1,
    numero: 00001,
    nome: "Bulbasaur",
    tipo: "Planta/Veneno",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
    descricao: "Desde o dia em que nasceu possui uma semente estranha plantada em suas costas. O bulbo em suas costas está cheio de nutrientes. Nele, Bulbasaur armazena suas energias. O bulbo vai crescendo à medida que envelhece porque ele absorve os raios de sol.",
    altura: "0,7m",
    peso: "6,9 kg",
    categoria: "Pokémon Semente",
    habilidade: "Superar",
  },
  {
    id: 2,
    numero: 00002,
    nome: "Ivysaur",
    tipo: "Planta/Veneno",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/002.png",
    descricao: "A exposição à luz solar aumenta sua força. A luz do sol fará a flor em suas costas crescer. Conforme Ivysaur for crescendo, essa flor irá desabrochar. Ela irá soltar um doce aroma quando florescer. Quando o bulbo em sua parte traseira fica grande, parece perder a capacidade de ficar em pé sobre as patas traseiras.",
    altura: "1,0 m",
    peso: "13,0 kg",
    categoria: "Pokémon Semente",
    habilidade: "Superar",
  },
  {
    id: 3,
    numero: 00003,
    nome: "Venusaur",
    tipo: "Planta/Veneno",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/003.png",
    descricao: " luz solar que a flor de suas costas absorve produz energia para seu corpo. Por esta razão, ele fica mais forte no verão. O aroma dessa flor pode acalmar as emoções das pessoas. Depois de um dia chuvoso, a flor nas costas tem um cheiro mais forte. O cheiro atrai outros pokémons.",
    altura: "2,0 m",
    peso: "100 kg",
    categoria: "Pokémon Semente",
    habilidade: "Superar",
  },
  {
    id: 4,
    numero: 00004,
    nome: "Charmander",
    tipo: "Fogo",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png",
    descricao: "A chama que possui na ponta de seu rabo mostra a força de sua vida. Se ele estiver fraco, a chama irá diminuir. Quando está saudável, a chama brilhará intensamente. Tem preferência por coisas quentes. Quando chove, diz-se que o vapor jorra da ponta da cauda. Sua vida acabaria se essa chama se apagasse.",
    altura: "0,6 m",
    peso: "8,5 kg",
    categoria: "Pokémon Lagarto",
    habilidade: "Chama",
  },
];

let pokemon = undefined; //deixa no escopo global

//passo2-ejs
app.get("/", (req, res) => {
  res.render("index", { listaPokemons, pokemon }); //render para renderizar a página HTML
});

app.post("/create", (req, res) => {
  const pokemon = req.body; //cria uma const e recebe req.body, o que vier da requisição do cliente ele recebe em cachorro
  pokemon.id = listaPokemons.length + 1;
  listaPokemons.push(pokemon); //listaCachorros é array, push insere um item novo no final do array
  res.redirect("/#cards");
});

app.get("/detalhes/:id", (req, res) => {
  const id = +req.params.id;
  pokemon = listaPokemons.find((pokemon) => pokemon.id == id);
  res.redirect("/#cadastro");
})

app.post("/update/:id", (req, res) => {
  const id = +req.params.id -1; //+ string -> number, subtraindo um apra pegar a posição do array
  const novoPokemon = req.body; //cachorro que vem do body
  novoPokemon.id = id + 1;
  listaPokemons[id] = novoPokemon;
  pokemon = undefined;//para mostrar o formulário de cadastro
  res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
  const id = +req.params.id - 1;
  delete listaPokemons[id];
  res.redirect("/#cards");
});

app.listen(port, () =>{
  console.log(`Servidor rodando em http://localhost:${port}`)
}); //ouvir a porta 3000, rodando nessa porta
