"use client";
import Image from "next/image";
import styles from "./page.module.css";
import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material";
import TodoProvider from "./context/TodoProvider";

function Home() {
  const theme = createTheme({
    typography: {
      fontFamily: ["A"],
    },
    palette: {
      primary: {
        main: "#01579b",
      },
    },
  });
  return (
    <TodoProvider>
      <ThemeProvider theme={theme}>
        <div
          className="App"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            background: "#282c34",
            direction: "rtl",
            textAlign: "center",
          }}
        >
          <TodoList />
        </div>
      </ThemeProvider>
    </TodoProvider>
  );
}

export default Home;
