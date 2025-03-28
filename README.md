 Instalar as dependências
 npm install express ws

 Iniciar o servidor
 node server.js

 Acessar o painel de pedidos
 http://localhost:3000

  Testar a adição de pedidos
  curl -X POST http://localhost:3000/pedidos -H "Content-Type: application/json" -d '{"nome":"Pizza", "mesa":5}'
