/***
 *  2C = Two of Clubs (Trénboles)
 *  2D = Two of Diamonds (Diamantes)
 *  2H = Two of Hearts (Corazones)
 *  2S = Two of Spades (Espadas)
 */
 let deck = [];
 const tipos = ['C', 'D', 'H', 'S'];
 const especiales = ['A','J', 'Q', 'K'];
 let puntosJugador = 0;
 let puntosComputadora = 0;

 //Referencias del HTML
 const btnPedir = document.querySelector('#btnPedir');
 const btnDetener = document.querySelector('#btnDetener');
 const btnNuevo = document.querySelector('#btnNuevo');
 const divJugadorCartas = document.querySelector('#jugador-cartas');
 const divPcCartas = document.querySelector('#computadora-cartas');
 const puntosHTML = document.querySelectorAll('small');

//Está nueva función crea una nueva baraja
 const crearDeck = () => {
    for ( let i = 2; i <= 10; i++ ){
        for ( let tipo of tipos) {
            deck.push( i + tipo );
        }
    }
    for ( let tipo of tipos ) {
        for ( let especial of especiales ) {
            deck.push(especial + tipo);
        }
    }
    
    // console.log(deck);
    deck = _.shuffle(deck);
    console.log(deck);
    return deck;
 }

 crearDeck();

 // Está función permite tomar una carta
 const pedirCarta = () => {
    if (deck.length === 0) {
        throw 'No hay cartas en el deck'
    }
    const cartaPedida = deck.pop();
    // console.log(`Está es la carta que retorna pedirCarta() ${cartaPedida}`);
    // console.log(deck);
    return cartaPedida;

 }

//  for ( let i = 0; i <= 100; i++ ) {
//     pedirCarta();
//  }



//Está función dice cuál es  el valor en puntos de la carta que pedí en pedirCarta
const valorCarta = ( carta ) => {
    // const valor = carta.substring(0, carta.length - 1);// cortar el último valor de la carta para que en el caso de 10D, descarte la D y quede el 10 
    // console.log(valor);
    // let puntos = 0;
    // if(isNaN( valor)){//NaN not a number regresa un valor booleano
    //     puntos = ( valor === 'A' ) ? 11 : 10;
    //     console.log('No es un número');
    //     console.log(puntos);
    // }else {
    //     puntos = valor * 1;// al multiplicar el valor string por 1 regresa un número
    //     console.log('Es un número');
    //     console.log(puntos);
    // }

    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ?
            ( valor === 'A' ) ? 11 : 10
            : valor * 1;

}



// const valor = valorCarta(pedirCarta());
// console.log(valor);

//Truno de la computadora
const turnoCompu = (puntosMinimos) => {
    do {
        const carta = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta);
        // console.log(puntosJugador);
        puntosHTML[1].innerText  = puntosComputadora ;
        const imgCarta = document.createElement('img');
        imgCarta.src = `/assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divPcCartas.append(imgCarta);

        if ( puntosMinimos > 21 ) {
            break;
        }

    } while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

    setTimeout(() => {// como no es multihilo entonces todo esto se debe ejecutar una vez que js maneje las cartas del dom es decir estamos dando tiempo a que se "pinten" las cartas del turno de la computadora
        if (puntosComputadora === puntosMinimos) {
            alert('Nadie Gana )=');
        } else if (puntosMinimos > 21) {
            alert('Computadora Gana! n_n');
        } else if(puntosComputadora > 21){
            alert('Jugador Gana!! (=');
        } else {
            alert('Computadora Gana 0o0');
        }
    }, 50)//10 milesimas de segundo
}

//Eventos
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);
    // console.log(puntosJugador);
    puntosHTML[0].innerText  = puntosJugador ;
    const imgCarta = document.createElement('img');
    imgCarta.src = `/assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divJugadorCartas.append(imgCarta);

    if (puntosJugador > 21) {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoCompu(puntosJugador);
    } else if ( puntosJugador === 21 ) {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoCompu(puntosJugador);
    }
    
});

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnoCompu(puntosJugador);
});


btnNuevo.addEventListener('click', () => {
    console.clear();
    deck = [];
    deck = crearDeck();
    puntosJugador = 0;
    puntosComputadora = 0;
    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divPcCartas.innerHTML = '';
    divJugadorCartas.innerHTML = '';
    btnPedir.disabled = false;
    btnDetener.disabled = false;

});