
// --- Trecho dentro do fluxo de salvar lançamento ---
// Exemplo de como deve ficar no btnSalvarLanc:

await addDoc(lref, dados);

// Disparo do recibo já incluindo dataCaixa:
printThermalReceipt({
  tipoValidador: dados.tipoValidador,
  prefixo: dados.prefixo,
  qtdBordos: dados.qtdBordos,
  valor: dados.valor,
  matriculaMotorista: dados.matriculaMotorista,
  matriculaRecebedor: dados.matriculaRecebedor,
  dataCaixa: dados.dataCaixa   // ✅ incluído
});


// --- Função de impressão térmica ---

function printThermalReceipt(data) {
  const win = window.open('', '_blank', 'width=400,height=800');
  const now = new Date();
  const dt = now.toLocaleString('pt-BR');

  const html = `<!DOCTYPE html>
  <html><head><meta charset="utf-8">
  <title>Recibo</title>
  <style>
    @page { size: 80mm 150mm; margin: 0mm; }
    body { font-family: "Courier New", monospace; font-size: 13px; margin: 0; padding: 0; color:#000; }
    h1 { text-align: left; font-size: 15px; margin: 8px 0 12px; }
    .mono { font-family: "Courier New", monospace; text-align: left; }
  </style></head>
  <body onload="window.print(); setTimeout(()=>window.close(), 500);">

    <h1>RECIBO DE PAGAMENTO MANUAL</h1>
------------------------------------------------------------
    <div class="mono">
  <strong>Matricula Motorista:</strong> ${data.matriculaMotorista}<br>
  <strong>Tipo de Validador:</strong> ${data.tipoValidador}<br>
  <strong>Prefixo:</strong> ${data.prefixo}<br>
------------------------------------------------------------
  <strong>Data do Caixa:</strong> ${data.dataCaixa}<br>
  <strong>Quantidade bordos:</strong> ${data.qtdBordos}<br>
  <strong>Valor:</strong> R$ ${Number(data.valor).toFixed(2)}<br>
------------------------------------------------------------
  <strong>Matricula Recebedor:</strong> ${data.matriculaRecebedor}<br>
  <strong>Data Recebimento:</strong> ${dt}<br><br>
  <strong>Assinatura Recebedor:</strong><br><br>

  ______________________________
    </div>
  </body></html>`;

  win.document.write(html);
  win.document.close();
}
