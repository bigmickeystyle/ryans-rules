import * as React from 'react';
import * as styles from '../app.css';

const ryan = require('../assets/images/RYANOFTHRONES.jpg')

export default class App extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      iWins: []
    };
    console.log(styles.iWin)
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
        return <h1 className={`${styles.iWin} ${styles.resolution}`} style={{ color: iwin }} key={i}>I Win</h1>;
      });
    }
  }

  public render() {
    return (
      <div className={styles.container}>
        <h1 className={styles.title} >Ryan's Rules</h1>
        <img className={styles.image} src={ryan} onClick={this.iWin}/>
        {this.generateIWins()}
      </div>
    );
  }
}
