import { createContext, useState, useContext } from 'react';
import { Modal, View, Text, StyleSheet, Animated } from 'react-native';

const MessageContext = createContext();

export function MessageProvider({ children }) {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('success'); // 'success' ou 'error'

  const showMessage = (text, messageType = 'success', duration = 2000) => {
    setMessage(text);
    setType(messageType);
    setVisible(true);

    // Esconde automaticamente após o tempo definido
    setTimeout(() => {
      setVisible(false);
    }, duration);
  };

  return (
    <MessageContext.Provider value={{ showMessage }}>
      {children}
      
      {/* O componente de Modal fica por cima de tudo */}
      <Modal visible={visible} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={[styles.container, type === 'error' ? styles.error : styles.success]}>
            <Text style={styles.text}>{message}</Text>
          </View>
        </View>
      </Modal>
    </MessageContext.Provider>
  );
}

export const useMessage = () => useContext(MessageContext);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
    backgroundColor: 'transparent',
  },
  
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    minWidth: '80%',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  success: { backgroundColor: '#06beaf' },
  error: { backgroundColor: '#ff5252' },
  text: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
});