import { useContext, useState } from "react";
import { GameContext } from "../contexts/GameContext";

const Congratulations = ({ modal }) => {

    modal.style.display = 'block';

    const setGame = useContext(GameContext)[1];
    const [input, setInput] = useState('');

    const changeInput = (e) => {
        setInput(e.target.value);
    };

    const savePlayer = (e) => {
        e.preventDefault();
        setGame(prevState => {
            return {
                ...prevState,
                player: {
                    ...prevState.player,
                    name: input,
                },
                gameOver: true,
            };
        });
        modal.style.display = 'none';
    };

    return (
        <div className="modal-content">
            <h1>Congratulations</h1>
            <p>You found everyone. Enter you name below, and we'll add your score to the leaderboard!</p>
            <form onSubmit={savePlayer}>
                <input onChange={changeInput} value={input}
                    type="text" name="name"
                    placeholder="Enter your name"
                    maxLength="25" required />
                <button id="saveBtn" type="submit">Save</button>
            </form>
        </div>
    );
};

export default Congratulations;