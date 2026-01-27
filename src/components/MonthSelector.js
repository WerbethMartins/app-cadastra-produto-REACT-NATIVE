import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useProduct } from '../context/productContext';

const monthsNames = [
  "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
  "Jul", "Ago", "Set", "Out", "Nov", "Dez"
];

export function MonthSelector() {
  const { selectedMonth, setSelectedMonth } = useProduct();

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {monthsNames.map((month, index) => (
          <TouchableOpacity
            key={month}
            style={[
              styles.monthButton,
              selectedMonth === index && styles.activeButton
            ]}
            onPress={() => {
               // console.log("Mês clicado:", index);
               setSelectedMonth(index) 
            }}
          >
            <Text style={[
              styles.monthText,
              selectedMonth === index && styles.activeText
            ]}>
              {month}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  scrollContent: {
    paddingHorizontal: 15,
  },
  monthButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    width: 'auto',
    height: '220px',
    backgroundColor: '#f0f0f0',
  },
  activeButton: {
    backgroundColor: '#6200ee',
  },
  monthText: {
    color: '#666',
    fontWeight: 'bold',
  },
  activeText: {
    color: '#fff',
  },
});