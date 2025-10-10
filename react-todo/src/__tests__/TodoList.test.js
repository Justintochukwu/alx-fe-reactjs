import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../components/TodoList";

describe("TodoList Component", () => {
  test("renders initial todos correctly", () => {
    render(<TodoList />);
    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Build a project")).toBeInTheDocument();
  });

  test("adds a new todo", () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText("Add a new task");
    const button = screen.getByText("Add");

    // simulate user typing and submitting
    fireEvent.change(input, { target: { value: "New Todo" } });
    fireEvent.click(button);

    expect(screen.getByText("New Todo")).toBeInTheDocument();
  });

  test("toggles a todo as completed and uncompleted", () => {
    render(<TodoList />);
    const todoItem = screen.getByText("Learn React");

    // Initially not completed
    expect(todoItem).toHaveStyle("text-decoration: none");

    // Toggle to completed
    fireEvent.click(todoItem);
    expect(todoItem).toHaveStyle("text-decoration: line-through");

    // Toggle back to uncompleted
    fireEvent.click(todoItem);
    expect(todoItem).toHaveStyle("text-decoration: none");
  });

  test("deletes a todo", () => {
    render(<TodoList />);
    const deleteButtons = screen.getAllByText("Delete");
    fireEvent.click(deleteButtons[0]); // delete first todo
    expect(screen.queryByText("Learn React")).not.toBeInTheDocument();
  });
});
