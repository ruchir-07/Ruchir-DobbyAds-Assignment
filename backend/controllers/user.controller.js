import asyncHandler from "express-async-handler";

class UserController {

   getUser = asyncHandler(async (req, res) => {
      return res.json(req.user);
   })
}

export default UserController;