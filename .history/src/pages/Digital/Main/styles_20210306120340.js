import {StyleSheet, Dimensions} from 'react-native';
import {colors} from './../../../styles';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerDigital: {
    height: SCREEN_WIDTH * 0.9,
    width: SCREEN_HEIGHT * 0.9,
    // height: '100%',
    // width: '100%',
    transform: [{rotate: '90deg'}],
    resizeMode: 'cover',
    marginTop: 150,
    marginLeft: -150,
  },
  containerFoto: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  card: {
    height: SCREEN_WIDTH * 0.9,
    width: SCREEN_HEIGHT * 0.8,
    backgroundColor: colors.BLUE,
    // backgroundColor: '#006EC7',
    borderRadius: 20,
    transform: [{rotate: '90deg'}],
    padding: 16,
  },
  title: {
    color: '#FFF',
    fontWeight: 'bold',
    marginTop: 9,
  },
  description: {
    color: '#000',
    fontWeight: 'bold',
  },
  profile: {
    position: 'absolute',
    top: 16,
    left: 16,
    height: 170,
    width: 110,
    backgroundColor: 'white',
  },
  profileImage: {
    width: null,
    height: null,
    flex: 1,
    resizeMode: 'cover',
  },

  qrCode: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    height: 150,
    width: 150,
    backgroundColor: 'white',
  },
  containerLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stripe: {
    height: 25,
    marginTop: 10,
    width: 200,
    backgroundColor: '#FFF',
  },
});

