import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Image, Text, View, TouchableOpacity, TextInput , ToastAndroid } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import * as SMS from 'expo-sms';


const backImage = require("../assets/images/background.png")
const sinpeMovil= require("../assets/images/sinpe-movil-logo.png")

const TabOneScreen = () => {
    const [phone, setPhone] = useState('')
    const [description, setDescription] = useState('')
    const [amount, setAmount] = useState('')
    const [bank, setBank] = useState('Seleccione Banco');

    const onHandleLogin = async () => {
      if (phone === '' ) {
          ToastAndroid.show('Número de teléfono es requerido.', ToastAndroid.SHORT);
         return;
      }

      if (amount === '') {
        ToastAndroid.show('Monto es requerido.', ToastAndroid.SHORT);
        return;
      }

      if (description === '') {
          ToastAndroid.show('Motivo es requerido.', ToastAndroid.SHORT);
        return;
      }

      if (bank === 'Seleccione Banco'){
        ToastAndroid.show('Ingresar banco de preferencia es requerido.', ToastAndroid.SHORT);
        return;
      }

      const isAvailable = await SMS.isAvailableAsync();
      if (isAvailable) {
        ToastAndroid.show('Cargando...', ToastAndroid.SHORT);

        await SMS.sendSMSAsync(
          [bank],
          'PASE ' + amount + ' ' + phone + ' ' + description ,
        );
      } else {
        ToastAndroid.show('SMS no disponible en este dispositivo.', ToastAndroid.LONG);
      }

    }

  return (
    <View style={styles.container}>
        <Image source={backImage} style={styles.backImage} />
        <View style={styles.whiteSheet} />
        <SafeAreaView style={styles.form}>
          <Image source={sinpeMovil} style={styles.sinpeMovil} />
          <TextInput 
            style={styles.input} 
            placeholder="Número de telêfono"
            autoCapitalize='none'
            autoFocus={true}
            value={phone}
            keyboardType="numeric"
            onChangeText={(text) => setPhone(text)}
            />

          <TextInput 
            style={styles.input} 
            placeholder="Monto"
            autoCapitalize='none'
            autoFocus={true}
            keyboardType="decimal-pad"
            value={amount}
            onChangeText={(text) => setAmount(text)}
            />

          <TextInput 
            style={styles.input} 
            placeholder="Descripción"
            autoCapitalize='none'
            autoFocus={true}
            value={description}
            onChangeText={(text) => setDescription(text)}
            />

        <View style={styles.picker}>
          <Picker
            selectedValue={bank}
            onValueChange={(value, _index) => setBank(value)}
            mode="dropdown" // Android only
            
          >
            <Picker.Item label="Ingrese su banco de preferencia" value="Seleccione Banco" />
            <Picker.Item label="BCR" value="4066" />
            <Picker.Item label="BAC" value="70701222" />
            <Picker.Item label="BN" value="2627" />
          </Picker>
        </View>

            <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
              <Text style={{fontWeight: 'bold', color: 'white', fontSize:18 }}> Enviar </Text>
            </TouchableOpacity>
            <View style={{marginTop:20, flexDirection:'row', alignItems: 'center', alignSelf: 'center'  }}>
              <Text style={{color:'gray', fontWeight:'600', fontSize:14}} > SINPE Móvil es un servicio de mensajería de texto SMS</Text>
            </View>
        </SafeAreaView>
    </View>
  )
}

export default TabOneScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 36,
      fontWeight: 'bold',
      color: 'orange',
      alignSelf: 'center',
      paddingBottom: 24,
      backgroundColor: '#fff',
      borderRadius: 10,
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    input: {
      backgroundColor: '#F6F7FB',
      height:58,
      marginBottom: 20,
      fontSize: 16,
      borderRadius: 10,
      padding:12
    },
    backImage: {
      width: '100%',
      height: 340,
      position: 'absolute',
      top: 0,
      resizeMode: 'cover'
    },
    sinpeMovil: {
      backgroundColor: '#fff',
      width: '50%',
      height: 100,
      alignSelf: 'center',
      marginBottom: 30
    },
    whiteSheet: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      bottom: 0,
      backgroundColor: '#fff',
      borderTopLeftRadius: 0
    },
    form: {
      flex: 1,
      justifyContent: 'center',
      marginHorizontal: 30,
    },
    button: {
      backgroundColor: '#2062ac',
      height: 58,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40
    },
    text: {
      fontSize: 14,
    },
    picker: {
      height:58,
      marginBottom: 20,
      fontSize: 16,
      borderRadius: 10,
      padding:5,
      backgroundColor: '#F6F7FB',
    }
  });