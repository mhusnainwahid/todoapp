const supabaseUrl = "https://zgpkwkoxdsinjidhealg.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpncGt3a294ZHNpbmppZGhlYWxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3OTA0OTcsImV4cCI6MjA1NzM2NjQ5N30.huvK-TgvZlCekwOF1-S8MC7un_emHghQ8bqGfK0Okw0";
const supabasePro = supabase.createClient(supabaseUrl,supabaseKey);
console.log(supabasePro);



const userInp = document.getElementById("inp1");
var Task = document.getElementById("task");
var list = document.getElementById("ctn");
const ol = document.getElementById("todo-list");
ol.classList.add("list-group", "list-group-numbered");
const listBtn = document.getElementById("list-btn")


// console.log(ol)

async function addTodoToUi(){
  const { data, error } = await supabasePro
  .from('todos')
  .select()
  console.log(data)
  for(var i = 0; i <= data.length; i++){
    // console.log(i)
    const li = document.createElement("li");
    li.innerHTML = `<span class="span-task">${data[i].task}</span>
                    <div class="task-btn">                          
                    <button class="btn btn-warning" onclick="completeTodo(${data[i].id})">Completed</button>
                    <button  class="btn btn-danger" onclick="deleteTodos(${data[i].id})">Delete</button>
                    <div/>`
    li.classList.add("list-group-item");  
    ol.appendChild(li)  
  }
}
 

async function loadTodos() {
  inp = userInp.value;
  console.log(inp)
  
  const { error } = await supabasePro
  .from('todos')
  .insert({ task: inp })
  if(!error){
    alert("Todo add");
  }else{
    console.log(error)
  }
  listBtn.classList.add("d-none")
}

addTodoToUi()

async function deleteTodos(id){
  console.log(id)
  const response = await supabasePro
  .from('todos')
  .delete()
  .eq('id', id)
  window.location.reload()

}


function switchlist(){
  Task.classList.add("hidden")
  list.classList.remove("hidden")
}


function switchtotask(){
  window.location.reload()
}


function goToTodosList(){
  Task.classList.add("hidden")
  list.classList.remove("hidden")
  listBtn.classList.add("d-none")
}

async function completeTodo(id){
  alert("Task Complete! ")
  const response = await supabasePro
  .from('todos')
  .delete()
  .eq('id', id)
  window.location.reload()
}