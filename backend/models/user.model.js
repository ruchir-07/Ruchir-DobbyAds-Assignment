import db from 'mongoose';

const userSchema = new db.Schema({
   _id: { type: db.Schema.Types.ObjectId, auto: true },
   name: { type: String, required: true },
   email: { type: String, required: true },
   hash: { type: String, required: true },
});

const validateRegisterUser = (user) => {
   const name = user.name
   const email = user.email
   const password = user.password

   if (!name || !email || !password || name === '' || email === '' || password === '') {
      return 1;
   }
   else {
      return 0;
   }
}
const validateLoginUser = (user) => {
   const email = user.email
   const password = user.password

   if (!user || !email || !password || email === '' || password === '') {
      return 1;
   }
   else {
      return 0;
   }
}

const User = db.model('User', userSchema);
export { validateLoginUser, validateRegisterUser, User }

