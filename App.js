import { StyleSheet, Text, View } from 'react-native';

function renderKeypad() {
  const rows = [
    [1, 2, 3, '/'],
    [4, 5, 6, '*'],
    [7, 8, 9, '-'],
    [0, '.', '=', '+']
  ];

  const rowsToRender = []
  rows.forEach((row, rowIndex) => {
    const keysToRender = [];
    row.forEach((key, keyIndex) => {
      keysToRender.push(
       <Key key={`key-${keyIndex}`} value={key} />
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
    <View style={styles.key}>
      <Text style={styles.keyText}>{props.value}</Text>
    </View>
  );
};

const Keypad = () => {
  return (
    <View style={styles.keypad}>{renderKeypad()}</View>
  );
};

export default function App() {
  return (
    <View style={styles.calculator}>
      <View style={styles.screen}></View>
      <Keypad />
    </View>
  );
}

const styles = StyleSheet.create({
  calculator: {
    flex: 1,
  },
  screen: {
    flex: 3,
    backgroundColor: 'rgb(25,51,66)'
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
