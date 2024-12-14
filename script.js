const form = document.getElementById("cep-form");
const cepInput = document.getElementById("cep-input");
const resultado = document.getElementById("resultado");

form.addEventListener('submit', (event) => {
    // lógica para buscar o cep

    event.preventDefault(); // evitar recarregamento da pagina

    const cep = cepInput.value.trim(); // trim -> remove white space

    resultado.innerHTML = '<p>Buscando...</p>';

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao Buscar o CEP");
            }
            return response.json();
        })
        .then(data => {
            if (data.erro) {
                resultado.innerHTML = '<p style="color : red;">CEP nao encontrado</p>'
            }

            resultado.innerHTML = `
            <p>CEP: ${data.cep}</p>
            <p>Logradouro: ${data.logradouro}</p>
            <p>Bairro: ${data.bairro}</p>
            <p>Cidade: ${data.localidade}</p>
            <p>Estado: ${data.estado}</p>
        `
        })
})