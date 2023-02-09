const miModulo = (() => {//funcion anonima autoinvocada
    'use strict'

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'];
    const especiales = ['A','J', 'Q', 'K'];
    // let puntosJugador = 0;
    // let puntosComputadora = 0;
    let puntosJugadores = [];
   
    //Referencias del HTML
    const btnPedir = document.querySelector('#btnPedir');
    const btnDetener = document.querySelector('#btnDetener');
    const btnNuevo = document.querySelector('#btnNuevo');
    const divCartasJugadores  = document.querySelectorAll('.divCartas');
    const puntosHTML = document.querySelectorAll('small');

    //Esta función inicializa el juego
    const inicializarJuego = (numeroJugadores = 2) => { // El ultimo jugador será la computadora
        deck = crearDeck();

        puntosJugadores = [];
        for(let i = 0; i < numeroJugadores; i++) {
            puntosJugadores.push(0);
        }

        puntosHTML.forEach(element => element.innerText = 0 );
        divCartasJugadores.forEach(element => element.innerHTML = '' );

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }
   
   //Está nueva función crea una nueva baraja
    const crearDeck = () => {
        deck = [];//Reinicializando el deck para que en nuevo juego no sea necesario borrar deck
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
       return _.shuffle(deck);
    }
    
   
    // Está función permite tomar una carta
    const pedirCarta = () => {
       if (deck.length === 0) {
           throw 'No hay cartas en el deck'
       }
       // console.log(`Está es la carta que retorna pedirCarta() ${cartaPedida}`);
       // console.log(deck);
       return deck.pop();
   
    }
   
   //Está función dice cuál es  el valor en puntos de la carta que pedí en pedirCarta
   const valorCarta = ( carta ) => {
   
       const valor = carta.substring(0, carta.length - 1);
       return (isNaN(valor)) ?
               ( valor === 'A' ) ? 11 : 10
               : valor * 1;
   
   }
   
   const acumularPuntos = (carta, turno) => { //turno 0 es primer jugador y el ultimo es la computadora
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        // console.log(puntosJugador);
        puntosHTML[turno].innerText  = puntosJugadores[turno] ;
        return puntosJugadores[turno];
   }
   
   const crearCarta = (carta, turno) => {

        const imgCarta = document.createElement('img');
        imgCarta.src = `/assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
   }

   const determinarGanador = () => {
    const  [puntosMinimos, puntosComputadora] = puntosJugadores;
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
    }, 100)//100 milesimas de segundo
   }
   
   //Truno de la computadora
   const turnoCompu = (puntosMinimos) => {
       let puntosComputadora = 0;
       do {
           const carta = pedirCarta();
           puntosComputadora = acumularPuntos( carta, puntosJugadores.length - 1 );
           crearCarta(carta, puntosJugadores.length - 1)
   
       } while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

       determinarGanador();
   }
   
   //Eventos
   btnPedir.addEventListener('click', () => {
       const carta = pedirCarta();
       const puntosJugador = acumularPuntos(carta, 0);
       crearCarta(carta, 0 );
   
       if (puntosJugador > 21) {
           console.warn('Lo siento mucho, perdiste');
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
   
       turnoCompu(puntosJugadores[0]);
   });
   
   
//    btnNuevo.addEventListener('click', () => {
//        inicializarJuego()
   
//    });

   return {
        nuevoJuego: inicializarJuego
   }

})();
