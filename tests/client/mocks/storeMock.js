import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const center = { message: '', centers: [] };
const user = { message: '', token: '', user: {} };
const event = { message: '', events: [] };
const mockStore = configureStore([thunk]);

const resetMockStore = () => mockStore({ user, center, event });

export default resetMockStore;
