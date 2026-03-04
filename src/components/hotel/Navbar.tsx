import { useState, useEffect, useRef } from "react";
import { Moon, Sun, User, Menu, X, Home, Sparkles } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const lastScrollYRef = useRef(0);
  const tickingRef = useRef(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const isSupportPage = location.pathname === "/support";
  const isHomePage = location.pathname === "/";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);

    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!tickingRef.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const lastScrollY = lastScrollYRef.current;
          const scrollDifference = Math.abs(currentScrollY - lastScrollY);

          // Ignore micro scroll movements (less than 3px) to prevent jitter
          if (scrollDifference < 3) {
            tickingRef.current = false;
            return;
          }

          // At top of page - always expanded
          if (currentScrollY < 10) {
            setIsCompact(false);
          }
          // Scrolling down - compact navbar (after 50px scroll)
          else if (currentScrollY > lastScrollY && currentScrollY > 50) {
            setIsCompact(true);
          }
          // Scrolling up - expand navbar
          else if (currentScrollY < lastScrollY) {
            setIsCompact(false);
          }

          lastScrollYRef.current = currentScrollY;
          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-[100]",
        "transition-all duration-300 ease-in-out",
        "transform-gpu",
        // Horizontal expansion/contraction
        isCompact
          ? "w-[85%] max-w-2xl"  // Compact: narrower width
          : "w-[95%] max-w-6xl"  // Expanded: full width
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between",
          "backdrop-blur-xl bg-background/70 dark:bg-background/70",
          "border border-border/40",
          "rounded-full",
          // Shadow and padding transitions smoothly based on state
          "transition-all duration-300 ease-in-out",
          isCompact
            ? "shadow-md shadow-black/5 dark:shadow-black/15 px-4 py-3 h-14"
            : "shadow-lg shadow-black/5 dark:shadow-black/20 px-6 py-3.5 h-16"
        )}
        style={{
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          // Keep height constant to prevent vertical layout shift
          minHeight: "56px",
          maxHeight: "64px",
        }}
      >
        {/* Left: Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 min-w-0 flex-shrink-0"
        >
          <span className="text-lg md:text-xl font-bold font-serif text-foreground hover:opacity-80 transition-opacity">
            GetMyHotels
          </span>
        </Link>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/"
            className={cn(
              "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium",
              "text-foreground/80 hover:text-foreground hover:bg-muted/50",
              "transition-all duration-200",
              isHomePage && "text-foreground font-semibold bg-muted/30"
            )}
          >
            <Home className="w-4 h-4" />
            Home
          </Link>



          <Link
            to="/support"
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium",
              "text-foreground/80 hover:text-foreground hover:bg-muted/50",
              "transition-all duration-200",
              isSupportPage && "text-foreground font-semibold bg-muted/30"
            )}
          >
            Customer Support
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={cn(
            "md:hidden p-2 rounded-full",
            "bg-muted/50 hover:bg-muted",
            "text-foreground/70 hover:text-foreground",
            "transition-all duration-200",
            "flex items-center justify-center"
          )}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-4 h-4" />
          ) : (
            <Menu className="w-4 h-4" />
          )}
        </button>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={cn(
              "p-2 rounded-full",
              "bg-muted/50 hover:bg-muted",
              "text-foreground/70 hover:text-foreground",
              "transition-all duration-200",
              "flex items-center justify-center"
            )}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          {/* Profile Icon / User Menu */}
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div role="button" className="flex items-center gap-2 px-2 py-1.5 rounded-full hover:bg-muted/50 transition-colors cursor-pointer select-none">
                  <div className="bg-primary/10 p-1.5 rounded-full">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium hidden sm:block max-w-[100px] truncate">
                    {user.name}
                  </span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/my-account")}>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/my-account")} className="sm:hidden">
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              to="/signin"
              className={cn(
                "p-2 rounded-full",
                "bg-muted/50 hover:bg-muted",
                "text-foreground/70 hover:text-foreground",
                "transition-all duration-200",
                "flex items-center justify-center"
              )}
              aria-label="Sign In"
            >
              <User className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className={cn(
            "md:hidden mt-4",
            "backdrop-blur-xl bg-background/90 dark:bg-background/90",
            "border border-border/40 rounded-2xl",
            "shadow-lg shadow-black/5 dark:shadow-black/20",
            "p-4 animate-fade-in"
          )}
        >
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className={cn(
              "block px-4 py-3 rounded-lg",
              "text-sm font-medium",
              "text-foreground/80 hover:text-foreground hover:bg-muted/50",
              "transition-all duration-200",
              isHomePage && "text-foreground font-semibold bg-muted/30"
            )}
          >
            <div className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Home
            </div>
          </Link>



          <Link
            to="/support"
            onClick={() => setIsMobileMenuOpen(false)}
            className={cn(
              "block px-4 py-3 rounded-lg",
              "text-sm font-medium",
              "text-foreground/80 hover:text-foreground hover:bg-muted/50",
              "transition-all duration-200",
              isSupportPage && "text-foreground font-semibold bg-muted/30"
            )}
          >
            Customer Support
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
