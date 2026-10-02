// ===============================
// DADOS DAS DISCIPLINAS
// ===============================

const disciplinas = [
  { nome: "Língua Portuguesa",            nota1: 83, nota2: 75, falta1: 11, falta2: 5 },
  { nome: "Matemática",                   nota1: 50, nota2: 35, falta1: 15, falta2: 6 },
  { nome: "Ciências",                     nota1: 56, nota2: 62, falta1: 9,  falta2: 4 },
  { nome: "História",                     nota1: 70, nota2: 84, falta1: 7,  falta2: 2 },
  { nome: "Geografia",                    nota1: 40, nota2: 56, falta1: 9,  falta2: 4 },
  { nome: "Língua Inglesa",               nota1: 70, nota2: 54, falta1: 7,  falta2: 2 },
  { nome: "Arte",                         nota1: 64, nota2: 70, falta1: 8,  falta2: 2 },
  { nome: "Educação Física",              nota1: 90, nota2: 80, falta1: 4,  falta2: 3 },
  { nome: "Educação Digital",             nota1: 30, nota2: 55, falta1: 5,  falta2: 3 },
  { nome: "Educação Financeira",          nota1: 85, nota2: 85, falta1: 7,  falta2: 4 },
  { nome: "Estudo Orientado",             nota1: 74, nota2: 85, falta1: 6,  falta2: 2 },
  { nome: "Redação e Leitura",            nota1: 60, nota2: 62, falta1: 10, falta2: 3 },
  { nome: "Pensamento Lógico",            nota1: 80, nota2: 70, falta1: 5,  falta2: 2 },
  { nome: "Literatura Arte e Movimento",  nota1: 81, nota2: 73, falta1: 4,  falta2: 1 },
  { nome: "Práticas Experimentais",       nota1: 67, nota2: 60, falta1: 8,  falta2: 3 }
];

// ===============================
// FUNÇÕES AUXILIARES
// ===============================

function calcularMedia(nota1, nota2) {
  return (nota1 + nota2) / 2;
}

function definirSituacao(media, totalFaltas) {
  if (totalFaltas > 20) return "Reprovado por falta";
  if (media >= 60) return "Aprovado";
  if (media >= 40) return "Recuperação";
  return "Reprovado";
}

// ===============================
// PROCESSAMENTO
// ===============================

let somaMedias = 0;
let totalFaltasGeral = 0;

const resultado = disciplinas.map(d => {
  const media = calcularMedia(d.nota1, d.nota2);
  const totalFaltas = d.falta1 + d.falta2;
  const situacao = definirSituacao(media, totalFaltas);

  somaMedias += media;
  totalFaltasGeral += totalFaltas;

  return {
    ...d,
    media: Number(media.toFixed(1)),
    totalFaltas,
    situacao
  };
});

const mediaGeral = somaMedias / disciplinas.length;

// ===============================
// EXIBIÇÃO NO CONSOLE
// ===============================

console.log("========================================");
console.log("       BOLETIM ESCOLAR COMPLETO         ");
console.log("========================================\n");

resultado.forEach(r => {
  console.log(`📚 ${r.nome}`);
  console.log(`   Notas: ${r.nota1} | ${r.nota2}`);
  console.log(`   Média: ${r.media}`);
  console.log(`   Faltas: ${r.falta1} + ${r.falta2} = ${r.totalFaltas}`);
  console.log(`   Situação: ${r.situacao}`);
  console.log("----------------------------------------");
});

console.log("\n========== RESUMO GERAL ==========");
console.log(`Média Geral: ${mediaGeral.toFixed(2)}`);
console.log(`Total de Faltas: ${totalFaltasGeral}`);
console.log("==================================");

// ===============================
// ALERTAS
// ===============================

const mediasBaixas = resultado.filter(r => r.media < 60);
const muitasFaltas = resultado.filter(r => r.totalFaltas >= 10);

console.log("\n⚠️  Disciplinas com média abaixo de 60:");
mediasBaixas.forEach(r => console.log(`   - ${r.nome} (${r.media})`));

console.log("\n⚠️  Disciplinas com 10 faltas ou mais:");
muitasFaltas.forEach(r => console.log(`   - ${r.nome} (${r.totalFaltas} faltas)`));