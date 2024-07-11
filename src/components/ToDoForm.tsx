import { Box, Input, Button, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { setToDo } from "../store/features/todoList/todoSlice";

const ToDoForm = () => {
  // state for todo value
  const [body, setBody] = useState("");
  const toast = useToast();
  // dispacher for actions
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBody(e.target.value);
  };

  const handleSubmit = () => {
    if (body === "") {
      toast({
        description: "Task is required",
        status: "error",
        isClosable: true,
        duration: 1000,
        position: "top",
      });
      return;
    }

    // dispaching reducer for add to do value to list
    dispatch(setToDo({ body }));
    setBody("");
  };

  return (
    <Box display={"flex"} gap={"15"} width={"100%"} justifyContent={"center"}>
      <Input
        value={body}
        onChange={handleChange}
        type="text"
        width="80%"
        border={"1px solid #000"}
      />
      <Button width={"20%"} colorScheme="purple" onClick={handleSubmit}>
        Add task
      </Button>
    </Box>
  );
};

export default ToDoForm;
