"use client";

import { useFormState } from "react-dom";
import { createTodo } from "@/actions/createTodo";
import { SubmitButton } from "./SubmitButton";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const initialState = {
  message: null,
};

function AddToDo() {
  const [todo, setTodo] = useState("");
  const [state, formAction] = useFormState(createTodo, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.success) setTodo("");
    toast({
      title: "To Do added successfully",
      variant: "default"
    });
  }, [state?.success, toast]);

  return (
    <form action={formAction}>
      <Label htmlFor="todo">Enter Task:</Label>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="text"
          placeholder="add todo item"
          name="todo"
          value={todo}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTodo(e.target.value)
          }
        />
        <SubmitButton />
      </div>
      {!state.success && (
        <p aria-live="polite" className="text-red-500">
          {state?.message}
        </p>
      )}
    </form>
  );
}

export default AddToDo;
