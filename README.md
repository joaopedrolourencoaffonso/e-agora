# e-agora
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