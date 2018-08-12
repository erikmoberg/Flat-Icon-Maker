import React from 'react';
import reactCSS from 'reactcss'
import download from 'downloadjs';

export class DownloadView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      imageRef: null,
      iconSize: 256,
      isGettingAttention: false
    };
  }

  iconSizeUpdated = (e) => {
    var value = e.target.value;
    if (isNaN(value)) {
      value = 256;
    }

    if(value < 1) {
      value = 1;
    }
    if(value > 3000) {
      value = 3000;
    }

    this.setState({
      iconSize: value
    }, () => {
      this.updateIcon();
    });
  }

  getAttention = () => {
    if (this.state.isGettingAttention) {
      return;
    }

    this.setState({
      isGettingAttention: true
    });

    setTimeout(() => {
      this.setState({
        isGettingAttention: false
      });
    }, 3000);
  }

  buttonClass = () => {
    return 'btn ' + (this.state.isGettingAttention ? 'pulse' : '');
  }

  updateIcon = () => {
    if (!this.props.icon) {
      return;
    }

    var originalSize = 32;
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var data = '<svg viewBox="0 0 ' + originalSize + ' ' + originalSize + '" height="' + this.state.iconSize + '" width="' + this.state.iconSize + '" xmlns="http://www.w3.org/2000/svg">' +
    (!this.props.selectedBackground ? null : this.props.selectedBackground.getMarkup2(originalSize)) +
    '<path transform="' + (this.props.addPadding ? "scale(0.8), translate(4, 4)" : "") + '" fill="' + this.props.color + '" stroke="none" d="' + this.props.icon.path + '"></path></svg>'
    var DOMURL = window.URL || window.webkitURL || window;
    var img = new Image();
    var svg = new Blob([data], {type: 'image/svg+xml'});
    var url = DOMURL.createObjectURL(svg);

    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      DOMURL.revokeObjectURL(url);
      var png_img = canvas.toDataURL("image/png");
      this.setState({
        imageRef: png_img
      });
    }

    img.src = url;
  }

  download = () => {
    download(this.state.imageRef, `${this.props.icon.title} by ${this.props.icon.set}.png`, "image/png");
  }

  render() {

    const styles = reactCSS({
      'default': {
        button: {
          display: 'inline-block',
        },
        hidden: {
          display: 'none',
        },
        textbox: {
          width: '60px'
        }
      }
    });

    return (
      <div id="download-area">
        <h3>Size (px)</h3>
        <input type="number" className="textinput" style={ styles.textbox } defaultValue={this.state.iconSize} onChange={this.iconSizeUpdated} />
        <br />
        { this.props.icon ?
        <a style={ styles.button } className={ this.buttonClass() } href="javascript:void(0)" onClick={ () => this.download() }>Download</a>
        : null }
        <canvas id="canvas" width={this.state.iconSize} height={ this.state.iconSize } style={ styles.hidden } crossOrigin="anonymous"></canvas>
        <br />
      </div>
    )
  }
}
