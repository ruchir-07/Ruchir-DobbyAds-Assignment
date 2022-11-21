import ImageService from "../services/image.service.js";
import asyncHandler from "express-async-handler";

export default class ImageController {
   constructor() {
      this.imageService = new ImageService();
   }

   getAllImages = asyncHandler(async (req, res) => {
      const userId = req.user._id.toString();
      const images = await this.imageService.findAllImages(userId);
      res.status(200).json(images);
   })

   createImage = asyncHandler(async (req, res) => {
      const doc = { ...req.body };
      const userId = req.user._id.toString();
      const image = await this.imageService.createImage(userId, doc);
      return res.status(201).json(image);
   })
}