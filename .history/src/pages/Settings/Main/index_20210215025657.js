import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from './../../../styles';
import Requisitions from './../../../Requisitions';
import styles from './styles';

export default function Main({navigation}) {
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  function enviarMsg() {
    setLoading(!loading);
  }

  async function getData() {
    const login = await AsyncStorage.getItem('loginSuprab');
    const parseLogin = JSON.parse(login);
    const response = await Requisitions.membro(parseLogin.cpf, parseLogin.cgp);
    if (response.status === 200) {
      const responseJson = await response.json();
      setData(responseJson);
      debugger;
    }
  }

  return (
    <View style={styles.container}>
      <View style={[styles.button, styles.buttonAccount]}>
        <View style={{marginTop: 30}} />
        <View style={styles.buttonText}>
          <Text style={styles.text}>TIPO DE SOLICITAÇÃ0</Text>
          <TouchableOpacity
            onPress={() => {}}
            style={[styles.input, {height: 55}]}>
            <AntDesign
              style={{ marginRight: 10}}
              name="caretdown"
              color="#606D7E"
              size={14}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonText}>
          <Text style={styles.text}>MENSAGEM</Text>
          <View style={[styles.input, {height: 300}]}>
            <TextInput
              multiline
              onChangeText={(txt) => {}}
              style={styles.textInput}
              placeholder="Digite sua mensagem"
            />
          </View>
        </View>
        <View style={styles.containerEntrar}>
          <TouchableOpacity
            onPress={() => enviarMsg()}
            style={styles.botaoEntrar}>
            {loading ? (
             <Text style={styles.textBotao}>ENVIAR</Text>
            ) : (
              <ActivityIndicator size="small" color={colors.AZUL_SUPRAB} />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.containerDev}>
        <Text style={styles.desenvolvido}>Desenvolvido por SUPRAB</Text>
      </View>
    </View>
  );
}
