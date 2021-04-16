import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";

const Start = ({ modal }) => {

    const [game, setGame] = useContext(GameContext);

    const startGame = () => {
        setGame(prevState => {
            return {
                ...prevState,
                player: {
                    ...prevState.player,
                    startTime: new Date(),
                }
            };
        });
        modal.style.display = 'none';
    };

    return (
        <div className="modal-content">
            <h1>Image tagging</h1>
            <p>You have to find the following characters:</p>
            {game.characters ?
                <>
                    <ul>
                        {game.characters.map((_character, i) => {
                            return <li key={i}>{_character.name}</li>
                        })}
                    </ul> 
                    <button onClick={startGame}>Play</button> 
                </> :
                <span>Loading characters...</span>
            }
        </div>
    );
};

export default Start;