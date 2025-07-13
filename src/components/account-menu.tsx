import { getManagerRestaurant } from "@/api/get-manager-restaurant";
import { getProfile } from "@/api/get-profile";
import { signOut } from "@/api/sign-out";
import {
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Building, ChevronDown, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { StoreProfileDialog } from "./store-profile-dialog";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger } from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "./ui/dropdown-menu";
import { Skeleton } from "./ui/skeleton";

export function AccountMenu() {
  const navigate = useNavigate();
  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    staleTime: Infinity,
  });
  const { data: managerRestaurant, isLoading: isLoadingManagerRestaurant } =
    useQuery({
      queryKey: ["manager-restaurant"],
      queryFn: getManagerRestaurant,
      staleTime: Infinity,
    });

  const { mutateAsync: signOutFn, isPending: isSigningOut } = useMutation({
    mutationFn: signOut,
    onSuccess() {
      navigate("/sign-in", { replace: true });
    },
  });
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="flex items-center gap-2 select-none"
            variant="outline"
          >
            {isLoadingManagerRestaurant ? (
              <Skeleton className="h-4 w-40" />
            ) : (
              managerRestaurant?.name
            )}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col">
            {isLoadingProfile ? (
              <Skeleton className="h-4 w-40" />
            ) : (
              <span className="text-sm font-normal">{profile?.name}</span>
            )}
            <span className="text-muted-foreground text-sm font-normal">
              {isLoadingProfile ? (
                <Skeleton className="h-4 w-40" />
              ) : (
                profile?.email
              )}
            </span>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <Building className="mr-2 h-4 w-4" />
              <span className="">Perfil da loja</span>
            </DropdownMenuItem>
          </DialogTrigger>

          <DropdownMenuSeparator />
          <DropdownMenuItem
            asChild
            className="text-rose-500 dark:text-rose-400"
            disabled={isSigningOut}
          >
            <button
              className="w-full"
              type="button"
              onClick={() => signOutFn()}
            >
              <LogOut className="mr-2 h-4 w-4" />
            </button>

            <span className="">Sair</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <StoreProfileDialog />
    </Dialog>
  );
}
