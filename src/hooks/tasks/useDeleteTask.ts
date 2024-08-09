import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../../api/tasks";
import { toast } from "react-toastify";

export const useDeleteMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("updated!");
    },
    onError(res) {
      console.error(res);
      toast.error("action failed. please try again");
    },
  });
};
