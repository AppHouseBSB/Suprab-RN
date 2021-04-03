import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
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
  const [loading, setLoading] = useState(false);
  const [tipo, setTipo] = useState([
    {nome: 'Sugestão'},
    {nome: 'Elogio'},
    {nome: 'Dúvida'},
    {nome: 'Reclamação'},
  ]);
  const [tipoSelecionado, setTipoSelecionado] = useState({nome: 'Sugestão'});
  const [indexSelecionado, setIndexSelecionado] = useState(0);
  const [isSelecionar, setIsSelecionar] = useState(false);
  const [descricao, setDescricao] = useState('');
  const [erro, setErro] = useState(false);
  const [msgErro, setMsgErro] = useState('');
  const [erroSucesso, setErroSucesso] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  async function enviarMsg() {
    setLoading(true);
    const body = {
      emailDestinatario: 'gustapereira@gmail.com',
      mensagem: `O colaborador ${data.nome}, CPF n. ${data.cpf}, CGP n. ${data.cgp}, enviou a seguinte ${tipoSelecionado.nome}: /n ${descricao}`,
      titulo: `${tipoSelecionado.nome} de ${data.nome}`,
    };
    const response = await Requisitions.sendMail(body);
    setDescricao('');
    setLoading(false);
    debugger;
    if (response.ok) {
      setErro(true);
      setMsgErro('E-mail enviado com sucesso!');
      setErroSucesso(true);
      setTimeout(() => {
        setErro(false);
      }, 1000);
    } else {
      setErro(true);
      setMsgErro('Não foi possível enviar o solicitação!');
      setErroSucesso(false);
      setTimeout(() => {
        setErro(false);
      }, 1000);
    }
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
            onPress={() => setIsSelecionar(!isSelecionar)}
            style={[styles.input, {height: 55, justifyContent: 'space-between'}]}>
            <Text style={{marginHorizontal: 10}}>{tipoSelecionado.nome}</Text>
            <AntDesign
              style={{ marginRight: 10}}
              name="caretdown"
              color="#606D7E"
              size={14}
            />
          </TouchableOpacity>
          {isSelecionar && (
            <View>
              {tipo.map((value, index) => (
                <TouchableOpacity
                  onPress={() => {
                    setIndexSelecionado(index);
                    setTipoSelecionado(value);
                    setIsSelecionar(!isSelecionar);
                  }}
                  style={{
                    width: '90%',
                    marginLeft: '5%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                  <Text style={{marginLeft: 15, marginVertical: 2, color: indexSelecionado === index && colors.AZUL_SUPRAB}}>
                    {value.nome}
                  </Text>
                  <AntDesign
                    style={{ marginRight: 15}}
                    name="check"
                    color={indexSelecionado === index && colors.AZUL_SUPRAB}
                    size={14}
                  />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        <View style={styles.buttonText}>
          <Text style={styles.text}>MENSAGEM</Text>
          <View style={[styles.input, {height: 300}]}>
            <TextInput
              multiline
              onChangeText={(txt) => setDescricao(txt)}
              style={styles.textInput}
              value={descricao}
              placeholder="Digite sua mensagem"
            />
          </View>
        </View>
        {erro && (
          <View style={[styles.containerErro, {backgroundColor: erroSucesso ? colors.AZUL_SUPRAB : 'red'}]}>
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
            onPress={() => enviarMsg()}
            style={styles.botaoEntrar}>
            {loading ? (
              <ActivityIndicator size="small" color={colors.AZUL_SUPRAB} />
            ) : (
              <Text style={styles.textBotao}>ENVIAR</Text>
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
