import db from '../models';

const { EventCenter } = db;

class EventCenterController {
  /**
   * Creates a new center
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @return{json} new center details
   */
  static createCenter(req, res) {
    EventCenter
      .create({
        name: req.body.name,
        description: req.body.description || null,
        type: req.body.type,
        price: req.body.price,
        location: req.body.location,
      })
      .then((center) => {
        res.status(201).send({
          status: 201, message: 'Center created!', data: center,
        });
      })
      .catch(err => res.status(400).send({ status: 400, message: err.errors[0].messsge || err }));
  }
}

export default EventCenterController;
