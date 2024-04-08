"use client";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Todo from "./Todo";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Container from "@mui/material/Container";
import { useState,useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styles from "../page.module.css";
import { useTodo } from "../context/TodoProvider";

const TodoList = () => {
  const [value, setValue] = useState("");
  const { Todos, setTodos, handelShowTost } = useTodo();
const [selected,setSelected] = useState("الكل")
  // handler

  const handelAddTask = () => {
    const NewTask = {
      id: uuidv4(),
      title: value,
      body: "",
      iscompleted: false,
    };

    const UpdateTodos = [...Todos, NewTask]
    localStorage.setItem("todos",JSON.stringify(UpdateTodos))
    setTodos(UpdateTodos);
    
    setValue("");
    handelShowTost("تم الاضافة بنجاح");
  };

  const isdISEPLD = () => {
    if (value === "") {
      return true;
    }
    return false;
  };
  //flitering 
  const isCompletd =  Todos.filter((c) => c.iscompleted == true)
  const isNotCompletd =  Todos.filter((c) => c.iscompleted == false)

  let todos = Todos

  if(selected === "المنجز"){
    todos = isCompletd
  }
  else if(selected === "الغير منجز"){
    todos = isNotCompletd
  }
  else {
    todos = Todos
  }

  const todojsx = todos.map((t) => {
    return <Todo key={t.id} todo={t} />;
  });

  const button = [
    { id: 1, name: "الكل" },
    { id: 2, name: "المنجز" },
    { id: 3, name: "الغير منجز" },
  ];

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos"));
    setTodos(storageTodos);
},[])

  return (
    <Container maxWidth="sm" style={{ paddingTop: "50px" }}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography
            variant="h2"
            sx={{ fontWeight: "bold" }}
            color="black"
            gutterBottom
          >
            مهامي
          </Typography>
          <Divider />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "30px 0 10px 0",
            }}
          >
            {button.map((b) => {
              return (
                <button onClick={() => {setSelected(b.name)}} key={b.id} class={styles.button} style={{background: selected === b.name ? "#283593":"",color:selected === b.name ? "#fff":""}} role="button">
                  {b.name}
                </button>
              );
            })}
          </div>
          <div style={{ maxHeight: "300px", overflowY: "auto" }}>{todojsx}</div>

          <Grid container spacing={2} style={{ margin: "15px 12px" }}>
            <Grid item xs={8}>
              <TextField
                id="outlined-basic"
                label="عنوان المهمة"
                variant="outlined"
                style={{ width: "100%" }}
                value={value}
                onChange={(event) => {
                  setValue(event.target.value);
                }}
              />
            </Grid>
            {/* start icons */}
            <Grid item xs={4} display="flex" alignItems={"center"}>
              <Button
                variant="contained"
                style={{ width: "100%", height: "100%", background: "#6a994e" }}
                onClick={handelAddTask}
                disabled={isdISEPLD()}
                className={isdISEPLD() ? `${styles.greaa}` : "null"}
              >
                أضاقة
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default TodoList;

{
  /* <ToggleButtonGroup
// value={displayTodosType}
exclusive
// onChange={changeDisplayType}
aria-label="text alignment"
style={{ margin: "20px 0" }}
color="primary"
>
<ToggleButton value="all">الكل</ToggleButton>
<ToggleButton value="completed">المنجز</ToggleButton>
<ToggleButton value="non-completed"> الغير المنجز </ToggleButton>
</ToggleButtonGroup> */
}
