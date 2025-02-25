// Components
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';

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

        <Button
          variant="outline"
          size="lg"
          className="mt-8 w-full lg:ml-auto lg:mt-0 lg:w-auto"
        >
          Change
        </Button>
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
      <Button size="lg" className="mt-6 w-full lg:w-auto">
        Add address
      </Button>
      <p className="mt-16 text-lg">Change password</p>
      <Button size="lg" className="mt-6 w-full lg:w-auto">
        Reset password
      </Button>
      <p className="mt-16 text-lg lg:hidden">Log out</p>
      <Button size="lg" variant="outline" className="mt-6 w-full lg:hidden">
        Log out
      </Button>
    </div>
  );
}
