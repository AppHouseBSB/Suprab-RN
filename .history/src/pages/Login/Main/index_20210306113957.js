import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  ActivityIndicator,
  Alert
} from 'react-native';
import Requisitions from './../../../Requisitions';
import AsyncStorage from '@react-native-community/async-storage';
import logo from './../../../assets/icons/logo.png';
import {colors} from './../../../styles';
import styles from './styles';

export default function Login({navigation}) {
  const [saveLogin, setSaveLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState(false);
  const [msgErro, setMsgErro] = useState('Teste');
  const [cpf, setCpf] = useState('');
  const [cgp, setCgp] = useState('');

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const login = await AsyncStorage.getItem('loginSuprab');
    const parseLogin = JSON.parse(login);
    debugger;
    if (parseLogin?.manterConectado) {
      setCpf(parseLogin.cpf);
      setCgp(parseLogin.cgp);
      setSaveLogin(true);
      setIsLoading(true);
      setTimeout(() => {
        routeDashBoard(parseLogin.cpf, parseLogin.cgp);
      }, 1000);
    }
  }

  async function setData() {
    const body = {
      cpf,
      cgp,
      manterConectado: saveLogin,
    };
    debugger;
    AsyncStorage.setItem('loginSuprab', JSON.stringify(body));
    setIsLoading(false);
  }

  async function routeDashBoard(itemCPF = cpf, itemCGP = cgp) {
    setIsLoading(true);
    if (!itemCPF.length && !itemCGP.length) {
      setMsgErro('É obrigatório informar o CPF e o CGP!');
      setErro(true);
      setTimeout(() => {
        setIsLoading(false);
        setErro(false);
      }, 500);
    } else {
      const response = await Requisitions.membro(itemCPF, itemCGP);
      setIsLoading(false);
      if (response.ok) {
        // setData();
        const data = await response.json();
        navigation.navigate('Dashboard', {item: data});
      } else {
        Alert.alert(JSON.stringify(response));
        setMsgErro('CPF e/ou CGP inválido(s)!');
        setErro(true);
        setTimeout(() => {
          setErro(false);
        }, 1000);
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={[styles.button, styles.buttonAccount]}>
        <View style={styles.containerImg}>
          <View style={styles.containerImagem}>
            <Image style={styles.imagem} source={logo} resizeMode="contain" />
          </View>
        </View>
        <View style={{marginTop: 30}} />
        <View style={styles.buttonText}>
          <Text style={styles.text}>CPF</Text>
          <View style={styles.input}>
            <TextInput
              onChangeText={(text) => {
                setCpf(text);
                setErro(false);
              }}
              keyboardType="numeric"
              value={cpf}
              style={styles.textInput}
              placeholder="Digite sua CPF"
              maxLength={11}
            />
          </View>
        </View>
        <View style={styles.buttonText}>
          <Text style={styles.text}>CGP</Text>
          <View style={styles.input}>
            <TextInput
              onChangeText={(text) => {
                setCgp(text);
                setErro(false);
              }}
              keyboardType="numeric"
              value={cgp}
              style={styles.textInput}
              placeholder="Digite sua CGP"
              maxLength={10}
            />
          </View>
        </View>
        <View style={styles.containerConexao}>
          {saveLogin ? (
            <TouchableOpacity
              onPress={() => {
                setIsLoading(true);
                setSaveLogin(!saveLogin);
                setData();
              }}>
              <View style={styles.barraAtivo}>
                <View style={styles.bolAtivo} />
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setIsLoading(true);
                setSaveLogin(!saveLogin);
                setData();
              }}>
              <View style={styles.barra}>
                <View style={styles.bol} />
              </View>
            </TouchableOpacity>
          )}
          <Text style={styles.textConexao}>Me manter conectado no app</Text>
        </View>
        {erro && (
          <View style={styles.containerErro}>
            <Text
              style={{
                color: colors.WHITE,
                fontSize: 16,
                fontWeight: 'bold'
              }}>
                {msgErro}
            </Text>
          </View>
        )}
        <View style={styles.containerEntrar}>
          <TouchableOpacity
            onPress={() => routeDashBoard(cpf, cgp)}
            style={styles.botaoEntrar}>
            {isLoading ? (
              <ActivityIndicator color={colors.AZUL_SUPRAB} size="small" />
            ) : (
              <Text style={styles.textBotao}>ENTRAR</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.containerDev}>
        <Text style={styles.desenvolvido}>Desenvolvido por SUPRAB</Text>
      </View>
    </View>
  );
  // return <View style={{backgroundColor: 'red'}} />;
}
