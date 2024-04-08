"use client";
import { createContext, useState, useContext } from "react";
import { v4 as uuidv4 } from 'uuid'
import Tost from "../components/Tost";
import TostDelete from "../components/TostDelete";
const TodoContext = createContext([]);

const TodoProvider = ({ children }) => {
    const [Todos , setTodos] = useState([])
    const [ShowTost,setShowTost] = useState(false)
    const [massig,setMasig] = useState('')
    const [ShowTostDeleat,setShowTostDeleat] = useState(false)

    const handelShowTost = (msi) => {
      setShowTost(true)
      setTimeout(() => {
        setShowTost(false)
      }, 2000)
      setMasig(msi)
    }

    const handelShowTostdeleat = (msi) => {
      setShowTostDeleat(true)
      setTimeout(() => {
        setShowTostDeleat(false)
      }, 2000)
    }
  return (
    <TodoContext.Provider value={{Todos , setTodos,handelShowTost,handelShowTostdeleat}}>
      {children}
      <Tost open={ShowTost} massig={massig}/>
      <TostDelete open={ShowTostDeleat}/>
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  return useContext(TodoContext);
};

export default TodoProvider;
