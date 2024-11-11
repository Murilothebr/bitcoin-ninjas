import { View, Text, Button, StyleSheet } from 'react-native'
import { Card } from 'react-native-paper'

export default function about() {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>

        <Text style={styles.boldText}>
          Bitcoin Ninjas
        </Text>

        <Text style={styles.boldText}>
          Versao 1.0.1
        </Text>

        <Text style={styles.text}>
          Murilo Nunes Marcal
        </Text>

        <Text style={styles.text}>
        https://github.com/Murilothebr/bitcoin-ninjas/
        </Text>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '80%',
    alignSelf: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  boldText: {
    marginTop: 15,
    marginBottom: 10,
    color: "black",
    textAlign: "center",
    fontSize: 22,
    fontWeight: 'bold',
  },
  text: {
    marginTop: 15,
    marginBottom: 10,
    color: "grey",
    textAlign: "center",
    fontSize: 14
  }
});
