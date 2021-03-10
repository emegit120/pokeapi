startPage(0, 20, 10, 1);

    async function startPage(inicio, final, paginacao, current) {

    document.getElementById("pokemon-detalhe").innerHTML = "";


        document.getElementById("pokemons").innerHTML = "";

        let paginacaoint = parseInt(paginacao);

        if (!paginacao) {
            paginacaoint = 20;
        }

        let umavez = 1;
        let currentnext = current;
        let currentprev = current;

        let finalValue = document.getElementById('final').value;

        let finalselect = finalValue;

        let pages = Math.ceil(finalValue / paginacao);

        document.getElementById("pokemons").innerHTML = "";

        if (final > paginacaoint) {
            final = paginacaoint;
        }

        let url = 'https://pokeapi.co/api/v2/pokemon/?offset=' + inicio + '&limit=+' + final;

        await fetch(url)
                .then(response => response.json())
                .then(data => {
                    //console.log(data);
                    let next = data.next;
                    let previous = data.previous;
                    let pokemons = data.results;
                    pokemons.map(function (pokemon) {


                        setTimeout(function () {

                            let url = 'https://pokeapi.co/api/v2/pokemon/' + pokemon.name;

                            fetch(url)
                                    .then(response => response.json())
                                    .then(pokemondetail => {


                                        var img = document.createElement("img");
                                        img.setAttribute('alt', pokemon.name);
                                        img.src = pokemondetail.sprites.front_default;

                                        var link = document.createElement('a');
                                        link.setAttribute('onclick', 'pokemonDetail("' + pokemon.name + '")');
                                        link.setAttribute('href', '#');

                                        var h2 = document.createElement('h2');

                                        var li = document.createElement("li");
                                        var textnode = document.createTextNode(pokemon.name);

                                        li.appendChild(link);
                                        link.appendChild(img);
                                        link.appendChild(h2);
                                        h2.appendChild(textnode);


                                        document.getElementById('pokemons').appendChild(li);

                                        document.getElementById("spinner").setAttribute('style', 'display:none');
                                    }).catch(err => console.log(err));
                        }, 2000);

                        if (previous) {
                            let pr = previous.split("=", 2);
                            let offsetprev = pr[1].split("&", 1);
                            let finalprev = paginacaoint;

                            console.log(paginacaoint);

                            if (offsetprev > paginacaoint) {
                                offsetprev = (currentprev * paginacaoint) - paginacaoint;
                            }
                            if (offsetprev < 0) {
                                offsetprev = 0;
                            }
                            if (offsetprev < paginacaoint) {
                                offsetprev = 0;
                            }

                            if (umavez == 1) {
                                currentprev = currentprev - 1;
                            }


                            let prevLink = 'startPage(' + offsetprev + ',' + finalprev + ',' + paginacaoint + ',' + currentprev + ')';
                            document.getElementById('prev').setAttribute('onclick', prevLink);
                        }

                        if (next) {
                            let p = next.split("=", 2);
                            let offset = p[1].split("&", 1);


                            if (currentnext == pages) {
                                let total = pages * paginacaoint;
                                let falta = total - finalValue;
                                final = paginacaoint - falta;

                            } else {
                                final = paginacaoint;
                            }

                            if (umavez == 1) {
                                currentnext = currentnext + 1;
                                umavez++;

                            }

                            let nextLink = 'startPage(' + offset + ',' + final + ',' + paginacaoint + ',' + currentnext + ')';
                            if (offset >= finalselect) {
                                nextLink = '';
                            }
                            document.getElementById('next').setAttribute('onclick', nextLink);
                        }



                    });

                })
                .catch(err => console.log(err));

    }
    function filtrarPokemons(event) {

        document.getElementById("spinner").setAttribute('style', 'display:flex');

        document.getElementById("pokemons").innerHTML = "";

        document.getElementById("pokemons").innerHTML = "Carregando...";

        event.preventDefault();
        let inicial = document.getElementById('inicial').value;
        let final = document.getElementById('final').value;

        let paginacao = document.getElementById('paginacao').value;

        if (inicial > final) {
            return document.getElementById("pokemons").innerHTML = "numero inicial não pode ser maior que o final";
        }

        let current = 1;

        return startPage(inicial, final, paginacao, current);


    }

    async function pokemonDetail(name) {

        document.getElementById("pokemons").innerHTML = "";


        let url = 'https://pokeapi.co/api/v2/pokemon/' + name;
        await fetch(url)
                .then(response => response.json())
                .then(pokemondetail => {

                    var img = document.createElement("img");
                    img.setAttribute('alt', name);
                    img.src = pokemondetail.sprites.front_default;

                    var link = document.createElement('a');
                    link.setAttribute('onclick', 'pokemonDetail("' + name + '")');
                    link.setAttribute('href', '#');

                    var h2 = document.createElement('h2');

                    var li = document.createElement("div");
                    var li2 = document.createElement("div");
                    li2.setAttribute('id', 'detalhes');

                    var textnode = document.createTextNode(name);

                    li.appendChild(link);
                    li.appendChild(li2);
                    link.appendChild(img);
                    link.appendChild(h2);
                    h2.appendChild(textnode);

                    document.getElementById('pokemon-detalhe').appendChild(li);

                    document.getElementById("detalhes").innerHTML = "detalhes...";

                }).catch(err => console.log(err));
    }
