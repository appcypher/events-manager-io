import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import url from '../../../client/src/url';

// Response data
const getCentersResponse = {
  message: 'All centers delivered!',
  centers: [
    {
      id: 1,
      name: 'Nova Mana',
      type: 'Amusement Park',
      description: 'Come one, come all',
      price: 200000,
      location: 'Abuja',
      picture1: 'https://res.cloudinary.com/appcypher/image/upload/v1530445640/q6gu40m5j7pdg28j0kbt.jpg',
      picture2: null,
      picture3: null,
      picture4: null,
      userId: 1,
      facility: null,
      events: [
        {
          id: 1,
          title: 'Example',
          description: 'Hello',
          date: '2018-07-10T13:22:00.000Z',
          centerId: 25,
          userId: 1,
        },
      ],
    },
  ],
};

const postCentersResponse = {
  message: 'Center created!',
  center: {
    id: 1,
    name: 'Matrimony Ace',
    type: 'Hall',
    price: 7500,
    location: 'Lagos',
    userId: 1,
    description: 'Making your dream wedding come true',
    picture1: null,
    picture2: null,
    picture3: null,
    picture4: null,
  },
};

const putCentersResponse = {
  message: 'Center delivered!',
  center: {
    id: 1,
    name: 'Matrimony Ace',
    type: 'Hall',
    description: 'Making your dream wedding come true',
    price: 7000,
    location: 'Lagos',
    picture1: null,
    picture2: null,
    picture3: null,
    picture4: null,
    userId: 1,
    events: [],
    facility: null,
  },
};

const postUsersResponse = {
  message: 'User created!',
  user: {
    id: 1,
    username: 'james',
    email: 'james@gmail.com',
    fullname: 'james',
    admin: false,
    picture: null,
    description: null,
    tagline: null,
  },
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiYWRtaW4iOmZhbHNlLCJpYXQiOjE1MzA3MDUzMDUsImV4cCI6MTUzMDc5MTcwNX0.Jb1u2fceMdZQgE5M42RbrqMYklcA3c2NTqNX63G1NGM',
};

const postUsersLoginResponse = {
  message: 'User logged in!',
  user: {
    id: 1,
    username: 'admin',
    email: 'admin@gmail.com',
    fullname: 'admin',
    admin: true,
    picture: null,
    description: null,
    tagline: null,
  },
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiYWRtaW4iOmZhbHNlLCJpYXQiOjE1MzA3MDUzMDUsImV4cCI6MTUzMDc5MTcwNX0.Jb1u2fceMdZQgE5M42RbrqMYklcA3c2NTqNX63G1NGM',
};

const getUsersResponse = {
  message: 'User details delivered!',
  user: {
    id: 1,
    username: 'admin',
    email: 'admin@outlook.com',
    fullname: 'admin',
    admin: true,
    description: null,
    tagline: null,
  },
};

const deleteEventsResponse = {
  message: 'Event deleted!',
};

const postEventsResponse = {
  message: 'Event created!',
  event: {
    id: 56,
    title: "Bode's",
    description: null,
    userId: 1,
    centerId: 1,
    date: '2018-07-07T12:00:00.000Z',
  },
};

const putEventsResponse = {
  message: 'Event modified!',
  event: {
    id: 35,
    title: "Bode's",
    description: 'Hello',
    date: '2018-07-08T00:00:00.000Z',
    centerId: '5',
    userId: 1,
  },
};

const mockAxios = () => {
  // This sets the mock adapter on the default instance
  const mock = new MockAdapter(axios);

  mock
    // Centers
    .onGet(`${url}/api/v1/centers?page=1`)
    .reply(200, getCentersResponse)

    .onPost(`${url}/api/v1/centers`)
    .reply(201, postCentersResponse)

    .onPost('https://api.cloudinary.com/v1_1/appcypher/upload')
    .reply(200, { url: 'some_url' })

    .onPut(`${url}/api/v1/centers/1`)
    .reply(200, putCentersResponse)

    // Users
    .onPost(`${url}/api/v1/users`)
    .reply(201, postUsersResponse)

    .onPut(`${url}/api/v1/users`)
    .reply(200, postUsersResponse)

    .onPost(`${url}/api/v1/users/login`)
    .reply(200, postUsersLoginResponse)

    .onGet(`${url}/api/v1/users`)
    .reply(200, getUsersResponse)

    // Events
    .onDelete(`${url}/api/v1/events/1`)
    .reply(200, deleteEventsResponse)

    .onPost(`${url}/api/v1/events`)
    .reply(201, postEventsResponse)

    .onPut(`${url}/api/v1/events/1`)
    .reply(200, putEventsResponse);

  return mock;
};

export {
  mockAxios,
  getCentersResponse,
  postCentersResponse,
  putCentersResponse,
  postUsersResponse,
  postUsersLoginResponse,
  getUsersResponse,
  deleteEventsResponse,
  postEventsResponse,
  putEventsResponse,
};
