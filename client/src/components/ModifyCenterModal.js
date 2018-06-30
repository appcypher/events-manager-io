import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import CenterAction from '../actions/centerActions';
import ModalSection from '../components/ModalSection';
import ModalList from '../components/ModalList';

class ModifyCenterModal extends React.Component {
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
      user: 0,
      modifyCenterModalState: this.props.modifyCenterModalState,
    };
  }

  saveInput = (e) => {
    const { target } = e;
    if (target.type !== 'checkbox') {
      this.setState({ [target.name]: target.value });
    } else {
      this.setState({ [target.name]: target.checked });
    }
  }

  saveImageInput = (e) => {
    let file = null;

    if (e.target.files && e.target.files !== []) {
      [file] = e.target.files;
    }

    if (file) {
      this.setState({ file });
    }
  }

  deleteCenter = () => {}

  submit = centerId => () => {
    const token = localStorage.getItem('user.token');
    this.props.modifyCenter(token, this.state, centerId);
    // Hide modal.
    this.props.hideModifyCenterModal();
  }

  render() {
    const classes = classNames({ 'io-modal': true, hide: !this.props.showModifyCenterModal });
    const facilityList = ['Chairs', 'Tables', 'Parking Lot', 'Rest Rooms', 'Telescreens', 'Stage'];
    const centerId = this.props.modifyCenterModalState.id;
    let name;
    let description;
    let type;
    let location;
    let price;

    // Displaying the selected center's existing details.
    if (this.props.modifyCenterModalState.populate) {
      ({
        name, description, type, location, price,
      } = this.props.modifyCenterModalState);
      this.state = {
        ...this.state,
        name,
        description,
        type,
        location,
        price,
      };
      this.props.modifyCenterModalState.populate = false;
    } else {
      ({
        name, description, type, location, price,
      } = this.state);
    }


    return (
      <div id="modify-center-modal" className={classes}>
        <div className="io-modal-body">
          <div className="io-header">MODIFY CENTER</div>
          <div className="io-body io-overflow">
            <form className="io-content io-start">
              <ModalSection title="Name"><input value={name} placeholder="Enter name of hall here" className="io-input io-input-field" name="name" onChange={this.saveInput} /></ModalSection>
              <ModalSection title="Details"><input value={description} placeholder="Enter description here" className="io-input io-input-field" name="description" onChange={this.saveInput} /></ModalSection>
              <ModalSection title="Type"><input value={type} placeholder="Enter type of center here" className="io-input io-input-field" name="type" onChange={this.saveInput} /></ModalSection>
              <ModalSection title="Location"><input value={location} placeholder="Enter location here" className="io-input io-input-field" name="location" onChange={this.saveInput} /></ModalSection>
              <ModalSection title="Price">
                <span>₦</span><input value={price} placeholder="Enter price here" type="number" className="io-input-grow io-input-field" name="price" onChange={this.saveInput} /><span>per day</span>
              </ModalSection>
              <ModalSection title="Pictures"><input type="file" multiple className="io-input-grow io-input-field io-upload-btn" name="pictures" onChange={this.saveImageInput} /></ModalSection>
              <ModalSection title="Facilities" extra="io-start"><ModalList list={facilityList} saveInput={this.saveInput} /></ModalSection>
            </form>
          </div>
          <div className="io-footer">
            <button className="io-submit-btn io-sm" onClick={this.props.hideModifyCenterModal} onChange={this.handleChange}>CANCEL</button>
            <button className="io-submit-btn io-sm" onClick={this.submit(centerId)}>SUBMIT</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(
  mapStateToProps,
  {
    modifyCenter: CenterAction.modifyCenter,
  },
)(ModifyCenterModal);
