import React from 'react';
import classNames from 'classnames';
import watch from 'redux-watch';
import store from '../store';
import CenterActions from '../actions/centerActions';
import ModalSection from '../components/ModalSection';
import ModalList from '../components/ModalList';

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
      pictures: [],
      user: 0,
    };

    // Watching for change in user token
    const { center } = this.props;
    const { getState, subscribe } = store;
    const w = watch(getState, center.message);
    subscribe(w((newVal) => {
      console.log(newVal);
      if (newVal.center.message !== 'center created!' && newVal.center.message !== 'all centers delivered!') {
        this.props.showAlert(newVal.center.message);
      }
    }));
  }

  saveInput = (e) => {
    const { target } = e;
    if (target.type !== 'checkbox') {
      this.setState({ [target.name]: target.value });
    } else {
      this.setState({ [target.name]: target.checked });
    }
  }

  cancel = () => { this.setState({ hide: true }); }

  submit = () => {
    store.dispatch(CenterActions.createCenter(this.props.user.token, this.state));
    this.setState({ hide: true });
  }

  showModal = () => {
    this.setState({ hide: false });
  }

  render() {
    const classes = classNames({ 'io-modal': true, hide: this.state.hide });
    const facilityList = ['Chairs', 'Tables', 'Parking Lot', 'Rest Rooms', 'Telescreens', 'Stage'];
    return (
      <div id="add-center-modal" className={classes}>
        <div className="io-modal-body">
          <div className="io-header">CREATE NEW CENTER</div>
          <div className="io-body io-overflow">
            <form className="io-content io-start">
              <ModalSection title="Name"><input placeholder="Enter name of hall here" className="io-input io-input-field" name="name" onChange={this.saveInput} /></ModalSection>
              <ModalSection title="Description"><input placeholder="Enter description here" className="io-input io-input-field" name="description" onChange={this.saveInput} /></ModalSection>
              <ModalSection title="Type"><input placeholder="Enter type of center here" className="io-input io-input-field" name="type" onChange={this.saveInput} /></ModalSection>
              <ModalSection title="Location"><input placeholder="Enter location here" className="io-input io-input-field" name="location" onChange={this.saveInput} /></ModalSection>
              <ModalSection title="Price">
                <span>₦</span><input placeholder="Enter price here" type="number" className="io-input-grow io-input-field" name="price" onChange={this.saveInput} /><span>per day</span>
              </ModalSection>
              <ModalSection title="Pictures"><input type="file" multiple className="io-upload-btn" name="pictures" onChange={this.saveInput} /></ModalSection>
              <ModalSection title="Facilities" extra="io-start"><ModalList list={facilityList} saveInput={this.saveInput} /></ModalSection>
            </form>
          </div>
          <div className="io-footer"><button id="add-center-cancel" className="io-submit-btn io-sm" onClick={this.cancel}>CANCEL</button>
            <button id="add-center-submit" className="io-submit-btn io-sm" onClick={this.submit}>SUBMIT</button>
          </div>
        </div>
      </div>
    );
  }
}

export default AddCenterModal;
