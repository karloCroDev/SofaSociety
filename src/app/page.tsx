// External packages

// Components
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';

export default function Home() {
  return (
    <div className="p-5">
      <Icon name="package" className="text-black" />
      <Button variant="outline" colorScheme="black">
        Label
      </Button>
    </div>
  );
}
