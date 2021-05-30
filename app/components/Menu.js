import React from 'react';
import {
    Text
} from 'react-native'

export default class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: props.object.user,
        }
    }

    /* useEffect(() => {
        const ronaldhg = 'ronaldhg';

        async function fetchUsers(username) {
            return await getUserCollections(username);    
        }

        console.log(fetchUsers(ronaldhg));
    },[]); */
    
    render() {
        return (
            <>
                <Text style={{ textAlign: 'center', marginTop: '50%', fontSize: 25 }}>Menu</Text>
            </>
        );
    }
};