import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Título do veículo é obrigatório'],
    trim: true
  },
  brand: {
    type: String,
    required: [true, 'Marca é obrigatória'],
    trim: true
  },
  model: {
    type: String,
    required: [true, 'Modelo é obrigatório'],
    trim: true
  },
  year: {
    type: Number,
    required: [true, 'Ano é obrigatório']
  },
  price: {
    type: Number,
    required: [true, 'Preço é obrigatório']
  },
  description: {
    type: String,
    trim: true
  },
  mileage: {
    type: Number,
    required: true
  },
  fuel: {
    type: String,
    enum: ['Gasolina', 'Diesel', 'Etanol', 'Híbrido', 'Elétrico'],
    required: true
  },
  transmission: {
    type: String,
    enum: ['Manual', 'Automática'],
    required: true
  },
  color: {
    type: String,
    required: true
  },
  doors: {
    type: Number,
    required: true
  },
  images: [{
    url: String,
    filename: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  features: [String],
  status: {
    type: String,
    enum: ['available', 'sold', 'reserved'],
    default: 'available'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Vehicle', vehicleSchema);
