import { createContext, useState, useEffect } from "react";
import firebase from 'firebase/app';

export const GameContext = createContext();

export const GameProvider = (props) => {

    const [state, setState] = useState({
        gameOver: false,
        player: {
            name: 'Anonymous',
            startTime: null,
            endTime: null,
        },
        characters: null,
    });

    useEffect(() => {
        firebase.firestore().collection('characters')
            .onSnapshot(serverUpdate => {
                // firebase will run this everytime the collection is updated
                const characters = serverUpdate.docs.map(_character => {
                    const data = _character.data();
                    data['id'] = _character.id;
                    return data;
                });
                setState(prevState => {
                    return {
                        ...prevState,
                        characters: characters,
                    };
                });
            });
    }, []);

    return (
        <GameContext.Provider value={[state, setState]}>
            {props.children}
        </GameContext.Provider>
    );
};

