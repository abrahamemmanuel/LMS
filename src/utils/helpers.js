/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import bcryptjs from 'bcryptjs';

const encrypt = password => {
  // Hash password with bcrypt
  const bcrypt = bcryptjs;
  bcrypt.genSalt(10, (_err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      password = hash;
      return password;
    });
  });
};

export default encrypt;
