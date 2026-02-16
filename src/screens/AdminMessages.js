import React, { useEffect, useState } from "react";
import { View, FlatList,StyleSheet } from 'react-native';
import { List, Card, Text, ActivityIndicator, Divider } from 'react-native-paper';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { auth, db } from "../configuracao/firebaseConfig";

export default function AdminMessages(){
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(!auth.currentUser) return;

        // Referência para a coleção global de sugestões
        const colRef = collection(db, 'suggestion');
        const q = query(colRef, orderBy('createdAt', 'desc'));

        // Monitorar mensagens em tempo real
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const list = [];
            snapshot.forEach((doc) => {
                list.push({...doc.data(), id: doc.id});
            })
            setMessages(list);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);


    if (loading) {
        return (
        <View style={styles.center}>
            <ActivityIndicator animating={true} color="#6200ee" size="large" />
        </View>
        );
    }

    return(
        <View style={styles.container}>
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                <Card style={styles.card}>
                    <Card.Content>
                    <List.Item
                        title={item.userEmail || "Usuário Anônimo"}
                        description={item.message}
                        descriptionNumberOfLines={10} // Para permitir ler mensagens longas
                        left={props => <List.Icon {...props} icon="email-outline" />}
                    />
                    <Text style={styles.date}>
                        {item.createdAt?.toDate().toLocaleString('pt-BR')}
                    </Text>
                    </Card.Content>
                </Card>
                )}
                ListEmptyComponent={
                <Text style={styles.empty}>Nenhuma sugestão recebida ainda. 📥</Text>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f5f5f5', 
    padding: 10 
},

  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
},

  card: { 
    marginBottom: 10, 
    elevation: 2 
},

  date: { 
    fontSize: 10, 
    color: '#888', 
    textAlign: 'right', 
    marginTop: 5 
},

  empty: { 
    textAlign: 'center', 
    marginTop: 50, 
    color: '#888' 
}

});