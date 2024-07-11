import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useAppDispatch } from "../store/hooks";
import { updateTask } from "../store/features/todoList/todoSlice";

type Props = {
  prevValue: string;
  isOpen: boolean;
  onClose: () => void;
  id: number;
};

const EditTask = ({ prevValue, isOpen, onClose, id }: Props) => {
  const [newTaskValue, setNewTaskValue] = useState(prevValue);
  const dispatch = useAppDispatch();
  const toast = useToast();

  const editTask = () => {
    // if task value empty return
    if (newTaskValue === "") {
      toast({
        description: "Task is required",
        status: "error",
        isClosable: true,
        duration: 1000,
        position: "top",
      });
      return;
    }

    // update task
    dispatch(
      updateTask({
        id,
        body: newTaskValue,
      })
    );

    // close modal and show success message
    onClose();
    toast({
      description: "Task updated successfully",
      status: "success",
      isClosable: true,
      duration: 1000,
      position: "top",
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Task</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Edit your task</FormLabel>
            <Input
              value={newTaskValue}
              onChange={(e) => {
                setNewTaskValue(e.target.value);
              }}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={editTask}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditTask;
