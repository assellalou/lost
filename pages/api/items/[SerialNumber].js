import dbConnection from '/lib/mongodb';
import Item from '/models/Item';

export default async function handler(req, res) {
  const { method } = req;
  await dbConnection();

  switch (method) {
    case 'GET':
      try {
        const item = await Item.find({
          SerialNumber: req.query.SerialNumber,
        });
        if (item[0]) res.status(200).json({ success: true, data: item });
        else
          res.status(404).json({ success: false, message: 'Item not found' });
      } catch (e) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
