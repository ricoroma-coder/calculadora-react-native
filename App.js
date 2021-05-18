import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Button from './src/components/Button'
import Display from './src/components/Display'

export default function App() {

  const [value, setValue] = useState(0)
  const [operation, setOp] = useState('')

  const addDigit = n => {
    if (value == 0 && value.toString().length == 1) {
        if (n == '.') setValue(value + n.toString())
        else setValue(n)
    } else setValue(value + n.toString())
  }

  const clearMemory = () => {
    setValue(0)
  }

  const setOperation = operation => {
    setOp(operation)
  }

  return (
    <View style={styles.container}>
      <Display value={value} />
      <View style={styles.buttons}>
        <Button label='AC' triple onClick={clearMemory} />
        <Button label='/' operation onClick={setOperation} />
        <Button label='7' onClick={addDigit} />
        <Button label='8' onClick={addDigit} />
        <Button label='9' onClick={addDigit} />
        <Button label='*' operation onClick={setOperation} />
        <Button label='5' onClick={addDigit} />
        <Button label='6' onClick={addDigit} />
        <Button label='4' onClick={addDigit} />
        <Button label='-' operation onClick={setOperation} />
        <Button label='1' onClick={addDigit} />
        <Button label='2' onClick={addDigit} />
        <Button label='3' onClick={addDigit} />
        <Button label='+' operation onClick={setOperation} />
        <Button label='0' double onClick={addDigit} />
        <Button label='.' onClick={addDigit} />
        <Button label='=' operation onClick={setOperation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});
