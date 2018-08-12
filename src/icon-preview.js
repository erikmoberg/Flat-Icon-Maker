import React from 'react';

export class IconPreview extends React.Component {

  render() {
    return (
      <div>
        <h3>Preview</h3>
	      <div id="icon">
          <div id="svggroup">
          { this.props.selectedIcon ?
            <svg viewBox="0 0 32 32" height="146" width="146" xmlns="http://www.w3.org/2000/svg">
              { !this.props.selectedBackground ? null : this.props.selectedBackground.getMarkup(32) }
              <path transform={ this.props.addPadding ? "scale(0.8), translate(4, 4)" : "" } fill={ this.props.color } stroke="none" d={this.props.selectedIcon.path}></path>
              </svg>
              : null }
          </div>
          <div>
  		      <i>
            { this.props.selectedIcon ? this.props.selectedIcon.title : null }
            </i>
            <br />
            <i>
            by { this.props.selectedIcon ? this.props.selectedIcon.set : null }
            </i>
  	      </div>
        </div>
      </div>
    )
  }
}
