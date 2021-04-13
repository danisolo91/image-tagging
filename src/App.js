import firebase from 'firebase/app';
import { useEffect, useState } from 'react';

const App = () => {

    const [state, setState] = useState({ scores: null });

    useEffect(() => {
        firebase.firestore().collection('scores')
        .onSnapshot(serverUpdate => {
            // firebase will call this func everytime the collection is updated
            const scores = serverUpdate.docs.map(_score => {
                const data = _score.data();
                data['id'] = _score.id;
                return data;
            });
            console.log(scores);
            setState({ scores: scores });
        });
    }, []);

    return (
        <>
            { state.scores && state.scores[0].name + ' - ' + state.scores[0].score }
        </>
    );
};

export default App;