import * as React from 'react';
import { title, logo } from '../app.css';

interface Props {}

const logoSrc = require('../assets/images/logo.png');

export default class Title extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    return (
      <div className={`${title} ${logo}`}>
        <img src={logoSrc} style={{ width: '100%' }}/>
      </div>
    )
  }
}