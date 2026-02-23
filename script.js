const { jsPDF } = window.jspdf;

const form = document.getElementById("avaliacaoForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const doc = new jsPDF();
  let y = 20;

  doc.setFontSize(18);
  doc.setTextColor(178, 203, 41); // cor #B2CB29
  doc.text("CHECKLIST - EFICIENCIA SOLAR", 20, y);

  y += 15;
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);

  function linha(label, valor) {
    doc.text(`${label}: ${valor || "-"}`, 20, y);
    y += 8;
  }

  linha("Cliente", cliente.value);
  linha("Endereço", endereco.value);
  linha("Número do Poste", poste.value);
  linha("Número do Medidor", medidor.value);
  linha("Tipo de Saída", saida.value);
  linha("Sistema", sistema.value);
  linha("Tensão", tensao.value);
  linha("Disjuntor do Relógio", disjRelogio.value);
  linha("Bitola do Cabo", bitola.value);
  linha("Disjuntor Geral", disjGeral.value);
  linha("Possui Gerador", gerador.value);
  linha("Potência do Gerador", potencia.value);
  linha("Estrutura de Montagem", estrutura.value);
  linha("Material da Terça", material.value);
  linha("Distância entre as Terças", distancia.value);

  y += 10;
  doc.setFontSize(14);
  doc.text("Fotos Anexadas:", 20, y);
  y += 10;

  function adicionarLinkFoto(inputId, nomeLabel) {
    const fileInput = document.getElementById(inputId);
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const url = URL.createObjectURL(file);

      doc.textWithLink(nomeLabel, 20, y, { url: url });
      y += 8;
    }
  }

  adicionarLinkFoto("foto1", "Caixa do Medidor");
  adicionarLinkFoto("foto2", "Disjuntor de Entrada");
  adicionarLinkFoto("foto3", "Medidor");
  adicionarLinkFoto("foto4", "Padrão");
  adicionarLinkFoto("foto5", "Número do Poste");
  adicionarLinkFoto("foto6", "Quadro de Distribuição");
  adicionarLinkFoto("foto7", "Telhado Localização");

  doc.save("checklist-eficiencia-solar.pdf");
});