// Função para adicionar o logo e o nome do vendedor na parte inferior direita
function addFooter(doc, xPos, yPos, logoSrc, vendedor) {
    const logoWidth = 35;
    const logoHeight = 20;
    
    // Adiciona o logo da empresa
    try {
        doc.addImage(logoSrc, 'PNG', xPos - logoWidth, yPos - logoHeight, logoWidth, logoHeight);
    } catch (error) {
        console.error("Error adding logo:", error);
    }

    // Adiciona o nome do vendedor
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`${vendedor}`, xPos - -5 - logoWidth, yPos - -5);
}


// Função para gerar e visualizar o PDF
function generatePDF() {
    const { jsPDF } = window.jspdf; // Acesso à biblioteca jsPDF
    const doc = new jsPDF();
    
    // Captura os valores dos campos do formulário
    const empresa = document.getElementById('empresa')?.value || 'Empresa Exemplo';
    const responsavel = document.getElementById('responsavel')?.value || 'Responsável Exemplo';
    const logoSrc = 'logo.png'; // Substitua pelo caminho correto do logo
    const validade = document.getElementById('validade')?.value || '30'; // Valor padrão
    const numeroProposta = document.getElementById('numeroProposta')?.value || '0001'; // Valor padrão
    const valorProposta = document.getElementById('valorProposta')?.value || '1000'; // Valor padrão
    const vendedor = document.getElementById('vendedor')?.value || 'Fabio Morais';

    // Captura as opções da seção "Atividade Operacional"
    const linkDedicado = document.getElementById('linkDedicado')?.checked;
    const ipValido = document.getElementById('ipValido')?.checked;
    const ipFixo = document.getElementById('ipFixo')?.checked;

    // Captura as opções da seção "SUPORTE"
    const suporteWhatsapp = document.getElementById('suporteWhatsapp')?.checked;
    const suporteDedicado = document.getElementById('suporteDedicado')?.checked;
    const sla = document.getElementById('sla')?.value || '24 horas'; // Valor padrão

    // Captura os valores da segunda página
    function getSecondPageValues() {
        const duracaoContratoElement = document.getElementById('duracaoContrato');
        const taxaInstalacaoElement = document.getElementById('taxaInstalacao');
        const velocidadeDownloadElement = document.getElementById('velocidadeDownload');
        const velocidadeUploadElement = document.getElementById('velocidadeUpload');

        return {
            duracaoContrato: duracaoContratoElement ? duracaoContratoElement.value : '6', // Padrão para 6 meses
            taxaInstalacao: taxaInstalacaoElement ? taxaInstalacaoElement.value : '0', // Padrão para 0
            velocidadeDownload: velocidadeDownloadElement ? velocidadeDownloadElement.value : '100', // Padrão para 100 mb
            velocidadeUpload: velocidadeUploadElement ? velocidadeUploadElement.value : '100' // Padrão para 100 mb
        };
    }

    const { duracaoContrato, taxaInstalacao, velocidadeDownload, velocidadeUpload } = getSecondPageValues();

    // Criação do PDF
    let yPos = 50; // Coordenada Y inicial para o conteúdo
    const maxWidth = 190; // Largura máxima para o texto

    // Função para criar o cabeçalho
    function addHeader(doc) {
        doc.setFillColor(0, 123, 255);
        doc.rect(0, 0, 210, 30, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(14);
        doc.text(`Empresa: ${empresa}`, 10, 10);
        doc.text(`Validade: ${validade} Dias`, 140, 10);
        doc.text(`Contato: ${responsavel}`, 10, 20);
        doc.text(`Porposta: Nº ${numeroProposta}`, 140, 20);
        doc.setTextColor(0, 0, 0); // Resetando a cor do texto para preto
    }

    // Adiciona o cabeçalho na primeira página
    addHeader(doc);

    // Adiciona título "A PROPOSTA" e "Grupo Max Fibra – LTDA"
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('A PROPOSTA', 10, yPos);
    yPos += 5;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text('Grupo Max Fibra – LTDA', 10, yPos);
    yPos += 20;

    // Seção OBJETO
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('OBJETO', 10, yPos);
    doc.setFont('helvetica', 'normal');
    yPos += 10;

    // Define o tamanho da fonte
    doc.setFontSize(14);

    // Texto antes do nome da empresa
    const textoAntes = 'O objeto da proposta é prestação de serviço de internet, para a Empresa';
    // Texto depois do nome da empresa
    const textoDepois = 'de acordo com as especificações descritas nesta proposta.';

    // Adiciona o texto antes do nome da empresa
    let xPos = 10;
    doc.setFont('helvetica', 'normal');
    doc.text(textoAntes, xPos, yPos, { maxWidth: maxWidth });

    // Atualiza a coordenada Y para a próxima linha
    yPos += 7;  // Ajuste o valor conforme necessário para o espaçamento entre linhas

    // Adiciona o nome da empresa na nova linha
    doc.setFont('helvetica', 'bold');
    const empresaWidth = doc.getStringUnitWidth(empresa, 14, 'helvetica', 'bold') * 2;
    doc.text(empresa, xPos, yPos, { maxWidth: maxWidth });

    // Atualiza a coordenada Y para o texto depois do nome da empresa
    yPos += 6;  // Ajuste o valor conforme necessário para o espaçamento entre linhas

    // Adiciona o texto depois do nome da empresa
    doc.setFont('helvetica', 'normal');
    doc.text(textoDepois, xPos, yPos, { maxWidth: maxWidth });

    // Atualiza o ponto Y para o próximo conteúdo
    yPos += 20;


    // Seção SUPORTE
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('SUPORTE', 10, yPos);
    doc.setFont('helvetica', 'normal');
    yPos += 10;
    doc.setFontSize(14);
    if (suporteWhatsapp) {
        doc.text('• Atendimento 24hrs pelo WhatsApp com a Assistente Virtual.', 10, yPos);
        yPos += 10;
    }
    if (suporteDedicado) {
        doc.text('• Suporte Dedicado a Empresa.', 10, yPos);
        yPos += 10;
    }
    doc.text(`• S.L.A Técnico ${sla}.`, 10, yPos);
    yPos += 20;

    // Seção ATIVIDADE OPERACIONAL
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('ATIVIDADE OPERACIONAL', 10, yPos);
    doc.setFont('helvetica', 'normal');
    yPos += 10;
    doc.setFontSize(14);
    doc.text('• Fornecimento Interrupto de Serviço de Internet.', 10, yPos);
    yPos += 10;
    doc.text('• Suporte Especializado.', 10, yPos);
    yPos += 10;

    if (linkDedicado) {
        doc.text('• Link dedicado.', 10, yPos);
        yPos += 10;
    }
    if (ipValido) {
        doc.text('• IP Valído.', 10, yPos);
        yPos += 10;
    }
    if (ipFixo) {
        doc.text('• IP Fixo.', 10, yPos);
        yPos += 10;
    }

    // Adiciona uma nova página se o conteúdo exceder o espaço disponível
    if (yPos > 250) { // Ajuste este valor conforme necessário para garantir que o conteúdo não se sobreponha
        doc.addPage();
        yPos = 50; // Reinicia a coordenada Y para a nova página
        addHeader(doc);
    }
            
        // Adiciona o logo e o nome do vendedor na parte inferior direita da segunda página
        addFooter(doc, 198, 280, logoSrc, vendedor);


    // Adiciona uma nova página
    doc.addPage();
    yPos = 50; // Reinicia a coordenada Y para a nova página
    // Adiciona título "A PROPOSTA" e "Grupo Max Fibra – LTDA"
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('O Fechamento', 10, yPos);
    yPos += 5;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text('Grupo Max Fibra – LTDA', 10, yPos);
    yPos += 20;

  
    // Adiciona o cabeçalho na segunda página
    addHeader(doc);

    // Definindo as posições das colunas
    const col1X = 10;
    const col2X = 110;
    const columnWidth = 90; // Largura máxima para cada coluna
    let yPosSecondPage = 80; // Coordenada Y inicial para a segunda página
      

        // Adiciona título e conteúdo da primeira coluna
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('INVESTIMENTO', col1X, yPosSecondPage);
        yPosSecondPage += 7;
        doc.setFontSize(14);
        doc.setFont('helvetica', 'normal');
        doc.text(`Totais: R$ ${valorProposta}`, col1X, yPosSecondPage);
        doc.text('por mês', col1X, yPosSecondPage + 6);
        yPosSecondPage += 20;

    //==========================================================================

        // Adiciona o título "DURAÇÃO DOS SERVIÇOS" e o texto com formatação
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('DURAÇÃO DOS SERVIÇOS', col1X, yPosSecondPage);
        yPosSecondPage += 7; // Ajusta a posição para o texto abaixo do título

        // Adiciona o texto do contrato
        doc.setFontSize(14);
        doc.setFont('helvetica', 'normal');
        doc.text('A duração do contrato de serviços é de', col1X, yPosSecondPage);
        yPosSecondPage += 7; // Ajusta a posição para o próximo texto
        doc.setFont('helvetica', 'bold');
        doc.text(`${duracaoContrato} meses,`, col1X, yPosSecondPage);
        yPosSecondPage += 7; // Ajusta a posição para o próximo texto
        doc.setFont('helvetica', 'normal');
        doc.text('durante a qual a Max Fibra irá prestar o fornecimento ininterrupto de internet.', col1X, yPosSecondPage, { maxWidth: columnWidth });
        yPosSecondPage += 20; // Adiciona espaço para o próximo bloco de texto


    //==========================================================================
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('FORMA DE PAGAMENTO', col1X, yPosSecondPage);
        yPosSecondPage += 7;
        doc.setFontSize(14);
        doc.setFont('helvetica', 'normal');
        doc.text('Antecipado e Mensal', col1X, yPosSecondPage);
        yPosSecondPage += 18;
    
    //==========================================================================
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('TAXA DE INSTALAÇÃO DOS SERVIÇOS', col1X, yPosSecondPage);
        yPosSecondPage += 7;
        doc.setFontSize(14);
        doc.setFont('helvetica', 'normal');
        doc.text(`A Taxa de Instalação dos Serviços contratados será de R$ ${taxaInstalacao}`, col1X, yPosSecondPage);
        yPosSecondPage += 20;

    //==========================================================================
    // Adiciona título e conteúdo da segunda coluna
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('Velocidade Do Plano Contratado', col1X, yPosSecondPage);
        yPosSecondPage += 7;

        doc.setFontSize(14);
        doc.setFont('helvetica', 'normal');
        doc.text('A Velocidade de', col1X, yPosSecondPage);
        yPosSecondPage += 7;

    //==========================================================================
        // Define um espaçamento adicional para o alinhamento
        const offsetX = 20; // Ajuste o valor conforme necessário para o alinhamento

        doc.setFont('helvetica', 'bold');
        doc.text('Download:', col1X, yPosSecondPage);
        doc.setFont('helvetica', 'normal');
        doc.text(`${' '.repeat(15)}${velocidadeDownload} Mb`, col1X + offsetX, yPosSecondPage); // Alinhamento com espaçamento
        yPosSecondPage += 7;

        doc.setFont('helvetica', 'bold');
        doc.text('Upload:', col1X, yPosSecondPage);
        doc.setFont('helvetica', 'normal');
        doc.text(`${' '.repeat(15)}${velocidadeUpload} Mb`, col1X + offsetX, yPosSecondPage); // Alinhamento com espaçamento
        yPosSecondPage += 12;

        doc.setFontSize(12);
        doc.setFont('helvetica', 'italic');
        doc.text('Obs: Os valores dos planos de Velocidades Mudam de Acordo com o Plano', col1X, yPosSecondPage, { maxWidth: columnWidth });

        
        // Adiciona o logo e o nome do vendedor na parte inferior direita da segunda página
        addFooter(doc, 198, 280, logoSrc, vendedor);

    // Visualiza o PDF em vez de baixá-lo
    doc.output('dataurlnewwindow');
}


// Função para gerar e visualizar o PDF
function downloadPDF() {
    const { jsPDF } = window.jspdf; // Acesso à biblioteca jsPDF
    const doc = new jsPDF();
    
    // Captura os valores dos campos do formulário
    const empresa = document.getElementById('empresa')?.value || 'Empresa Exemplo';
    const responsavel = document.getElementById('responsavel')?.value || 'Responsável Exemplo';
    const logoSrc = 'logo.png'; // Substitua pelo caminho correto do logo
    const validade = document.getElementById('validade')?.value || '30'; // Valor padrão
    const numeroProposta = document.getElementById('numeroProposta')?.value || '0001'; // Valor padrão
    const valorProposta = document.getElementById('valorProposta')?.value || '1000'; // Valor padrão
    const vendedor = document.getElementById('vendedor')?.value || 'Fabio Morais';

    // Captura as opções da seção "Atividade Operacional"
    const linkDedicado = document.getElementById('linkDedicado')?.checked;
    const ipValido = document.getElementById('ipValido')?.checked;
    const ipFixo = document.getElementById('ipFixo')?.checked;

    // Captura as opções da seção "SUPORTE"
    const suporteWhatsapp = document.getElementById('suporteWhatsapp')?.checked;
    const suporteDedicado = document.getElementById('suporteDedicado')?.checked;
    const sla = document.getElementById('sla')?.value || '24 horas'; // Valor padrão

    // Captura os valores da segunda página
    function getSecondPageValues() {
        const duracaoContratoElement = document.getElementById('duracaoContrato');
        const taxaInstalacaoElement = document.getElementById('taxaInstalacao');
        const velocidadeDownloadElement = document.getElementById('velocidadeDownload');
        const velocidadeUploadElement = document.getElementById('velocidadeUpload');

        return {
            duracaoContrato: duracaoContratoElement ? duracaoContratoElement.value : '6', // Padrão para 6 meses
            taxaInstalacao: taxaInstalacaoElement ? taxaInstalacaoElement.value : '0', // Padrão para 0
            velocidadeDownload: velocidadeDownloadElement ? velocidadeDownloadElement.value : '100', // Padrão para 100 mb
            velocidadeUpload: velocidadeUploadElement ? velocidadeUploadElement.value : '100' // Padrão para 100 mb
        };
    }

    const { duracaoContrato, taxaInstalacao, velocidadeDownload, velocidadeUpload } = getSecondPageValues();

    // Criação do PDF
    let yPos = 50; // Coordenada Y inicial para o conteúdo
    const maxWidth = 190; // Largura máxima para o texto

    // Função para criar o cabeçalho
    function addHeader(doc) {
        doc.setFillColor(0, 123, 255);
        doc.rect(0, 0, 210, 30, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(14);
        doc.text(`Empresa: ${empresa}`, 10, 10);
        doc.text(`Validade: ${validade} Dias`, 140, 10);
        doc.text(`Contato: ${responsavel}`, 10, 20);
        doc.text(`Porposta: Nº ${numeroProposta}`, 140, 20);
        doc.setTextColor(0, 0, 0); // Resetando a cor do texto para preto
    }

    // Adiciona o cabeçalho na primeira página
    addHeader(doc);

    // Adiciona título "A PROPOSTA" e "Grupo Max Fibra – LTDA"
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('A PROPOSTA', 10, yPos);
    yPos += 5;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text('Grupo Max Fibra – LTDA', 10, yPos);
    yPos += 20;

    // Seção OBJETO
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('OBJETO', 10, yPos);
    doc.setFont('helvetica', 'normal');
    yPos += 10;

    // Define o tamanho da fonte
    doc.setFontSize(14);

    // Texto antes do nome da empresa
    const textoAntes = 'O objeto da proposta é prestação de serviço de internet, para a Empresa';
    // Texto depois do nome da empresa
    const textoDepois = 'de acordo com as especificações descritas nesta proposta.';

    // Adiciona o texto antes do nome da empresa
    let xPos = 10;
    doc.setFont('helvetica', 'normal');
    doc.text(textoAntes, xPos, yPos, { maxWidth: maxWidth });

    // Atualiza a coordenada Y para a próxima linha
    yPos += 7;  // Ajuste o valor conforme necessário para o espaçamento entre linhas

    // Adiciona o nome da empresa na nova linha
    doc.setFont('helvetica', 'bold');
    const empresaWidth = doc.getStringUnitWidth(empresa, 14, 'helvetica', 'bold') * 2;
    doc.text(empresa, xPos, yPos, { maxWidth: maxWidth });

    // Atualiza a coordenada Y para o texto depois do nome da empresa
    yPos += 6;  // Ajuste o valor conforme necessário para o espaçamento entre linhas

    // Adiciona o texto depois do nome da empresa
    doc.setFont('helvetica', 'normal');
    doc.text(textoDepois, xPos, yPos, { maxWidth: maxWidth });

    // Atualiza o ponto Y para o próximo conteúdo
    yPos += 20;


    // Seção SUPORTE
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('SUPORTE', 10, yPos);
    doc.setFont('helvetica', 'normal');
    yPos += 10;
    doc.setFontSize(14);
    if (suporteWhatsapp) {
        doc.text('• Atendimento 24hrs pelo WhatsApp com a Assistente Virtual.', 10, yPos);
        yPos += 10;
    }
    if (suporteDedicado) {
        doc.text('• Suporte Dedicado a Empresa.', 10, yPos);
        yPos += 10;
    }
    doc.text(`• S.L.A Técnico ${sla}.`, 10, yPos);
    yPos += 20;

    // Seção ATIVIDADE OPERACIONAL
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('ATIVIDADE OPERACIONAL', 10, yPos);
    doc.setFont('helvetica', 'normal');
    yPos += 10;
    doc.setFontSize(14);
    doc.text('• Fornecimento Interrupto de Serviço de Internet.', 10, yPos);
    yPos += 10;
    doc.text('• Suporte Especializado.', 10, yPos);
    yPos += 10;

    if (linkDedicado) {
        doc.text('• Link dedicado.', 10, yPos);
        yPos += 10;
    }
    if (ipValido) {
        doc.text('• IP Valído.', 10, yPos);
        yPos += 10;
    }
    if (ipFixo) {
        doc.text('• IP Fixo.', 10, yPos);
        yPos += 10;
    }

    // Adiciona uma nova página se o conteúdo exceder o espaço disponível
    if (yPos > 250) { // Ajuste este valor conforme necessário para garantir que o conteúdo não se sobreponha
        doc.addPage();
        yPos = 50; // Reinicia a coordenada Y para a nova página
        addHeader(doc);
    }
            
        // Adiciona o logo e o nome do vendedor na parte inferior direita da segunda página
        addFooter(doc, 198, 280, logoSrc, vendedor);


    // Adiciona uma nova página
    doc.addPage();
    yPos = 50; // Reinicia a coordenada Y para a nova página
    // Adiciona título "A PROPOSTA" e "Grupo Max Fibra – LTDA"
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('O Fechamento', 10, yPos);
    yPos += 5;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text('Grupo Max Fibra – LTDA', 10, yPos);
    yPos += 20;

  
    // Adiciona o cabeçalho na segunda página
    addHeader(doc);

    // Definindo as posições das colunas
    const col1X = 10;
    const col2X = 110;
    const columnWidth = 90; // Largura máxima para cada coluna
    let yPosSecondPage = 80; // Coordenada Y inicial para a segunda página
      

        // Adiciona título e conteúdo da primeira coluna
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('INVESTIMENTO', col1X, yPosSecondPage);
        yPosSecondPage += 7;
        doc.setFontSize(14);
        doc.setFont('helvetica', 'normal');
        doc.text(`Totais: R$ ${valorProposta}`, col1X, yPosSecondPage);
        doc.text('por mês', col1X, yPosSecondPage + 6);
        yPosSecondPage += 20;

    //==========================================================================

        // Adiciona o título "DURAÇÃO DOS SERVIÇOS" e o texto com formatação
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('DURAÇÃO DOS SERVIÇOS', col1X, yPosSecondPage);
        yPosSecondPage += 7; // Ajusta a posição para o texto abaixo do título

        // Adiciona o texto do contrato
        doc.setFontSize(14);
        doc.setFont('helvetica', 'normal');
        doc.text('A duração do contrato de serviços é de', col1X, yPosSecondPage);
        yPosSecondPage += 7; // Ajusta a posição para o próximo texto
        doc.setFont('helvetica', 'bold');
        doc.text(`${duracaoContrato} meses,`, col1X, yPosSecondPage);
        yPosSecondPage += 7; // Ajusta a posição para o próximo texto
        doc.setFont('helvetica', 'normal');
        doc.text('durante a qual a Max Fibra irá prestar o fornecimento ininterrupto de internet.', col1X, yPosSecondPage, { maxWidth: columnWidth });
        yPosSecondPage += 20; // Adiciona espaço para o próximo bloco de texto


    //==========================================================================
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('FORMA DE PAGAMENTO', col1X, yPosSecondPage);
        yPosSecondPage += 7;
        doc.setFontSize(14);
        doc.setFont('helvetica', 'normal');
        doc.text('Antecipado e Mensal', col1X, yPosSecondPage);
        yPosSecondPage += 18;
    
    //==========================================================================
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('TAXA DE INSTALAÇÃO DOS SERVIÇOS', col1X, yPosSecondPage);
        yPosSecondPage += 7;
        doc.setFontSize(14);
        doc.setFont('helvetica', 'normal');
        doc.text(`A Taxa de Instalação dos Serviços contratados será de R$ ${taxaInstalacao}`, col1X, yPosSecondPage);
        yPosSecondPage += 20;

    //==========================================================================
    // Adiciona título e conteúdo da segunda coluna
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('Velocidade Do Plano Contratado', col1X, yPosSecondPage);
        yPosSecondPage += 7;

        doc.setFontSize(14);
        doc.setFont('helvetica', 'normal');
        doc.text('A Velocidade de', col1X, yPosSecondPage);
        yPosSecondPage += 7;

    //==========================================================================
        // Define um espaçamento adicional para o alinhamento
        const offsetX = 20; // Ajuste o valor conforme necessário para o alinhamento

        doc.setFont('helvetica', 'bold');
        doc.text('Download:', col1X, yPosSecondPage);
        doc.setFont('helvetica', 'normal');
        doc.text(`${' '.repeat(15)}${velocidadeDownload} Mb`, col1X + offsetX, yPosSecondPage); // Alinhamento com espaçamento
        yPosSecondPage += 7;

        doc.setFont('helvetica', 'bold');
        doc.text('Upload:', col1X, yPosSecondPage);
        doc.setFont('helvetica', 'normal');
        doc.text(`${' '.repeat(15)}${velocidadeUpload} Mb`, col1X + offsetX, yPosSecondPage); // Alinhamento com espaçamento
        yPosSecondPage += 12;

        doc.setFontSize(12);
        doc.setFont('helvetica', 'italic');
        doc.text('Obs: Os valores dos planos de Velocidades Mudam de Acordo com o Plano', col1X, yPosSecondPage, { maxWidth: columnWidth });

        
        // Adiciona o logo e o nome do vendedor na parte inferior direita da segunda página
        addFooter(doc, 198, 280, logoSrc, vendedor);

                // Salva o PDF
        doc.save(`PROPOSTA COMERCIAL - ${empresa}`);
}
