const { jsPDF } = window.jspdf;

document.getElementById("avaliacaoForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 40;

  // ===== PEGAR CAMPOS =====
  const cliente = document.getElementById("cliente")?.value || "-";
  const endereco = document.getElementById("endereco")?.value || "-";
  const poste = document.getElementById("poste")?.value || "-";
  const medidor = document.getElementById("medidor")?.value || "-";
  const saida = document.getElementById("saida")?.value || "-";
  const sistema = document.getElementById("sistema")?.value || "-";
  const tensao = document.getElementById("tensao")?.value || "-";
  const disjRelogio = document.getElementById("disjRelogio")?.value || "-";
  const bitola = document.getElementById("bitola")?.value || "-";
  const disjGeral = document.getElementById("disjGeral")?.value || "-";
  const gerador = document.getElementById("gerador")?.value || "-";
  const potencia = document.getElementById("potencia")?.value || "-";
  const estrutura = document.getElementById("estrutura")?.value || "-";
  const material = document.getElementById("material")?.value || "-";
  const distancia = document.getElementById("distancia")?.value || "-";

  // ===== CABEÇALHO =====
  doc.setFillColor(178, 203, 41);
  doc.rect(0, 0, pageWidth, 30, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.text("CHECKLIST TÉCNICO - EFICIENCIA SOLAR", pageWidth / 2, 18, { align: "center" });

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);

  function linha(label, valor) {
    doc.text(`${label}: ${valor}`, 20, y);
    y += 8;
  }

  linha("Cliente", cliente);
  linha("Endereço", endereco);
  linha("Número do Poste", poste);
  linha("Número do Medidor", medidor);
  linha("Tipo de Saída", saida);
  linha("Sistema", sistema);
  linha("Tensão", tensao);
  linha("Disjuntor do Relógio", disjRelogio);
  linha("Bitola do Cabo", bitola);
  linha("Disjuntor Geral", disjGeral);
  linha("Possui Gerador", gerador);
  linha("Potência do Gerador", potencia);
  linha("Estrutura de Montagem", estrutura);
  linha("Material da Terça", material);
  linha("Distância entre as Terças", distancia);

  y += 10;

  doc.setFontSize(14);
  doc.text("FOTOS ANEXADAS", 20, y);
  y += 10;

  async function adicionarImagem(inputId, titulo) {
    const input = document.getElementById(inputId);

    if (input && input.files.length > 0) {
      const file = input.files[0];

      return new Promise((resolve) => {
        const reader = new FileReader();

        reader.onload = function (event) {
          const imgData = event.target.result;

          if (y > 250) {
            doc.addPage();
            y = 20;
          }

          doc.setFontSize(12);
          doc.text(titulo, 20, y);
          y += 5;

          doc.addImage(imgData, "JPEG", 20, y, 90, 65);
          y += 75;

          resolve();
        };

        reader.readAsDataURL(file);
      });
    }
  }

  await adicionarImagem("foto1", "01 - Caixa do Medidor");
  await adicionarImagem("foto2", "02 - Disjuntor de Entrada");
  await adicionarImagem("foto3", "03 - Medidor");
  await adicionarImagem("foto4", "04 - Padrão");
  await adicionarImagem("foto5", "05 - Número do Poste");
  await adicionarImagem("foto6", "06 - Quadro de Distribuição");
  await adicionarImagem("foto7", "07 - Telhado");

  doc.setFontSize(10);
  doc.text("Data: " + new Date().toLocaleDateString(), 20, 285);

  // ===== ZIP =====
  if (typeof JSZip === "undefined") {
    alert("JSZip não carregado. Verifique o HTML.");
    return;
  }

  const zip = new JSZip();
  const pdfBlob = doc.output("blob");
  const nomeCliente = cliente.replace(/\s+/g, "_");

  zip.file(`checklist-${nomeCliente}.pdf`, pdfBlob);

  function adicionarFotosAoZip(inputId, nomeBase) {
    const input = document.getElementById(inputId);

    if (input && input.files.length > 0) {
      const file = input.files[0];
      const extensao = file.name.split(".").pop();
      zip.file(`fotos/${nomeBase}.${extensao}`, file);
    }
  }

  adicionarFotosAoZip("foto1", "01_caixa_medidor");
  adicionarFotosAoZip("foto2", "02_disjuntor_entrada");
  adicionarFotosAoZip("foto3", "03_medidor");
  adicionarFotosAoZip("foto4", "04_padrao");
  adicionarFotosAoZip("foto5", "05_numero_poste");
  adicionarFotosAoZip("foto6", "06_quadro_distribuicao");
  adicionarFotosAoZip("foto7", "07_telhado");

  zip.generateAsync({ type: "blob" }).then(function (content) {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(content);
    link.download = `checklist-${nomeCliente}.zip`;
    link.click();
  });
});