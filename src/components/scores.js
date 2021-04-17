import { useContext, useEffect, useState } from "react";
import firebase from 'firebase/app';
import { GameContext } from "../contexts/GameContext";

const Scores = ({ modal }) => {

    modal.style.display = 'block';

    const setGame = useContext(GameContext)[1];
    const [scores, setScores] = useState(null);

    useEffect(() => {
        firebase.firestore().collection('scores').orderBy('time', 'asc').get()
            .then(query => {
                const results = query.docs.map(_score => {
                    const data = {
                        id: _score.id,
                        name: _score.data().name,
                        time: getTime(_score.data().time),
                    };
                    return data;
                });
                setScores(results);
            });
        
        // transform miliseconds in 00:00
        const getTime = (val) => {
            let totalSeconds = val / 1000;
            let minutes = format(parseInt(totalSeconds / 60));
            let seconds = format(parseInt(totalSeconds % 60));
            return minutes + ':' + seconds;
        };

        // format time. Eg. '06' instead '6'
        const format = (val) => {
            let valStr = val + '';
            if (valStr.length < 2) {
                return '0' + valStr;
            } else {
                return valStr;
            }
        };
    }, []);

    const restartGame = () => {
        setGame(prevState => {
            return {
                gameOver: false,
                player: {
                    name: 'Anonymous',
                    startTime: null,
                    endTime: null,
                },
                characters: prevState.characters.map(_ch => {
                    _ch.found = false;
                    return _ch;
                }),
            };
        });
    };

    return (
        <div className="modal-content">
            <h1>Scores</h1>
            <p>Here are the best scores:</p>
            <ol>
                {scores ?
                    scores.map((_score, i) => {
                        return <li key={i}>{_score.name} <span>{_score.time}</span></li>
                    }) :
                    <span>Loading data...</span>}
            </ol>
            <button onClick={restartGame}>Play again</button>
        </div>
    );
};

export default Scores;