# innova-starwars-api
Este repositório foi desenvolvido a partir da ideia de obter um retorno mais legivel e rapido da SWAPI.

API disponivel para uso em produção https://innova-starwars-api.herokuapp.com/

## Rotas
Rota para procura de personagens `/persons`, query opcional: page (numero inteiro)
  - `/persons` retorna todos os pernagens em lista.

  - `/persons/:nome` retorna uma lista de personagens com esse possível nome.

Rota para procura de filmes `/movies`, query para pesquisa: url (array de string)

  - `/movies` retorna uma lista de filmes do Star Wars.
