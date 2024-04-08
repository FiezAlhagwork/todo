"use client";

import { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import styles from "../page.module.css";
// Icon
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, TextField } from "@mui/material";

import { useTodo } from "../context/TodoProvider";

const Todo = ({ todo }) => {
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [updatedTodo,setUpdateTods] = useState({title:todo.title,details:todo.body})
  const {Todos , setTodos,handelShowTost,handelShowTostdeleat} = useTodo()

  


  //HANDELAR open and close dialog

  const handelOpenDialogDelete =  () => {
      setShowDelete(true)
  }
  const handelCloseDialogDelete =  () => {
      setShowDelete(false)
  }
  const handelOpenDialogUpdata =  () => {
      setShowUpdate(true)
  }
  const handelCloseDialogUpdata =  () => {
      setShowUpdate(false)
  }

  //HANDELAR DELEATE TODO
  const handelDeleletTodo = () => {
      // setTodos(Todos.filter((t) => t.id !== todo.id))
      const updateTodo = Todos.filter((t) => t.id !== todo.id)
      setTodos(updateTodo)
      handelShowTostdeleat()
      // localStorage.setItem("todos",JSON.stringify(updateTodo))
  }

  //HANDELAR isCOMLETED TODO
    const handelCompletedTodo = () => {
        const updataTodo = Todos.map((t) => {
          if(t.id === todo.id){
            return {...t,iscompleted : !t.iscompleted}
          } 

          return t
        })
        setTodos(updataTodo)
        // localStorage.setItem("todos",JSON.stringify(updataTodo))
        if(Todos.find((t) => t.id === todo.id )?.iscompleted === false){
          handelShowTost("تم الانجاز بنجاح")
        }


    }




    //HANDELAR EDIT TODO
   const  handelEditTodo =  () => {
     const updataTodo = Todos.map((t) => {
      if(t.id === todo.id){
        return {...t,title:updatedTodo.title,body:updatedTodo.details}
      }
      else{
        return t
      }

     })

     setTodos(updataTodo)
    //  localStorage.setItem("todos",JSON.stringify(updataTodo))
     setShowUpdate(false)
     handelShowTost("تم تعديل بنجاح ")
   }
  
  return (
    <>
      <div>
        <Dialog
          style={{ direction: "rtl" }}
          open={showDelete}
          onClose={handelCloseDialogDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            هل أنت متاكد من رغبتك في حذف المهمة؟
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              لا يمكنمك التراجع عن الحذق بعد أتمامه
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handelCloseDialogDelete}>إغلاق</Button>
            <Button onClick={handelDeleletTodo} autoFocus style={{ color: "#d50000" }}>
              نعم قم بالحذف
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Dialog
        style={{ direction: "rtl" }}
        open={showUpdate}
        onClose={handelCloseDialogUpdata}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">تعديل المهمة</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="عنوان المهمة"
            fullWidth
            variant="standard"
            value={updatedTodo.title}
            onChange={(e) => {
                setUpdateTods({...updatedTodo,title:e.target.value})
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="التفاصيل"
            fullWidth
            variant="standard"
            value={updatedTodo.details}
            onChange={(e) => {
                setUpdateTods({...updatedTodo,details:e.target.value})
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button style={{ color: "#d50000" }} onClick={handelCloseDialogUpdata}>إغلاق</Button>
          <Button autoFocus onClick={handelEditTodo}>تأكيد</Button>
        </DialogActions>
      </Dialog>
      <Container
        sx={{
          marginBottom: "20px",
          Width: "80%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card
          className={styles.todoCard}
          sx={{
            width: "100%",
            background: "#283593",
            color: "white",
            margin: "15px 12px",
          }}
        >
          <CardContent sx={{display:"flex",justifyContent:"space-between"}}>
            <Box sx={{display:"flex",flexDirection:"column",alignItems:"flex-start",justifyContent:"center"}}>
              <Typography
                variant="h5"
                sx={{
                  textAlign: "right",
                  textDecoration: todo.iscompleted ? `line-through` : "none",
                }}
              >
                {todo.title}
              </Typography>
              <Typography
                variant="p"
                sx={{
                  textAlign: "right",
                  width: "60%",
                  wordWrap: "break-word",
                }}
              >
                {todo.body}
              </Typography>
            </Box>

            {/* start icons */}
            <Box sx={{display:"flex", flexDirection:{xs:"column" , sm:"row"},alignItems:"center",justifyContent:"center"}}>
              <IconButton
                className=""
                aria-label="delete"
                style={{
                  color: todo.iscompleted ? "white" : "#8bc34a",
                  border: "solid #8bc34a 3px",
                  background: todo.iscompleted ? "#8bc34a" : "white",
                }}
                onClick={handelCompletedTodo}
              >
                <CheckIcon />
              </IconButton>

              <IconButton
                className={styles.iconButton}
                aria-label="delete"
                sx={{
                  color: "#1769aa ",
                  background: "white",
                  border: "solid #1769aa 3px",
                  margin: "3px "
                }}
                onClick={handelOpenDialogUpdata}
              >
                <EditIcon />
              </IconButton>

              <IconButton
                className={styles.iconButton}
                aria-label="delete"
                style={{
                  color: "#d50000",
                  background: "white",
                  border: "solid #d50000 3px",
                }}
                onClick={handelOpenDialogDelete}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
            {/* end icons */}
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default Todo;


