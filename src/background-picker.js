import React from 'react';
import reactCSS from 'reactcss'

export class BackgroundPicker extends React.Component {

  constructor(props) {
    super(props);

    this.backgrounds = [
      {
        name: "None",
        id: "no-background",
        getMarkup: (size) => null,
        getMarkup2: (size) => null
      },
      {
        name: "Rounded Square",
        id: "rounded-square-background",
        getMarkup: (size) => (<rect x="0" y="0" width={ size } height={ size } r={ size / 7 } rx={ size / 7 } ry={ size / 7 } fill={ this.props.backgroundColor }></rect>),
        getMarkup2: (size) => "<rect x='0' y='0' width='" + size + "' height='" + size + "' r='" + size / 7 + "' rx='" + size / 7 + "' ry='" + size / 7 + "' fill='" + this.props.backgroundColor + "'></rect>"
      },
      {
        name: "Circle",
        id: "circle-background",
        getMarkup: (size) => (<circle cx={ size / 2 } cy={ size / 2 } r={ size / 2 } fill={ this.props.backgroundColor }></circle>),
        getMarkup2: (size) => "<circle cx='" + size / 2 + "' cy='" + size / 2 + "' r='" + size / 2 + "' fill='" + this.props.backgroundColor + "'></circle>"
      },
      {
        name: "Square",
        id: "square-background",
        getMarkup: (size) => (<rect x="0" y="0" width={ size } height={ size } fill={ this.props.backgroundColor }></rect>),
        getMarkup2: (size) => "<rect x='0' y='0' width='" + size + "' height='" + size + "' fill='" + this.props.backgroundColor + "'></rect>"
      },
    ];

    this.state = {selectedBackground: this.backgrounds[0]};
  }

  backgroundChanged = (background) => {
    this.props.backgroundChanged(background);
    this.setState({
      selectedBackground: background
    });
  }

  render() {

    const styles = reactCSS({
      'default': {
        selectBackgroundContainer: {
          listStyleType: 'none',
          padding: '0'
        },
        selected: {
          color: 'red',
        },
        selectBackgroundItem: {

        },
        selectBackgroundSelectable: {
          padding: '0px 15px 0px 2px',
          cursor: 'pointer'
        },
      },
    });

    return (
      <ul style={ styles.selectBackgroundContainer }>
      {
        this.backgrounds.map((background) => {
          return (
            <li style={ styles.selectBackgroundItem } key={ background.id }>
              <input name="backgrounds" type="radio" id={ background.id } onChange={ () => this.backgroundChanged(background) } defaultChecked={ background === this.state.selectedBackground } />
              <label htmlFor={ background.id } style={ styles.selectBackgroundSelectable }>
              {/*<svg width={ iconSize } height={ iconSize } version="1.1" xmlns="http://www.w3.org/2000/svg">
                { background.getMarkup(iconSize) }
              </svg>*/}
              { background.name }
              </label>
            </li>
          );
        })
      }
      </ul>
    );
  }
}
