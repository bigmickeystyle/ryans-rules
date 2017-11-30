import * as React from 'react';
import { navigation } from '../app.css'

interface Props {

}
export default class Navigation extends React.Component<Props,{}> {
  constructor(props: Props) {
    super(props);

  }

  render() {
    return (
      <nav id={ navigation }>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="https://www.facebook.com/ryan.standlee" target="_blank">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
    )
  }
}