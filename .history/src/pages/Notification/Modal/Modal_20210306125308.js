/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Modal, View, Text, TouchableOpacity} from 'react-native';
import styles from './Modal.styles';
import { ScrollView } from 'react-native-gesture-handler';

export default class AprendaFavoritos extends React.PureComponent {
  render() {
    const {visible, onClose, data} = this.props;
    return (
      <Modal animationType="slide" transparent visible={visible}>
        <View style={styles.offset}>
          <View style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={onClose}
                style={styles.containerButtonClose}>
                <Text>X</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.title}>{data.titulo}</Text>
            <ScrollView>
              <Text style={styles.description}>{data.mensagem}</Text>
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  }
}
