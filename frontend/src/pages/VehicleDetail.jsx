import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { vehiclesAPI } from '../api/client';
import { ChevronLeft, ChevronRight, Fuel, Gauge, DoorOpen, Palette } from 'lucide-react';

export default function VehicleDetail() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchVehicle();
  }, [id]);

  const fetchVehicle = async () => {
    try {
      const { data } = await vehiclesAPI.getVehicleById(id);
      setVehicle(data);
    } catch (error) {
      console.error('Erro ao carregar veículo:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-primary-900"></div>;
  if (!vehicle) return <div className="min-h-screen bg-primary-900 flex items-center justify-center">
    <p className="text-red-500 text-xl">Veículo não encontrado</p>
  </div>;

  const images = vehicle.images?.length > 0 
    ? vehicle.images 
    : [{ url: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=800' }];

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => prev === 0 ? images.length - 1 : prev - 1);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => prev === images.length - 1 ? 0 : prev + 1);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-primary-900 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Galeria */}
        <div className="mb-12">
          <div className="relative bg-primary-800 rounded-xl overflow-hidden mb-4">
            <img
              src={images[currentImageIndex].url}
              alt="Veículo"
              className="w-full h-96 object-cover"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full transition"
                >
                  <ChevronLeft className="text-white" size={24} />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full transition"
                >
                  <ChevronRight className="text-white" size={24} />
                </button>
              </>
            )}
            <div className="absolute bottom-4 right-4 bg-black/70 px-3 py-1 rounded text-white text-sm">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>

          {/* Miniaturas */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                    idx === currentImageIndex ? 'border-accent-600' : 'border-primary-700'
                  }`}
                >
                  <img src={img.url} alt={`Imagem ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informações */}
          <div className="lg:col-span-2">
            {/* Título */}
            <h1 className="text-4xl font-bold text-white mb-2">
              {vehicle.brand} {vehicle.model}
            </h1>
            <p className="text-gray-400 mb-6">{vehicle.description}</p>

            {/* Especificações */}
            <div className="bg-primary-800 rounded-xl p-6 mb-6 border border-primary-700">
              <h2 className="text-xl font-bold text-white mb-4">Especificações</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Ano</p>
                  <p className="text-white font-bold text-lg">{vehicle.year}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Quilometragem</p>
                  <p className="text-white font-bold text-lg">{vehicle.mileage.toLocaleString('pt-BR')} km</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Combustível</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Fuel size={20} className="text-accent-600" />
                    <p className="text-white font-bold">{vehicle.fuel}</p>
                  </div>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Transmissão</p>
                  <p className="text-white font-bold text-lg">{vehicle.transmission}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Portas</p>
                  <div className="flex items-center gap-2 mt-1">
                    <DoorOpen size={20} className="text-accent-600" />
                    <p className="text-white font-bold">{vehicle.doors}</p>
                  </div>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Cor</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Palette size={20} className="text-accent-600" />
                    <p className="text-white font-bold">{vehicle.color}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Características */}
            {vehicle.features && vehicle.features.length > 0 && (
              <div className="bg-primary-800 rounded-xl p-6 border border-primary-700">
                <h2 className="text-xl font-bold text-white mb-4">Características</h2>
                <ul className="grid grid-cols-2 gap-3">
                  {vehicle.features.map((feature, idx) => (
                    <li key={idx} className="text-gray-300 flex items-center gap-2">
                      <span className="w-2 h-2 bg-accent-600 rounded-full"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            {/* Preço */}
            <div className="card p-6 mb-6 sticky top-4">
              <p className="text-gray-400 text-sm mb-2">Preço</p>
              <p className="text-5xl font-bold text-accent-600 mb-6">
                {formatPrice(vehicle.price)}
              </p>

              <button className="w-full btn btn-primary mb-3">
                Solicitar Informações
              </button>
              <button className="w-full btn btn-secondary">
                Entre em Contato
              </button>
            </div>

            {/* Vendedor */}
            {vehicle.owner && (
              <div className="card p-6">
                <h3 className="text-lg font-bold text-white mb-4">Concessionária</h3>
                <p className="text-white font-bold mb-1">{vehicle.owner.company}</p>
                <p className="text-gray-400 text-sm mb-3">{vehicle.owner.name}</p>
                
                {vehicle.owner.phone && (
                  <p className="text-accent-600 font-bold mb-2">📱 {vehicle.owner.phone}</p>
                )}
                
                {vehicle.owner.email && (
                  <p className="text-gray-400 text-sm mb-4">📧 {vehicle.owner.email}</p>
                )}

                <button className="w-full btn btn-primary">
                  Ligar para Vendedor
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
