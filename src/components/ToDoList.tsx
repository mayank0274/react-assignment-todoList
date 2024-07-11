import {
  Task as ITask,
  deleteToDo,
  markComplete,
} from "../store/features/todoList/todoSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  Box,
  Checkbox,
  Text,
  ButtonGroup,
  IconButton,
  useDisclosure,
  useToast,
  Button,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import EditTask from "./EditTask";

interface TaskProps {
  task: ITask;
  onMarkCompleteTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
}

const Task = ({ task, onDeleteTask, onMarkCompleteTask }: TaskProps) => {
  const { isCompleted, body, id } = task;
  // fuctions for edit modal
  const { isOpen: isEditing, onOpen, onClose } = useDisclosure();

  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      justifyContent={"space-between"}
      backgroundColor={isCompleted ? "#add899" : "#6c47c2c7"}
      width={{ base: "45%", sm: "45%", md: "30%", lg: "31.5%" }}
      padding={"10px"}
      borderRadius={6}
      gap={3}
    >
      <Box display={"flex"} minH={"50px"}>
        {" "}
        <Text color={"#fff"} fontWeight={"semibold"} m={0} p={0}>
          {body}
        </Text>
      </Box>
      <ButtonGroup>
        <Button size={"sm"} m={0} p={0}>
          <Checkbox
            size={"lg"}
            colorScheme="green"
            border={"0.5px solid gray"}
            borderRadius={3}
            isChecked={isCompleted}
            onChange={() => {
              onMarkCompleteTask(id);
            }}
          />
        </Button>
        <IconButton
          size={"sm"}
          icon={<EditIcon />}
          aria-label="edit task"
          onClick={() => {
            onOpen();
          }}
        />
        <IconButton
          size={"sm"}
          icon={<DeleteIcon color={"orangered"} />}
          aria-label="delete task"
          onClick={() => {
            onDeleteTask(id);
          }}
        />
      </ButtonGroup>

      {isEditing && (
        <EditTask
          prevValue={body}
          isOpen={isEditing}
          onClose={onClose}
          id={id}
        />
      )}
    </Box>
  );
};

const ToDoList = () => {
  // get to do array from state
  const { todoList } = useAppSelector((state) => state.todoList);
  const dispatch = useAppDispatch();
  const toast = useToast();

  // delete and mark as complete task by calling reducers
  const markTaskAsComplete = (id: number): void => {
    dispatch(markComplete({ id }));
  };

  const deleteTask = (id: number): void => {
    dispatch(deleteToDo({ id }));

    toast({
      description: "Task deleted successfully",
      status: "success",
      isClosable: true,
      duration: 1000,
      position: "top",
    });
  };

  return (
    <Box
      width="100%"
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {todoList.length === 0 && <Text>No Tasks found</Text>}
      {todoList.length > 0 && (
        <Box
          width="100%"
          display={"flex"}
          flexWrap={"wrap"}
          gap={4}
          alignItems={"center"}
        >
          {todoList.map((task: ITask) => {
            return (
              <Task
                key={task.id}
                task={task}
                onDeleteTask={deleteTask}
                onMarkCompleteTask={markTaskAsComplete}
              />
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default ToDoList;
