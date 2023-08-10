import { Fraunces } from 'next/font/google';
import * as React from 'react';
// If loading a variable font, you don't need to specify the font weight
const fraunces = Fraunces({
  display: 'swap',
  subsets: ['latin'],
});

class FontProvider extends React.Component {
  render() {
    return (
      // @ts-ignore
      <span className={fraunces.className}>{this.props.children}</span>
    );
  }
}

export default FontProvider;
