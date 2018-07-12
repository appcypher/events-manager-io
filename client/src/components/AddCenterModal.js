import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import CenterAction from '../actions/centerActions';
import ModalSection from '../components/ModalSection';
import ModalList from '../components/ModalList';

/**
 * This modal allows the user to add new center.
 */
export class AddCenterModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hide: true,
      name: '',
      description: '',
      location: '',
      available: true,
      type: '',
      price: 0,
      file: null,
      pictures: [],
    };
  }

  // Store details from input fields.
  saveInput = (e) => {
    const { target } = e;
    if (target.type !== 'checkbox') {
      this.setState({ [target.name]: target.value });
    } else if (target.name === 'available') {
      this.setState({ available: !this.state.available });
    } else {
      this.setState({ [target.name]: target.checked });
    }
  }

  // Store file info from selected images.
  saveImageInput = (e) => {
    let file = null;

    if (e.target.files && e.target.files !== []) {
      [file] = e.target.files;
    }

    if (file) {
      this.setState({ file });
    }
  }

  submit = () => {
    // Show loading screen.
    this.props.showLoader();

    // Callback for handling success.
    const reloadPage = () => {
      // Hide loading screen and modal.
      this.props.hideLoader();
      this.props.hideAddCenterModal();

      // Show notification of success.
      this.props.showNotification(this.props.center.message);

      // Reload page after 2secs.
      setTimeout(
        () => { this.props.getAllCenters(); },
        2500,
      );
    };

    // Callback for handling error.
    const showError = () => {
      this.props.hideLoader();
      this.props.showAlertModal(this.props.center.message, 'error');
    };

    const token = localStorage.getItem('user.token');
    this.props.createCenter(token, this.state, reloadPage, showError);
  }

  render() {
    const classes = classNames({ 'io-modal': true, hide: !this.props.showAddCenterModal });
    const facilityList = ['Chairs', 'Tables', 'Parking Lot', 'Rest Rooms', 'Telescreens', 'Stage'];
    const availablility = ['Available'];

    return (
      <div id="add-center-modal" className={classes} onClick={this.props.hideAddCenterModal}>
        <div className="io-modal-body">
          <div className="io-header">CREATE NEW CENTER</div>
          <div className="io-body io-overflow">
            <form className="io-content io-start">
              <ModalSection title="Name"><input id="add-center-name" placeholder="Enter name of hall here" className="io-input io-input-field" name="name" onChange={this.saveInput} /></ModalSection>
              <ModalSection title="Details"><input id="add-center-description" placeholder="Enter description here" className="io-input io-input-field" name="description" onChange={this.saveInput} /></ModalSection>
              <ModalSection title="Type"><input id="add-center-type" placeholder="Enter type of center here" className="io-input io-input-field" name="type" onChange={this.saveInput} /></ModalSection>
              <ModalSection title="Location"><input id="add-center-location" placeholder="Enter location here" className="io-input io-input-field" name="location" onChange={this.saveInput} /></ModalSection>
              <ModalSection title="Price">
                <span>₦</span><input id="add-center-price" placeholder="Enter price here" type="number" className="io-input-grow io-input-field number" name="price" onChange={this.saveInput} /><span>per day</span>
              </ModalSection>
              <ModalSection title="Pictures">
                <input id="add-center-pictures" type="file" accept="image/*" multiple className="io-input-grow io-input-field io-upload-btn" name="pictures" onChange={this.saveImageInput} />
              </ModalSection>
              <ModalSection title="Available" extra="io-start add-center-available"><ModalList list={availablility} checked={this.state.available} saveInput={this.saveInput} /></ModalSection>
              <ModalSection title="Facilities" extra="io-start add-center-facilities"><ModalList list={facilityList} saveInput={this.saveInput} /></ModalSection>
            </form>
          </div>
          <div className="io-footer">
            <button id="add-center-cancel" className="io-submit-btn io-sm" onClick={this.props.hideAddCenterModal}>CANCEL</button>
            <button id="add-center-submit" className="io-submit-btn io-sm" onClick={this.submit}>SUBMIT</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ center }) => ({ center });

export default connect(
  mapStateToProps,
  {
    createCenter: CenterAction.createCenter,
    getAllCenters: CenterAction.getAllCenters,
  },
)(AddCenterModal);
