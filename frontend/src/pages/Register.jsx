import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, Building, Phone } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    company: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao registrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 to-primary-800 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="card p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Cadastre-se</h1>
            <p className="text-gray-400">Crie sua conta na AutoRevenda</p>
          </div>

          {error && (
            <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nome */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Nome Completo</label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-500" size={20} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Seu nome"
                  className="w-full bg-primary-700 border border-primary-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent-600"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-500" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="seu@email.com"
                  className="w-full bg-primary-700 border border-primary-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent-600"
                />
              </div>
            </div>

            {/* Empresa */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Nome da Empresa</label>
              <div className="relative">
                <Building className="absolute left-3 top-3 text-gray-500" size={20} />
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  placeholder="Sua revenda"
                  className="w-full bg-primary-700 border border-primary-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent-600"
                />
              </div>
            </div>

            {/* Telefone */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Telefone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 text-gray-500" size={20} />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(11) 9999-9999"
                  className="w-full bg-primary-700 border border-primary-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent-600"
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-500" size={20} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Mínimo 6 caracteres"
                  className="w-full bg-primary-700 border border-primary-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent-600"
                />
              </div>
            </div>

            {/* Botão */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn btn-primary"
            >
              {loading ? 'Cadastrando...' : 'Criar Conta'}
            </button>
          </form>

          {/* Link para login */}
          <div className="mt-6 text-center text-gray-400">
            Já tem conta? <Link to="/login" className="text-accent-500 hover:text-accent-400 font-medium">Entre aqui</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
