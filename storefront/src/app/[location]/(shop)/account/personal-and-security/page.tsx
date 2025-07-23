// Components
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { ResetPasswordPopover } from '@/components/shop/account/personal-and-security/ResetPasswordPopover';
import { Dialog } from '@/components/shop/account/Dialog';
import { LogoutButton } from '@/components/ui/LogoutButton';
import { getCustomer } from '@/lib/data/customer';
import { PersonalInformationForm } from '@/components/shop/account/personal-and-security/PersonalInformationForm';
import { DeleteAddressForm } from '@/components/shop/account/personal-and-security/DeleteAddressForm';
import { getRegion, listRegions } from '@/lib/data/regions';
import { AddAddressForm } from '@/components/shop/account/personal-and-security/AddAddressForm';

interface PageProps {
  params: Promise<{
    location: string;
  }>;
}

export default async function PersonalAndSecurity({ params }: PageProps) {
  const user = await getCustomer();

  if (!user) throw new Error('Expected user but got null');

  const { location } = await params;
  const username = [user.first_name, user.last_name]
    .filter((name) => name !== undefined)
    .join(' ');

  const [userRegion, regions] = await Promise.all([
    getRegion(location),
    listRegions(),
  ]);

  return (
    <div className="lg:min-h-[calc(100vh-88px-144px-144px)]">
      <h1 className="text-xl font-semibold">Personal & security</h1>
      <p className="mt-16 text-lg">Personal information</p>
      <div className="mt-6 flex flex-col items-start rounded border border-gray-200 p-4 lg:flex-row lg:items-center">
        <div className="flex flex-row items-center">
          <Icon name="user" />
          <p className="ml-8 before:block before:text-sm before:text-gray-500 before:content-['Name']">
            {username}
          </p>
        </div>
        <p className="ml-16 mt-6 before:block before:text-sm before:text-gray-500 before:content-['Number'] lg:mt-0">
          {user.phone ? user.phone : 'Not provided'}
        </p>
        <Dialog
          title="Personal information"
          triggerChildren={
            <Button
              variant="outline"
              className="mt-8 w-full lg:ml-auto lg:mt-0 lg:w-auto"
            >
              Change
            </Button>
          }
        >
          <PersonalInformationForm
            firstName={user.first_name ? user.first_name : undefined}
            lastName={user.last_name ? user.last_name : undefined}
            phoneNumber={user.phone ? user.phone : undefined}
          />
        </Dialog>
      </div>
      <p className="mt-16 text-lg">Contact</p>
      <div className="mt-6 flex items-center rounded border border-gray-200 p-4">
        <Icon name="user" />
        <p className="ml-8 before:block before:text-sm before:text-gray-500 before:content-['Email']">
          {user.email}
        </p>
      </div>
      <p className="mt-4 text-sm text-gray-500">
        If you want to change your email please contact us via customer support.
      </p>
      <p className="mt-16 text-lg">Address</p>
      {user.addresses.map((address) => (
        <div
          className="mt-6 flex flex-col gap-3 rounded-sm border p-4 lg:flex-row lg:items-center lg:gap-8"
          key={address.id}
        >
          <Icon name="user" className="self-start" />
          <div className="grid grid-cols-2 items-center gap-y-9 lg:gap-x-28">
            <div>
              <p className="text-sm text-gray-500">Country</p>
              <p>{address.country_code}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p>{address.address_1}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Apartment, suite, etc. (Optional)
              </p>
              <p>{address.address_2}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Postal code</p>
              <p>{address.postal_code}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">City</p>
              <p>{address.city}</p>
            </div>
          </div>
          <div className="ml-auto flex gap-6 self-start">
            <Dialog
              title="Do you want to delete this address?"
              triggerChildren={
                <Button variant="outline" className="p-2">
                  <Icon name="bin" className="size-4" />
                </Button>
              }
            >
              <DeleteAddressForm addressId={address.id} />
            </Dialog>

            <Dialog
              title="Add address"
              triggerChildren={<Button variant="outline">Change</Button>}
            >
              <AddAddressForm
                regions={regions}
                userRegion={userRegion ?? undefined}
                address={address}
              />
            </Dialog>
          </div>
        </div>
      ))}

      {user.addresses.length === 0 && (
        <Dialog
          title="Add address"
          triggerChildren={<Button className="mt-6">Add address</Button>}
        >
          <AddAddressForm
            regions={regions}
            userRegion={userRegion ?? undefined}
            address={user.addresses[0]}
          />
        </Dialog>
      )}
      <p className="mt-16 text-lg">Change password</p>
      <ResetPasswordPopover />
      <p className="mt-16 text-lg lg:hidden">Log out</p>

      <LogoutButton
        size="lg"
        variant="outline"
        className="mt-6 w-full lg:hidden"
        treatStylesLikeButton
      >
        Log out
      </LogoutButton>
    </div>
  );
}
