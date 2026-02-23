const { jsPDF } = window.jspdf;

document.getElementById("avaliacaoForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // ===== FUNDO CABEÇALHO =====
  doc.setFillColor(178, 203, 41); // #B2CB29
  doc.rect(0, 0, pageWidth, 30, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.text("CHECKLIST TÉCNICO - EFICIENCIA SOLAR", pageWidth / 2, 18, { align: "center" });

  let y = 40;

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);

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
  doc.text("FOTOS ANEXADAS", 20, y);
  y += 10;

  // ===== FUNÇÃO PARA INSERIR IMAGEM =====
  async function adicionarImagem(inputId, titulo) {
    const input = document.getElementById(inputId);

    if (input.files.length > 0) {
      const file = input.files[0];

      const reader = new FileReader();

      return new Promise((resolve) => {
        reader.onload = function (event) {
          const imgData = event.target.result;

          if (y > 250) {
            doc.addPage();
            y = 20;
          }

          doc.setFontSize(12);
          doc.text(titulo, 20, y);
          y += 5;

          doc.addImage(imgData, "JPEG", 20, y, 80, 60);
          y += 70;

          resolve();
        };

        reader.readAsDataURL(file);
      });
    }
  }

  await adicionarImagem("foto1", "Caixa do Medidor");
  await adicionarImagem("foto2", "Disjuntor de Entrada");
  await adicionarImagem("foto3", "Medidor");
  await adicionarImagem("foto4", "Padrão");
  await adicionarImagem("foto5", "Número do Poste");
  await adicionarImagem("foto6", "Quadro de Distribuição");
  await adicionarImagem("foto7", "Telhado Localização");

  // ===== DATA AUTOMÁTICA =====
  doc.setFontSize(10);
  doc.text("Data: " + new Date().toLocaleDateString(), 20, 285);

  doc.save("checklist-eficiencia-solar.pdf");
});