import React from "react";
import { Picker, View } from "react-native";
import * as Svg from "react-native-svg";
import DemoPath from "./DemoPath";
const font = {
    fontFamily: 'Consolas',
    fontSize: '10',
    fontWeight: '700',
};
const App = () => (<ViewPicker data={data} itemLabel={item => item.props.Path.displayName} renderContent={item => item}/>);
export { App as default };
const data = [
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
];
class ViewPicker extends React.Component {
    constructor(props) {
        super(props);
        this.handleValueChange = (value, index) => {
            this.setState(this.getState(index));
        };
        this.state = this.getState(0);
    }
    render() {
        const { data, itemLabel } = this.props;
        // const props = { onValueChange: this.handleValueChange };
        return (<View>
        <Picker onValueChange={this.handleValueChange}>
          {data.map((item, index) => (<Picker.Item label={itemLabel(item, index)} value={index}/>))}
        </Picker>
        {this.state.content}
      </View>);
    }
    getState(index) {
        return {
            content: this.props.renderContent(this.props.data[index], index),
        };
    }
}
