import React, { Component } from 'react';
import { View } from 'react-native';
import { createStore  } from 'redux';
import { Provider } from 'react-redux';

import reducer from './App_reducer';
import BoardList from './BoardList';

const store = createStore(reducer);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View>
          <BoardList />
        </View>
      </Provider>
    );
  }
}
