export default function Footer() {
  return (
    <footer className="bg-primary-800 border-t border-primary-700 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Sobre */}
          <div>
            <h3 className="text-white font-bold mb-4">AutoRevenda</h3>
            <p className="text-gray-400 text-sm">
              A melhor plataforma para comprar e vender carros com segurança e transparência.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="text-white font-bold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-accent-500 transition">Catálogo</a></li>
              <li><a href="#" className="hover:text-accent-500 transition">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-accent-500 transition">Contato</a></li>
            </ul>
          </div>

          {/* Suporte */}
          <div>
            <h4 className="text-white font-bold mb-4">Suporte</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-accent-500 transition">FAQ</a></li>
              <li><a href="#" className="hover:text-accent-500 transition">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-accent-500 transition">Privacidade</a></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-white font-bold mb-4">Contato</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>📧 contato@autorevenda.com</li>
              <li>📱 (11) 9999-9999</li>
              <li>📍 São Paulo, SP</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-700 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; 2024 AutoRevenda. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
