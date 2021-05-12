import React, {useState, useEffect} from 'react';
import {View, 
        ActivityIndicator, 
        Text, 
        ScrollView,
        Image,
        Platform,
        PermissionsAndroid,
        SafeAreaView,
        Modal} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-community/async-storage';
import {colors} from './../../../styles';
import Requisitions from './../../../Requisitions';
import DateUtils from './../../../utils/DateUtils';
import fundo from './../../../assets/images/azulEscuro.png';
import styles from './styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default function Main({navigation}) {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [filePath, setFilePath] = useState({});
  
    const requestPermissaoCamera = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Permissão camera',
              message: 'Permissão para usar a câmera',
            },
          );
          // PERMISSÃO CONCEDIDA PARA A CÂMERA
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
          console.warn(err);
          return false;
        }
      } else return true;
    };
  
    const requestPermissaoExternaStorage = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'External Storage Write Permission',
              message: 'App precisa de permissão para gravação',
            },
          );
          // PERMISSÃO PARA GRAVAÇÃO
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
          console.warn(err);
          alert('Erro de permissão', err);
        }
        return false;
      } else return true;
    };
  
    const captureImage = async (type) => {
      let options = {
        mediaType: type,
        saveToPhotos: true,
      };
      let isCameraPermitted = await requestPermissaoCamera();
      let isStoragePermitted = await requestPermissaoExternaStorage();
      if (isCameraPermitted && isStoragePermitted) {
        launchCamera(options, (response) => {
          console.log('Response = ', response);
  
          if (response.didCancel) {
            alert('Câmera cancelada');
            return;
          } else if (response.errorCode == 'camera_unavailable') {
            alert('Camera não disponível no dispositivo');
            return;
          } else if (response.errorCode == 'permission') {
            alert('Permissão não concedida para a câmera');
            return;
          } else if (response.errorCode == 'others') {
            alert(response.errorMessage);
            return;
          }
          console.log('base64 -> ', response.base64);
          console.log('uri -> ', response.uri);
          console.log('width -> ', response.width);
          console.log('height -> ', response.height);
          console.log('fileSize -> ', response.fileSize);
          console.log('type -> ', response.type);
          // console.log('fileName -> ', response.fileName);
          setFilePath(response);
        });
      }
    };
  
    const chooseFile = (type) => {
      let options = {
        mediaType: type,
        maxWidth: 300,
        maxHeight: 550,
        quality: 1,
      };
      launchImageLibrary(options, (response) => {
        console.log('Response = ', response);
  
        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        // console.log('base64 -> ', response.base64);
        // console.log('uri -> ', response.uri);
        // console.log('width -> ', response.width);
        // console.log('height -> ', response.height);
        // console.log('fileSize -> ', response.fileSize);
        // console.log('type -> ', response.type);
        // console.log('fileName -> ', response.fileName);
        setFilePath(response);
      });
    };

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const login = await AsyncStorage.getItem('loginSuprab');
    const parseLogin = JSON.parse(login);
    const response = await Requisitions.membro(parseLogin.cpf, parseLogin.cgp);
    if (response.ok) {
      const responseJson = await response.json();
      debugger;
      setIsLoading(false);
      setData(responseJson);
      debugger;
    }
  }

  return (
    <>
      {isLoading ? (
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            marginTop: 50,
          }}>
          <ActivityIndicator color={colors.AMARELO_SUPRAB} size="large" />
        </View>
      ) : (
        <View style={styles.container}>
          <ScrollView style={styles.containerDados}>
             <View style={styles.container1}>
                <Image
                  source={{
                    uri: 'data:image/jpeg;base64,' + filePath.data,
                  }}
                  style={styles.imageStyle}
                />
                <Image
                  source={{uri: filePath.uri}}
                  style={styles.containerProfiles}
                />
                
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={{ marginTop: 10,
                      flexDirection: 'row',
                      justifyContent: 'center',}}
                      onPress={() => chooseFile('photo')}>
                      <Entypo name="images" color={colors.WHITE} size={16} />
                      <Text style={styles.tituloFoto}>ALTERAR FOTO</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                      activeOpacity={0.5}
                      style={{ marginTop: 10,
                        flexDirection: 'row',
                        justifyContent: 'center',}}
                        onPress={() => captureImage('photo')}>
                        <Entypo name="camera" color={colors.WHITE} size={16} />
                      <Text style={styles.tituloFoto}>TIRAR UMA FOTO</Text>
                 </TouchableOpacity>

              </View>
            <View style={styles.containerDetalhe}>
              <Text style={styles.titulo}>{data.nome}</Text>
              <Text style={styles.tituloSub}>{data.cgp}</Text>
              {/* <MaterialCommunityIcons
              name="certificate-outline"
              color={colors.BLUE}
              size={25}
            />*/}
              <View style={styles.containerMigalha}>
                <View style={styles.containerTitulo}>
                  <Text style={styles.limiteTitulo}>Data Pessoais</Text>
                </View>
                <View style={styles.rowContainer}>
                  <Text style={styles.subTitulo}>CPF: </Text>
                  <Text style={styles.subTitulodata}>{data.cpf}</Text>
                </View>
                <View style={styles.rowContainer}>
                  <Text style={styles.subTitulo}>Data de Nascimento: </Text>
                  <Text style={styles.subTitulodata}>
                    {data.dataNascimento}
                  </Text>
                </View>
                <View style={styles.rowContainer}>
                  <Text style={styles.subTitulo}>Título Honorífico: </Text>
                  <Text style={styles.subTitulodata}>
                    {data.tituloHonorifico}
                  </Text>
                </View>
                <View style={styles.rowContainer}>
                  <Text style={styles.subTitulo}>Cargo: </Text>
                  <Text style={styles.subTitulodata}>{data.cargo}</Text>
                </View>
                <View style={styles.containerTitulo}>
                  <Text style={styles.limiteTitulo}>Endereço</Text>
                </View>
                <View style={styles.rowContainer}>
                  <Text style={styles.subTitulo}>Cidade: </Text>
                  <Text style={styles.subTitulodata}>
                    {data?.endereco?.cidade}
                  </Text>
                </View>
                <View style={styles.rowContainer}>
                  <Text style={styles.subTitulo}>UF: </Text>
                  <Text style={styles.subTitulodata}>{data?.endereco?.uf}</Text>
                </View>
                <View style={styles.containerTitulo}>
                  <Text style={styles.limiteTitulo}>Corpos filosóficos</Text>
                </View>
                {data?.corposFilosoficos?.map((value, index) => (
                  <>
                    <View style={styles.rowContainer}>
                      <Text style={styles.subTitulo}>{'Grau: '}</Text>
                      <Text style={styles.subTitulodata}>
                        {value.grau} - {value.dataGrau}
                      </Text>
                    </View>
                    <View style={styles.rowContainer}>
                      <Text style={styles.subTitulo}>{'Corpo: '}</Text>
                      <Text style={styles.subTitulodata}>{value.corpo}</Text>
                    </View>
                  </>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
}

