// importar a dependencia do sqlite3
// função quando está dentro de objeto é chamado metodo
const sqlite3 = require("sqlite3").verbose()

// criar o objeto que irá fazer operações no banco de dados
// quando é usada essa palavra new eu posso iniciar um novo objeto desde que
// o que está sendo retornado para mim seja um constructor ou uma classe
const db = new sqlite3.Database("./src/database/database.db")

// com essas duas linhas criei um banco de dados
//  (node src/database/db.js) comando para criar o banco de dados

// ultilizar o objeto de banco de dados
// serialize quer dizer que ele vai rodar sequencia de codigos


module.exports = db
// vou exportar o objeto db


 /* db.serialize(() => {
    
   //com comandos SQL eu vou:
    
    
    //1 criar uma tabela dentro do banco de dados
    // coloquei uma crase para poder quebrar linha e não gerar bug(não consigo fazer isso com aspas simples ou duplas)
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            adress TEXT,
            number TEXT,
            state TEXT,
            city TEXT,
            items TEXT

        );
    `)
    // PRIMARY KEY quer dizer que esse é o campo principal que a tabela vai usar pra identificar o registro
    // AUTOINCREMENT quer dizer que esse campo vai ter numeros que vão se auto incrementar(numero 1,2,3,4,5)



    // 2 inserir dados na tabela
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
        "http://localhost:3000/assets/alfonso-navarro-qph7tJfcDys-unsplash.jpg",
        "Papersider",
        "Guilherme Gemballa, Jardim America",
        "N 260",
        "Santa Catarina",
        "Rio do Sul",
        "Papeis e papelão"
    ]

    function afterIsertData(err) {
        if(err){
            return console.log(err)
            //se der erro vou receber um console log com erro
        }
        console.log("Cadastrado com sucesso")
        // se der certo ele vai emitir essa mensagem
        console.log(this)
        // this dentro da função referencia a resposta que o run traz
    }
    // Não pode usar arrow function(funçao anonima => ) quando tem this
      db.run(query, values, afterIsertData) //esse é o db.run que insere dados
    // se eu colocar um () depois de afterIsertData, ele já vai executar a funçâo
    // mas quero que ele sirva como callback
    // callback é chamar a função novamente(é uma funçâo passada como parametro)

        
    
    // 3 consultar dados da tabela
    // posso colocar a consulta dps de deletar para ver se ele deletou mesmo
    //    db.all(`SELECT * FROM places`, function(err, rows){
    //        if(err){
    //            return console.log(err)
    //            //se der erro vou receber um console log com erro
    //        }
            // caso não haja erro
    //        console.log("Aqui estão os seus registros: ")
    //        console.log(rows) //se não colocar rows ele não vai mostrar os registros 
    //    })

 



    // 4 deletar dados da tabela
  //  db.run(`DELETE FROM places WHERE id = ?`, [], function(err){
   //     if(err){
   //         return console.log(err)
            //se der erro vou receber um console log com erro
        }
         // caso não haja erro
         // console.log("Registros deletados com sucesso")
    //    })
    //ele vai deletar da tabela places o id igaul a 1
   

}) */