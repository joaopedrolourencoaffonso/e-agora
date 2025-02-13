//let provider = new ethers.providers.Web3Provider(window.ethereum);

let MyTokenABI;

document.addEventListener('DOMContentLoaded', async (event) => {
    await iniciandoPagina();
});

// Function to generate the links and append them to the div
async function iniciandoPagina() {
  console.log("MyToken:", window.MyToken); // Access the environment variable MyToken
  console.log("MercadoSimples:", window.MercadoSimples); // Access the environment variable MercadoSimples

  const MyTokenResponse = await fetch('/json/MyToken.json');
  const MyTokenJSON = await MyTokenResponse.json();
  MyTokenABI = MyTokenJSON["abi"];
  
  const div = document.getElementById('listaprevisoes'); // Get the div element
  div.innerHTML = ''; // Clear any existing content inside the div  
    
  // Iterate over numbers 1 to 10
  for (let i = 1; i <= 10; i++) {
    // Create a new div container for the link
    let linkContainer = document.createElement('div');
    
    // Add the specified class to the div
    linkContainer.classList.add('link-container');

    // Create a new link element
    let link = document.createElement('a');
    link.href = `/previsao/${i}`; // Set the link's href
    link.textContent = `Meu LINK ${i}`; // Set the link's text
    
    // Append the link to the div container
    linkContainer.appendChild(link);
    
    // Append the div container to the main div
    div.appendChild(linkContainer);
    
    // Optionally, add a line break after each link container
    div.appendChild(document.createElement('br'));

    //console.log(linkContainer);
  }
}

async function Hello(){
    console.log("oi!");
}
  
// Call the function to generate the links when the page loads
//window.onload = generateLinks;
  