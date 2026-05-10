import { Button } from '@/shared/components/ui/button';
import { DialogTrigger } from '@/shared/components/ui/dialog';

function AddProject() {
  return (
    <DialogTrigger asChild>
      <Button type="button" data-testid="add-project-btn">
        Add project
      </Button>
    </DialogTrigger>
  );
}

export default AddProject;
