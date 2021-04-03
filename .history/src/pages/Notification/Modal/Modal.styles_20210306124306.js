import {StyleSheet} from 'react-native';
import {colors} from '../../../styles';
export default StyleSheet.create({
  offset: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  container: {
    width: '90%',
    height: '90%',
    marginLeft: '5%',
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  containerButtonClose: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  title: {
    color: colors.BLACK,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#DDD',
    textAlign: 'center',
  },
});
