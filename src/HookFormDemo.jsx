import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';

import { HookTextField, HookRadioGroup, OPTIONS } from './Common';

const Index = () => {
  const { handleSubmit, errors, control, trigger, watch, getValues } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      gender: '',
      marriageAge: '',
      email: '',
    },
  });

  const onSubmit = data => alert(JSON.stringify(data));

  const gender = watch('gender');

  useEffect(() => {
    gender && trigger('marriageAge');
  }, [gender]);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 20, marginTop: 20 }}>
        <Controller
          name="name"
          label="Name"
          as={HookTextField}
          control={control}
          errors={errors}
          rules={{
            required: 'Required',
            minLength: { value: 2, message: 'Too Short' },
            maxLength: { value: 10, message: 'Too long' },
          }}
        />
        <Controller
          name="gender"
          label="Gender"
          as={HookRadioGroup}
          options={OPTIONS}
          control={control}
          errors={errors}
          rules={{ required: 'Required' }}
        />
        <Controller
          name="marriageAge"
          label="Marriage age"
          as={HookTextField}
          control={control}
          errors={errors}
          rules={{
            required: 'Required',
            validate: (value) => {
              if (!Number.isInteger(Number(value))) {
                return 'Incorrect value';
              }
              const gender = getValues('gender');
              if (!gender) {
                return 'Please select your gender first';
              }
              if (gender === 'female' && +value < 20) {
                return 'Marriage age should be more than 19';
              }
              if (gender === 'male' && +value < 22) {
                return 'Marriage age should be more than 21';
              }
              return true;
            }
          }}
        />
        <Controller
          name="email"
          label="Email"
          as={HookTextField}
          control={control}
          errors={errors}
          rules={{
            required: 'Required',
            pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email' }
          }}
        />
      </div>
      <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>Submit</Button>
    </>
  );
}

export default Index;
