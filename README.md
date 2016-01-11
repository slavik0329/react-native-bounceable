<img src="https://zippy.gfycat.com/DimTeemingIraniangroundjay.gif"/>

#### Installation
To install:
```
npm install --save react-native-bounceable
```

#### Props
- `level: number`
  The maximum scale of the bounce animation (default: 1.1)
- `onPress: function`
  An optional function to be called after a press

### Example
```js
var Bounceable = require("react-native-bouceable");

render() {
  return <Bounceable
            onPress={()=>console.log("Pressed!")}
            level={1.1}>
            <View>
              <Text>Click Me!</Text>
            </View>
  </Bounceable>
}
```
