import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, ToastAndroid } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as SMS from 'expo-sms';


export default function ModalScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      console.log(status);
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ _type, data }:any ) => {
    setScanned(true);
    var values = '';
    values = data.split(',')

    const isAvailable = await SMS.isAvailableAsync();
      if (isAvailable) {
        ToastAndroid.show('Cargando...', ToastAndroid.SHORT);

        await SMS.sendSMSAsync(
          ['4066'],
          'PASE ' + values[1] + ' ' + values[0] + ' Recibir dinero',
        );

      } else {
        ToastAndroid.show('SMS no disponible en este dispositivo.', ToastAndroid.LONG);
      }

  };

  if (hasPermission === null) {
    return <Text>Esperando permisos de la cámara</Text>;
  }
  if (hasPermission === false) {
    return <Text>No hay accesos a la cámara</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Escanear de nuevo'} onPress={() => setScanned(false)} />}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});