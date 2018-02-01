import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import * as Svg from "react-native-svg";
const font = {
    fontFamily: 'Consolas',
    fontSize: '10',
    fontWeight: '700',
};
const App = () => (<FlatList style={StyleSheet.absoluteFill} horizontal renderItem={e => e.item} keyExtractor={(_, index) => index.toString()} data={[
    <DemoPath Path={Svg.Rect} pathProps={{ x: 2, y: 2, width: 96, height: 96 }}/>,
    <DemoPath Path={Svg.Circle} pathProps={{ cx: 50, cy: 50, r: 48 }}/>,
    <DemoPath Path={Svg.Path} pathProps={{ d: "M25 10 L98 65 L70 25 L16 77 L11 30 L0 4 L90 50 L50 10 L11 22 L77 95 L20 25" }}/>,
    <DemoPath Path={Svg.Text} pathProps={{
        font,
        children: (<React.Fragment>
              <Svg.TSpan x={10} y={30}>Hello</Svg.TSpan>
              <Svg.TSpan x={10} y={60}>World</Svg.TSpan>
            </React.Fragment>)
    }}/>,
    <DemoPath Path={Svg.Use} pathProps={{ href: '#x', width: '100', height: '100' }} defs={<React.Fragment>
            <Svg.G id='x'>
              <Svg.Rect x={20} y={20} width={60} height={60} fill="yellow" stroke="green" strokeWidth={2}/>
              <Svg.Circle cx={50} cy={50} r={38} fill="red" stroke="blue" strokeWidth={2}/>
            </Svg.G>
          </React.Fragment>}/>,
]}/>);
export { App as default };
const DemoPath = (props) => (<View style={styles.demoPath}>
    <Text style={styles.demoPathName}>{props.Path.displayName}</Text>
    <FlatList keyExtractor={(_, index) => index.toString()} numColumns={3} data={fillStrokePropsList} renderItem={e => <DemoPathItem {...props} {...e.item}/>}/>
  </View>);
const DemoPathItem = ({ Path, pathProps, defs, strokeProps, fillProps }) => (<Svg.Svg width={100} height={100} style={styles.demoPathItem}>
    <Svg.Defs>
      <Svg.LinearGradient id="g1">
        <Svg.Stop offset="0" stopColor="red"/>
        <Svg.Stop offset="1" stopColor="blue"/>
      </Svg.LinearGradient>
      <Svg.RadialGradient id="g2" cx={0} r={100}>
        <Svg.Stop offset="0" stopColor="green"/>
        <Svg.Stop offset="1" stopColor="yellow"/>
      </Svg.RadialGradient>
      {defs}
    </Svg.Defs>
    <Path {...pathProps} {...strokeProps} {...fillProps}/>
  </Svg.Svg>);
const strokePropsList = [
    {},
    { stroke: 'red' },
    { stroke: 'blue', strokeDasharray: [2, 4], strokeWidth: 4 },
    { stroke: 'url(#g1)', strokeWidth: 2 },
    { stroke: 'url(#g2)', strokeWidth: 4, strokeLinejoin: 'bevel' },
];
const fillPropsList = [
    { fill: 'none' },
    { fillRule: 'evenodd' },
    { fill: 'red', fillOpacity: 0.5 },
    { fill: 'url(#g1)' },
    { fill: 'url(#g2)' },
];
const fillStrokePropsList = flatMap(fillPropsList, fillProps => (strokePropsList.map((strokeProps) => ({ fillProps, strokeProps }))));
function flatMap(left, select) {
    const result = [];
    for (const item of left) {
        result.push(...select(item));
    }
    return result;
}
const styles = StyleSheet.create({
    demoPath: {
        width: 360,
    },
    demoPathName: {
        fontSize: 20,
        textAlign: 'center',
    },
    demoPathScroll: {
        flex: 1,
    },
    demoPathContainerStyle: {
        flexDirection: 'row',
    },
    demoPathItem: {
        margin: 10,
    },
});
