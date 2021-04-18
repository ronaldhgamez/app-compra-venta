import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello world</Text>
      <Image
        source={{ uri: 'https://picsum.photos/200/200' }}
        style={styles.image}
      />
      <TouchableOpacity
        onPress={() => Alert.alert('Hello')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Press me</Text>
      </TouchableOpacity>

    </View>
  )
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#292929" },
  title: { fontSize: 30, color: '#fff' },
  image: { height: 200, width: 200, borderRadius: 100 },
  button: {
    backgroundColor: 'cyan',
    padding: 8,
    marginTop: 10
  },
  buttonText: {
    color: 'black',
    fontSize: 20
  }
});

export default App;