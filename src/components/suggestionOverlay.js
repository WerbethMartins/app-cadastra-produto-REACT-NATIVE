import { Modal, View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';

export function SuggestionOverlay({ isVisible }){

    const [suggestion, setSuggestion] = useState('');

    return(
        <Modal visible={isVisible} transparent animationType='fade'>
            <View style={styles.suggestionSection}>
               <TextInput
                style={styles.input}
                value={suggestion}
                placeholder='Deixe aqui sua sugestão'
               >
                </TextInput> 
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    suggestionSection: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 10
    },
    input: {
        height: 48,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 12,
        width: '100%'
    },
})