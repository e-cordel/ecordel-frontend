[![Build](https://github.com/e-cordel/ecordel-frontend/actions/workflows/deploy.yml/badge.svg)](https://github.com/e-cordel/ecordel-frontend/actions/workflows/deploy.yml)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=e-cordel_ecordel-frontend&metric=alert_status)](https://sonarcloud.io/dashboard?id=e-cordel_ecordel-frontend)


# E-cordel frontend

SPA responsável por exibir e-cordeis e permitir revisões de trabalho

## Como testar
Frontend de teste em uma API simulada.


1. Instalar prism

```npm install -g @stoplight/prism-cli```


2. Crie um mock a partir da especificação e-cordel OpenAPI

```
prism mock https://raw.githubusercontent.com/e-cordel/ecordel-restapi/main/openapi.yaml
```

3. altere o arquivo `.env.deveopment` de acordo

## Scripts Disponíveis

No diretório do projeto, você pode executar:

`yarn start`

Copie `.env.template` para `.env.development` e preencha com as variáveis ​​do ambiente de desenvolvimento.


Inicie o app no modo de desenvolvimento.\
Abra [http://localhost:3000](http://localhost:3000) para visualizá-lo no navegador.

A página será recarregada se você fizer alterações.\
Você também verá quaisquer erros de lint no console.

`yarn test`

Copie `.env.template` para `.env.test` e preencha com as variáveis ​​de ambiente de teste.

Inicia o executor de teste no modo de observação interativo.\
Veja a seção sobre [running tests](https://facebook.github.io/create-react-app/docs/running-tests) 
Para maiores informações.

`yarn build`

Copie `.env.template` para `.env.production` e preencha com as variáveis ​​do ambiente de produção.

Cria o aplicativo para produção na pasta `build`.\
Ele empacota corretamente o React no modo de produção e otimiza a compilação para obter o melhor desempenho.

A compilação é minificada e os nomes dos arquivos incluem os hashes.\
Seu aplicativo está pronto para ser implantado!


Veja a seção sobre [deployment](https://facebook.github.io/create-react-app/docs/deployment) Para maiores informações.


## Saiba mais

Você pode aprender mais no [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

Para aprender React, confira o [React documentation](https://reactjs.org/).

## Como contribuir

Para ajuda e informações de como contribuir com o projeto, acesse a [página oficial do e-codel](http://www.ecordel.com.br/como-contribuir).

## Canais de Comunicação

Nos encontre nas seguintes plataformas abaixo:

<a href="https://ecordel.com.br/"><img align="center" alt="Site E-cordel" height="27" width="90" src="https://img.shields.io/badge/website-000000?style=for-the-badge&logo=About.me&logoColor=white"></a>

<a href="https://www.linkedin.com/company/e-cordel/"> <img align="center" alt="Linkedin" height="27" width="90" src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"> </a>

<a href="https://www.instagram.com/projetoecordel/"><img align="center" alt="Instagram" height="27" width="90" src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white"></a>
