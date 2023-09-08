// Array para armazenar os resultados
const resultados = [];

// Função para inserir um novo resultado
function inserirResultado() {
    const novoResultadoInput = document.getElementById("novo-resultado");
    const dataInput = document.getElementById("data");
    const concursoInput = document.getElementById("concurso");
    const tabelaResultados = document.getElementById("tabela-resultados").getElementsByTagName("tbody")[0];

    // Obter os valores dos inputs
    const novoResultado = novoResultadoInput.value;
    const data = dataInput.value;
    const concurso = concursoInput.value;

    // Criar uma nova linha na tabela para o resultado inserido
    const newRow = tabelaResultados.insertRow(0);
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4);
    const cell6 = newRow.insertCell(5);

    // Preencher as células com os valores inseridos
    cell1.innerHTML = "Resultado " + tabelaResultados.rows.length;
    cell2.innerHTML = data;
    cell3.innerHTML = concurso;
    cell4.innerHTML = novoResultado;

    // Adicionar botão "Editar"
    const botaoEditar = document.createElement("button");
    botaoEditar.textContent = "Editar";
    botaoEditar.onclick = function () {
        editarResultado(newRow);
    };
    cell5.appendChild(botaoEditar);

    // Adicionar botão "Excluir"
    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.onclick = function () {
        tabelaResultados.deleteRow(newRow.rowIndex);
        resultados.splice(newRow.rowIndex - 1, 1);
        atualizarAnaliseNumeros();
    };
    cell6.appendChild(botaoExcluir);

    // Limpar os campos de input
    novoResultadoInput.value = "";
    dataInput.value = "";
    concursoInput.value = "";

    // Adicionar o resultado à lista de resultados
    resultados.push({
        data: data,
        concurso: concurso,
        numerosSorteados: novoResultado.split(" "),
    });

    // Atualizar a análise dos números
    atualizarAnaliseNumeros();
}

// Função para editar um resultado
function editarResultado(row) {
    const data = row.cells[1].textContent;
    const concurso = row.cells[2].textContent;
    const numerosSorteados = row.cells[3].textContent.split(" ").join("\n");

    const novoResultadoInput = document.getElementById("novo-resultado");
    const dataInput = document.getElementById("data");
    const concursoInput = document.getElementById("concurso");

    novoResultadoInput.value = numerosSorteados;
    dataInput.value = data;
    concursoInput.value = concurso;

    row.parentNode.removeChild(row);
    resultados.pop();
    atualizarAnaliseNumeros();
}

// Função para atualizar a análise dos números
function atualizarAnaliseNumeros() {
    const numeros = {};

    // Contar a ocorrência de cada número
    for (const resultado of resultados) {
        const numerosSorteados = resultado.numerosSorteados;
        for (const numeroSorteado of numerosSorteados) {
            const numero = parseInt(numeroSorteado);
            if (!isNaN(numero)) {
                if (!numeros[numero]) {
                    numeros[numero] = 1;
                } else {
                    numeros[numero]++;
                }
            }
        }
    }

    // Obter números únicos em ordem crescente
    const numerosUnicos = [...new Set(resultados.map((resultado) => resultado.numerosSorteados).flat())].sort((a, b) => a - b);

    // Obter a contagem de ocorrências de cada número
    const contagemNumeros = numerosUnicos.map((numero) => ({
        numero,
        ocorrencias: numeros[numero] || 0,
    }));

    // Ordenar pelo número de ocorrências (menos saíram)
    const menosSairam = contagemNumeros.sort((a, b) => a.ocorrencias - b.ocorrencias).slice(0, 10);

    // Ordenar pelo número de ocorrências (mais saíram)
    const maisSairam = contagemNumeros.sort((a, b) => b.ocorrencias - a.ocorrencias).slice(0, 10);

    // Exibir os resultados na página
    const maisSairamList = document.getElementById("mais-sairam");
    const menosSairamList = document.getElementById("menos-sairam");
    const numerosRepetidosList = document.getElementById("numeros-repetidos");

    maisSairamList.innerHTML = "";
    menosSairamList.innerHTML = "";
    numerosRepetidosList.innerHTML = "";

    for (const item of maisSairam) {
        const li = document.createElement("li");
        li.textContent = `${item.numero} (${item.ocorrencias} vezes)`;
        maisSairamList.appendChild(li);
    }

    for (const item of menosSairam) {
        const li = document.createElement("li");
        li.textContent = `${item.numero} (${item.ocorrencias} vezes)`;
        menosSairamList.appendChild(li);
    }

    // Encontrar números que se repetem em todos os resultados
    const numerosRepetidos = [];
    if (resultados.length > 0) {
        const primeiroResultado = resultados[0].numerosSorteados;
        for (const numero of primeiroResultado) {
            let repetido = true;
            for (const resultado of resultados) {
                if (!resultado.numerosSorteados.includes(numero)) {
                    repetido = false;
                    break;
                }
            }
            if (repetido) {
                numerosRepetidos.push(numero);
            }
        }
    }

    for (const numero of numerosRepetidos) {
        const li = document.createElement("li");
        li.textContent = numero;
        numerosRepetidosList.appendChild(li);
    }
}

// Função para ordenar a tabela por coluna
function ordenarPorColuna(coluna) {
    const tabelaResultados = document.getElementById("tabela-resultados").getElementsByTagName("tbody")[0];
    const rows = Array.from(tabelaResultados.rows);

    rows.sort((a, b) => {
        const valorA = a.cells[coluna].textContent;
        const valorB = b.cells[coluna].textContent;
        return valorA.localeCompare(valorB, undefined, { numeric: true, sensitivity: 'base' });
    });

    // Limpar a tabela atual
    while (tabelaResultados.rows.length > 0) {
        tabelaResultados.deleteRow(0);
    }

    // Adicionar as linhas ordenadas de volta à tabela
    for (const row of rows) {
        tabelaResultados.appendChild(row);
    }
}

// Função para gerar um novo jogo (implemente a lógica desejada)
function gerarNovoJogo() {
    // Implemente a lógica para gerar um novo jogo aqui
}

// Função para testar um jogo
function testarJogo() {
    const testarJogoInput = document.getElementById("testar-jogo");
    const selectedNumbers = Array.from(testarJogoInput.getElementsByClassName("number-checkbox checked")).map(element => parseInt(element.textContent));

    const acertosPorConcurso = {};

    resultados.forEach((resultado) => {
        const numerosResultado = resultado.numerosSorteados;
        const concurso = resultado.concurso;

        const acertos = numerosResultado.filter((numero) =>
            selectedNumbers.includes(parseInt(numero))
        ).length;

        acertosPorConcurso[concurso] = acertos;
    });

    let mensagem = "Quantidade de acertos por concurso:\n\n";

    for (const concurso in acertosPorConcurso) {
        mensagem += `Concurso ${concurso}: ${acertosPorConcurso[concurso]} acertos\n`;
    }

    alert(mensagem);
}

// Função para importar dados de um arquivo .txt
function importarDados() {
    const inputArquivo = document.getElementById("importar-arquivo");
    const arquivo = inputArquivo.files[0];

    if (!arquivo) {
        alert("Selecione um arquivo .txt para importar.");
        return;
    }

    const leitor = new FileReader();

    leitor.onload = function (e) {
        const conteudo = e.target.result;
        const linhas = conteudo.split("\n");

        // Limpar a tabela atual
        const tabelaResultados = document.getElementById("tabela-resultados").getElementsByTagName("tbody")[0];
        tabelaResultados.innerHTML = '';

        resultados.length = 0; // Limpar o array de resultados

        for (const linha of linhas) {
            const partes = linha.trim().split(/\s+/);
            if (partes.length >= 3) {
                const data = partes[0];
                const concurso = partes[1];
                const numerosSorteados = partes.slice(2).join(" ");
                inserirResultadoImportado(data, concurso, numerosSorteados);
            }
        }

        inputArquivo.value = ""; // Limpar o campo de seleção de arquivo
    };

    leitor.readAsText(arquivo);
}


// Função para inserir um resultado importado
function inserirResultadoImportado(data, concurso, numerosSorteados) {
    const tabelaResultados = document.getElementById("tabela-resultados").getElementsByTagName("tbody")[0];

    // Criar uma nova linha na tabela para o resultado importado
    const newRow = tabelaResultados.insertRow(0);
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4);
    const cell6 = newRow.insertCell(5);

    // Preencher as células com os valores importados
    cell1.innerHTML = "Resultado " + tabelaResultados.rows.length;
    cell2.innerHTML = data;
    cell3.innerHTML = concurso;
    cell4.innerHTML = numerosSorteados;

    // Adicionar botão "Editar"
    const botaoEditar = document.createElement("button");
    botaoEditar.textContent = "Editar";
    botaoEditar.onclick = function () {
        editarResultado(newRow);
    };
    cell5.appendChild(botaoEditar);

    // Adicionar botao "Excluir"
    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.onclick = function () {
        tabelaResultados.deleteRow(newRow.rowIndex);
        resultados.splice(newRow.rowIndex - 1, 1);
        atualizarAnaliseNumeros();
    };
    cell6.appendChild(botaoExcluir);

    // Adicionar o resultado à lista de resultados
    resultados.push({
        data: data,
        concurso: concurso,
        numerosSorteados: numerosSorteados.split(" "),
    });

    // Atualizar a análise dos números
    atualizarAnaliseNumeros();
}

// Event listeners para atualizar o contador de caracteres nos inputs
const novoResultadoInput = document.getElementById("novo-resultado");
const testarJogoInput = document.getElementById("testar-jogo");

novoResultadoInput.addEventListener("input", updateCharacterCount);
testarJogoInput.addEventListener("input", updateSelectedNumbersCount);

function updateCharacterCount() {
    const novoResultadoInput = document.getElementById("novo-resultado");
    const novoResultadoCount = novoResultadoInput.value.split(" ").filter(Boolean).length;
    const novoResultadoCounter = document.getElementById("count-novo-resultado");
    novoResultadoCounter.textContent = `${novoResultadoCount}`;
}
// Variável para rastrear números selecionados
const selectedNumbers = new Set();

// Função para alternar a seleção de números
function toggleNumber(element, number) {
    if (selectedNumbers.has(number)) {
        selectedNumbers.delete(number);
        element.classList.remove("checked");
    } else {
        if (selectedNumbers.size < 15) {
            selectedNumbers.add(number);
            element.classList.add("checked");
        }
    }
    updateSelectedNumbersCount();
}

// Função para atualizar o contador de números selecionados
function updateSelectedNumbersCount() {
    const testarJogoCount = selectedNumbers.size;
    const testarJogoCounter = document.getElementById("count-testar-jogo");
    testarJogoCounter.textContent = `${testarJogoCount}`;
}
// Event listener para importar dados de arquivo .txt
const importarArquivoButton = document.getElementById("imports");
importarArquivoButton.addEventListener("click", importarDados);
