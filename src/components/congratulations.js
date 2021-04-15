const Congratulations = () => {
    return (
        <div className="modal-content">
            <h1>Congratulations</h1>
            <p>You found everyone. Enter you name below, and we'll add your score to the leaderboard!</p>
            <form>
                <input type="text" name="name" placeholder="Enter your name" />
                <button id="saveBtn" type="submit">Save</button>
            </form>
        </div>
    );
};

export default Congratulations;