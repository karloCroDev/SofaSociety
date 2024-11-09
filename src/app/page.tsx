// External packages

// Components
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { LinkAsButton } from '@/components/ui/LinkAsButton';

export default function Home() {
  return (
    <div className="p-5">
      <Icon name="package" className="text-black" />
      <Button variant="outline" colorScheme="black" className="italic">
        Label
      </Button>
      <LinkAsButton href="/shop" size="sm">
        Hello world
      </LinkAsButton>
    </div>
  );
}
