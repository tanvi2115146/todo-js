import {showForm, signupUser,loginUser,logoutUser } from "./auth.js";
import { debouncedSearch, nextPage, prevPage, searchTodos ,updateSortOrder } from "./todo.js";

export{saveTodo,saveTodoToLocal,getTodos,editTodo,deleteTodo,loadTodos,
    saveEditedTodo,updateTaskList ,sortTodos,updateSortOrder}from "./todo.js"


window.searchTodos = searchTodos;
document.getElementById("sign-btn").addEventListener("click",()=>showForm("form1"));
document.getElementById("Login").addEventListener("click",()=>showForm("form2"));

document.getElementById("form1").addEventListener("submit", signupUser);
document.getElementById("form2").addEventListener("submit", loginUser);


document.getElementById("logoutBtn").addEventListener("click", logoutUser);

document.getElementById("searchInput").addEventListener("input", debouncedSearch);

document.getElementById("sortTodos").addEventListener("change", updateSortOrder);

document.getElementById("prevPageBtn").addEventListener("click",()=>prevPage);

document.getElementById("nextPageBtn").addEventListener("click",()=>nextPage);



//dynamic delay

function randomDelay() {
    return Math.floor(Math.random() * (1000 - 200 + 1)) + 200;
}

setTimeout(() => {
    console.log("Executed after random delay");
}, randomDelay());
