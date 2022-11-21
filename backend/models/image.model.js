import db from 'mongoose';

const imageSchema = new db.Schema({
   _id: { type: db.Schema.Types.ObjectId, auto: true },
   title: { type: String, required: true },
   buffer: { type: String, required: true },
   userId: { type: String, required: true },
});

const validateImage = (image) => {
   const title = image.title
   const buffer = image.buffer

   if (!title || !buffer || title === '' || buffer === '') {
      return 1;
   }
   else {
      return 0;
   }
}
const Image = db.model('Image', imageSchema);

export { validateImage, Image };