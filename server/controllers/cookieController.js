const cookieController = {};

/**
* setCookie - set a cookie with a random number

*/
cookieController.setCookie = (req, res, next) => {
  // write code here
  //   res.cookie('codesmith', 'hi');
  res.cookie('secret', `${Math.floor(Math.random() * 100)}`);
  return next();
};

/**
 * setSSIDCookie - store the user id in a cookie
 */
cookieController.setSSIDCookie = (req, res, next) => {
  // write code here
  res.cookie('secret', res.locals.user_id, { httpOnly: true });
  return next();
};

module.exports = cookieController;
