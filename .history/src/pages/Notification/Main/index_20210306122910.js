import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Requisitions from './../../../Requisitions';
import DateUtils from './../../../utils/DateUtils';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from './../../../styles';
// import fundo from './../../../assets/images/azulEscuro.png';
import Modal from './../Modal/Modal';

import styles from './styles';

export default function Main() {
  const [isLoading, setIsLoading] = useState(true);
  const [showModalData, setShowModalData] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [dados, setDados] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const response = await Requisitions.listNovidade();
    if (response.status === 200) {
      const data = await response.json();
      const noticias = [];
      await data.map(async (item) => {
        // const noticia = {
        //   ...item,
        //   dataNoticia: await ajusteDateData(item.dataNotificacao),
        // };
        noticias.push(item);
      });
      setDados(noticias);
      setIsLoading(false);
    }
  }

  async function ajusteDateData(item) {
    const itemMsg = await DateUtils.monthDay(item);
    return itemMsg;
  }

  async function renderContent(value) {
    // const dataNoticia = await ajusteDateData(value.dataNotificacao);
    // if (!value) return <Text> teste </Text>;
    debugger;
    return (
      <View style={styles.containerNoticia}>
        <View style={styles.containerData}>
          <Text>{value.dataNotificacao}</Text>
        </View>
        <Text style={styles.titulo}>{value.titulo}</Text>
        <Text numberOfLines={5} style={styles.descricao}>
          {value.mensagem}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          marginTop: 10,
          height: 50,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
        }}>
        <Text
        // eslint-disable-next-line react-native/no-inline-styles
          style={{
            color: '#fff',
            fontSize: 16,
            fontWeight: 'bold',
            marginRight: 10,
          }}>
          NOTIFICAÇÃO
        </Text>
      </View>
      <ScrollView>
        {isLoading ? (
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              marginTop: 50,
            }}>
            <ActivityIndicator color={colors.AMARELO_SUPRAB} size="large" />
          </View>
        ) : (
          <>
            {dados.map((value, index) => (
              <TouchableOpacity
                onPress={() => {
                  setModalData(value);
                  setShowModalData(true);
                }}
                style={styles.containerGeral}>
                {/* {renderContent(value)} */}
                <View style={styles.containerNoticia}>
                  <View style={styles.containerData}>
                    <Text>{value.dataNotificacao}</Text>
                  </View>
                  <Text style={styles.titulo}>{value.titulo}</Text>
                  <Text numberOfLines={5} style={styles.descricao}>
                    {value.mensagem}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}
        <Modal
          visible={showModalData}
          onClose={() => setModalData(false)}
          data={modalData}
        />
      </ScrollView>
      {/* <View style={{marginBottom: 200}} /> */}
    </View>
  );
}
