const express = require("express")
// estou colocando o express dentro de uma const 
const server = express()
// aqui criei uma constante para executar uma função

// pegar o banco de dados
const db = require("./database/db.js")


// configurar a pasta publica
// express.static é uma função que espera um argumento
server.use(express.static("public"))

// habilitar o uso do req.body na minha aplicação
server.use(express.urlencoded({ extended: true }))
// server.use serve para fazer configurações no express 


//ultilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express:  server,
    noCache: true
})
// no cache pq se não ele vai ficar retornando uma pagina, antiga
// que já está salva na memoria dele, no cache



//agora tenho que criar os caminhos da minha aplicação
//pagina inicial
//get é um verbo do protocolo http
// req é uma requisição
//res é Resposta
// primeiro vem o requerimento dps a resposta, se não dá erro
// não dá certo responder antes de perguntar
// dirname vai retornar o nome do diretorio 
server.get("/", (req,res) => {
    return res.render("index.html")
})
// bom colocar return pq depois pode dar bug




server.get("/create-point", (req,res) => {
    //vou precisar pegar o req: Query (eles são os query strings das urls)
    //console.log(req.query)
    


    return res.render("create-point.html")
})

server.post("/savepoint", (req,res) => {
    // req.body: vai refletir o corpo do nosso formulario
    //console.log(req.body)
    
    //inserir dados no banco de dados
    const query = `
        INSERT INTO places(
            image,
            name,
            adress,
            number,
            state,
            city,
            items
        ) VALUES(?,?,?,?,?,?,?);`
    // depois essa interogações vão ser trocadas por valores
    
    const values = [
        req.body.image,
        req.body.name,
        req.body.adress,
        req.body.number,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterIsertData(err) {
        if(err){
            console.log(err)
            return res.send("Erro no cadastro")
            //se der erro vou receber um console log com erro
        }
        console.log("Cadastrado com sucesso")
        // se der certo ele vai emitir essa mensagem
        console.log(this)
        // this dentro da função referencia a resposta que o run traz

        return res.render("create-point.html", {saved: true})
    }
    // Não pode usar arrow function(funçao anonima => ) quando tem this
      db.run(query, values, afterIsertData) //esse é o db.run que insere dados
    // se eu colocar um () depois de afterIsertData, ele já vai executar a funçâo
    // mas quero que ele sirva como callback
    // callback é chamar a função novamente(é uma funçâo passada como parametro)
    
    
}) 




server.get("/search", (req,res) => {

    const search = req.query.search

    if(search == "") {
        // pesquisa vazia
        return res.render ("search-results.html", { total: 0})
    }

    //pegar os dados do banco de dados
    // consultar dados da tabela
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
        //quando coloco o like a pessoa não precisa digitar a cidade toda(parecido com)
        if(err){
            return console.log(err)
            // se der erro vou receber um console log com erro
        }
        //caso não haja erro
        //console.log("Aqui estão os seus registros: ")
        console.log(rows) //se não colocar rows ele não vai mostrar os registros 
        
        
        //criar uma constante length(propreidade que conta quantos elementos tem no array)
        const total = rows.length

        // mostrar a pagina html com os dados do banco de dados
        return res.render("search-results.html", {places:rows, total: total})
   })


  
})

//posso excutar varias funções como ligar o servidor

server.listen(3000)