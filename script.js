document.addEventListener('DOMContentLoaded', () => {

    let turno = 0;
    let juegoActivo = true;
    const tauler = [];

    const mensaje = document.getElementById('missatge');
    const botones = document.querySelectorAll('.button');
    const btnReiniciar = document.getElementById('reiniciar');

    const HasGanado = () => {
        const combinaciones = [
            [0,1,2],[3,4,5],[6,7,8],
            [0,3,6],[1,4,7],[2,5,8],
            [0,4,8],[2,4,6]
        ];

        return combinaciones.some(c =>
            tauler[c[0]] &&
            tauler[c[0]] === tauler[c[1]] &&
            tauler[c[0]] === tauler[c[2]]
        );
    };

    const btnPulsado = (e, pos) => {

        if (!juegoActivo || tauler[pos]) return;

        turno++;
        const simbolo = turno % 2 ? 'X' : 'O';

        e.target.textContent = simbolo;
        e.target.style.color = simbolo === 'X' ? '#ff0000' : '#000dff';

        tauler[pos] = simbolo;

        if (HasGanado()) {
            mensaje.textContent = 'Ha ganado el jugador ' + simbolo;
            juegoActivo = false;
            return;
        }

        if (turno === 9) {
            mensaje.textContent = 'Empate!';
            juegoActivo = false;
            return;
        }

        mensaje.textContent =
            'Turno del jugador ' + (simbolo === 'X' ? 'O' : 'X');
    };

    const reiniciarJuego = () => {
        turno = 0;
        juegoActivo = true;
        tauler.length = 0;

        botones.forEach(btn => {
            btn.textContent = '';
            btn.style.color = 'white';
        });

        mensaje.textContent = 'Turno del jugador X';
    };

    botones.forEach((btn, i) => {
        btn.addEventListener('click', (e) => btnPulsado(e, i));
    });

    btnReiniciar.addEventListener('click', reiniciarJuego);

});
