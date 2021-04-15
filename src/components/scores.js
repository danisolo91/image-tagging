const Scores = () => {
    return (
        <div className="modal-content">
            <h1>Scores</h1>
            <p>Here are the best scores:</p>
            <ol>
                <li>Daniel Solomon <span>0:22</span></li>
                <li>Claudio Miron <span>2:53</span></li>
                <li>Brad Pitt <span>24:18</span></li>
            </ol>
            <button id="replayBtn">Play again</button>
        </div>
    );
};

export default Scores;