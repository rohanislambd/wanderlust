"use client"
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { Trash2Icon } from "lucide-react";
import { redirect } from "next/navigation";

const DeleteDestination = ({id}:{id:string}) => {

    const handleDeleteDestination = async() => {
       const res  = await fetch(`http://localhost:8000/destination/${id}`,{
        method: "DELETE"
       })
       const data = await res.json();
       redirect('/destinations')
    }
  return ( 
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant={'destructive'}><Trash2Icon aria-hidden />Delete</Button>}>
        Show Dialog
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteDestination}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDestination;
