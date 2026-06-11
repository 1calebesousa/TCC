import { Heart, Fuel, Gauge, DoorOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function VehicleCard({ vehicle }) {
  const mainImage = vehicle.images[0]?.url || 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500&h=300&fit=crop';

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const formatMileage = (mileage) => {
    return new Intl.NumberFormat('pt-BR').format(mileage);
  };

  return (
    <Link to={`/vehicle/${vehicle._id}`}>
      <div className="card group">
        {/* Imagem */}
        <div className="relative overflow-hidden bg-primary-700 h-48">
          <img 
            src={mainImage} 
            alt={vehicle.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3 bg-accent-600 px-3 py-1 rounded-full text-white text-sm font-bold">
            {vehicle.fuel}
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-4">
          {/* Título */}
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent-500 transition">
            {vehicle.brand} {vehicle.model}
          </h3>

          {/* Descrição curta */}
          <p className="text-gray-400 text-sm mb-3 line-clamp-2">
            {vehicle.description || 'Veículo em ótimo estado'}
          </p>

          {/* Características */}
          <div className="grid grid-cols-2 gap-2 mb-4 text-sm text-gray-300">
            <div className="flex items-center gap-1">
              <Gauge size={16} className="text-accent-600" />
              <span>{vehicle.year}</span>
            </div>
            <div className="flex items-center gap-1">
              <DoorOpen size={16} className="text-accent-600" />
              <span>{vehicle.doors} portas</span>
            </div>
            <div className="flex items-center gap-1">
              <Fuel size={16} className="text-accent-600" />
              <span>{formatMileage(vehicle.mileage)} km</span>
            </div>
            <div className="text-accent-600 font-bold">
              {vehicle.transmission}
            </div>
          </div>

          {/* Preço */}
          <div className="flex items-center justify-between pt-3 border-t border-primary-700">
            <span className="text-2xl font-bold text-accent-500">
              {formatPrice(vehicle.price)}
            </span>
            <button className="p-2 rounded-lg bg-primary-700 hover:bg-accent-600 transition">
              <Heart size={18} className="text-gray-300 hover:text-white" />
            </button>
          </div>

          {/* Vendedor */}
          <div className="mt-3 pt-3 border-t border-primary-700 text-xs text-gray-400">
            {vehicle.owner?.company}
          </div>
        </div>
      </div>
    </Link>
  );
}
