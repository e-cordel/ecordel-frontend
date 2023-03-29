[![Build](https://github.com/e-cordel/ecordel-frontend/actions/workflows/deploy.yml/badge.svg)](https://github.com/e-cordel/ecordel-frontend/actions/workflows/deploy.yml)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=e-cordel_ecordel-frontend&metric=alert_status)](https://sonarcloud.io/dashboard?id=e-cordel_ecordel-frontend)


# E-cordel frontend

SPA responsável por exibir e-cordeis e permitir revisões de obras.

## Como fazer build do projeto

`yarn build`

Copia `.env.template` para `.env.production` e preenche com as variáveis ​​do ambiente de produção.

Cria o aplicativo para produção na pasta `build`.\
Empacota corretamente o React no modo de produção e otimiza a compilação para obter o melhor desempenho.

A compilação é minificada e os nomes dos arquivos incluem os hashes.\

## Como testar

`yarn test`

Copia `.env.template` para `.env.test` e preenche com as variáveis ​​de ambiente de teste.

Inicia o executor de teste no modo de observação interativo.\

## Como executar localmente

No diretório do projeto, você pode executar:

`yarn start`

Copia `.env.template` para `.env.development` e preenche com as variáveis ​​do ambiente de desenvolvimento.

A página será recarregada se você fizer alterações.\
Você também verá quaisquer erros de lint no console.

Você pode testar o frontend com uma API simulada.

1. Instalar prism

```npm install -g @stoplight/prism-cli```

2. Crie um mock a partir da especificação OpenAPI do e-cordel

```
prism mock https://raw.githubusercontent.com/e-cordel/ecordel-restapi/main/openapi.yaml
```

3. altere o arquivo `.env.development` de acordo com a url criada pelo prism

## Como contribuir

Para ajuda e informações de como contribuir com o projeto, acesse a [página oficial do e-codel](http://www.ecordel.com.br/como-contribuir).

## Canais de Comunicação

Nos encontre nas seguintes plataformas abaixo:

<a href="https://ecordel.com.br/"><img align="center" alt="Site E-cordel" height="27" width="90" src="https://img.shields.io/badge/website-000000?style=for-the-badge&logo=About.me&logoColor=white"></a>

<a href="https://www.linkedin.com/company/e-cordel/"> <img align="center" alt="Linkedin" height="27" width="90" src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"> </a>

<a href="https://www.instagram.com/projetoecordel/"><img align="center" alt="Instagram" height="27" width="90" src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white"></a>
