import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const sampleCenter = {
  name: '',
  description: '',
  type: '',
  location: '',
  price: '5000',
  picture1: null,
};

const sampleEvent = {
  title: '',
  description: '',
  center: '',
  date: '',
};

const center = { message: '', centers: [sampleCenter] };
const user = { message: '', token: '', user: {} };
const event = { message: '', events: [sampleEvent] };
const mockStore = configureStore([thunk]);

const resetMockStore = () => mockStore({ user, center, event });

export default resetMockStore;
