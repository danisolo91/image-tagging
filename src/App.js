import firebase from 'firebase/app';
import { useEffect, useState } from 'react';
import Start from './components/start';
import Top from './components/top';

const App = () => {

    const [state, setState] = useState({ characters: null });

    useEffect(() => {
        firebase.firestore().collection('characters')
        .onSnapshot(serverUpdate => {
            // firebase will run this everytime the collection is updated
            const characters = serverUpdate.docs.map(_character => {
                const data = _character.data();
                data['id'] = _character.id;
                return data;
            });
            console.log(characters);
            setState({ characters: characters });
        });
    }, []);

    return (
        <>
            <Top />
            <div className="image">
                <img src="image.jpg" alt="tag the characters" />
            </div>
            <div id="modal" className="modal">
                <Start />
                {
                    // <Congratulations />
                    // <Scores />
                }
            </div>
        </>
    );
};

export default App;