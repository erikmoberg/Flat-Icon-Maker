import React from 'react';
import ReactDOM from 'react-dom';
import reactCSS from 'reactcss';
import { ColorPicker } from './color-picker.js';
import { IconsView } from './icons-view.js';
import { IconPreview } from './icon-preview.js';
import { DownloadView } from './download-view.js';
import { BackgroundPicker } from './background-picker.js';
import './index.css';

class IconMaker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      simpleMode: true,
      selectedIcon: null,
      color: "#da4526",
      selectedBackground: null,
      backgroundColor: "#333333",
      addPadding: false,
    };
  }

  onAddPaddingChanged = (e) => {
    this.setState({
      addPadding: e.target.checked === true
    }, () => {
      this.downloadView.updateIcon();
    });
  }

  onColorChanged = (color) => {
    this.setState({
      color: color
    }, () => {
      this.downloadView.updateIcon();
    });
  }

  onBackgroundColorChanged = (backgroundColor) => {
    this.setState({
      backgroundColor: backgroundColor
    }, () => {
      this.downloadView.updateIcon();
    });
  }

  onBackgroundChanged = (background) => {
    this.setState({
      selectedBackground: background
    }, () => {
      this.downloadView.updateIcon();
    });
  }

  onSelectIcon = (icon) => {
    this.setState({
      selectedIcon: icon
    }, () => {
      this.downloadView.updateIcon();
    });
  }

  render() {

    const styles = reactCSS({
      'default': {
        group: {
          padding: '5px 0',
        },
      }
    });

    return (
      <div>
        <div className="page-section">

          <IconsView onSelect={this.onSelectIcon} selectedIcon={this.state.selectedIcon} />

          <div style={ { display: "flex", justifyContent: "space-between", flexWrap: "nowrap" } }>
            <div>
              <div style={ styles.group }>
                <h3>Icon Color</h3>
                <ColorPicker color={this.state.color} colorChanged={this.onColorChanged} />
              </div>

              <div style={ styles.group }>
                <h3>Background Shape</h3>
                <BackgroundPicker backgroundChanged={this.onBackgroundChanged} backgroundColor={ this.state.backgroundColor } />
                <input type="checkbox" id="add-padding" onChange={ this.onAddPaddingChanged } /><label htmlFor="add-padding" style={ { paddingLeft: "2px", display: "inline-block" } }>Add padding</label>
              </div>

              <div style={ styles.group }>
                <h3>Background Color</h3>
                <ColorPicker color={this.state.backgroundColor} colorChanged={this.onBackgroundColorChanged} />
              </div>
              <div style={ styles.group }>
                <DownloadView addPadding={ this.state.addPadding } color={ this.state.color } icon={ this.state.selectedIcon } selectedBackground={this.state.selectedBackground} ref={instance => { this.downloadView = instance; }} />
              </div>
            </div>

            <div style={ { textAlign: "center" } }>
              <IconPreview addPadding={ this.state.addPadding } color={ this.state.color } selectedIcon={ this.state.selectedIcon } selectedBackground={ this.state.selectedBackground } backgroundColor={ this.state.backgroundColor } scrollToDownload={ this.onScrollToDownload } />
            </div>
          </div>
        </div>
        <div className="page-section">
          <h3>Icon Sets License Information</h3>
          <p>
            I have not created these icons myself and they use different licenses.
            By using any icons, you confirm that you have reviewed the license terms for the corresponding icon set.
            Hint: When downloading an icon, the set will be a part of the file name for your convenience.
          </p>
          <ul>
            <li><a target="_blank" rel="noopener noreferrer" href="http://www.toicon.com/series/afiado">Afiado</a> - <a target="_blank" rel="noopener noreferrer" href="http://www.toicon.com/license">CC BY 4.0 License</a></li>
            <li><a target="_blank" rel="noopener noreferrer" href="http://www.entypo.com">Entypo+</a> - <a target="_blank" rel="noopener noreferrer" href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0 License</a></li>
            <li><a target="_blank" rel="noopener noreferrer" href="https://github.com/colebemis/feather">Feather</a> - <a target="_blank" rel="noopener noreferrer" href="https://opensource.org/licenses/MIT">MIT License</a></li>
            <li><a target="_blank" rel="noopener noreferrer" href="https://icomoon.io/#icons-icomoon">IcoMoon - Free</a> - <a target="_blank" rel="noopener noreferrer" href="http://www.gnu.org/licenses/gpl.html">GPL</a> or <a target="_blank" rel="noopener noreferrer" href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0 License</a></li>
            <li><a target="_blank" rel="noopener noreferrer" href="https://simpleicons.org/">Simple Icons</a> - <a target="_blank" rel="noopener noreferrer" href="https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md">CC0 1.0 Universal License</a></li>
          </ul>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <IconMaker />,
  document.getElementById('root')
);
