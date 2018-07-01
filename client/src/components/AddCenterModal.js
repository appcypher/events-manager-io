import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import CenterAction from '../actions/centerActions';
import ModalSection from '../components/ModalSection';
import ModalList from '../components/ModalList';

/**
 * This modal allows the user to add new center.
 */
class AddCenterModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hide: true,
      name: '',
      description: '',
      location: '',
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
      this.props.hideLoader();
      this.props.hideAddCenterModal();

      // Show notification of success.
      this.props.showNotification(this.props.center.message);

      // Relaod page after 2secs.
      setTimeout(
        () => window.location.reload(),
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

    return (
      <div id="add-center-modal" className={classes} onClick={this.props.hideAddCenterModal}>
        <div className="io-modal-body">
          <div className="io-header">CREATE NEW CENTER</div>
          <div className="io-body io-overflow">
            <form className="io-content io-start">
              <ModalSection title="Name"><input placeholder="Enter name of hall here" className="io-input io-input-field" name="name" onChange={this.saveInput} /></ModalSection>
              <ModalSection title="Details"><input placeholder="Enter description here" className="io-input io-input-field" name="description" onChange={this.saveInput} /></ModalSection>
              <ModalSection title="Type"><input placeholder="Enter type of center here" className="io-input io-input-field" name="type" onChange={this.saveInput} /></ModalSection>
              <ModalSection title="Location"><input placeholder="Enter location here" className="io-input io-input-field" name="location" onChange={this.saveInput} /></ModalSection>
              <ModalSection title="Price">
                <span>₦</span><input placeholder="Enter price here" type="number" className="io-input-grow io-input-field number" name="price" onChange={this.saveInput} /><span>per day</span>
              </ModalSection>
              <ModalSection title="Pictures">
                <input type="file" accept="image/*" multiple className="io-input-grow io-input-field io-upload-btn" name="pictures" onChange={this.saveImageInput} />
              </ModalSection>
              <ModalSection title="Facilities" extra="io-start"><ModalList list={facilityList} saveInput={this.saveInput} /></ModalSection>
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
  },
)(AddCenterModal);
