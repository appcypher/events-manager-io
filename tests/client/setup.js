import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import './mocks/localStorageMock';

configure({ adapter: new Adapter() });
