import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function PrimeiroComponente() {


  return (
    <View style={styles.containerVermelho}>
      <Text style={styles.textoGrande}>Primeiro Componente</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  containerVermelho: {
    backgroundColor: 'red',
    padding: 20,
    borderWidth: 10
  },
  textoGrande: {
    fontSize: 20,
    fontWeight: 600
  }
})