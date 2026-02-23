const { jsPDF } = window.jspdf;

const form = document.getElementById("avaliacaoForm");
const gerador = document.getElementById("gerador");
const potenciaGroup = document.getElementById("potenciaGroup");

gerador.addEventListener("change", function () {
  potenciaGroup.style.display = this.value === "Sim" ? "flex" : "none";
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Avaliação Técnica - Eficiência Solar Barbosa", 20, 20);

  doc.setFontSize(12);

  let y = 30;

  function addLine(label, value) {
    doc.text(`${label}: ${value}`, 20, y);
    y += 8;
  }

  addLine("Cliente", cliente.value);
  addLine("Endereço", endereco.value);
  addLine("Número do Poste", poste.value);
  addLine("Número do Medidor", medidor.value);
  addLine("Tipo de Saída", saida.value);
  addLine("Sistema", sistema.value);
  addLine("Tensão", tensao.value);
  addLine("Disjuntor do Relógio", disjRelogio.value);
  addLine("Bitola do Cabo", bitola.value);
  addLine("Disjuntor Geral", disjGeral.value);
  addLine("Possui Gerador", gerador.value);
  addLine("Potência do Gerador", potencia.value);
  addLine("Estrutura de Montagem", estrutura.value);
  addLine("Material da Terça", material.value);
  addLine("Distância entre as Terças", distancia.value);

  doc.save("avaliacao-tecnica.pdf");
});