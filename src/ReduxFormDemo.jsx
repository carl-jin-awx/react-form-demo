import React, { useCallback } from 'react';
import { Button } from '@material-ui/core';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { useSelector } from 'react-redux';

import { ReduxTextField, ReduxRadioGroup, OPTIONS } from './Common';

const validateName = (name) => {
  if (!name) {
    return 'Required';
  }
  if (name.length < 2) {
    return 'Too short';
  }
  if (name.length > 10) {
    return 'Too long';
  }
}

const validateGender = (gender) => {
  if (!gender) {
    return 'Required';
  }
}

const validateEmail = (email) => {
  if (!email) {
    return 'Required';
  }
  if (!email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)) {
    return 'Invalid email';
  }
}

const Index = ({ handleSubmit }) => {
  const { gender } = useSelector((state) => getFormValues('REDUX_FORM')(state)) || {};
  const validateMarriageAge = useCallback((marriageAge) => {
    if (!marriageAge) {
      return 'Required';
    }
    if (!Number.isInteger(Number(marriageAge))) {
      return 'Incorrect value';
    }
    if (!gender) {
      return 'Please select your gender first';
    }
    if (gender === 'female' && +marriageAge < 20) {
      return 'Marriage age should be more than 19';
    }
    if (gender === 'male' && +marriageAge < 22) {
      return 'Marriage age should be more than 21';
    }
  }, [gender]);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 20, marginTop: 20 }}>
        <Field
          name="name"
          label="Name"
          component={ReduxTextField}
          validate={[validateName]}
        />
        <Field
          name="gender"
          label="Gender"
          component={ReduxRadioGroup}
          options={OPTIONS}
          validate={[validateGender]}
        />
        <Field
          name="marriageAge"
          label="Marriage age"
          component={ReduxTextField}
          validate={[validateMarriageAge]}
        />
        <Field
          name="email"
          label="Email"
          component={ReduxTextField}
          validate={[validateEmail]}
        />
      </div>
      <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
    </>
  );
}

export default reduxForm({
  form: 'REDUX_FORM',
  onSubmit: (values) => {console.log(values)},
  initialValues: {
    name: '',
    gender: '',
    marriageAge: undefined,
    email: '',
  }
})(Index)
