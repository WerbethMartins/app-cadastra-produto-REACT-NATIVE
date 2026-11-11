import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

/* Popup de confirmação para comprar novamente */
export function BuyAgainQuestion({ isVisible, onClose, onChoose  }) {
    return (
        <Modal visible={isVisible} transparent animationType="fade" onRequestClose={onClose}>
            <View style={styles.overlay}>
                <View style={styles.bubble}>
                <Text style={styles.title}>Comprar este produto novamente?</Text>

                <TouchableOpacity
                    style={[styles.option, styles.yesButton]}
                    onPress={() => onChoose('yes')}
                >
                    <Text style={styles.optionText}>✅ Sim, comprar novamente</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.option, styles.noButton]}
                    onPress={() => onChoose('no')}
                >
                    <Text style={styles.optionText}>🚫 Não comprar novamente</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={onClose} style={styles.cancel}>
                    <Text style={styles.cancelText}>Cancelar</Text>
                </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}


const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    bubble: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
        width: '80%',
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 20,
    },
    option: {
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    yesButton: { 
        backgroundColor: '#E8F5E9' 
    },
    noButton: { 
        backgroundColor: '#FFEBEE' 
    },
    optionText: { 
        fontSize: 15, 
        fontWeight: '600', 
        color: '#111827' 
    },
    cancel: { 
        alignItems: 'center', 
        padding: 8 
    },
    cancelText: { 
        color: '#6B7280', 
        fontSize: 14 
    },
});
