'use client ';

// External packages
import * as React from 'react';
import * as RadixAccordion from '@radix-ui/react-accordion';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { HttpTypes } from '@medusajs/types';
import { Form } from 'react-aria-components';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Components
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { CheckboxWithLabel } from '@/components/ui/Checkbox';

// Hooks
import { useCustomer } from '@/hooks2/auth';
import {
  EmailFormArgs,
  emailFormSchema,
  useEmailCheckout,
} from '@/hooks2/checkout';

// Lib
import { withReactQueryProvider } from '@/lib2/config/react-query';

export const Email: React.FC<{
  cart: HttpTypes.StoreCart;
}> = withReactQueryProvider(({ cart }) => {
  const { data: customer } = useCustomer();

  const {
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
    setError,
    control,
  } = useForm<EmailFormArgs>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: cart.email || customer?.email,
    },
  });
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isOpen = searchParams.get('step') === 'email';

  const { isPending, mutate } = useEmailCheckout();

  const onSubmit = ({ email }: EmailFormArgs) => {
    mutate(
      { email },
      {
        onSuccess(res) {
          if (res.state === 'success')
            return router.replace(`${pathname}?step=address`, {
              scroll: false,
            });

          setError('email', {
            message: res.message || undefined,
          });
        },
      }
    );
  };
  return (
    <RadixAccordion.Item value="email" className="lg:-mt-8">
      <RadixAccordion.Header className="group w-full py-8">
        {(!cart.email || isOpen) && (
          <p className="group-data-[state=open]:font-bold">1. Email</p>
        )}
        {!isOpen && cart.email && (
          <>
            <div className="flex justify-between">
              <p>1. Email</p>
              <RadixAccordion.Trigger
                className="cursor-pointer underline"
                onClick={() =>
                  router.replace(`${pathname}?step=email`, { scroll: false })
                }
              >
                Change
              </RadixAccordion.Trigger>
            </div>

            <div className="mt-7 text-start text-sm">
              Email:
              <span className="ml-16">{cart.email}</span>
            </div>
          </>
        )}
      </RadixAccordion.Header>
      <RadixAccordion.Content className="overflow-hidden transition-colors data-[state=closed]:animate-slide-up-accordion data-[state=open]:animate-slide-down-accordion">
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 lg:gap-8"
        >
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <Input
                label="Email"
                inputProps={{ ...field, value: field.value ?? '' }}
                type="email"
              />
            )}
          />

          {errors.email && (
            <p className="mt-2 text-sm text-red-400">{errors.email?.message}</p>
          )}
          <div className="text-2xs flex items-start gap-2">
            <CheckboxWithLabel className="self-start text-sm text-gray-500">
              What to get news and offers? Ok, yes and some discounts. But only
              if you subscribe.
            </CheckboxWithLabel>
          </div>
          <Button
            size="lg"
            type="submit"
            className="mb-8 self-start"
            disabled={isSubmitting || isPending || !isValid}
            isVisuallyDisabled={
              isSubmitting || isPending || !isDirty || !isValid
            }
          >
            Next
          </Button>
        </Form>
      </RadixAccordion.Content>
    </RadixAccordion.Item>
  );
});
