import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Button from './src/components/Button'
import Display from './src/components/Display'

export default function App() {
  const [displayValue, setDisplayValue] = useState(0)
  const [clearDisplay, setClearDisplay] = useState(false)
  const [operation, setOp] = useState(null)
  const [numbers, setNumber] = useState([0,0])
  const [current, setCurrent] = useState(0)

  const addDigit = n => {
    if (n === '.' && displayValue.includes('.')) return
    if (n == 0 && displayValue == 0) return

    const clear = displayValue === '0' || clearDisplay
    const currentValue = clear ? '' : displayValue
    const newDisplayValue = displayValue === 0 ? n : currentValue + n
    setDisplayValue(newDisplayValue)
    setClearDisplay(false)

    if (n !== '.') {
        const newValue = parseFloat(newDisplayValue)
        const values = numbers
        values[current] = newValue
        setNumber(values)
    }
  }

  const clearMemory = () => {
    setDisplayValue(0)
    setClearDisplay(false)
    setOp(null)
    setNumber([0,0])
    setCurrent(0)
  }

  const setOperation = op => {
    if (current == 0) {
       setOp(op)
       setCurrent(1)
       setClearDisplay(true)
    } else {
        const equals = op === '='
        const values = numbers
        try {
            values[0] = eval(values[0] + operation + values[1])
        } catch (e) {
           values[0] = numbers[0]
        }

        values[1] = 0
        setDisplayValue(values[0])
        setOp(equals ? null : op)
        setCurrent(equals ? 0 : 1)
        //setClearDisplay(!equals)
        setClearDisplay(true)
        setNumber(values)
    }
  }

  return (
    <View style={styles.container}>
      <Display value={displayValue} />
      <View style={styles.buttons}>
        <Button label='AC' triple onClick={clearMemory} />
        <Button label='/' operation onClick={setOperation} />
        <Button label='7' onClick={addDigit} />
        <Button label='8' onClick={addDigit} />
        <Button label='9' onClick={addDigit} />
        <Button label='*' operation onClick={setOperation} />
        <Button label='4' onClick={addDigit} />
        <Button label='5' onClick={addDigit} />
        <Button label='6' onClick={addDigit} />
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
