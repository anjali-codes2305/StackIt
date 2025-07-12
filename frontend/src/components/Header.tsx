// src/components/Header.tsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Plus, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  const isActive = (path: string): boolean => location.pathname === path;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              StackIt
            </span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search questions..."
                className="pl-10 bg-slate-800/50 border-slate-600 focus:border-blue-500 focus:ring-blue-500/20 rounded-2xl"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-2">
            <Link to="/">
              <Button
                variant={isActive("/") ? "default" : "ghost"}
                className={`rounded-xl ${
                  isActive("/") ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-slate-800"
                }`}
              >
                Home
              </Button>
            </Link>

            <Link to="/ask">
              <Button
                variant={isActive("/ask") ? "default" : "ghost"}
                className={`rounded-xl ${
                  isActive("/ask") ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-slate-800"
                }`}
              >
                <Plus className="w-4 h-4 mr-2" />
                Ask
              </Button>
            </Link>

            <Link to="/login">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl hover:bg-slate-800"
                aria-label="Login"
              >
                <User className="w-4 h-4" />
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
