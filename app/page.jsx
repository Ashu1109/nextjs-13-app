import React from "react";
import From from './addTodoForm'
import { Suspense } from 'react'
import  Todoed  from "./todos";
import  Loading  from './loading'
const Todos = async () => {
  return (
    <div className="container">
    <From />
    <Suspense fallback={<Loading />}>
    <Todoed />
    </Suspense>
  </div>
  );
};

export default Todos;
 