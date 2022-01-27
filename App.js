import { useState } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

function renderKeypad(props) {
  const rows = [
    [1, 2, 3, '/'],
    [4, 5, 6, '*'],
    [7, 8, 9, '-'],
    [0, 'C', '=', '+']
  ];

  const rowsToRender = []
  rows.forEach((row, rowIndex) => {
    const keysToRender = [];
    row.forEach((key, keyIndex) => {
      keysToRender.push(
        <Key key={`key-${keyIndex}`} value={key} onKeyPress={props.onKeyPress}/>
      );
    });
    rowsToRender.push(
      <View style={styles.keypadRow} key={`row-${rowIndex}`}>{keysToRender}</View>
    );
  });
  return rowsToRender;
}

const Key = (props) => {
  return (
    <TouchableHighlight
      style={styles.key}
      underlayColor="#193441"
      onPress={() => props.onKeyPress(props.value)}
    >
      <Text style={styles.keyText}>{props.value}</Text>
    </TouchableHighlight>
  );
};

const Keypad = (props) => {
  return (
    <View style={styles.keypad}>{renderKeypad(props)}</View>
  );
};

export default function App() {
  const [input, setInput] = useState("");
  const [operator, setOperator] = useState("");
  const [prevInput, setPrevInput] = useState("");
  const [isInputResult, setIsInputResult] = useState(false);
  const onKeyPress = (key) => {
    if (isInputResult && key !== 'C') {
      return alert("Press C!")
    }
    if (typeof key === 'number') {
      setInput(input + key);
    } else if (key ===  '/' || key === '*' || key === '-' || key === '+') {
      if (!operator) {
        setOperator(key);
        setPrevInput(input);
        setInput("")
      }
    } else if (key === '=') {
      setInput(eval(prevInput + operator + input));
      setIsInputResult(true);
    } else {
      setPrevInput("");
      setInput("");
      setOperator("");
      setIsInputResult(false);
    }
  };

  return (
    <View style={styles.calculator}>
      <View style={styles.display}>
        <Text style={styles.displayText}>{input}</Text>
      </View>
      <Keypad onKeyPress={onKeyPress}/>
    </View>
  );
}

const styles = StyleSheet.create({
  calculator: {
    flex: 1,
  },
  display: {
    flex: 3,
    backgroundColor: 'rgb(25,51,66)',
    justifyContent: 'center',
  },
  displayText: {
    color: 'white',
    fontSize: 38,
    fontWeight: 'bold',
    textAlign: 'right',
    padding: 20
  },
  keypad: {
    flex: 7,
    backgroundColor: 'rgb(61,96,111)',
    flexDirection: 'column'
  },
  keypadRow: {
    flex: 1,
    flexDirection: 'row'
  },
  key: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#91AA9D',
  },
  keyText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white'
  }
});
