/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Modal, View, Text, TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styles from './Modal.styles';
import DefaultButton from '~/components/DefaultButton/DefaultButton';
import { colors } from '~/styles';


export default class AprendaFavoritos extends React.PureComponent {
  render() {
    const {
      visible, title, description, onClose, onPressButton
    } = this.props;
    return (
      <Modal
        animationType="slide"
        transparent
        visible={visible}
      >
        <View style={styles.offset}>
          <View style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity onPress={onClose} style={styles.containerButtonClose}>
                <Icon name="x" color={colors.BLACK} size={20} />
              </TouchableOpacity>
            </View>
            <Text style={styles.title}>{title}</Text>
            <Text numberOfLines={2} style={styles.description}>{description}</Text>
            <DefaultButton
              description="Ok"
              containerStyle={{ marginTop: 30 }}
              onPress={onPressButton}
            />
          </View>
        </View>
      </Modal>
    );
  }
}
