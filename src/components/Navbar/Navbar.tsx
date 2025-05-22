import { Menu } from "lucide-react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { useProductCartState } from "../../store/ProductCartState";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import CartButton from "./CartButton";

const Navbar = () => {
  const { user, logout } = useAuth();

  const ProductCartState = useProductCartState();
  const { cartItems } = ProductCartState.getState();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname.includes("/login");

  return (
    <header className={`w-full scale-z-100 bg-none`}>
      <div className="px-4 mx-auto flex h-16 items-center justify-between">
        {/* Left: Logo or Brand */}
        <div className="text-xl font-semibold tracking-tight flex items-baseline gap-10">
          <div>
            <Link
              to="/"
              className="font-sans text-2xl font-light text-blue-900 tracking-wider uppercase border-b border-gray-300"
            >
              Aesthetica
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-md font-medium text-muted-foreground hover:text-foreground ${
                  isActive ? "text-red-800" : "text-muted-foreground"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `text-md font-medium text-muted-foreground hover:text-foreground ${
                  isActive ? "text-red-800" : "text-muted-foreground"
                }`
              }
            >
              Contact
            </NavLink>
          </nav>
        </div>

        {/* Right: User actions */}
        <div className="flex items-center gap-4">
          <CartButton count={cartItems.length} />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  // Highlight if on /profile
                  onClick={() => navigate("/admin/profile")}
                  className={
                    location.pathname === "/admin/profile"
                      ? "bg-gray-100 font-semibold"
                      : ""
                  }
                >
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate("/admin/manage-products")}
                  className={
                    location.pathname === "/admin/manage-products"
                      ? "bg-gray-100 font-semibold"
                      : ""
                  }
                >
                  Manage Posts
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline">
              {isLoginPage ? (
                <Link to="/auth/sign-up" className="text-lg">
                  Signup
                </Link>
              ) : (
                <Link to="/auth/login" className="text-lg">
                  Login
                </Link>
              )}
            </Button>
          )}
        </div>

        {/* Mobile menu (optional) */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
