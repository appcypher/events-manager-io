import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import CenterAction from '../actions/centerActions';
import ModalSection from '../components/ModalSection';
import ModalList from '../components/ModalList';

/**
 * This modal allows the user to modify selected center.
 */
export class ModifyCenterModal extends React.Component {
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
      user: 0,
      modifyCenterModalState: this.props.modifyCenterModalState,
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

  submit = centerId => () => {
    // Show loading screen.
    this.props.showLoader();

    // Callback for handling success.
    const reloadPage = () => {
      this.props.hideLoader();
      this.props.hideModifyCenterModal();

      // Reload page after 2secs.
      this.props.showNotification(this.props.center.message);

      // Show notification of success.
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
    this.props.modifyCenter(token, this.state, centerId, reloadPage, showError);
  }

  render() {
    const classes = classNames({ 'io-modal': true, hide: !this.props.showModifyCenterModal });
    const facilityList = ['Chairs', 'Tables', 'Parking Lot', 'Rest Rooms', 'Telescreens', 'Stage'];
    const availablility = ['Available'];
    const centerId = this.props.modifyCenterModalState.id;
    let name;
    let description;
    let type;
    let location;
    let available;
    let price;

    // Displaying the selected center's existing details.
    if (this.props.modifyCenterModalState.populate) {
      ({
        name, description, type, location, available, price,
      } = this.props.modifyCenterModalState);
      this.state = {
        ...this.state,
        name,
        description,
        type,
        location,
        available,
        price,
      };
      this.props.modifyCenterModalState.populate = false;
    } else {
      ({
        name, description, type, location, available, price,
      } = this.state);
    }

    return (
      <div id="modify-center-modal" className={classes} onClick={this.props.hideModifyCenterModal}>
        <div className="io-modal-body">
          <div className="io-header">MODIFY CENTER</div>
          <div className="io-body io-overflow">
            <form className="io-content io-start">
              <ModalSection title="Name"><input value={name} id="modify-center-name" placeholder="Enter name of hall here" className="io-input io-input-field" name="name" onChange={this.saveInput} /></ModalSection>
              <ModalSection title="Details"><input value={description} id="modify-center-description" placeholder="Enter description here" className="io-input io-input-field" name="description" onChange={this.saveInput} /></ModalSection>
              <ModalSection title="Type"><input value={type} id="modify-center-type" placeholder="Enter type of center here" className="io-input io-input-field" name="type" onChange={this.saveInput} /></ModalSection>
              <ModalSection title="Location"><input value={location} id="modify-center-location" placeholder="Enter location here" className="io-input io-input-field" name="location" onChange={this.saveInput} /></ModalSection>
              <ModalSection title="Price">
                <span>₦</span><input value={price} id="modify-center-price" placeholder="Enter price here" type="number" className="io-input-grow io-input-field" name="price" onChange={this.saveInput} /><span>per day</span>
              </ModalSection>
              <ModalSection title="Pictures"><input id="modify-center-pictures" type="file" accept="image/*" multiple className="io-input-grow io-input-field io-upload-btn" name="pictures" onChange={this.saveImageInput} /></ModalSection>
              <ModalSection title="Available" extra="io-start modify-center-available"><ModalList list={availablility} checked={available} saveInput={this.saveInput} /></ModalSection>
              <ModalSection title="Facilities" extra="io-start modify-center-facilities"><ModalList list={facilityList} saveInput={this.saveInput} /></ModalSection>
            </form>
          </div>
          <div className="io-footer">
            <button className="io-submit-btn io-sm" onClick={this.props.hideModifyCenterModal} onChange={this.handleChange}>CANCEL</button>
            <button id="modify-center-submit" className="io-submit-btn io-sm" onClick={this.submit(centerId)}>SUBMIT</button>
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
    modifyCenter: CenterAction.modifyCenter,
    getAllCenters: CenterAction.getAllCenters,
  },
)(ModifyCenterModal);
