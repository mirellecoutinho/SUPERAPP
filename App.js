import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

const App = () => {
  const [piadas, setPiadas] = useState([]);

  const buscarPiadas = async () => {
    try {
      const resposta = await axios.get('https://icanhazdadjoke.com/search', {
        headers: { Accept: 'application/json' },
      });
      setPiadas(resposta.data.results);
    } catch (erro) {
      console.log(erro);
    }
  };

  useEffect(() => {
    buscarPiadas();
  }, []);

  const renderizarCartaoPiada = ({ item }) => (
    <TouchableOpacity style={styles.cartao}>
      <Text style={styles.textoPiada}>{item.joke}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={piadas}
        renderItem={renderizarCartaoPiada}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.containerFlatList}
      />
      <Button title="Nova Piada" onPress={buscarPiadas} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  cartao: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  textoPiada: {
    fontSize: 16,
    textAlign: 'center',
  },
  containerFlatList: {
    paddingBottom: 20,
  },
});

export default App;
