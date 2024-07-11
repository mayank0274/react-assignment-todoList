import ToDoForm from "./components/ToDoForm";
import { Box, Text } from "@chakra-ui/react";
import ToDoList from "./components/ToDoList";

const App = () => {
  return (
    <Box
      width={"100%"}
      minH={"100vh"}
      display="flex"
      flexDirection={"column"}
      gap={15}
      alignItems={"center"}
      backgroundColor={"#f6f6f6"}
    >
      <Box
        width={{ base: "92%", sm: "92%", md: "50%", lg: "45%" }}
        display="flex"
        flexDirection={"column"}
        gap={15}
        alignItems={"center"}
      >
        <Text fontSize={"26px"} fontWeight={"bold"} my={"5"} color={"#5d13e7"}>
          Tasks List
        </Text>
        <ToDoForm />
        <ToDoList />
      </Box>
    </Box>
  );
};

export default App;
