import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

var string = "https://www.google.com/maps/d/thumbnail?mid=1EqKfrjkhHAu0sLWW32BFla8s8Cs&hl=tr"
export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>My Furniture Adres</Text>
      <Text style={styles.mediumText}>Bahçelievler, I Blok, Ankara Ünv. 50. Yıl Kampüsü, 06830 Gölbaşı/Ankara      </Text>
      <Text style={styles.titleText}>Google Maps Önizlemesi</Text>
      <Image
        source={{ uri: string }}
        style={styles.image}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 400, // Ekran genişliğine uyacak şekilde ayarlanır
    height: 400, // Ekran yüksekliğine uyacak şekilde ayarlanır
    resizeMode: 'cover', // Resmi uygun şekilde yeniden boyutlandırır
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  mediumText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#888', // Gri renk için örnek bir renk kodu
  },
});