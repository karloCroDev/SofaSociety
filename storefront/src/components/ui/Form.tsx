'use client';

// External packages
import * as React from 'react';
import {
  Form as AriaForm,
  FormProps as AriaFormProps,
} from 'react-aria-components';

export const Form: React.FC<
  React.ComponentPropsWithoutRef<'form'> & AriaFormProps
> = ({ children, ...rest }) => <AriaForm {...rest}>{children}</AriaForm>;
