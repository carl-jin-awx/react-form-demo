import React, { useState } from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';
import { Tabs, Tab } from '@material-ui/core';

import ReduxFormDemo from './ReduxFormDemo';
import FormikDemo from './FormikDemo';
import HookFormDemo from './HookFormDemo';
import './App.css';

const store = createStore(combineReducers({ form: formReducer }));

function App() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Provider store={store}>
      <Tabs centered value={activeTab} onChange={(e, value) => setActiveTab(value)} indicatorColor="primary" textColor="primary">
        <Tab label="redux-form" value={0} />
        <Tab label="formik" value={1} />
        <Tab label="react-hook-form" value={2} />
      </Tabs>
      {activeTab === 0 && <ReduxFormDemo />}
      {activeTab === 1 && <FormikDemo />}
      {activeTab === 2 && <HookFormDemo />}
    </Provider>
  );
}

export default App;
