import express from 'express';
import { body, validationResult } from 'express-validator';
import Vehicle from '../models/Vehicle.js';
import { auth } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

// Listar todos os veículos (público)
router.get('/', async (req, res) => {
  try {
    const { status, brand, maxPrice, minPrice, fuel } = req.query;
    
    let filter = { status: 'available' };
    
    if (brand) filter.brand = { $regex: brand, $options: 'i' };
    if (maxPrice) filter.price = { ...filter.price, $lte: parseInt(maxPrice) };
    if (minPrice) filter.price = { ...filter.price, $gte: parseInt(minPrice) };
    if (fuel) filter.fuel = fuel;

    const vehicles = await Vehicle.find(filter)
      .populate('owner', 'name company phone')
      .sort({ createdAt: -1 });

    res.status(200).json({
      total: vehicles.length,
      vehicles
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar veículos', error: error.message });
  }
});

// Obter veículo por ID
router.get('/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id)
      .populate('owner', 'name company phone email');

    if (!vehicle) {
      return res.status(404).json({ message: 'Veículo não encontrado' });
    }

    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar veículo', error: error.message });
  }
});

// Criar novo veículo (requer autenticação)
router.post('/', auth, [
  body('title').notEmpty().withMessage('Título é obrigatório'),
  body('brand').notEmpty().withMessage('Marca é obrigatória'),
  body('model').notEmpty().withMessage('Modelo é obrigatório'),
  body('year').isInt().withMessage('Ano deve ser um número'),
  body('price').isFloat({ min: 0 }).withMessage('Preço deve ser um número positivo'),
  body('mileage').isInt({ min: 0 }).withMessage('Quilometragem deve ser um número'),
  body('fuel').isIn(['Gasolina', 'Diesel', 'Etanol', 'Híbrido', 'Elétrico']).withMessage('Combustível inválido'),
  body('transmission').isIn(['Manual', 'Automática']).withMessage('Transmissão inválida'),
  body('color').notEmpty().withMessage('Cor é obrigatória'),
  body('doors').isInt({ min: 1 }).withMessage('Número de portas deve ser positivo')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, brand, model, year, price, description, mileage, fuel, transmission, color, doors, features } = req.body;

    const vehicle = new Vehicle({
      title,
      brand,
      model,
      year,
      price,
      description,
      mileage,
      fuel,
      transmission,
      color,
      doors,
      features: features || [],
      owner: req.user.userId
    });

    await vehicle.save();
    
    res.status(201).json({
      message: 'Veículo criado com sucesso',
      vehicle: await vehicle.populate('owner', 'name company')
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar veículo', error: error.message });
  }
});

// Upload de imagens para veículo
router.post('/:id/upload', auth, upload.array('images', 10), async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ message: 'Veículo não encontrado' });
    }

    // Verificar se o usuário é o dono
    if (vehicle.owner.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Você não tem permissão para atualizar este veículo' });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'Nenhuma imagem foi enviada' });
    }

    req.files.forEach(file => {
      vehicle.images.push({
        url: `/uploads/${file.filename}`,
        filename: file.filename
      });
    });

    await vehicle.save();

    res.status(200).json({
      message: 'Imagens enviadas com sucesso',
      vehicle
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer upload', error: error.message });
  }
});

// Atualizar veículo
router.put('/:id', auth, async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ message: 'Veículo não encontrado' });
    }

    // Verificar se o usuário é o dono
    if (vehicle.owner.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Você não tem permissão para atualizar este veículo' });
    }

    Object.assign(vehicle, req.body);
    vehicle.updatedAt = new Date();

    await vehicle.save();

    res.status(200).json({
      message: 'Veículo atualizado com sucesso',
      vehicle
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar veículo', error: error.message });
  }
});

// Deletar veículo
router.delete('/:id', auth, async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ message: 'Veículo não encontrado' });
    }

    // Verificar se o usuário é o dono
    if (vehicle.owner.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Você não tem permissão para deletar este veículo' });
    }

    await Vehicle.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Veículo deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar veículo', error: error.message });
  }
});

// Listar veículos do usuário
router.get('/user/my-vehicles', auth, async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ owner: req.user.userId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      total: vehicles.length,
      vehicles
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar seus veículos', error: error.message });
  }
});

export default router;
