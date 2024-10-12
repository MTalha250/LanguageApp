import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import { Button } from 'react-native-paper';
//@ts-ignore
import { useNavigation } from '@react-navigation/native';

const PairScreen = () => {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pair Your Buds</Text>
      <Text style={styles.subtitle}>
        Pair your TravelBuds earpiece for a personalised tour experience.
      </Text>
      <Image
        source={require('../../../assets/buds.png')}
        style={styles.image}
      />
            <Button
          style={{
            backgroundColor: '#DDB15D',
            borderRadius: 7,
            paddingVertical: 4,
            marginVertical: 5,
            width: '100%',
          }}
          onPress={() => {
            //@ts-ignore
            navigation.navigate('ConnectionScreen');
          }}>
          <Text
            style={{
              color: '#ffffff',
              fontWeight: 'bold',
              fontSize: 16,
            }}>
           Pair Now
          </Text>
        </Button>
        <Button
          style={{
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: '#DDB15D',
            borderRadius: 7,
            paddingVertical: 4,
            marginVertical: 5,
            width: '100%',
          }}
          onPress={() => {
            //@ts-ignore
            navigation.navigate('Home');
          }}>
          <Text
            style={{
              color: '#DDB15D',
              fontWeight: 'bold',
              fontSize: 16,
            }}>
          Continue without pairing
          </Text>
        </Button>
      <Text style={styles.footerText}>
        Download maps, find attractions & immerse in stories
      </Text>
    </View>
  );
};

export default PairScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    maxWidth: 330,
    marginBottom: 20,
  },
  image: {
    width: 280,
    height: 280,
    marginTop: 30,
    transform: [{rotate: '-20deg'}],
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#D4A15E', 
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 16,
    marginTop: 20,
    maxWidth: 300,
    color: '#666',
    textAlign: 'center',
  },
});
