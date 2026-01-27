import { useProduct } from "../context/productContext";
import { View, Text,  StyleSheet} from "react-native";

export function HeaderSummary(){
    const { totalValue, totalItems} = useProduct();

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.description}>
                    <Text style={styles.label}>Total em Estoque: </Text>
                    <Text style={styles.subLabel}>{totalItems} itens cadastrados</Text>
                </View>
                <Text style={styles.value}>
                    {totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
    width: '100%',
  },

  card: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderRadius: 15,
    backgroundColor: '#792be6',
    padding: 20,
    width: '100%',
    elevation: 5, // Sombra no Android
    shadowColor: '#000', // Sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  label: {
    color: '#d1d1d1',
    fontSize: 14,
    fontWeight: 'bold',
  },

  value: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },

  subLabel: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.8,
  },
  
});