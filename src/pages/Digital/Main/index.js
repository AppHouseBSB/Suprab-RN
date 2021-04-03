/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, ImageBackground, Image, Dimensions} from 'react-native';
import Swiper from 'react-native-swiper';
import styles from './styles';
import frente from './../../../assets/images/SUPRAB-CarteiraAssociado-Frente.png';
import verso from './../../../assets/images/SUPRAB-CarteiraAssociado-Verso.png';
import {colors} from './../../../styles';

const Title = ({children}) => {
  return (
    <Text allowFontScaling={false} style={styles.title}>
      {children}
    </Text>
  );
};

const Description = ({children}) => {
  return (
    <Text allowFontScaling={false} style={styles.description}>
      {children}
    </Text>
  );
};

const context = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.profile}>
          <Image
            style={styles.profileImage}
            source={{
              uri:
                'https://lh3.googleusercontent.com/proxy/zZGb4V7Na1O-4ZxH3IreZQ5GfKxdVUAIvkuBGY3FwNC7XnSu20dsgeDvogrFFR75hRkyzrE2hV-CDdoa63k22BvJCg',
            }}
          />
        </View>
        <View style={{marginLeft: 130}}>
          <View style={styles.containerLine}>
            <View>
              <Title>CIM</Title>
              <Description>129583</Description>
            </View>
            <View>
              <Title>STATUS</Title>
              <Description>MI</Description>
            </View>
            <View>
              <Title>LOJA/Lodge</Title>
              <Description>1139</Description>
            </View>
            <View>
              <Title>Atualizado em</Title>
              <Description>21/09/2019</Description>
            </View>
          </View>

          <Title>NOME/Name</Title>
          <Description>MÚCIO BONIFÃCIO GUIMARÃƒES</Description>
          <Title>NOME da loja/LODAGE'S NAME</Title>
          <Description>ESTRELLA RIOVERDENSE</Description>

          <View style={[styles.containerLine, {marginRight: 80}]}>
            <View>
              <Title>CIDADE / City</Title>
              <Description>RIO VERDE</Description>
            </View>
            <View>
              <Title>UF</Title>
              <Description>GO</Description>
            </View>
          </View>
        </View>

        <View style={{marginRight: 166}}>
          <View style={styles.containerLine}>
            <View>
              <Title>C.P.F</Title>
              <Description>021.135.461-91</Description>
            </View>
            <View>
              <Title>DATA DE NASCIMENTO / Birth Date</Title>
              <Description>26/10/1947</Description>
            </View>
            <View>
              <Title>SANGUE / Blood</Title>
              <Description>B</Description>
            </View>
          </View>

          <Title>TÍTULO HONORÍFICO / Courtesy Title</Title>
          <Description>CRUZ PERFIÇÃO MAÇONICA</Description>
          <Title>CARGO / Rank</Title>
          <Description>GRÃU-MESTRE GERAL</Description>

          <View style={styles.containerLine}>
            <View style={styles.stripe} />
            <View>
              <Title>A</Title>
              <Description>03588</Description>
            </View>
            <View>
              <Title>A</Title>
              <Description>03588</Description>
            </View>
            <View>
              <Title>A</Title>
              <Description>03588</Description>
            </View>
            <View>
              <Title>A</Title>
              <Description>03588</Description>
            </View>
            <View>
              <Title>A</Title>
              <Description>03588</Description>
            </View>
          </View>
        </View>
        <View style={styles.qrCode} />
      </View>
    </View>
  );
};

const Card = () => {
  const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
  // debugger;
  return (
    <Swiper
      // key={featuredEvents.length}
      // onIndexChanged={(index) => { this.onIndexChanged(index, anim); }}
      // autoplay
      autoplayTimeout={3}
      // style={styles.wrapper}
      dotColor="#ffffff"
      // paginationStyle={Styles.swiperPaginationStyle}
      activeDotColor={colors.AMARELO_SUPRAB}
      loop>
      <View>
        <ImageBackground style={styles.containerDigital} source={frente} />
      </View>
      <View>
        <ImageBackground style={styles.containerDigital} source={verso} />
      </View>
      {/* {this.context()} */}
    </Swiper>
  );
};

export default Card;
