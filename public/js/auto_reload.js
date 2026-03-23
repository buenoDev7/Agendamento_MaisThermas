// → Função que atualiza automaticamente a página para evitar stand-by do servidor
function autoReload() {
    setTimeout(() => {
        window.location.reload();
    }, 30000)
}

window.onload = autoReload();