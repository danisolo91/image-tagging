import { useContext, useEffect, useState } from "react";
import { GameContext } from "../contexts/GameContext";

const Top = () => {

    const game = useContext(GameContext)[0];

    const [time, setTime] = useState({
        totalSeconds: 0,
        hours: '00',
        minutes: '00',
        seconds: '00',
    });

    useEffect(() => {
        if (game.player.startTime && !game.player.endTime) {
            let timeCounter = setInterval(() => getTime(), 1000);
            return () => {
                clearInterval(timeCounter);
            };
        }
    });

    const getTime = () => {
        let totalSeconds = time.totalSeconds + 1;
        setTime(prevState => {
            return {
                totalSeconds: totalSeconds,
                hours: '00',
                minutes: format(parseInt(totalSeconds / 60)),
                seconds: format(totalSeconds % 60),
            };
        });
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

    return (
        <div className="top">
            <div className="characters">
                {game.characters ?
                    game.characters.map((_character, i) => {
                        if (_character.found) {
                            return <span key={i} className="found">{_character.name}</span>;
                        } else {
                            return <span key={i}>{_character.name}</span>;
                        }
                    }) :
                    <div>Loading characters...</div>
                }
            </div>
            <div className="counter">
                {time.hours}:{time.minutes}:{time.seconds}
            </div>
        </div>
    );
};

export default Top;