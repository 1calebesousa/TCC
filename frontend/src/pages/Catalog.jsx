import { useEffect, useState } from 'react';
import { vehiclesAPI } from '../api/client';
import VehicleCard from '../components/VehicleCard';
import VehicleFilters from '../components/VehicleFilters';
import { Loader } from 'lucide-react';

export default function Catalog() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async (filters = {}) => {
    try {
      setLoading(true);
      const { data } = await vehiclesAPI.getAllVehicles(filters);
      setVehicles(data.vehicles);
      setError('');
    } catch (err) {
      setError('Erro ao carregar veículos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (filters) => {
    fetchVehicles(filters);
  };

  return (
    <div className="min-h-screen bg-primary-900">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Catálogo de Veículos</h1>
          <p className="text-gray-400">Encontre o carro perfeito para você</p>
        </div>

        {/* Filtros */}
        <VehicleFilters onFilter={handleFilter} />

        {/* Conteúdo */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader className="animate-spin text-accent-600" size={40} />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-400 text-lg">{error}</p>
          </div>
        ) : vehicles.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Nenhum veículo encontrado</p>
          </div>
        ) : (
          <>
            <p className="text-gray-400 mb-6">{vehicles.length} veículos encontrados</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map(vehicle => (
                <VehicleCard key={vehicle._id} vehicle={vehicle} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
