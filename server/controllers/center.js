import db from '../models';

const { EventCenter, Event } = db;

class EventCenterController {
  /**
   * Creates a new center
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @return{json}
   */
  static createCenter(req, res) {
    EventCenter
      .create({
        name: req.body.name,
        description: req.body.description || null,
        type: req.body.type,
        price: req.body.price,
        location: req.body.location,
        user: req.user.id,
      })
      .then((center) => {
        res.status(201).send({ message: 'center created!', data: center });
      })
      .catch(err => res.status(400).send({ message: err.errors[0].messsge || err }));
  }

  /**
   * Modifies an existing center
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @return{json}
   */
  static modifyCenter(req, res) {
    EventCenter
      .findOne({ where: { id: req.params.centerId } })
      .then((center) => {
        if (center) {
          center.update({
            name: req.body.name || center.name,
            description: req.body.description || center.description,
            type: req.body.type || center.type,
            price: req.body.price || center.price,
            location: req.body.location || center.location,
          });
          res.status(200).send({ message: 'center modified!', data: center });
        } else {
          res.status(404).send({ message: 'cannot find specified center!' });
        }
      })
      .catch(err => res.status(400).send({ message: err.errors[0].messsge || err }));
  }

  /**
   * Get all centers
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @return{json}
   */
  static getAllCenters(req, res) {
    EventCenter
      .all()
      .then(centers => res.status(200).send({ message: 'all centers gotten!', data: centers }))
      .catch(err => res.status(400).send({ message: err.errors[0].messsge || err }));
  }

  /**
   * Get a particular center and associated events
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @return{json}
   */
  static getCenter(req, res) {
    EventCenter
      .findById(req.params.centerId, {
        include: [{
          model: Event,
          as: 'events',
        }],
      })
      .then((center) => {
        res.status(200).send({ message: 'center gotten!', data: center });
      })
      .catch(err => res.status(400).send({ message: err.errors[0].messsge || err }));
  }
}

export default EventCenterController;
