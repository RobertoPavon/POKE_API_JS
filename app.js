/* se asignan variables enlazadas a los elementos html  */  
const botones = document.querySelectorAll('.btn-header');
const LISTA = document.getElementById('lista-pokemon');

const URL = 'https://pokeapi.co/api/v2/pokemon/';

/* ya que la URL cambia dependiendo del numero o nombre del pokemon, se utiliza un bucle para iterar en cada uno de las paginas de la API
    y se declara el metodo fetch para solicitar los recursos  */  
for (let i = 1; i < 1011; i++) {
    fetch(URL+i)
    .then((response) => response.json())
    .then((data) => mostrarPokemon(data)+console.log(data[i]));
}

/* se crea la funcion para obtener los datos que queremos de la API  */  
function mostrarPokemon(poke) {

    /* se obtiene un arreglo de los tipos de pokemon para incluirlos dentro de las tarjetas  */  
    let tipos = poke.types.map(type => `
    <p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

/* la varible fondo y color tomaran las primeras 3 letras del tipo de pokemon para asignarle un color 
    de fondo en CSS respectivo a cada tarjeta dependiendo del tipo de pokemon   */  
    let fondo = tipos[15] + tipos[16] +tipos[17];
    let color = fondo+1;
    console.log(color);

    /* si el id del pokemon es menor a 10 se le agregaran "00" dos ceros"" al inicio, si es menor a 100 se le agregara "0"   */  
    let pokeId = poke.id.toString();
    if (pokeId.length === 1 ) {
        pokeId =  "00" + pokeId;
    }
    if (pokeId.length === 2 ) {
        pokeId =  "0" + pokeId;
    }

/* se obtienen los datos que se quieren mostrar en las tarjetas y se crean los elementos HTML para mostrar la información  */  

    const div = document.createElement('div');
    div.classList.add('pokemon');
    /* al div creado se le agrega la clase de los valores que contenga la variable fondo para asignar color en CSS  */  
    div.classList.add(fondo);
    div.innerHTML = `
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-imagen">
            <img src=${poke.sprites.other['official-artwork'].front_default} alt="${poke.name}" >
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id ${color} ">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>

            <div class="pokemon-tipos">
            ${tipos}
            </div>

            <div class="pokemon-stats">
                <p class="stats ${color} ">${poke.height}</p>
                <p class="stats ${color} ">${poke.weight}</p>
            </div>
        </div>
        `;
        
        LISTA.append(div);
        
};


/* se crea la función de busqueda por tipo de pokemon, la cual se asigna a un evento click en cada boton de la cabecera  */  

botones.forEach(boton => boton.addEventListener('click', (e) => {
    const botonId = e.currentTarget.id;
    LISTA.innerHTML = '';
    
    for (let i = 1; i < 1011; i++) {
        fetch(URL+i)
        .then((response) => response.json())
        .then((data) => {
            if (botonId === 'ver-todos') {
                mostrarPokemon(data)
            }else {
                const tipos = data.types.map(type => type.type.name);
                if (tipos.some(tipo => tipo.includes(botonId))) {
                    mostrarPokemon(data);
                }
            }
        });
    }
}));