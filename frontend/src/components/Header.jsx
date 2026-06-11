import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Car, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-primary-800 border-b border-primary-700 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-accent-600 rounded-lg group-hover:bg-accent-500 transition">
            <Car className="text-white" size={24} />
          </div>
          <span className="text-xl font-bold text-white hidden sm:block">AutoRevenda</span>
        </Link>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/catalog" className="text-gray-300 hover:text-accent-500 transition">
            Catálogo
          </Link>
          
          {user ? (
            <>
              <Link to="/dashboard" className="text-gray-300 hover:text-accent-500 transition">
                Dashboard
              </Link>
              <div className="flex items-center gap-4 pl-4 border-l border-primary-700">
                <span className="text-sm text-gray-300">{user.name}</span>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 text-gray-300 hover:text-accent-500 transition"
                >
                  <LogOut size={18} />
                  Sair
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary">
                Entrar
              </Link>
              <Link to="/register" className="btn btn-primary">
                Registrar
              </Link>
            </>
          )}
        </div>

        {/* Menu Mobile */}
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-300 hover:text-accent-500"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-primary-700 border-t border-primary-600 py-4 px-4 space-y-4">
          <Link to="/catalog" className="block text-gray-300 hover:text-accent-500">
            Catálogo
          </Link>
          {user ? (
            <>
              <Link to="/dashboard" className="block text-gray-300 hover:text-accent-500">
                Dashboard
              </Link>
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="w-full text-left text-gray-300 hover:text-accent-500"
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block btn btn-secondary">
                Entrar
              </Link>
              <Link to="/register" className="block btn btn-primary text-center">
                Registrar
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
