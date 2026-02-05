import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { useMessage } from '../context/messageContext';

export function HelpMenu({ isVisible, onClose, onStartTutorial }){

    const [showSuggestionForm, setShowSuggestionForm] = useState(false);
    const [suggestion, setSuggestion] = useState('');
    const { showMessage } = useMessage();
    
    const handleSendSuggestion = () => {
        if(suggestion.trim().length < 5){
            showMessage("Por favor, escreva um pouco mais.", "error");
            return;
        }

        console.log("Sugestão enviada: ", suggestion);

        showMessage("Obrigado! Sugestão enviada do sucesso. ✨");
        setSuggestion('');
        setShowSuggestionForm(false);
        onClose();
    }

    return (
        <Modal visible={isVisible} transparent animationType='slide'>
            <View style={styles.overlay}>
                <View style={styles.menuContainer}>
                
                {!showSuggestionForm ? (
                    // OPÇÕES DO MENU
                    <>
                    <Text style={styles.menuTitle}>Como podemos ajudar?</Text>
                    
                    <TouchableOpacity style={styles.navButton} onPress={() => setShowSuggestionForm(true)}>
                        <Text style={styles.buttonText}>📝 Deixar Sugestão</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.navButton} onPress={() => {
                        onClose();
                        // Um tempo para fechar totalmente o modal anterior
                        setTimeout(() => {
                            onStartTutorial();
                        }, 300);
                    }}>
                        <Text style={styles.buttonText}>📖 Ver Tutorial</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                        <Text style={styles.closeText}>Fechar</Text>
                    </TouchableOpacity>
                    </>
                ) : (
                    // FORMULÁRIO DE SUGESTÃO
                    <View style={styles.form}>
                        <Text style={styles.menuTitle}>O que podemos melhorar?</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Sua ideia aqui..."
                            multiline
                            numberOfLines={4}
                            value={suggestion}
                            onChangeText={setSuggestion}
                        />
                        <View style={styles.row}>
                            <TouchableOpacity onPress={() => setShowSuggestionForm(false)}>
                            <Text style={styles.cancelText}>Voltar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.sendButton} onPress={handleSendSuggestion}>
                            <Text style={styles.sendButtonText}>Enviar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
overlay: { 
    flex: 1, 
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',  
},
  
menuContainer: { 
    backgroundColor: '#fff', 
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20, 
    padding: 25 
},

menuTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    textAlign: 'center', 
    color: '#333' 
},

navButton: { 
    backgroundColor: '#f5f5f5', 
    padding: 15, 
    borderRadius: 12, 
    marginBottom: 10, 
    alignItems: 'center' 
},

buttonText: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#06beaf' 
},

closeBtn: { 
    marginTop: 10, 
    padding: 10, 
    alignItems: 'center' 
},

closeText: {
     color: '#999', 
     fontWeight: 'bold' 
},

input: { 
    backgroundColor: '#f9f9f9', 
    borderRadius: 10, 
    padding: 15, 
    textAlignVertical: 'top', 
    marginBottom: 20, 
    borderWidth: 1, 
    borderColor: '#eee' 
},

row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
},

cancelText: { 
    color: '#ff5252', 
    fontWeight: 'bold' 
},
sendButton: { 
    backgroundColor: '#06beaf', 
    paddingVertical: 10, 
    paddingHorizontal: 25, 
    borderRadius: 10 
},

sendButtonText: { 
    color: '#fff', 
    fontWeight: 'bold' 
}

});