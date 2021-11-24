const Entry = require('../models/EntryModel.js');

const EntryController = {
  async createEntry(req, res, next) {
    const { title, category, date, body } = req.body;
    try {
      const text = `
      INSERT INTO journals (title, category, date, body)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `
      const params = [title, category, date, body];
      const result = await Entry.query(text, params);
      res.locals.entries = result.rows[0];
      next();
    }
    catch (err) {
      next({
        log: `EntryController.createEntry: Error: ${err}`,
        message: { err: 'Error occurred in EntryController.createEntry. Check server logs for more details' }
      })
    }
  },
  // this method rerquests all of the entries in db
  async getEntries(req, res, next) {
    const entries = [];
    try {
      const text = `SELECT * FROM journals`;

      const result = await Entry.query(text);
      res.locals.entries = result.rows;
      return next();
    } catch (error) {
      next({
        log: `EntryController.getEntry: Error: ${err}`,
        message: { err: 'Error occurred in EntryController.getEntry. Check server logs for more details' }
      })
    }
    res.locals.entries = entries;
    res.status(200).json(res.locals.entries);

  },

  // this method will filter the entries by the requested category
  async getEntry(req, res, next) {
    const entries = res.locals.

      res.locals.entries = entries
    res.status(200).json(res.locals.entries);
  },

  // this method will 
  async updateEntry(req, res, next) {
    const { title, category, date, body } = req.body;
    await Entry.findByIdAndUpdate(`${req.params.entryId}`, { title: title, category: category, text: text }, (err, updated) => {
      if (err) return res.status(400).render('Error in EntryController.updateEntry');
      console.log(updated)

      res.locals.updated = updated;
      return next();
    })
    // const {text} = req.body;
    // const entry = await Entry.findByIdAndUpdate(req.body._id, {text: text}, (err, updated) => {
    //   if (err) {
    //     console.log(err);
    //     res.status(400)
    //   } else {
    //     res.locals.updated = updated;
    //     return res.status(200).json(res.locals.updated)
    //   };
    // })
  },

  async deleteEntry(req, res, next) {

    const { user, id } = req.query;
    const result = `
      DELETE FROM journals 
      WHERE journals.id =${id} 
      AND users_id = ${users}`;

    try {
      const deleted = await db.query(result);
    } catch (err) {
      return next({
        status: 500,
        message: `EntryController.deleteEntry error: ${err}`,
      });
    }
    return next();

  },

  // quizController.getQuestions = async (req, res, next) => {
  //   console.log('inside get questions')

  //   const questions = await Question.find();
  //   res.locals.questions = questions;
  //   // console.log('result questions', res.locals.questions);
  //   next();
  // }


};


module.exports = EntryController;