'use client ';

// External packages
import * as React from 'react';
import * as RadixAccordion from '@radix-ui/react-accordion';
import { useCustomer } from '@/hooks2/auth';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// Components
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { CheckboxWithLabel } from '@/components/ui/Checkbox';
import { HttpTypes } from '@medusajs/types';
import { z } from 'zod';
import { useSetEmail } from '@/hooks/cart';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from 'react-aria-components';

const emailFormSchema = z.object({
  email: z.string().email(),
});
type EmailFormArgs = z.infer<typeof emailFormSchema>;

export const Email: React.FC<{
  cart: HttpTypes.StoreCart;
  location: string;
}> = ({ cart, location }) => {
  const { data: customer } = useCustomer();

  const {
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    setError,
    control,
  } = useForm<EmailFormArgs>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: customer?.email || '',
    },
  });
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isOpen = searchParams.get('step') === 'email';

  const { mutate, isPending } = useSetEmail();

  const onSubmit = ({ email }: EmailFormArgs) => {
    mutate(
      { email, country_code: location },
      {
        onSuccess(res) {
          if (res.success)
            return router.replace(`${pathname}?step=address`, {
              scroll: false,
            });

          setError('email', {
            message: res.error || undefined,
          });
        },
      }
    );
  };
  return (
    <RadixAccordion.Item value="email" className="lg:-mt-8">
      <RadixAccordion.Header className="group w-full py-8">
        {isOpen && (
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
              <Input label="Email" inputProps={{ ...field }} type="email" />
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
            disabled={!isDirty || isSubmitting || isPending}
          >
            Next
          </Button>
        </Form>
      </RadixAccordion.Content>
    </RadixAccordion.Item>
  );
};
