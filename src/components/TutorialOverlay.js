import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export function TutorialOverlay({ isVisible, stepData, onNext, onClose }){
    return(
        <Modal visible={isVisible} transparent animationType='fade'>
            <View style={styles.overlay}>
                <View style={styles.bubble}>
                    <Text style={styles.title}>{stepData?.title}</Text>
                    <Text style={styles.content}>{stepData?.content}</Text>

                    <View style={styles.footer}>
                        <TouchableOpacity onPress={onClose}>
                            <Text style={styles.skipText}>Pular</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.nextButton} onPress={onNext}>
                            <Text style={styles.nextButtonText}>Próximo</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: { 
        flex: 1, 
        backgroundColor: 'rgba(0,0,0,0.6)', 
        justifyContent: 'center', 
        alignItems: 'center' 
    },

    bubble: { 
        width: '80%', 
        backgroundColor: 'white', 
        borderRadius: 20, 
        padding: 20, 
        elevation: 10 
    },

    title: { 
        fontSize: 18, 
        fontWeight: 'bold', 
        marginBottom: 10, 
        color: '#06beaf' 
    },

    content: { 
        fontSize: 16, 
        color: '#444', 
        marginBottom: 20, 
        lineHeight: 22 
    },
  
    footer: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
    },

    skipText: { 
        color: '#999', 
        fontWeight: 'bold' 
    },
  
    nextButton: { 
        backgroundColor: '#06beaf', 
        paddingVertical: 8, 
        paddingHorizontal: 20, 
        borderRadius: 10 
    },
  
    nextButtonText: { 
        color: 'white', 
        fontWeight: 'bold' 
    }
});