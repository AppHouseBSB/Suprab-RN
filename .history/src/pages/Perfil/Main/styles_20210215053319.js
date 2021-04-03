import {StyleSheet} from 'react-native';
import {colors, fonts} from './../../../styles';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  text: {
    fontSize: fonts.TITLE,
    color: colors.BLACK,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textClique: {
    fontSize: fonts.TITLE,
    color: colors.GREEN,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  containerFundo: {
    width: '100%',
    height: '100%',
  },
  containerDados: {
    marginTop: '5%',
    marginHorizontal: '2%',
    height: '100%',
    borderRadius: 15,
    marginBottom: '5%',
    backgroundColor: colors.AZUL_SUPRAB,
    flexDirection: 'column',
  },
  containerUser: {
    height: 90,
    width: '100%',
    borderRadius: 100,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  containerAtivoPosicao: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  containerAtivo: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.GREEN,
    marginTop: -100,
    marginRight: 10,
  },
  containerProfiles: {
    backgroundColor: colors.GREY,
    borderRadius: 100,
    height: 90,
    width: 90,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerDetalhe: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  limiteTitulo: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  tituloSub: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  tituloFoto: {
    color: '#FFF',
    fontSize: 14,
    marginLeft: 5,
  },
  titulo: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  subTitulo: {
    color: '#fff',
    fontSize: 13,
  },
  subTituloDados: {
    color: '#fff',
    fontSize: 13,
  },
  containerMigalha: {
    marginTop: 10,
    marginLeft: 10,
    width: '100%',
    flexDirection: 'column',
  },
  rowContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  containerTitulo: {
    // borderBottomWidth: 1,
    // borderBottomColor: '#A1A1A1',
    marginTop: 20,
  },
});
