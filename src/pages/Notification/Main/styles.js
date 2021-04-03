import {StyleSheet} from 'react-native';
import {colors} from './../../../styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.AZUL_SUPRAB,
    flex: 1,
  },
  tituloNoticias: {
    color: '#006EC7',
    fontSize: 20,
    fontWeight: 'bold',
  },
  containerDados: {
    marginTop: '20%',
    borderRadius: 15,
    marginBottom: 20,
    backgroundColor: colors.WHITE,
    flexDirection: 'column',
    alignItems: 'center',
  },
  containerNoticia: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 10,
    marginHorizontal: 10,
  },
  containerTipo: {
    height: 50,
    width: 50,
    marginLeft: 20,
    borderRadius: 25,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerData: {
    backgroundColor: colors.AMARELO_SUPRAB,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 20,
    borderRadius: 20,
    marginBottom: 10,
  },
  containerFundo: {},
  containerGeral: {
    marginTop: 10,
    marginBottom: 10,
    width: '90%',
    marginLeft: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#A1A1A1',
  },
  titulo: {
    fontSize: 16,
    color: colors.AMARELO_SUPRAB,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  descricao: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'justify',
    // fontFamily: 'Montserrat-Regular',
  },
});

export default styles;
