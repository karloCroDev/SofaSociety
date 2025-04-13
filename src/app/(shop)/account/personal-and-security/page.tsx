// Components
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { DialogPeronsalInfo } from '@/components/shop/account/personal-and-security/DialogPeronsalInfo';
import { DialogPersonalAddress } from '@/components/shop/account/personal-and-security/DialogPersonalAddress';
import { ResetPasswordPopover } from '@/components/shop/account/personal-and-security/ResetPasswordPopover';

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
          {/* TODO: Ovo ne treba biti ikona, može biti `-` karakter. FIXED */}-
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
          {/* TODO: Nemoj koristiti `::before` za ove labele, jednostavno dodaj `<p>`. FIXED*/}
          <div>
            <p className="text-sm text-gray-500">Country</p>
            <p>Croatia</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Address</p>
            <p>Duvanjska 3</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Apartment, suite, etc. (Optional)
            </p>
            <p>2nd floor</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Postal code</p>
            <p>10000</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">City</p>
            <p>Zagreb</p>
          </div>
        </div>
        <div className="ml-auto flex gap-6 self-start">
          <Button variant="outline" className="p-2">
            <Icon name="bin" className="size-4" />
          </Button>
          <DialogPersonalAddress />
        </div>
      </div>

      <p className="mt-16 text-lg">Change password</p>
      <ResetPasswordPopover />
      <p className="mt-16 text-lg lg:hidden">Log out</p>
      <Button size="lg" variant="outline" className="mt-6 w-full lg:hidden">
        Log out
      </Button>
    </div>
  );
}
