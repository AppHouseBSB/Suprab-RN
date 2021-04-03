;import { StyleSheet } from 'react-native';
import { colors, fonts } from '~/styles';

export default StyleSheet.create({
  offset: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  container: {
    margin: 20,
    padding: 16,
    backgroundColor: colors.WHITE,
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
    backgroundColor: colors.GRAY_LIGHT,
  },
  title: {
    color: colors.BLACK,
    fontSize: fonts.SUB_HEADER,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  description: {
    fontSize: fonts.TITLE,
    color: colors.GRAY_DARK,
    textAlign: 'center',
  },


});
