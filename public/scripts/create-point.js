

function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

     fetch ("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then ( res => res.json() )
    .then ( states => {

            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`  
            }   

    })
}
populateUFs()

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("[name=state]")

//console.log(event.target.value)

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text


    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`


    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
// quando a chamada for feita o campo é limpo
// se deixar apenas citySelect.innerHTML += `<option value="${city.id}" >${city.nome}</option>`(linha 43)
// ele vai ficar somando as cidades de cada estado

    citySelect.disabled = true


    fetch (url)
    .then (res => res.json() )
    .then (cities => {

        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}" >${city.nome}</option>`
        }

        citySelect.disabled = false
    })
}

// += serve para concatenar por exemplo: aparecer duas opções
//console.log("HELLO WORLD")//fazer o console falar alguma coisa

document
    .querySelector("select[name=uf]") //selecionador de query 
    .addEventListener("change", getCities) 
    // ()=> criar função anonima, mesmo q function() vazio


//itens de coleta
// pegar todos os pontos de coleta

const itensToCollect = document.querySelectorAll(".items-grid li")

for(const item of itensToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")
// não deixar esse elemento lá embaixo pq se não toda vez 
// que executar aquela função ele vai buscar la no HTML

let selectedItems = []
// se tivesse deixado como const não daria pra sobrescrever
// let possibilita sbrescrever 


function handleSelectedItem(event){
    
    const itemLi = event.target

    // adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected")
    //faz a funçao de adicionar e remover cor
    const itemId = itemLi.dataset.id
    //const itemId = event.target.dataset.id // timha colocado assim oq faz testar dps 


    //testar se a logica esta funcionando
    //console.log('ITEM ID: ', itemId)

    //verificar se há itens selecionados, se sim pegar eles
    // se ja tiver itens selecionados, tirar a seleçao
        const alreadySelected = selectedItems.findIndex( function (item){
            const itemFound = item == itemId // isso será true ou false
            return itemFound
        })

        if( alreadySelected >= 0){
            // tirar da seleção
            const filteredItems = selectedItems.filter(item => {
                const itemIsDiferent = item != itemId //false
                return itemIsDiferent
            })
                
            selectedItems = filteredItems
            //quero que ele pegue os itens seleciondos e coloque o valor dos filtrados
            //console.log(filteredItems)
        }else{
            // se não estiver selecionado
            // adicionar a seleção
            selectedItems.push(itemId)
        }
            
        //console.log('selectedItems: ', selectedItems)
        //testar se a logica esta funcionando


            collectedItems.value = selectedItems
            // collected items vai ser sempre atualizado, e sempre vai ser os 
            // itens selecionados
            //console.log(selectedItems) //ver o que está selecionado...
    //console.log(alreadySelected != -1)
    // != diferente de menos 1
    // == significa igualar
    // 1 = é para atribuir valor

    //if(alreadySelected){}
    // atualizar o campo escondido com os itens selecionados
}