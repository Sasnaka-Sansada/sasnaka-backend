const LocalStrategy = require('passport-local').Strategy;
const { getDatabase } = require('../helpers/get_database');
const { comparePassword } = require('../helpers/password');

/**
 * Configures passportjs
 * Serializes the user object for session and deserializes
 * @category Configuration
 * @async
 * @param {Object} passport
 */
const passportConfig = async (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  const database = await getDatabase();
  passport.deserializeUser(async (id, done) => {
    const user = await database.User.findOne({ where: { id } });
    done(null, user);
  });

  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    (async (req, email, password, done) => {
      let user;
      try {
        user = await database.User.findOne({ where: { email } });
        if (!user) {
          return done(null, false, { message: 'No user by that email' });
        }
      } catch (err) {
        return done(err);
      }

      const match = comparePassword(password, user.password);
      if (!match) {
        return done(null, false, { message: 'Not a matching password' });
      }

      return done(null, user);
    }),
  ));
};

module.exports = { passportConfig };
