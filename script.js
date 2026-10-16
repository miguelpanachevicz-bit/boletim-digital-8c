/* =========================================================
   CONFIGURAÇÃO FIXA DO ALUNO
========================================================= */
const CONFIG_ALUNO = {
  turma: "8C",
  numeroChamada: 19,
  apiUrl: "https://boletim-api.profbt.com.br"
};

/* =========================================================
   DADOS FICTÍCIOS DO 8º ANO — ATUALIZADOS
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
   ESTADO DA SESSÃO (EM MEMÓRIA)
========================================================= */
let pinSessao = "";
let dadosAtuaisDisciplinas = [];

/* =========================================================
   FREQUÊNCIA DEMONSTRATIVA
========================================================= */
const frequenciaDemonstrativa = 92; // 92% — apenas para demonstração

/* =========================================================
   FUNÇÃO: normalizarNota(valor)
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
========================================================= */
function somarFaltas(listaDeFaltas) {
  if (!Array.isArray(listaDeFaltas)) return 0;
  let total = 0;
  listaDeFaltas.forEach(function (f) {
    total += Number(f) || 0;
  });
  return total;
}

/* =========================================================
   FUNÇÃO: definirSituacao(media)
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
========================================================= */
function formatarNota(valor) {
  if (valor === null || valor === undefined) {
    return "—";
  }
  return Number(valor).toFixed(1);
}

/* =========================================================
   FUNÇÃO: carregarDadosLocaisPadrao()
========================================================= */
function carregarDadosLocaisPadrao() {
  return dadosBrutos.map(function (d) {
    return {
      disciplina: d.disciplina,
      tri1: normalizarNota(d.tri1),
      tri2: normalizarNota(d.tri2),
      tri3: normalizarNota(d.tri3),
      faltas: [
        d.faltas && d.faltas[0] !== undefined ? d.faltas[0] : 0,
        d.faltas && d.faltas[1] !== undefined ? d.faltas[1] : 0,
        d.faltas && d.faltas[2] !== undefined ? d.faltas[2] : 0
      ]
    };
  });
}

/* =========================================================
   FUNÇÃO: renderizarBoletim()
========================================================= */
function renderizarBoletim() {
  const disciplinasProcessadas = dadosAtuaisDisciplinas.map(function (d) {
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

  montarCards(disciplinasProcessadas);
  montarTabela(disciplinasProcessadas);
}

/* =========================================================
   FUNÇÃO: montarTabela(disciplinas)
========================================================= */
function montarTabela(disciplinas) {
  const corpo = document.getElementById("corpo-tabela");
  corpo.innerHTML = "";

  disciplinas.forEach(function (d) {
    const linha = document.createElement("tr");

    let classeSituacao = "situacao-indisponivel";
    if (d.situacao === "Bom desempenho") classeSituacao = "situacao-bom";
    if (d.situacao === "Atenção") classeSituacao = "situacao-atencao";

    const tdDisc = document.createElement("td");
    tdDisc.textContent = d.disciplina;

    const tdTri1 = document.createElement("td");
    tdTri1.textContent = d.tri1 !== null ? formatarNota(d.tri1) : "Ainda não lançada";

    const tdTri2 = document.createElement("td");
    tdTri2.textContent = d.tri2 !== null ? formatarNota(d.tri2) : "Ainda não lançada";

    const tdTri3 = document.createElement("td");
    tdTri3.textContent = d.tri3 !== null ? formatarNota(d.tri3) : "Ainda não lançada";

    const tdMedia = document.createElement("td");
    tdMedia.textContent = d.media !== null ? formatarNota(d.media) : "—";

    const tdFaltas = document.createElement("td");
    tdFaltas.textContent = d.faltas;

    const tdSit = document.createElement("td");
    tdSit.className = classeSituacao;
    tdSit.textContent = d.situacao;

    linha.appendChild(tdDisc);
    linha.appendChild(tdTri1);
    linha.appendChild(tdTri2);
    linha.appendChild(tdTri3);
    linha.appendChild(tdMedia);
    linha.appendChild(tdFaltas);
    linha.appendChild(tdSit);

    corpo.appendChild(linha);
  });
}

/* =========================================================
   FUNÇÃO: montarCards(disciplinas)
========================================================= */
function montarCards(disciplinas) {
  const areaCards = document.getElementById("cards");
  areaCards.innerHTML = "";

  let somaMedias = 0;
  let qtdMedias = 0;
  disciplinas.forEach(function (d) {
    if (d.media !== null) {
      somaMedias += d.media;
      qtdMedias++;
    }
  });
  const mediaGeral = qtdMedias > 0 ? (somaMedias / qtdMedias).toFixed(1) : "—";

  let totalFaltas = 0;
  disciplinas.forEach(function (d) {
    totalFaltas += d.faltas;
  });

  const bomDesempenho = disciplinas.filter(function (d) {
    return d.situacao === "Bom desempenho";
  }).length;

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

    const divTitulo = document.createElement("div");
    divTitulo.className = "titulo-card";
    divTitulo.textContent = c.titulo;

    const divValor = document.createElement("div");
    divValor.className = "valor-card";
    divValor.textContent = c.valor;

    div.appendChild(divTitulo);
    div.appendChild(divValor);
    areaCards.appendChild(div);
  });
}

/* =========================================================
   AUTENTICAÇÃO E ABRIR BOLETIM
========================================================= */
document.getElementById("form-login").addEventListener("submit", function (e) {
  e.preventDefault();
  const inputPin = document.getElementById("campo-pin");
  const msgLogin = document.getElementById("mensagem-login");
  const pinDigitado = inputPin.value.trim();

  if (!pinDigitado) return;

  msgLogin.className = "mensagem-status msg-info";
  msgLogin.textContent = "Conectando...";

  fetch(`${CONFIG_ALUNO.apiUrl}/api/v1/boletins/abrir`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      turma: CONFIG_ALUNO.turma,
      numero_chamada: CONFIG_ALUNO.numeroChamada,
      pin: pinDigitado
    })
  })
    .then(function (resposta) {
      if (resposta.status === 401) {
        throw new Error("Turma, chamada ou PIN inválidos.");
      } else if (resposta.status === 429) {
        throw new Error("Muitas tentativas. Aguarde um minuto e tente novamente.");
      } else if (!resposta.ok) {
        throw new Error("Não foi possível conectar ao servidor. Tente novamente.");
      }
      return resposta.json();
    })
    .then(function (dadosApi) {
      pinSessao = pinDigitado;
      inputPin.value = "";
      msgLogin.textContent = "";

      if (dadosApi && dadosApi.dados && Array.isArray(dadosApi.dados.disciplinas)) {
        dadosAtuaisDisciplinas = dadosApi.dados.disciplinas;
      } else {
        dadosAtuaisDisciplinas = carregarDadosLocaisPadrao();
      }

      document.getElementById("area-login").style.display = "none";
      document.getElementById("area-boletim").style.display = "block";

      renderizarBoletim();
    })
    .catch(function (erro) {
      msgLogin.className = "mensagem-status msg-erro";
      msgLogin.textContent = erro.message || "Não foi possível conectar ao servidor. Tente novamente.";
    });
});

/* =========================================================
   MODO EDIÇÃO
========================================================= */
const btnEditar = document.getElementById("btn-editar");
const areaEdicao = document.getElementById("area-edicao");
const btnCancelar = document.getElementById("btn-cancelar");
const formEdicao = document.getElementById("form-edicao");
const msgBoletim = document.getElementById("mensagem-boletim");

btnEditar.addEventListener("click", function () {
  montarTabelaEdicao();
  areaEdicao.style.display = "block";
  msgBoletim.textContent = "";
});

btnCancelar.addEventListener("click", function () {
  areaEdicao.style.display = "none";
  msgBoletim.textContent = "";
});

function montarTabelaEdicao() {
  const corpo = document.getElementById("corpo-tabela-edicao");
  corpo.innerHTML = "";

  dadosAtuaisDisciplinas.forEach(function (d, idx) {
    const linha = document.createElement("tr");

    const tdNome = document.createElement("td");
    tdNome.textContent = d.disciplina;
    linha.appendChild(tdNome);

    const inputsConf = [
      { campo: "tri1", val: d.tri1, tipo: "nota" },
      { campo: "tri2", val: d.tri2, tipo: "nota" },
      { campo: "tri3", val: d.tri3, tipo: "nota" },
      { campo: "f1", val: d.faltas ? d.faltas[0] : 0, tipo: "falta" },
      { campo: "f2", val: d.faltas ? d.faltas[1] : 0, tipo: "falta" },
      { campo: "f3", val: d.faltas ? d.faltas[2] : 0, tipo: "falta" }
    ];

    inputsConf.forEach(function (conf) {
      const td = document.createElement("td");
      const input = document.createElement("input");
      input.type = "text";
      input.className = "input-edicao";
      input.dataset.idx = idx;
      input.dataset.campo = conf.campo;
      input.dataset.tipo = conf.tipo;

      if (conf.tipo === "nota") {
        input.value = conf.val !== null && conf.val !== undefined ? conf.val : "";
      } else {
        input.value = conf.val !== null && conf.val !== undefined ? conf.val : 0;
      }

      td.appendChild(input);
      linha.appendChild(td);
    });

    corpo.appendChild(linha);
  });
}

function validarNotaInput(str) {
  if (str === null || str === undefined) return { valido: true, valor: null };
  const s = String(str).trim();
  if (s === "") return { valido: true, valor: null };

  const normalizado = s.replace(",", ".");
  if (!/^\d+(\.\d+)?$/.test(normalizado)) {
    return { valido: false };
  }

  const num = parseFloat(normalizado);
  if (isNaN(num) || num < 0 || num > 10) {
    return { valido: false };
  }

  return { valido: true, valor: num };
}

function validarFaltaInput(str) {
  if (str === null || str === undefined) return { valido: false };
  const s = String(str).trim();
  if (s === "" || !/^\d+$/.test(s)) {
    return { valido: false };
  }

  const num = parseInt(s, 10);
  if (isNaN(num) || num < 0) {
    return { valido: false };
  }

  return { valido: true, valor: num };
}

formEdicao.addEventListener("submit", function (e) {
  e.preventDefault();

  const inputs = Array.from(formEdicao.querySelectorAll(".input-edicao"));
  let temErro = false;

  inputs.forEach(function (i) {
    i.classList.remove("input-invalido");
  });

  const novasDisciplinas = JSON.parse(JSON.stringify(dadosAtuaisDisciplinas));

  inputs.forEach(function (input) {
    const idx = parseInt(input.dataset.idx, 10);
    const campo = input.dataset.campo;
    const tipo = input.dataset.tipo;
    const valRaw = input.value;

    if (tipo === "nota") {
      const res = validarNotaInput(valRaw);
      if (!res.valido) {
        input.classList.add("input-invalido");
        temErro = true;
      } else {
        novasDisciplinas[idx][campo] = res.valor;
      }
    } else if (tipo === "falta") {
      const res = validarFaltaInput(valRaw);
      if (!res.valido) {
        input.classList.add("input-invalido");
        temErro = true;
      } else {
        if (!novasDisciplinas[idx].faltas) novasDisciplinas[idx].faltas = [0, 0, 0];
        if (campo === "f1") novasDisciplinas[idx].faltas[0] = res.valor;
        if (campo === "f2") novasDisciplinas[idx].faltas[1] = res.valor;
        if (campo === "f3") novasDisciplinas[idx].faltas[2] = res.valor;
      }
    }
  });

  if (temErro) {
    msgBoletim.className = "mensagem-status msg-erro";
    msgBoletim.textContent = "Verifique os campos destacados com valores inválidos.";
    return;
  }

  msgBoletim.className = "mensagem-status msg-info";
  msgBoletim.textContent = "Salvando...";

  fetch(`${CONFIG_ALUNO.apiUrl}/api/v1/boletins/salvar`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      turma: CONFIG_ALUNO.turma,
      numero_chamada: CONFIG_ALUNO.numeroChamada,
      pin: pinSessao,
      dados: {
        disciplinas: novasDisciplinas
      }
    })
  })
    .then(function (resposta) {
      if (!resposta.ok) {
        throw new Error("Falha ao salvar dados no servidor.");
      }
      return resposta.json();
    })
    .then(function () {
      dadosAtuaisDisciplinas = novasDisciplinas;
      renderizarBoletim();
      areaEdicao.style.display = "none";
      msgBoletim.className = "mensagem-status msg-sucesso";
      msgBoletim.textContent = "Dados salvos com sucesso.";
    })
    .catch(function (erro) {
      msgBoletim.className = "mensagem-status msg-erro";
      msgBoletim.textContent = erro.message || "Erro ao salvar alterações. Tente novamente.";
    });
});