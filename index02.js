var button = document.querySelector('#app form button')
var cep = document.querySelector('#app form input')
var content = document.querySelector('#app main')

button.addEventListener('click', run)

function run (event){
    event.preventDefault()

    var zipCode = cep.value
    zipCode = zipCode.replace(' ','')
    zipCode = zipCode.replace('.','')
    zipCode = zipCode.trim()

    axios.get('https://viacep.com.br/ws/' + zipCode + '/json/')
    .then( function (response){
            if(response.data.erro){
                throw new Error('CEP inválido')
            }


            content.innerHTML = ''   

            createLine(response.data.logradouro + ' - '+ response.data.bairro)
            createLine(response.data.localidade + ' - ' + response.data.uf)
           
    })
    .catch( function (error){
        content.innerHTML = ''   
        console.log(error)
        createLine('Ops, algo deu errado')
    })
}

function createLine(text){
    var line  = document.createElement('p')
    var text = document.createTextNode(text)

    line.appendChild(text)
    content.appendChild(line)
}