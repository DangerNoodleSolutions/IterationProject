const Entry = require('../models/EntryModel.js');

const EntryController = {
  async createEntry(req, res, next) {
    const { title, category, body, user_id } = req.body;
    const date = new Date();
    try {
      const text =`
      INSERT INTO journals (title, category, date, body, user_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `
      const params = [title, category, date, body, user_id ];
      const result = await Entry.query(text, params);
      res.locals.entries = result.rows[0];
      next();
    }
    catch (err) {
      next({
        log: `EntryController.createEntry: Error: ${err}`,
        message: {err: 'Error occurred in EntryController.createEntry. Check server logs for more details'}
      })
    }
  },
// this method rerquests all of the entries in db
  async getEntries(req, res, next) {
    const { user_id } = req.body;
    console.log('works after req.params')
    try {
      console.log('works at beginning of try')
      const text = `SELECT * FROM journals WHERE user_id = ${ user_id }`;
      
      const result = await Entry.query(text);
      console.log(result)
      res.locals.entries = result.rows;
      return next();
    } catch (err) {
      next({
        log: `EntryController.getEntry: Error: ${err}`,
        message: {err: 'Error occurred in EntryController.getEntry. Check server logs for more details'}
      })
    }
   
  },

  // this method will filter the entries by the requested category
  async getEntry(req, res, next) {
    const { user_id, category } = req.body;
    try {
    const text = `SELECT * FROM journals WHERE user_id = ${ user_id } AND category = '${ category }'`;
    
    const result = await Entry.query(text);
    res.locals.entries = result.rows;
    res.status(200).json(res.locals.entries);
    // return next();
    } catch (err) {
      return next({
        log: `EntryController.getEntry: Error: ${err}`,
        message: {err: 'Error occurred in EntryController.getEntry. Check server logs for more details'}
      })
    }  
  },

// this method will update the entry
  async updateEntry(req, res, next) {
    const {entryId} = req.params

    const { title, category, body } = req.body;
    try {
      const text = `
      UPDATE journals 
      SET title = '${title}', category = '${category}', body = '${body}'
      WHERE journals.id = ${ entryId } 
      RETURNING *
      `;
      
      const result = await Entry.query(text);
      res.locals.entries = result.rows;
      res.status(200).json(res.locals.entries);
      // return next();
      } catch (err) {
        return next({
          log: `EntryController.getEntry: Error: ${err}`,
          message: {err: 'Error occurred in EntryController.getEntry. Check server logs for more details'}
        })
      }  
  },

  async deleteEntry(req, res, next) {

    const { entryId } = req.params




  try {
    console.log('enter try')
    const result = `
    DELETE FROM journals 
    WHERE journals.id =${entryId} 
    `;
    console.log('result string good')
    const deleted = await Entry.query(result);
    return next();
  } catch (err) {
    return next({
      status: 500,
      message: `EntryController.deleteEntry error: ${err}`,
    });
  }
    
  },
  

};


module.exports = EntryController;