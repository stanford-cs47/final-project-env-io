import React from 'react';
import { StyleSheet, 
  Text, 
} from 'react-native';

export default class Username extends React.Component {
    
    state = {
        name: '',
    }

    render() {
        return(
            <Text>{this.state.name}</Text>
        );
    }
}