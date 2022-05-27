import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Image, Text, View, TouchableOpacity, TextInput , ToastAndroid } from 'react-native';
import SvgQRCode from 'react-native-qrcode-svg';
import Modal from "react-native-modal";


const sinpeMovil= require("../assets/images/sinpe-movil-2.png");

const TabTwoScreen = () => {
    const [phone, setPhone] = useState('')
    const [amount, setAmount] = useState('')
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [urlSection, setUrlSection] = useState('')

    const onHandleLogin = () => {
      if (phone === '' ) {
          ToastAndroid.show('Número de teléfono es requerido.', ToastAndroid.SHORT);
         return;
      }

      if (amount === '') {
        ToastAndroid.show('Monto es requerido.', ToastAndroid.SHORT);
        return;
      }

      setUrlSection(phone+ ','+amount)

      setIsModalVisible(() => !isModalVisible)


    }

  return (
    <View style={styles.container}>
        <Image source={sinpeMovil} style={styles.backImage} />
        <View style={styles.whiteSheet} />
        <SafeAreaView style={styles.form}>
          <Text style={styles.title}> Generar QR </Text>
          <View style={{marginVertical:20, flexDirection:'row', alignItems: 'center', alignSelf: 'center'  }}>
              <Text style={{color:'gray', fontWeight:'600', fontSize:14}} > Ingrese los datos a continuación para generar un código qr</Text>
          </View>

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
            autoFocus={false}
            keyboardType="decimal-pad"
            value={amount}
            onChangeText={(text) => setAmount(text)}
            />

            <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
              <Text style={{fontWeight: 'bold', color: 'white', fontSize:18 }}> Generar QR </Text>
            </TouchableOpacity>
        </SafeAreaView>

        <Modal style={styles.containerModal} isVisible={isModalVisible}>
              <View style={styles.form} >
                <Text style={styles.title}>Escanear Código!</Text>
                <SvgQRCode size={300} value={urlSection}/>
                <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
                  <Text style={{fontWeight: 'bold', color: 'white', fontSize:18 }}> Cerrar </Text>
                </TouchableOpacity>
              </View>
            </Modal>
    </View>
  )
}

export default TabTwoScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 36,
      fontWeight: 'bold',
      color: '#2062ac',
      alignSelf: 'center',
      paddingBottom: 14,
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
    box: {
      width: 60,
      alignItems: 'center',
      backgroundColor: '#ecf0f1',
    },
    containerModal: {
      backgroundColor: '#fff',
      borderRadius: 10,
    }
  });