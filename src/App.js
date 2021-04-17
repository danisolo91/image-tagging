import img from './image.jpg';
import Start from './components/start';
import Congratulations from './components/congratulations';
import Scores from './components/scores';
import Top from './components/top';
import { useContext, useEffect, useRef } from 'react';
import { GameContext } from './contexts/GameContext';
import firebase from 'firebase/app';

const App = () => {

    const [game, setGame] = useContext(GameContext);
    const modal = useRef(null);
    const image = useRef(null);

    const checkClick = (e) => {
        let x = e.pageX;
        let y = e.pageY;
        let id = null;
        let found = 0;


        game.characters.forEach(_character => {
            if (_character.found) found = found + 1;
            if (x >= _character.minX && x <= _character.maxX &&
                y >= _character.minY && y <= _character.maxY) {
                id = _character.id;
                found = found + 1;
            }
        });

        if (id) {
            let endTime = null;

            if (found === 3) {
                endTime = new Date();
            }

            setGame(prevState => {
                return {
                    ...prevState,
                    player: {
                        ...prevState.player,
                        endTime: endTime,
                    },
                    characters: prevState.characters.map(_ch => {
                        if (_ch.id === id) _ch.found = true;
                        return _ch;
                    }),
                };
            });
            console.log('very good!');
        } else {
            console.log('Noup!');
        }
    };

    useEffect(() => {
        if (game.gameOver) {
            firebase.firestore().collection('scores').add({
                name: game.player.name,
                time: game.player.endTime - game.player.startTime,
            })
                .then(docRef => {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
        }
    }, [game]);

    return (
        <>
            <Top />
            <img className="image" onClick={checkClick} ref={image} src={img} alt="tag the characters" />
            <div ref={modal} id="modal" className="modal">
                {
                    game.player.startTime === null ?
                        <Start modal={modal.current} /> :
                        (game.player.endTime && !game.gameOver) &&
                        <Congratulations modal={modal.current} />
                }
                {game.gameOver && <Scores modal={modal.current} />}
            </div>
        </>
    );
};

export default App;