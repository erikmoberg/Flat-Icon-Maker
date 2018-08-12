import React from 'react';
import reactCSS from 'reactcss'
import { Icons } from './icons.js';

export class IconsView extends React.Component {

  constructor(props) {
    super(props);
    this.icons = new Icons().getIcons();
    this.symbolSets = this.icons.map((icon) => { return icon.set; }).filter((value, index, self) => { return self.indexOf(value) === index; });
    this.props.onSelect(this.icons[0]);
    this.state = {
      selectedSymbolSet: null,
      searchText: null,
    };
  }

  changeSymbol = (symbolSet) => {
     this.setState({
       selectedSymbolSet: symbolSet
     });
  }

  changeSearchText = (e) => {
    this.setState({
      searchText: e.target.value
    });
  }

  getClassName = (iconSet, iconTitle) => {
    if (this.state.selectedSymbolSet !== null && iconSet !== this.state.selectedSymbolSet) {
      return 'animatableSymbol hide';
    }

    if (this.state.searchText && iconTitle.indexOf(this.state.searchText.toLowerCase()) === -1) {
      return 'animatableSymbol hide';
    }

    return 'animatableSymbol';
  }

  render() {

    const styles = reactCSS({
      'default': {
        symbolSetSelection: {
          padding: '10px 0',
        },
        iconContainer: {
          borderTop: '1px solid #ccc',
          borderBottom: '1px solid #ccc',
          padding: '10px 0',
          marginBottom: '10px',
          maxHeight: '300px',
          overflowY: 'scroll'
        },
        iconSetLabel: {
          padding: '0 15px 0 2px',
        }
      },
    });

    return (
      <div>
        <input type="text" className="textinput" placeholder={ `Search ${this.icons.length} icons` } style={{ width: "240px" }} onChange={ this.changeSearchText } />
        <div style={ styles.symbolSetSelection } className="symbol-set-selection">
          <h4>Icon Set Filter</h4>
          <input name="symbol-set-radio" type="radio" id="allSymbolSets" defaultChecked={ true } onChange={ () => this.changeSymbol(null) } />
          <label style={ styles.iconSetLabel } htmlFor="allSymbolSets">All</label>
          {this.symbolSets.map((symbolSet, i) => {
            return (
              <span key={ symbolSet }>
                <input name="symbol-set-radio" type="radio" id={ symbolSet + i } onChange={ () => this.changeSymbol(symbolSet) } />
                <label style={ styles.iconSetLabel } htmlFor={ symbolSet + i }>{ symbolSet }</label>
              </span>
            );
          })}
        </div>
        <div style={ styles.iconContainer }>
          {this.icons.map((icon, i) => {
            return (
              <svg className={ this.getClassName(icon.set, icon.title) } key={icon.set + icon.title} height="32" version="1.1" width="32" xmlns="http://www.w3.org/2000/svg" onClick={() => this.props.onSelect(icon)}>
                <path fill={ this.props.selectedIcon === icon ? "#da4526" : "#333333" } stroke="none" d={icon.path}></path>
              </svg>
            );
          })}
        </div>
      </div>
    )
  }
}
