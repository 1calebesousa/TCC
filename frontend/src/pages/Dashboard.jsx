import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { vehiclesAPI } from '../api/client';
import { Plus, Trash2, Edit, Upload, Loader } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    price: '',
    description: '',
    mileage: '',
    fuel: 'Gasolina',
    transmission: 'Automática',
    color: '',
    doors: '4',
    features: ''
  });

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const { data } = await vehiclesAPI.getMyVehicles();
      setVehicles(data.vehicles);
    } catch (error) {
      console.error('Erro ao carregar veículos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const vehicleData = {
        ...formData,
        price: parseFloat(formData.price),
        mileage: parseInt(formData.mileage),
        year: parseInt(formData.year),
        doors: parseInt(formData.doors),
        features: formData.features.split(',').map(f => f.trim()).filter(f => f)
      };

      await vehiclesAPI.createVehicle(vehicleData);
      setFormData({
        title: '',
        brand: '',
        model: '',
        year: new Date().getFullYear(),
        price: '',
        description: '',
        mileage: '',
        fuel: 'Gasolina',
        transmission: 'Automática',
        color: '',
        doors: '4',
        features: ''
      });
      setShowForm(false);
      fetchVehicles();
    } catch (error) {
      console.error('Erro ao criar veículo:', error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Deseja realmente deletar este veículo?')) {
      try {
        await vehiclesAPI.deleteVehicle(id);
        fetchVehicles();
      } catch (error) {
        console.error('Erro ao deletar veículo:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-primary-900 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-gray-400">Bem-vindo, {user?.name}!</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn btn-primary flex items-center gap-2"
          >
            <Plus size={20} />
            Adicionar Veículo
          </button>
        </div>

        {/* Formulário */}
        {showForm && (
          <div className="card p-8 mb-12 max-w-4xl">
            <h2 className="text-2xl font-bold text-white mb-6">Novo Veículo</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Título */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Título *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="Ex: Toyota Corolla 2022"
                    className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-accent-600"
                  />
                </div>

                {/* Marca */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Marca *</label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    required
                    placeholder="Ex: Toyota"
                    className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-accent-600"
                  />
                </div>

                {/* Modelo */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Modelo *</label>
                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    required
                    placeholder="Ex: Corolla"
                    className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-accent-600"
                  />
                </div>

                {/* Ano */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Ano *</label>
                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-accent-600"
                  />
                </div>

                {/* Preço */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Preço (R$) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    placeholder="0.00"
                    className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-accent-600"
                  />
                </div>

                {/* Quilometragem */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Quilometragem *</label>
                  <input
                    type="number"
                    name="mileage"
                    value={formData.mileage}
                    onChange={handleInputChange}
                    required
                    placeholder="0"
                    className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-accent-600"
                  />
                </div>

                {/* Combustível */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Combustível *</label>
                  <select
                    name="fuel"
                    value={formData.fuel}
                    onChange={handleInputChange}
                    className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-600"
                  >
                    <option>Gasolina</option>
                    <option>Diesel</option>
                    <option>Etanol</option>
                    <option>Híbrido</option>
                    <option>Elétrico</option>
                  </select>
                </div>

                {/* Transmissão */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Transmissão *</label>
                  <select
                    name="transmission"
                    value={formData.transmission}
                    onChange={handleInputChange}
                    className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-600"
                  >
                    <option>Manual</option>
                    <option>Automática</option>
                  </select>
                </div>

                {/* Cor */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Cor *</label>
                  <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    required
                    placeholder="Ex: Preto"
                    className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-accent-600"
                  />
                </div>

                {/* Portas */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Portas *</label>
                  <select
                    name="doors"
                    value={formData.doors}
                    onChange={handleInputChange}
                    className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-600"
                  >
                    <option>2</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
              </div>

              {/* Descrição */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Descrição</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Descreva o estado do veículo..."
                  rows="4"
                  className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-accent-600"
                ></textarea>
              </div>

              {/* Características */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Características (separadas por vírgula)</label>
                <input
                  type="text"
                  name="features"
                  value={formData.features}
                  onChange={handleInputChange}
                  placeholder="Ex: Ar condicionado, Direção hidráulica, Airbag"
                  className="w-full bg-primary-700 border border-primary-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-accent-600"
                />
              </div>

              {/* Botões */}
              <div className="flex gap-3">
                <button type="submit" className="btn btn-primary flex-1">
                  Publicar Veículo
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="btn btn-secondary"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Lista de Veículos */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Meus Veículos ({vehicles.length})</h2>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader className="animate-spin text-accent-600" size={40} />
            </div>
          ) : vehicles.length === 0 ? (
            <div className="card p-12 text-center">
              <p className="text-gray-400 text-lg mb-4">Você não tem veículos publicados</p>
              <button
                onClick={() => setShowForm(true)}
                className="btn btn-primary inline-flex items-center gap-2"
              >
                <Plus size={20} />
                Publicar Primeiro Veículo
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map(vehicle => (
                <div key={vehicle._id} className="card overflow-hidden">
                  {vehicle.images[0] && (
                    <img
                      src={vehicle.images[0].url}
                      alt={vehicle.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white mb-2">
                      {vehicle.brand} {vehicle.model}
                    </h3>
                    <p className="text-accent-600 font-bold text-xl mb-4">
                      R$ {vehicle.price.toLocaleString('pt-BR')}
                    </p>
                    <div className="flex gap-2 mb-4">
                      <span className="px-3 py-1 bg-primary-700 text-xs text-gray-300 rounded-full">
                        {vehicle.year}
                      </span>
                      <span className="px-3 py-1 bg-accent-600/20 text-xs text-accent-400 rounded-full">
                        {vehicle.status}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 btn btn-secondary text-sm flex items-center justify-center gap-2">
                        <Upload size={16} />
                        Fotos
                      </button>
                      <button className="btn btn-secondary text-sm flex items-center justify-center gap-2 px-3">
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(vehicle._id)}
                        className="btn btn-secondary text-sm flex items-center justify-center gap-2 px-3 hover:text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
