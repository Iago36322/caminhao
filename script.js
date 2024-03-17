var gateway = `ws://${window.location.hostname}/ws`;
var websocket;
var conected = false,botao = "";
let retorno = false

window.addEventListener('load', onLoad);
function initWebSocket() {
  console.log('Trying to open a WebSocket connection...');
  websocket = new WebSocket(gateway);
  websocket.onopen    = onOpen;
  websocket.onclose   = onClose;
  websocket.onmessage = onMessage; // <-- add this line
}
function onOpen(event) {
  console.log('Connection opened');
  conected = true;
}
function onClose(event) {
  reset_botoes();
  conected = false;
  console.log('Connection closed');
  setTimeout(initWebSocket, 500);
}

function onLoad(event) {
  initWebSocket();
  initButton();
}
function onMessage(event){
  retorno = true;
    var msg = event.data
    console.log(msg) 
    if(msg == "subir"){
      botao = document.getElementById("subir");
      botao.style.backgroundColor = "#f90202 ";
      botao = document.getElementById("descer");
      botao.style.backgroundColor = "#4CAF50 ";
    }else if(msg == "parar_subida"){
      botao = document.getElementById("subir");
      botao.style.backgroundColor = "#4CAF50 ";
    }
    if(msg == "descer"){
      botao = document.getElementById("descer");
      botao.style.backgroundColor = "#f90202 ";
      botao = document.getElementById("subir");
      botao.style.backgroundColor = "#4CAF50 ";
    }else if(msg == "parar_descida"){
      botao = document.getElementById("descer");
      botao.style.backgroundColor = "#4CAF50 ";
    }
    if(msg == "selectrue"){
      botao = document.getElementById("seletor");
      botao.style.backgroundColor = "#f90202 ";
    }else if(msg == "selectnot"){
      botao = document.getElementById("seletor");
      botao.style.backgroundColor = "#4CAF50 ";
    }
}
function reset_botoes(){
  botao = document.getElementById("subir");
      botao.style.backgroundColor = "#4CAF50 ";
  botao = document.getElementById("descer");
      botao.style.backgroundColor = "#4CAF50 ";
  botao = document.getElementById("seletor");
      botao.style.backgroundColor = "#4CAF50 ";
}
/*=======================================================monitpramento de conexao====================================== */
function verificarConexao() {
  fetch('http://192.168.4.1/', { mode: 'no-cors' })
    .then(response => {
      if (!response.ok) {
        console.log('desconectado ao servidor');
        location.reload();
      } else {
        console.log('Conectado ao servidor');
      }
    })
    .catch(error => {
      console.error('Erro na requisição:');
      /*location.reload(); usar  se nescessario */ 
    });
}
setInterval(verificarConexao, 5000);
/*====================================================================================================================== */
let bot_subir = true
let bot_descer = true
let select = true

function seletor(){

  if (select){
      console.log("mudança de carreta1")
      websocket.send('selectrue');
      
  }
  else{
    console.log("mudança de carreta2")
    websocket.send('selectnot');   
    
  }
select = !select
}


function subir() {
  
  if(bot_subir){bot_descer=true}//essa logica nao exitirar masi com websocket
  //sobe pistão
  if (bot_subir) {
    console.log("subindo")
    websocket.send('subir');
  }
  //para pistão
  else if (!bot_subir ) {
    console.log("pararando subida")
    websocket.send('parar_subida');
  } 
  bot_subir = !bot_subir
}

function descer() {

  if(bot_descer){bot_subir=true}
  if (bot_descer) {
    console.log("descnedo")
    websocket.send('descer');
  }
  //para pistão
  if (!bot_descer) {
    console.log("pararando decida")
    websocket.send('parar_descida');
  }
  bot_descer = !bot_descer
}

/*
ANOTAÇÃO:

CRIAR BARRA DE OPÇAO COM SEGURAR BOTAO
CRIAR COMUNICAÇAO ENTRE OS LADOS PARA CONFIRMAÇAO DE COMANDOS (web socket, ja esta em construçao)  
indicaçao de comando




FEITO:
melhorar CRIAR CANCELAR COMANDO SE DESCONECTAR DO WIFFI 
corrigido comando sobe depois que volta wiffi */
