const { User } = require('../models');
const bcrypt = require('bcrypt');
function format(user) {
    const { id, username } = user;
    return {
        id, username, accessToken: user.generateToken()
    }
}

module.exports = {
    register: async(req, res, next) => {
      try {
        const { name, email, password, role = role.user } = req.body;
        const exist = await User.findOne({ where: { email } });
        if (exist) {
            return res.status(400).json({
                status: false,
                message: 'User already exist',
                data: null
            });
        }
        const hashed = bcrypt.hashSync(password, 10);
        const newUser = await User.create({
            username: name,
            email,
            password: hashed

        })

      } catch(error) {
        console.log(error);
      }
    },
    login: async (req, res) => {
        try {
            const user = await User.authenticate(req.body);
            const accessToken = user.generateToken();
            res.status(200).json({
                status: true,
                message: 'Success login',
                data: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    accessToken: accessToken
                }
            })
        } catch (error) {

        }
        User.authenticate(req.body).then(user => {
            res.json(format(user));
        });
    }
}