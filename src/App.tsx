import React, {Fragment, useState} from 'react';

type FormElem = React.FormEvent<HTMLFormElement>
type InputElem = React.ChangeEvent<HTMLInputElement>

interface ITodo {
  text: string,
  complete: boolean
}

function App(): JSX.Element {
  const [value, setValue] = useState<string>('')
  const [todos, setTodos] = useState<ITodo[]>([]);

  const handleInputChange = (e: InputElem): void => {
    setValue(e.target.value)
  }

  const handleSubmit = (e: FormElem): void => {
    e.preventDefault();
    addTodo(value)
    setValue('');
  };

  const addTodo = (text: string): void => {
    const newTodos: ITodo[] = [...todos, {text, complete: false}]
    setTodos(newTodos)
  }

  const completeTodo = (index: number): void => {
    const newTodos: ITodo[] = todos
    newTodos[index].complete = !newTodos[index].complete
    setTodos(newTodos)
  }

  const removeTodo = (index:number): void => {
    const newTodos: ITodo[] = todos
    newTodos.splice(index, 1)
    setTodos(newTodos)
  }
  return (
    <Fragment>
      <h1>Todolist</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          required={true}
        />
        <button type="submit">Add Todo</button>
      </form>
      <section>
        {todos.map((todo: ITodo, index: number) => (
          <div key={index} style={{display: 'flex'}}>
            <div 
              style={{ textDecoration: todo.complete ? 'line-through' : '' }}
            >
              {todo.text}
            </div>
            <button type="button" onClick={() => completeTodo(index)}>
              {todo.complete ? 'Incomplete' : 'Complete'}
            </button>
            <button onClick={() => removeTodo(index)}>x</button>
          </div>
        ))}
      </section>
    </Fragment>
  )
}

export default App;
