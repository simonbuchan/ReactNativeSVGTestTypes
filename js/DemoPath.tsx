import React from "react";
import { FlatList, StyleSheet } from "react-native";
import * as Svg from "react-native-svg";

export interface DemoPathProps<P extends Svg.CommonPathProps> {
  Path: React.ComponentType<P>;
  pathProps: P & { children?: React.ReactNode };
  defs?: React.ReactNode;
}

const DemoPath = <P extends Svg.CommonPathProps>(props: DemoPathProps<P>) => (
  <FlatList
    keyExtractor={(_, index) => index.toString()}
    numColumns={3}
    data={fillStrokePropsList}
    renderItem={e => <DemoPathItem {...props} {...e.item} />}
    getItemLayout={(data, index) => ({ length: 100, offset: index * 100, index })}
  />
);
export { DemoPath as default };

interface DemoPathItemProps<P extends Svg.CommonPathProps> {
  Path: React.ComponentType<P>;
  pathProps: P;
  defs?: React.ReactNode;
  strokeProps: Svg.StrokeProps;
  fillProps: Svg.FillProps;
}

const DemoPathItem = <P extends Svg.CommonPathProps>(
  { Path, pathProps, defs, strokeProps, fillProps }: DemoPathItemProps<P>,
) => (
  <Svg.Svg width={100} height={100} style={styles.demoPathItem}>
    <Svg.Defs>
      <Svg.LinearGradient id="g1">
        <Svg.Stop offset="0" stopColor="red" />
        <Svg.Stop offset="1" stopColor="blue" />
      </Svg.LinearGradient>
      <Svg.RadialGradient id="g2" cx={0} r={100}>
        <Svg.Stop offset="0" stopColor="green" />
        <Svg.Stop offset="1" stopColor="yellow" />
      </Svg.RadialGradient>
      {defs}
    </Svg.Defs>
    <Path {...pathProps} {...strokeProps} {...fillProps} />
  </Svg.Svg>
);

const strokePropsList: Svg.StrokeProps[] = [
  {},
  { stroke: 'red' },
  { stroke: 'blue', strokeDasharray: [2, 4], strokeWidth: 4 },
  { stroke: 'url(#g1)', strokeWidth: 2 },
  { stroke: 'url(#g2)', strokeWidth: 4, strokeLinejoin: 'bevel' },
];

const fillPropsList: Svg.FillProps[] = [
  { fill: 'none' },
  { fillRule: 'evenodd' },
  { fill: 'red', fillOpacity: 0.5 },
  { fill: 'url(#g1)' },
  { fill: 'url(#g2)' },
];

type FillStrokeProps = { fillProps: Svg.FillProps, strokeProps: Svg.StrokeProps };
const fillStrokePropsList: Array<FillStrokeProps> =
  flatMap(
    fillPropsList,
    fillProps => (
      strokePropsList.map(
        (strokeProps): FillStrokeProps => ({ fillProps, strokeProps }),
      )
    ),
  );

function flatMap<T, R>(left: ReadonlyArray<T>, select: (item: T) => R[]): R[] {
  const result: R[] = [];
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
