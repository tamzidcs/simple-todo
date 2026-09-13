import DropDown from "../DropDown/DropDown";
import "./TodoList.scss";
import Todo from "../Todo/Todo";
import Button from "../Button/Button";
import type { userNameListItem } from "../../../interfaces/userNameListItem";
import type { todo } from "../../../interfaces/todo";
import DatePicker from "../DatePicker/DatePicker";

interface TodoListProps {
  todoList: todo[];
  userNameList: userNameListItem[];
  // eslint-disable-next-line no-unused-vars
  updateUserShareName: (username: string) => void;
  // eslint-disable-next-line no-unused-vars
  handleShareTodo: (todoId: string) => void;
  // eslint-disable-next-line no-unused-vars
  handleTodoDone: (todoId: string, updateFields: {}) => void;
  // eslint-disable-next-line no-unused-vars
  handleDueDateChange: (todoId: string, dueDate: string) => void;
}

export function TodoList({
  todoList,
  userNameList,
  updateUserShareName,
  handleShareTodo,
  handleTodoDone,
  handleDueDateChange
}: TodoListProps) {
  return (
    <div className="to-do-list-container">
      <div className="todolist box">
        {todoList.length > 0 ? (
          todoList.map((todoItem) => (
            <div
              className="todo-container"
              key={todoItem.id}
              data-testid="todo"
            >
              <Todo todoItem={todoItem} />
              <div className="todo-bottom">
                <div className="todo-bottom-left">
                  <DropDown
                    userNameList={userNameList}
                    updateUserShareName={updateUserShareName}
                  />
                  <Button
                    className="button share-button"
                    testId="share-button"
                    text="Share"
                    type="button"
                    onClick={() => handleShareTodo(String(todoItem.id))}
                  />
                </div>
                <div className="todo-bottom-right">
                  <DatePicker
                    id="due-date-todolist"
                    className={"due-date-todolist"}
                    testId={"due-date-todolist"}
                    value={todoItem.dueDate}
                    onChange={(e) =>
                      handleDueDateChange(String(todoItem.id), e.target.value)
                    }
                  />
                  <Button
                    className="button done-button"
                    testId={`todo-done-button-${todoItem.id}`}
                    text="Done"
                    type="button"
                    onClick={() => handleTodoDone(String(todoItem.id),{status: "done"})}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-todo-text">
            There are no todos in your list.
          </div>
        )}
      </div>
    </div>
  );
}
export default TodoList;
