import * as React from 'react';
import { iWin, resolution, container, title, ryanImage } from '../app.css';

import Nav from './Navigation';
import Title from './Title';

const ryan = require('../assets/images/ryan-flipped-circled.png')

export default class App extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      iWins: []
    };
    this.iWin = this.iWin.bind(this);
  }

  private iWin() {
    let newArray =  this.state.iWins;
    const colour = `#${(Math.random() * 0xFFFFFF << 0).toString(16)}`
    newArray.push(colour);
    this.setState({
      iWins: newArray
    });
  }

  private generateIWins() {
    if (this.state.iWins.length > 0) {
      return this.state.iWins.map((iwin: String, i: number) => {
        return <h1 className={`${iWin} ${resolution}`} style={{ color: iwin }} key={i}>I Win</h1>;
      });
    }
  }

  public render() {
    return (
      <div>
        <Nav />
        <div className={container}>
          <img className={ryanImage} src={ryan} onClick={this.iWin}/>
          <Title />
          {this.generateIWins()}
        </div>
      </div>
    );
  }
}
