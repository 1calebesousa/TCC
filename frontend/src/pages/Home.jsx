import { Link } from 'react-router-dom';
import { ArrowRight, Star, TrendingUp, Shield, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-primary-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-600/10 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Conteúdo */}
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Encontre seu carro perfeito na <span className="text-accent-600">AutoRevenda</span>
              </h1>
              <p className="text-xl text-gray-400 mb-8">
                A plataforma moderna para compra e venda de veículos com segurança, transparência e os melhores preços.
              </p>
              
              <div className="flex gap-4 mb-8">
                <Link to="/catalog" className="btn btn-primary flex items-center gap-2">
                  Explorar Catálogo
                  <ArrowRight size={20} />
                </Link>
                <Link to="/register" className="btn btn-outline">
                  Vender Seu Carro
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-3xl font-bold text-accent-600">1000+</p>
                  <p className="text-sm text-gray-400">Veículos</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-accent-600">500+</p>
                  <p className="text-sm text-gray-400">Revendas</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-accent-600">10k+</p>
                  <p className="text-sm text-gray-400">Clientes</p>
                </div>
              </div>
            </div>

            {/* Imagem Hero */}
            <div className="relative h-96 lg:h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-accent-600/20 to-transparent rounded-2xl blur-3xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=800&h=600&fit=crop"
                alt="Carro destaque"
                className="relative w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 border-t border-primary-700">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-4 text-center">
            Por que escolher a AutoRevenda?
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Somos a plataforma mais confiável e moderna para compra e venda de veículos
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="card p-6 text-center hover:scale-105 transition">
              <div className="w-12 h-12 bg-accent-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="text-accent-600" size={24} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">100% Seguro</h3>
              <p className="text-gray-400 text-sm">Transações protegidas e verificação completa</p>
            </div>

            {/* Feature 2 */}
            <div className="card p-6 text-center hover:scale-105 transition">
              <div className="w-12 h-12 bg-accent-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-accent-600" size={24} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Melhor Preço</h3>
              <p className="text-gray-400 text-sm">Comparar preços e encontrar as melhores ofertas</p>
            </div>

            {/* Feature 3 */}
            <div className="card p-6 text-center hover:scale-105 transition">
              <div className="w-12 h-12 bg-accent-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="text-accent-600" size={24} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Rápido</h3>
              <p className="text-gray-400 text-sm">Publicar e vender seu carro em minutos</p>
            </div>

            {/* Feature 4 */}
            <div className="card p-6 text-center hover:scale-105 transition">
              <div className="w-12 h-12 bg-accent-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star className="text-accent-600" size={24} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Avaliações</h3>
              <p className="text-gray-400 text-sm">Conheça as avaliações de outros compradores</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-accent-600/10 to-transparent border-t border-primary-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Quer vender seus veículos?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Registre sua revenda e comece a vender para milhares de clientes
          </p>
          <Link to="/register" className="btn btn-primary inline-flex items-center gap-2">
            Criar Conta Agora
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
