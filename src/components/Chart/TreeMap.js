import React, { PureComponent } from 'react';
import { Treemap, Tooltip, LabelList, Label} from 'recharts';

const data = [
 
  {
    name: 'data',
    children: [
      { name: 'Data', size: 10 },
      { name: 'DataList aslfkjaslfdasdfasdfasfdasfd asdfa sdfasdfasdf ', size: 5 },
      { name: 'DataSprite', size: 3 },
      { name: 'EdgeSprite making this a longer title ayayaya', size: 1 },
      { name: 'NodeSprite', size: 1 },
    ],
  }
];

export default class Example extends PureComponent {
  // static jsfiddleUrl = 'https://jsfiddle.net/alidingling/u702a3Lx/';

  render() {
    console.log(this.props.data)

    return (
      <Treemap
        width={600}
        height={400}
        data={data}
        dataKey="size"
        ratio={4 / 3}
        stroke="#fff"
        fill="#8884d8"
        isAnimationActiveBoolean={false}
      >
        <Tooltip />
      </Treemap>
    );
  }
}
