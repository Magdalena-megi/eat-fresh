import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { FavoriteToastProps } from "@/types";

export default function FavoriteToast({ message }: FavoriteToastProps) {
  const { toast } = useToast();

  useEffect(() => {
    if (message) {
      toast({
        description: message,
        duration: 3000,
      });
    }
  }, [message, toast]);

  return null;
}
