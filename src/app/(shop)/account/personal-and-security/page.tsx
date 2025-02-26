// Components
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { DialogPeronsalInfo } from '@/components/shop/account/personal-and-security/DialogPeronsalInfo';
import { DialogPersonalAddress } from '@/components/shop/account/personal-and-security/DialogPersonalAddress';
import { LinkAsButton } from '@/components/ui/LinkAsButton';

export default function PersonalAndSecurity() {
  return (
    <div className="lg:min-h-[calc(100vh-88px-144px-144px)]">
      <h1 className="text-xl font-semibold">Personal & security</h1>
      <p className="mt-16 text-lg">Personal information</p>
      <div className="mt-6 flex flex-col items-start rounded border border-gray-200 p-4 lg:flex-row lg:items-center">
        <div className="flex flex-row items-center">
          <Icon name="user" />
          <p className="ml-8 before:block before:text-sm before:text-gray-500 before:content-['Name']">
            Jovana Jeremic
          </p>
        </div>
        <p className="ml-16 mt-6 before:block before:text-sm before:text-gray-500 before:content-['Number'] lg:mt-0">
          <Icon name="minus" />
        </p>

        <DialogPeronsalInfo />
      </div>
      <p className="mt-16 text-lg">Contact</p>
      <div className="mt-6 flex items-center rounded border border-gray-200 p-4">
        <Icon name="user" />
        <p className="ml-8 before:block before:text-sm before:text-gray-500 before:content-['Email']">
          jovana.jerimic@gmail.com
        </p>
      </div>
      <p className="mt-4 text-sm text-gray-500">
        If you want to change your email please contact us via customer support.
      </p>
      <p className="mt-16 text-lg">Address</p>
      <div className="mt-6 flex flex-col gap-3 rounded-sm border p-4 lg:flex-row lg:items-center lg:gap-8">
        <Icon name="user" className="self-start" />
        <div className="grid grid-cols-2 items-center gap-y-9 lg:gap-x-28">
          <p className="before:block before:text-sm before:text-gray-500 before:content-['Country']">
            Croatia
          </p>
          <p className="before:block before:text-sm before:text-gray-500 before:content-['Address']">
            Duvanjska 3
          </p>
          <p className="before:block before:text-sm before:text-gray-500 before:content-['Apartment,_suite,_etc._(Optional)']">
            2nd floor
          </p>
          <p className="before:block before:text-sm before:text-gray-500 before:content-['Postal_code']">
            10000
          </p>
          <p className="before:block before:text-sm before:text-gray-500 before:content-['City']">
            Zagreb
          </p>
        </div>
        <div className="ml-auto flex gap-6 self-start">
          <Button variant="outline" className="p-2">
            <Icon name="bin" className="size-4" />
          </Button>
          <DialogPersonalAddress />
        </div>
      </div>

      <p className="mt-16 text-lg">Change password</p>
      <LinkAsButton
        href="/reset-password"
        size="lg"
        className="mt-6 w-full lg:w-fit"
      >
        Reset password
      </LinkAsButton>
      <p className="mt-16 text-lg lg:hidden">Log out</p>
      <Button
        // href="/"
        size="lg"
        variant="outline"
        className="mt-6 w-full lg:hidden"
      >
        Log out
      </Button>
    </div>
  );
}
