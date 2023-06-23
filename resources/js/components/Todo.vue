<template>
    <div class="container">
        <div class="row justify-content-center mt-5">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Todo</div>

                    <div class="card-body">

                        <div class="card-body">
                            <div class="input-group">
                                <input type="text" class="form-control" v-model="todo_input" placeholder="Add new todo" aria-label="Add new todo" aria-describedby="button-addon2">
                                <div class="input-group-append">
                                    <button v-if="!edit_todo_id" class="btn btn-outline-secondary" type="button" id="button-addon2" @click="saveTodo()">Add</button>
                                    <button v-else class="btn btn-outline-secondary" type="button" id="button-addon2" @click="updateTodo()">Update</button>
                                </div>
                            </div>

                        </div>
                        <button  class="btn btn-outline-secondary" type="button" id="button-addon2" @click="resetTodo()">Reset</button>
                        <table class="table table-bordered mt-4">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Todo</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(todo, index) in todos" :key="index">
                                    <th scope="row">{{ ++index }}</th>
                                    <td>{{todo.name}}</td>
                                    <td>
                                        <button class="btn btn-sm btn-info" @click="editTodo(--index)">Edit</button>
                                        <button class="btn btn-sm btn-danger" @click="deleteTodo(--index)">Delete</button>
                                    </td>
                                </tr>


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                todos: [],
                api: 'http://localhost:8000/api/todos',
                todo_input: '',
                edit_todo_id: '',
                edit_index: ''
            }
        },
        mounted(){
            // this.getTodos();
            this.axios.get(this.api)
                .then(response => {
                    // console.log(response.data);
                    this.todos = response.data;
                })
                .catch(error => {
                    console.log(error);
                })
        },
        methods:{
            saveTodo(){
                if(this.todo_input.length > 0){
                    this.axios.post(this.api, {
                        name: this.todo_input
                    })
                        .then(response => {

                            this.todos.push(response.data);
                            this.todo_input = '';
                        })
                        .catch(error => {
                            console.log(error);
                        })
                }
            },
            deleteTodo(index){
                this.axios.delete(this.api + '/' + this.todos[index].id)
                    .then(response => {
                        this.todos.splice(index, 1);
                    })
                    .catch(error => {
                        console.log(error);
                    })
            },
            editTodo(index){
                if(this.todos[index].id){
                    this.todo_input = this.todos[index].name;
                    this.edit_todo_id=this.todos[index].id;
                    this.edit_index = index;
                }
            },
            updateTodo(){
                if(this.todo_input.length > 0){
                    this.axios.put(this.api + '/' + this.todos[this.edit_index].id, {
                        name: this.todo_input
                    })
                        .then(response => {
                            this.todos[this.edit_index].name = response.data.name;
                            this.resetTodo();
                        })
                        .catch(error => {
                            console.log(error);
                        })
                }
            },
            resetTodo(){
                this.todo_input = '';
                this.edit_todo_id = '';
                this.edit_index = '';
            },
        }
    }
</script>
