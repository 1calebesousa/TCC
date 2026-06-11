import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

export default function VehicleFilters({ onFilter }) {
  const [filters, setFilters] = useState({
    brand: '',
    fuel: '',
    minPrice: '',
    maxPrice: ''
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const fuels = ['Gasolina', 'Diesel', 'Etanol', 'Híbrido', 'Elétrico'];
  const brands = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'Fiat', 'Volkswagen', 'Hyundai', 'BMW', 'Mercedes'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
  };

  const handleSearch = () => {
    onFilter(filters);
  };

  const handleReset = () => {
    setFilters({ brand: '', fuel: '', minPrice: '', maxPrice: '' });
    onFilter({ brand: '', fuel: '', minPrice: '', maxPrice: '' });
  };

  return (
    <div className="bg-primary-800 rounded-xl border border-primary-700 p-6 mb-8">
      <div className="flex items-center gap-4 mb-4">
        <Search size={20} className="text-accent-600" />
        <input
          type="text"
          placeholder="Buscar marca..."
          name="brand"
          value={filters.brand}
          onChange={handleChange}
          className="flex-1 bg-primary-700 border border-primary-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-accent-600"
        />
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="p-2 rounded-lg bg-primary-700 hover:bg-accent-600 transition text-gray-300"
        >
          <SlidersHorizontal size={20} />
        </button>
      </div>

      {showAdvanced && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 pt-4 border-t border-primary-700">
          {/* Combustível */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Combustível</label>
            <select
              name="fuel"
              value={filters.fuel}
              onChange={handleChange}
              className="w-full bg-primary-700 border border-primary-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-accent-600"
            >
              <option value="">Todos</option>
              {fuels.map(fuel => (
                <option key={fuel} value={fuel}>{fuel}</option>
              ))}
            </select>
          </div>

          {/* Preço Mínimo */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Preço Mín.</label>
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleChange}
              placeholder="R$ 0"
              className="w-full bg-primary-700 border border-primary-600 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-accent-600"
            />
          </div>

          {/* Preço Máximo */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Preço Máx.</label>
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleChange}
              placeholder="R$ 999999"
              className="w-full bg-primary-700 border border-primary-600 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-accent-600"
            />
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={handleSearch}
          className="btn btn-primary flex-1"
        >
          Buscar
        </button>
        <button
          onClick={handleReset}
          className="btn btn-secondary"
        >
          Limpar
        </button>
      </div>
    </div>
  );
}
