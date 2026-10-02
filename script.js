/* =========================================================
   DADOS FICTÍCIOS DO 8º ANO — ATUALIZADOS
   ---------------------------------------------------------
   Aqui usamos um ARRAY (lista) de OBJETOS.
   - Array: lista de coisas, entre colchetes [ ].
   - Objeto: um conjunto de informações com nome, entre chaves { }.
   Cada objeto representa uma disciplina.
========================================================= */
const dadosBrutos = [
  { disciplina: "Língua Portuguesa",            tri1: 83, tri2: 75, tri3: null, faltas: [11, 5, 0] },
  { disciplina: "Matemática",                   tri1: 50, tri2: 35, tri3: null, faltas: [15, 6, 0] },
  { disciplina: "Ciências",                     tri1: 56, tri2: 62, tri3: null, faltas: [9, 4, 0] },
  { disciplina: "História",                     tri1: 70, tri2: 84, tri3: null, faltas: [7, 2, 0] },
  { disciplina: "Geografia",                    tri1: 40, tri2: 56, tri3: null, faltas: [9, 4, 0] },
  { disciplina: "Língua Inglesa",               tri1: 70, tri2: 54, tri3: null, faltas: [7, 2, 0] },
  { disciplina: "Arte",                         tri1: 64, tri2: 70, tri3: null, faltas: [8, 2, 0] },
  { disciplina: "Educação Física",              tri1: 90, tri2: 80, tri3: null, faltas: [4, 3, 0] },
  { disciplina: "Educação Digital",             tri1: 30, tri2: 55, tri3: null, faltas: [5, 3, 0] },
  { disciplina: "Educação Financeira",          tri1: 85, tri2: 85, tri3: null, faltas: [7, 4, 0] },
  { disciplina: "Estudo Orientado",             tri1: 74, tri2: 85, tri3: null, faltas: [6, 2, 0] },
  { disciplina: "Redação e Leitura",            tri1: 60, tri2: 62, tri3: null, faltas: [10, 3, 0] },
  { disciplina: "Pensamento Lógico",            tri1: 80, tri2: 70, tri3: null, faltas: [5, 2, 0] },
  { disciplina: "Literatura Arte e Movimento",  tri1: 81, tri2: 73, tri3: null, faltas: [4, 1, 0] },
  { disciplina: "Práticas Experimentais",       tri1: 67, tri2: 60, tri3: null, faltas: [8, 3, 0] }
];

/* =========================================================
   FREQUÊNCIA DEMONSTRATIVA
   ---------------------------------------------------------
   ATENÇÃO: esse valor é APENAS FICTÍCIO nesta primeira versão.
   Ele NÃO é calculado a partir das faltas.
========================================================= */
const frequenciaDemonstrativa = 92; // 92% — apenas para demonstração

/* =========================================================
   FUNÇÃO: normalizarNota(valor)
   ---------------------------------------------------------
   Transforma qualquer nota recebida em um número entre 0 e 10
   (ou null, se não houver nota válida).
========================================================= */
function normalizarNota(valor) {
  if (valor === null || valor === undefined || valor === "") {
    return null;
  }

  let numero = valor;
  if (typeof valor === "string") {
    numero = parseFloat(valor.replace(",", "."));
  }

  if (isNaN(numero)) {
    return null;
  }

  if (numero >= 0 && numero <= 10) {
    return numero;
  } else if (numero > 10 && numero <= 100) {
    return numero / 10;
  } else {
    return null;
  }
}

/* =========================================================
   FUNÇÃO: calcularMedia(notas)
   ---------------------------------------------------------
   Recebe um array com notas já normalizadas (números ou null)
   e devolve a média usando APENAS as notas disponíveis.
========================================================= */
function calcularMedia(notas) {
  const validas = notas.filter(function (n) {
    return n !== null;
  });

  if (validas.length === 0) {
    return null;
  }

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
   Cria as linhas da tabela automaticamente no DOM.
========================================================= */
function montarTabela(disciplinas) {
  const corpo = document.getElementById("corpo-tabela");
  corpo.innerHTML = "";

  disciplinas.forEach(function (d) {
    const linha = document.createElement("tr");

    let classeSituacao = "situacao-indisponivel";
    if (d.situacao === "Bom desempenho") classeSituacao = "situacao-bom";
    if (d.situacao === "Atenção") classeSituacao = "situacao-atencao";

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

  // ----- Média geral -----
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

  // ----- Bom desempenho -----
  const bomDesempenho = disciplinas.filter(function (d) {
    return d.situacao === "Bom desempenho";
  }).length;

  // ----- Atenção -----
  const atencao = disciplinas.filter(function (d) {
    return d.situacao === "Atenção";
  }).length;

  const cards = [
    { titulo: "Média Geral", valor: mediaGeral },
    { titulo: "Total de Faltas", valor: totalFaltas },
    { titulo: "Bom Desempenho", valor: bomDesempenho + " disciplinas" },
    { titulo: "Precisam de Atenção", valor: atencao + " disciplinas" },
    { titulo: "Frequência", valor: frequenciaDemonstrativa + "% — Frequência adequada" }
  ];

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
========================================================= */
document.addEventListener("DOMContentLoaded", function () {
  const disciplinas = processarDisciplinas();
  montarCards(disciplinas);
  montarTabela(disciplinas);
});