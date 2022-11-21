import { Image } from '../models/image.model.js';

export default class ImageService {
   constructor() {
      this.image = Image;
   }

   async findAllImages(userId) {
      const images = await this.image.find({ userId });
      return images;
   }

   async createImage(userId, doc) {
      const image = await this.image.create({ ...doc, userId });
      return image;
   }
}