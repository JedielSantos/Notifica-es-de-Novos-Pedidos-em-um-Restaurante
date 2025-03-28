const listaPedidos = document.getElementById("pedidos");

// HTTP Polling
setInterval(async () => {
    const res = await fetch("/pedidos");
    const pedidos = await res.json();
    renderizarPedidos(pedidos);
}, 5000);

// WebSocket
const ws = new WebSocket("ws://localhost:3000");
ws.onmessage = (event) => {
    const pedido = JSON.parse(event.data);
    adicionarPedidoNaLista(pedido);
};

function renderizarPedidos(pedidos) {
    listaPedidos.innerHTML = "";
    pedidos.forEach(adicionarPedidoNaLista);
}

function adicionarPedidoNaLista(pedido) {
    const li = document.createElement("li");
    li.textContent = `Pedido: ${pedido.nome}, Mesa: ${pedido.mesa}`;
    listaPedidos.appendChild(li);
}