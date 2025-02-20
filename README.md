# E Agora?
Interface web para interagir com contratos de predição.

Acompanha o projeto [simple-prediction-market](https://github.com/joaopedrolourencoaffonso/simple-prediction-market).

## Copiando arquivos de ABI

```sh
> cp ..\simple-prediction-market\artifacts\contracts\token.sol\MyToken.json .\public\json\.
> cp ..\simple-prediction-market\artifacts\contracts\MercadoSimples.sol\MercadoSimples.json .\public\json\.
```

## Como executar o ethers?

Eu tive dificuldades para o executar o ethers.js que ainda não entendi bem.

Resolvi baixando o [arquivo](https://github.com/ethers-io/ethers.js/blob/main/dist/ethers.min.js) diretamente e salvando na pasta `/public/javascript` e importando diretamente do ejs.

## Migrando do ethers v5 para o v6

https://docs.ethers.org/v6/migrating/#migrate-providers

## Observação

A legalidade de mercados de predição no Brasil ainda é questionável. O presente projeto tem fins meramente educacionais e exemplificativos.


Foto de fundo da tela de previsão fornecida por <a href="https://unsplash.com/pt-br/@seanwsinclair?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Sean Sinclair</a> na <a href="https://unsplash.com/pt-br/fotografias/yellow-and-white-abstract-painting-gai1YB3UmDA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
      