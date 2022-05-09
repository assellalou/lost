import dbConnection from '@lib/mongodb';
import Item from '@models/Item';

export default async function handler(req, res) {
  const { method } = req;
  await dbConnection();

  switch (method) {
    case 'GET':
      try {
        const items = await Item.find({});
        res.status(200).json({ success: true, data: items });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const {
          SerialNumber,
          Type,
          Category,
          Description,
          Latitude,
          Longitude,
          Zoom,
        } = req.body;
        const item = new Item({
          SerialNumber,
          Type,
          Category,
          Description,
          Latitude,
          Longitude,
          Zoom,
        });
        await item.save();
        res.status(201).json({ success: true, data: item });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
