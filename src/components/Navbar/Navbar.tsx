import { LogOut, Menu, Settings, ShoppingBag, User } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { useProductCartState } from "../../store/ProductCartState";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

const Navbar = () => {
  const { user, logout } = useAuth();
  const ProductCartState = useProductCartState();
  const { cartItems } = ProductCartState.getState();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname.includes("/login");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    closeMobileMenu();
  };

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/contact", label: "Contact" },
  ];

  const CartButton = ({ count, className = "" }) => (
    <Button
      variant="ghost"
      size="icon"
      className={`relative hover:bg-gray-100 transition-colors ${className}`}
      onClick={() => navigate("/cart")}
    >
      <ShoppingBag className="h-5 w-5" />
      {count > 0 && (
        <Badge
          variant="destructive"
          className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs font-bold"
        >
          {count > 99 ? "99+" : count}
        </Badge>
      )}
    </Button>
  );

  const UserMenu = ({ onNavigate }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.avatar} alt={user?.name || "User"} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user?.name && <p className="font-medium text-sm">{user.name}</p>}
            {user?.email && (
              <p className="w-48 truncate text-xs text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => onNavigate("/admin/profile")}
          className="cursor-pointer"
        >
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onNavigate("/admin/manage-products")}
          className="cursor-pointer"
        >
          <Settings className="mr-2 h-4 w-4" />
          Manage Posts
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            logout();
            onNavigate("/");
          }}
          className="cursor-pointer text-red-600 focus:text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <header className="w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center space-x-2 transition-opacity hover:opacity-80"
            >
              <div className="relative">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
                  Aesthetica
                </span>
                <div className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-60"></div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `relative px-3 py-2 text-sm font-medium transition-colors hover:text-blue-600 ${
                      isActive
                        ? "text-blue-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {isActive && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"></div>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Right Actions - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <CartButton count={cartItems.length} />

            {user ? (
              <UserMenu onNavigate={handleNavigation} />
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" asChild>
                  <Link to="/auth/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link to="/auth/sign-up">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-2">
            <CartButton count={cartItems.length} />

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0">
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b">
                    <Link
                      to="/"
                      onClick={closeMobileMenu}
                      className="flex items-center space-x-2"
                    >
                      <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-xl font-bold text-transparent">
                        Aesthetica
                      </span>
                    </Link>
                  </div>

                  {/* Navigation */}
                  <nav className="flex-1 p-6">
                    <div className="space-y-4">
                      {navItems.map((item) => (
                        <NavLink
                          key={item.to}
                          to={item.to}
                          onClick={closeMobileMenu}
                          className={({ isActive }) =>
                            `block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                              isActive
                                ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                                : "text-gray-700 hover:bg-gray-50"
                            }`
                          }
                        >
                          {item.label}
                        </NavLink>
                      ))}
                    </div>
                  </nav>

                  {/* User Section */}
                  <div className="border-t p-6">
                    {user ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={user?.avatar}
                              alt={user?.name || "User"}
                            />
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                              {user?.name?.charAt(0)?.toUpperCase() || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            {user?.name && (
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {user.name}
                              </p>
                            )}
                            {user?.email && (
                              <p className="text-xs text-gray-500 truncate">
                                {user.email}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() => handleNavigation("/admin/profile")}
                          >
                            <User className="mr-2 h-4 w-4" />
                            Profile
                          </Button>
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() =>
                              handleNavigation("/admin/manage-products")
                            }
                          >
                            <Settings className="mr-2 h-4 w-4" />
                            Manage Posts
                          </Button>
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => {
                              logout();
                              handleNavigation("/");
                            }}
                          >
                            <LogOut className="mr-2 h-4 w-4" />
                            Logout
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full" asChild>
                          <Link to="/auth/login" onClick={closeMobileMenu}>
                            Login
                          </Link>
                        </Button>
                        <Button className="w-full" asChild>
                          <Link to="/auth/sign-up" onClick={closeMobileMenu}>
                            Sign Up
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
