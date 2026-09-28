/* =========================================================
   DADOS FICTÍCIOS DO 8º ANO
   ---------------------------------------------------------
   Aqui usamos um ARRAY (lista) de OBJETOS.
   - Array: lista de coisas, entre colchetes [ ].
   - Objeto: um conjunto de informações com nome, entre chaves { }.
   Cada objeto representa uma disciplina.
========================================================= */
const dadosBrutos = [
  { disciplina: "Língua Portuguesa", tri1: 82, tri2: "7,8", tri3: 85, faltas: [2, 1, 1] },
  { disciplina: "Matemática", tri1: 52, tri2: "5,8", tri3: null, faltas: [3, 2, 1] },
  { disciplina: "Ciências", tri1: "8,1", tri2: 76, tri3: 8.0, faltas: [1, 2, 0] },
  { disciplina: "História", tri1: 7.0, tri2: 84, tri3: null, faltas: [1, 1, 1] },
  { disciplina: "Geografia", tri1: 68, tri2: 7.3, tri3: "7,9", faltas: [0, 1, 1] },
  { disciplina: "Língua Inglesa", tri1: 86, tri2: "8,1", tri3: 8.7, faltas: [1, 0, 0] },
  { disciplina: "Arte", tri1: 9.0, tri2: 92, tri3: null, faltas: [1, 1, 0] },
  { disciplina: "Educação Física", tri1: 95, tri2: 9.0, tri3: "9,4", faltas: [0, 1, 0] },
  { disciplina: "Educação Digital", tri1: 88, tri2: 9.1, tri3: 93, faltas: [1, 0, 1] },
  { disciplina: "Educação Financeira", tri1: 74, tri2: "7,8", tri3: null, faltas: [1, 1, 1] },
  { disciplina: "Estudo Orientado", tri1: 8.0, tri2: 83, tri3: "8,5", faltas: [0, 1, 0] },
  { disciplina: "Redação e Leitura", tri1: 62, tri2: "6,8", tri3: null, faltas: [2, 1, 1] },
  { disciplina: "Pensamento Lógico", tri1: 48, tri2: 5.6, tri3: "6,0", faltas: [2, 2, 1] },
  { disciplina: "Literatura Arte e Movimento", tri1: "7,7", tri2: 80, tri3: null, faltas: [1, 0, 1] },
  { disciplina: "Práticas Experimentais", tri1: 58, tri2: "6,2", tri3: 6.4, faltas: [1, 1, 1] }
];

/* =========================================================
   FREQUÊNCIA DEMONSTRATIVA
   ---------------------------------------------------------
   ATENÇÃO: esse valor é APENAS FICTÍCIO nesta primeira versão.
   Ele NÃO é calculado a partir das faltas.
   No futuro, será tratado de outra forma (com dados reais).
========================================================= */
const frequenciaDemonstrativa = 92; // 92% — apenas para demonstração

/* =========================================================
   FUNÇÃO: normalizarNota(valor)
   ---------------------------------------------------------
   Uma FUNÇÃO é um bloco de código que faz uma tarefa.
   Esta função transforma qualquer nota recebida em um número
   entre 0 e 10 (ou null, se não houver nota válida).

   Regras:
   - vazio, null ou undefined → null (nota ainda não lançada)
   - entre 0 e 10 → permanece igual
   - maior que 10 e até 100 → divide por 10
   - aceita ponto ou vírgula decimal ("8,5" vira 8.5)
   - valores inválidos → null
========================================================= */
function normalizarNota(valor) {
  // Verifica se está vazio, nulo ou indefinido
  if (valor === null || valor === undefined || valor === "") {
    return null;
  }

  // Se for texto, troca vírgula por ponto
  let numero = valor;
  if (typeof valor === "string") {
    numero = parseFloat(valor.replace(",", "."));
  }

  // Se não for um número válido, retorna null
  if (isNaN(numero)) {
    return null;
  }

  // Aplica as regras de escala
  if (numero >= 0 && numero <= 10) {
    return numero;
  } else if (numero > 10 && numero <= 100) {
    return numero / 10;
  } else {
    return null; // fora das regras → inválido
  }
}

/* =========================================================
   FUNÇÃO: calcularMedia(notas)
   ---------------------------------------------------------
   Recebe um array com notas já normalizadas (números ou null)
   e devolve a média usando APENAS as notas disponíveis.
   Se não houver nenhuma nota válida, devolve null.
========================================================= */
function calcularMedia(notas) {
  // Filtra apenas as notas que são números válidos
  const validas = notas.filter(function (n) {
    return n !== null;
  });

  if (validas.length === 0) {
    return null; // nenhuma nota disponível
  }

  // Soma todas e divide pela quantidade
  let soma = 0;
  validas.forEach(function (n) {
    soma += n;
  });

  return soma / validas.length;
}

/* =========================================================
   FUNÇÃO: somarFaltas(listaDeFaltas)
   ---------------------------------------------------------
   Soma todos os números inteiros de um array de faltas.
========================================================= */
function somarFaltas(listaDeFaltas) {
  let total = 0;
  listaDeFaltas.forEach(function (f) {
    total += f;
  });
  return total;
}

/* =========================================================
   FUNÇÃO: definirSituacao(media)
   ---------------------------------------------------------
   Usa um IF (condição) para decidir a situação da disciplina.
   - média >= 6 → "Bom desempenho"
   - média < 6 → "Atenção"
   - média null → "Nota ainda não disponível"
========================================================= */
function definirSituacao(media) {
  if (media === null) {
    return "Nota ainda não disponível";
  } else if (media >= 6.0) {
    return "Bom desempenho";
  } else {
    return "Atenção";
  }
}

/* =========================================================
   FUNÇÃO: formatarNota(valor)
   ---------------------------------------------------------
   Mostra a nota com uma casa decimal (ex: 8.5 → "8.5")
   ou "—" se for null.
========================================================= */
function formatarNota(valor) {
  if (valor === null) {
    return "—";
  }
  return valor.toFixed(1);
}

/* =========================================================
   FUNÇÃO: processarDisciplinas()
   ---------------------------------------------------------
   Percorre os dados brutos, normaliza as notas, calcula média,
   soma faltas e devolve um novo array com tudo pronto.
========================================================= */
function processarDisciplinas() {
  return dadosBrutos.map(function (d) {
    const n1 = normalizarNota(d.tri1);
    const n2 = normalizarNota(d.tri2);
    const n3 = normalizarNota(d.tri3);

    const media = calcularMedia([n1, n2, n3]);
    const faltasTotais = somarFaltas(d.faltas);
    const situacao = definirSituacao(media);

    return {
      disciplina: d.disciplina,
      tri1: n1,
      tri2: n2,
      tri3: n3,
      media: media,
      faltas: faltasTotais,
      situacao: situacao
    };
  });
}

/* =========================================================
   FUNÇÃO: montarTabela(disciplinas)
   ---------------------------------------------------------
   Usa o DOM (a representação da página no JavaScript)
   para criar as linhas da tabela automaticamente.
========================================================= */
function montarTabela(disciplinas) {
  const corpo = document.getElementById("corpo-tabela");
  corpo.innerHTML = ""; // limpa antes de preencher

  disciplinas.forEach(function (d) {
    // Cria a linha <tr>
    const linha = document.createElement("tr");

    // Decide a classe da situação
    let classeSituacao = "situacao-indisponivel";
    if (d.situacao === "Bom desempenho") classeSituacao = "situacao-bom";
    if (d.situacao === "Atenção") classeSituacao = "situacao-atencao";

    // Define as células da linha
    linha.innerHTML = `
      <td>${d.disciplina}</td>
      <td>${d.tri1 !== null ? formatarNota(d.tri1) : "Ainda não lançada"}</td>
      <td>${d.tri2 !== null ? formatarNota(d.tri2) : "Ainda não lançada"}</td>
      <td>${d.tri3 !== null ? formatarNota(d.tri3) : "Ainda não lançada"}</td>
      <td>${d.media !== null ? formatarNota(d.media) : "—"}</td>
      <td>${d.faltas}</td>
      <td class="${classeSituacao}">${d.situacao}</td>
    `;

    corpo.appendChild(linha);
  });
}

/* =========================================================
   FUNÇÃO: montarCards(disciplinas)
   ---------------------------------------------------------
   Calcula os resumos e cria os cards no topo da página.
========================================================= */
function montarCards(disciplinas) {
  const areaCards = document.getElementById("cards");
  areaCards.innerHTML = "";

  // ----- Média geral (ignora disciplinas sem nota) -----
  let somaMedias = 0;
  let qtdMedias = 0;
  disciplinas.forEach(function (d) {
    if (d.media !== null) {
      somaMedias += d.media;
      qtdMedias++;
    }
  });
  const mediaGeral = qtdMedias > 0 ? (somaMedias / qtdMedias).toFixed(1) : "—";

  // ----- Total de faltas -----
  let totalFaltas = 0;
  disciplinas.forEach(function (d) {
    totalFaltas += d.faltas;
  });

  // ----- Disciplinas com bom desempenho -----
  const bomDesempenho = disciplinas.filter(function (d) {
    return d.situacao === "Bom desempenho";
  }).length;

  // ----- Disciplinas que precisam de atenção -----
  const atencao = disciplinas.filter(function (d) {
    return d.situacao === "Atenção";
  }).length;

  // ----- Lista de cards -----
  const cards = [
    { titulo: "Média Geral", valor: mediaGeral },
    { titulo: "Total de Faltas", valor: totalFaltas },
    { titulo: "Bom Desempenho", valor: bomDesempenho + " disciplinas" },
    { titulo: "Precisam de Atenção", valor: atencao + " disciplinas" },
    { titulo: "Frequência", valor: frequenciaDemonstrativa + "% — Frequência adequada" }
  ];

  // Cria cada card na página
  cards.forEach(function (c) {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <div class="titulo-card">${c.titulo}</div>
      <div class="valor-card">${c.valor}</div>
    `;
    areaCards.appendChild(div);
  });
}

/* =========================================================
   INICIALIZAÇÃO
   ---------------------------------------------------------
   Quando a página terminar de carregar, processa os dados
   e monta os cards e a tabela.
========================================================= */
document.addEventListener("DOMContentLoaded", function () {
  const disciplinas = processarDisciplinas();
  montarCards(disciplinas);
  montarTabela(disciplinas);
});