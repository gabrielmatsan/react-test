import { Home, Pizza, UtensilsCrossed } from "lucide-react";
import { Link } from "react-router-dom";
import { AccountMenu } from "./account-menu";
import { NavLink } from "./nav-link";
import { ThemeToogle } from "./theme/theme-toogle";
import { Separator } from "./ui/separator";

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <Pizza className="h-6 w-6" />

        <Separator orientation="vertical" className="h-6" />

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <Link to="/">
            <Home className="h-4 w-4" />
            Início
          </Link>

          <NavLink to="/orders">
            <UtensilsCrossed className="h-4 w-4" />
            Pedidos
          </NavLink>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToogle />
          <AccountMenu />
        </div>
      </div>
    </div>
  );
}
