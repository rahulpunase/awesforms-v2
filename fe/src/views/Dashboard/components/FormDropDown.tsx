import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { APP_NAMES } from "@/lib/configs/router-config/constants";
import { FormDetails } from "@/models";
import { Delete, Edit, File, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";

const FormDropDown = ({
  children,
  formDetail,
}: {
  children: React.ReactElement;
  formDetail: FormDetails;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{formDetail.displayName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <NavLink
            className="flex w-full"
            to={`/${APP_NAMES.Builder}/${formDetail.id}`}
          >
            <Edit className="w-4 h-4 mr-2 cursor-pointer" /> Edit
          </NavLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <File className="w-4 h-4 mr-2 cursor-pointer" /> Reports
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="w-4 h-4 mr-2 cursor-pointer" /> Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-rose-500">
          <Delete className="w-4 h-4 mr-2 cursor-pointer" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FormDropDown;
