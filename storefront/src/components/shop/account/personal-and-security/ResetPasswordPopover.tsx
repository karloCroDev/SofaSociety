'use client';

// External packages
import * as React from 'react';
import {
  DialogTrigger,
  Button as AriaButton,
  Popover,
} from 'react-aria-components';

// Components
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';

// Lib
import { requestPasswordReset } from '@/lib/data/customer';
import { isLoggedInForgotPasswordReset } from '@/lib2/data/auth';

export const ResetPasswordPopover = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [error, setError] = React.useState('');

  const onSubmit = async () => {
    const request = await isLoggedInForgotPasswordReset();

    if (request?.state === 'success') return setIsOpen(true);

    setError(request.message);
  };

  React;

  return (
    <DialogTrigger isOpen={isOpen}>
      <Button className="mt-6 w-full lg:w-fit" onPress={onSubmit}>
        Reset password
      </Button>
      <Popover
        className="relative rounded bg-gray-10 p-6 shadow-2xl"
        placement="top"
      >
        <h4 className="text-lg">Reset password</h4>

        <p className="mt-12 text-gray-500">
          {error ||
            'We have sent an email with instructions on how to change the password, please try again.'}
        </p>
        <AriaButton>
          <Icon
            name="close"
            className="absolute right-5 top-5"
            onClick={() => setIsOpen(false)}
          />
        </AriaButton>
      </Popover>
    </DialogTrigger>
  );
};
