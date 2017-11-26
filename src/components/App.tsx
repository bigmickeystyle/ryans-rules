import * as React from 'react';
import * as styles from './../app.css';

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
    newArray.push('win');
    this.setState((prevState) => ({
      iWins: newArray
    }));
  }

  private generateIWins() {
    if (this.state.iWins.length > 0) {
      return this.state.iWins.map((iwin: String, i: number) => {
        const colour = `#${(Math.random() * 0xFFFFFF << 0).toString(16)}`;
        return <h1 className={`${styles.iWin} ${styles.resolution}`} style={{ color: colour }} key={i}>I Win</h1>;
      });
    }
  }

  public render() {
    return (
      <div className={styles.container}>
        <h1 className={styles.question} onClick={this.iWin}>Ryan's Rules</h1>
        {this.generateIWins()}
      </div>
    );
  }
}
