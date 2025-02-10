import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Button } from "@chakra-ui/react"

const DeleteDialog: React.FC = () => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete Event</DialogTitle>
      </DialogHeader>
      <DialogBody>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </DialogBody>
      <DialogFooter>
        <DialogActionTrigger asChild>
          <Button variant="outline">Cancel</Button>
        </DialogActionTrigger>
        <Button>Save</Button>
      </DialogFooter>
      <DialogCloseTrigger />
    </DialogContent>
  )
}

export default DeleteDialog
