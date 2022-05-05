import mongoose from 'mongoose';

const ItemsSchema = new mongoose.Schema({
  SerialNumber: {
    type: String,
    required: true,
  },
  Type: {
    type: String,
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Latitude: {
    type: String,
    required: true,
  },
  Longitude: {
    type: String,
    required: true,
  },
  Status: {
    type: String,
    required: true,
    default: 'Available',
  },
  Owner: {
    type: String,
    required: false,
  },
});

export default mongoose.models?.Item ?? mongoose.model('Item', ItemsSchema);
