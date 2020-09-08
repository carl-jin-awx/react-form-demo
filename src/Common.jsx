import React from 'react';
import { TextField, RadioGroup, Radio, FormControlLabel } from '@material-ui/core';
import { ErrorMessage } from 'formik';
import { ErrorMessage as HookErrorMessage } from '@hookform/error-message';

export const ReduxTextField = ({ input, meta, ...rest }) => {
  const { touched, invalid, error } = meta;
  const hasError = touched && invalid;

  return (
    <div style={{ marginBottom: 12, width: 230 }}>
      <TextField
        variant="outlined"
        {...input}
        {...rest}
      />
      {hasError && (
        <div style={{ color: 'red', marginTop: 10 }}>
          {error}
        </div>
      )}
    </div>
  );
}

export const ReduxRadioGroup = ({ input, meta, options, ...rest }) => {
  const { touched, invalid, error } = meta;
  const hasError = touched && invalid;

  return (
    <div>
      <RadioGroup row {...input} {...rest}>
        {options.map(({ label, value }) => (
          <FormControlLabel key={label} value={value} label={label} control={<Radio />} />
        ))}
      </RadioGroup>
      {hasError && (
        <div style={{ color: 'red', marginTop: 10 }}>
          {error}
        </div>
      )}
    </div>
  );
};

const ErrorWrapper = (props) => <div style={{ color: 'red', marginTop: 10 }} {...props} />

export const FormikTextField = ({ field, form, ...rest }) => {
  return (
    <div style={{ marginBottom: 12, width: 230 }}>
      <TextField {...field} variant="outlined" {...rest} />
      <ErrorMessage component={ErrorWrapper} name={field.name} />
    </div>
  );
};

export const FormikRadioGroup = ({ field, form, options, ...rest }) => {
  return (
    <div>
      <RadioGroup row {...field} {...rest}>
        {options.map(({ label, value }) => (
          <FormControlLabel key={label} value={value} label={label} control={<Radio />} />
        ))}
      </RadioGroup>
      <ErrorMessage component={ErrorWrapper} name={field.name} />
    </div>
  );
};

export const HookTextField = ({ errors, ...rest }) => {
  return (
    <div style={{ marginBottom: 12, width: 230 }}>
      <TextField variant="outlined" {...rest} />
      <HookErrorMessage errors={errors} as={ErrorWrapper} name={rest.name} />
    </div>
  );
};

export const HookRadioGroup = ({ errors, options, ...rest }) => {
  return (
    <div>
      <RadioGroup row {...rest}>
        {options.map(({ label, value }) => (
          <FormControlLabel key={label} value={value} label={label} control={<Radio />} />
        ))}
      </RadioGroup>
      <HookErrorMessage errors={errors} as={ErrorWrapper} name={rest.name} />
    </div>
  );
};

export const OPTIONS = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
];