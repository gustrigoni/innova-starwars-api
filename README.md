# innova-starwars-api
Este repositório foi desenvolvido a partir da ideia de obter um retorno mais legivel e rapido da SWAPI.

API disponivel para uso em produção https://innova-starwars-api.herokuapp.com/

## Rotas
Rota para procura de personagens `/persons`, query opcional: page (numero inteiro)
  - `/persons` retorna todos os pernagens em lista.

  - `/persons/:nome` retorna uma lista de personagens com esse possível nome.

Rota para procura de filmes `/movies`, query para pesquisa: url (array de string)

  - `/movies` retorna uma lista de filmes do Star Wars.

### Obs.
Foi solicitado que existisse uma pesquisa por gênero, porém a SWAPI, como está documentada em https://swapi.dev/documentation#people só aceita que personagens do Star Wars seja pesquisado por um query chamada name. Por isso não foi possível fazer esse tipo de pesquisa como solicitado.
