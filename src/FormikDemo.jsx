import React from 'react';
import { Button } from '@material-ui/core';
import { Formik, Field } from 'formik';

import { FormikTextField, FormikRadioGroup, OPTIONS } from './Common';

const Index = () => {
  return (
    <Formik
      initialValues={{
        name: '',
        gender: '',
        marriageAge: undefined,
        email: '',
      }}
      onSubmit={(values) => console.log(values)}
    >
      {({ handleSubmit, values }) => (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 20, marginTop: 20 }}>
            <Field
              name="name"
              label="Name"
              component={FormikTextField}
              validate={(name) => {
                if (!name) {
                  return 'Required';
                }
                if (name.length < 2) {
                  return 'Too short';
                }
                if (name.length > 10) {
                  return 'Too long';
                }
              }}
            />
            <Field
              name="gender"
              label="Gender"
              component={FormikRadioGroup}
              options={OPTIONS}
              validate={(gender) => {
                if (!gender) {
                  return 'Required';
                }
              }}
            />
            <Field
              name="marriageAge"
              label="Marriage age"
              component={FormikTextField}
              validate={(marriageAge) => {
                const { gender } = values || {};

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
              }}
            />
            <Field
              name="email"
              label="Email"
              component={FormikTextField}
              validate={(email) => {
                if (!email) {
                  return 'Required';
                }
                if (!email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)) {
                  return 'Invalid email';
                }
              }}
            />
          </div>
          <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
        </>
      )}
    </Formik>
  );
}

export default Index;
