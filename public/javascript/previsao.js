async function InvestirSim() {
    //let previsao = await window.contrato.getPrevisao(window.idDaPrevisao);
    //console.log(previsao[0]);
    let userInput = window.prompt("Digite quantos reais você deseja investir:");
    userInput = Number(userInput);
    
    // Request the current accounts
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    console.log("==> ", accounts);

    // The first account is typically the active account
    const currentAccount = accounts[0];

    console.log("Current account:", currentAccount);

    // Approving transfer (state-changing function, use signer)
    console.log("Approving transfer...");
    const approveTx = await window.tokenWriter.approve(window.MercadoSimples, userInput);
    approveTx.wait();
    console.log("Approve transaction hash:", approveTx.hash);

    // Voting (state-changing function, use signer)
    console.log("Voting...");
    const voteTx = await window.contratoWriter.votar(window.idDaPrevisao, userInput);
    voteTx.wait();
    console.log("Vote transaction hash:", voteTx.hash);

    alert("Transação bem sucedida!");
}

// Função que cria charts
function createChart(yes, no,chartId,yesColor,noColor, str1, str2, title) {
    // Get the context of the canvas element
    const ctx = document.getElementById(chartId).getContext('2d');

    // Create the pie chart
    const targetChart = new Chart(ctx, {
        type: 'pie',  // Pie chart
        data: {
            labels: ['Sim', 'Não'],  // Labels for the pie chart
            datasets: [{
                data: [yes, no],  // Data for the chart
                backgroundColor: [yesColor, noColor],  // Colors for each segment
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: title
                },
                legend: {
                    position: 'bottom',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.label + str1 + tooltipItem.raw + str2;
                        }
                    }
                }
            }
        }
    });
}

// populando elementos
function updateElementById(var1, var2) {
    // Find the element with id = var1
    let element = document.getElementById(var1);

    // If the element exists, update its content
    if (element) {
        element.textContent = var2;  // Sets the text content of the element
    } else {
        console.log(`Element with id "${var1}" not found.`);
    }
}

async function preparaAmbiente(ethers) {
    // criando um provider com base em v6
    let provider = new ethers.providers.Web3Provider(window.ethereum);

    // Requesting signer to enable transactions
    let signer = provider.getSigner();
    window.signer = signer;

    // Importando ABI do MercadoSimples
    const Token = await fetch('/json/MyToken.json');
    const TokenJSON = await Token.json();
    const TokenABI = TokenJSON["abi"];
    window.tokenReader = new ethers.Contract(window.MyToken, TokenABI, provider);
    window.tokenWriter = new ethers.Contract(window.MyToken, TokenABI, signer);
    
    // Importando ABI do MercadoSimples
    const MercadoSimples = await fetch('/json/MercadoSimples.json');
    const MercadoSimplesJSON = await MercadoSimples.json();
    const MercadoSimplesABI = MercadoSimplesJSON["abi"];
    
    // Efetivamente contactando o contrato
    window.contratoReader = new ethers.Contract(window.MercadoSimples, MercadoSimplesABI, provider);
    window.contratoWriter = new ethers.Contract(window.MercadoSimples, MercadoSimplesABI, signer);
    
    let previsao = await window.contratoReader.getPrevisao(window.idDaPrevisao);
    
    updateElementById("titulo", previsao[0]);
    updateElementById("tituloDaPagina", previsao[0]);
    updateElementById("descricao", "Descrição: " + previsao[1]);
    updateElementById("votosSim", "Sim: " + previsao[2]);
    updateElementById("votosNao", "Não: " + previsao[3]);
    updateElementById("totalSim", "Total investido em sim: R$" + previsao[5] + ",00");
    updateElementById("totalNao", "Total investido em não: R$" + previsao[6] + ",00");

    if (previsao[4]) {
        updateElementById("status", "Status: Em andamento!");
    } else {
        updateElementById("status", "Status: Encerrada");
    }
    
    // votos
    await createChart(Number(previsao[2]),Number(previsao[3]),'voteChart','#21ad50', '#eb4034',': ',' votos', 'Votos');
    
    // investimentos
    await createChart(Number(previsao[5]),Number(previsao[6]),'investmentChart','#21ad50', '#eb4034',": R$ ",",00","Investimentos");
}