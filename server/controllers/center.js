import db from '../models';

const { EventCenter, Event, Facility } = db;

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
        type: req.body.type,
        price: req.body.price,
        location: req.body.location,
        userId: req.user.id,
        description: req.body.description || null,
        available: req.body.available != null ? req.body.available : true,
        picture1: req.body.picture1 || null,
        picture2: req.body.picture2 || null,
        picture3: req.body.picture3 || null,
        picture4: req.body.picture4 || null,
      })
      .then((center) => {
        res.status(201).send({ message: 'Center created!', center });
      })
      .catch((err) => {
        res.status(400).send({ message: err.errors ? err.errors[0].message : err.message });
      });
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
          center
            .update({
              name: req.body.name || center.name,
              description: req.body.description || center.description,
              type: req.body.type || center.type,
              price: req.body.price || center.price,
              location: req.body.location || center.location,
              available: req.body.available != null ? req.body.available : center.available,
              picture1: req.body.picture1 || center.picture1,
              picture2: req.body.picture2 || center.picture2,
              picture3: req.body.picture3 || center.picture3,
              picture4: req.body.picture4 || center.picture4,
            })
            .then((modifiedCenter) => {
              res.status(200).send({ message: 'Center modified!', center: modifiedCenter });
            })
            .catch((err) => {
              res.status(400).send({ message: err.errors ? err.errors[0].message : err.message });
            });
        } else {
          res.status(404).send({ message: 'Cannot find specified center!' });
        }
      })
      .catch((err) => {
        res.status(400).send({ message: err.errors ? err.errors[0].message : err.message });
      });
  }

  /**
   * Get all centers
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @return{json}
   */
  static getAllCenters(req, res) {
    // Check if path contains name query.
    if (req.query.name) {
      EventCenterController.getCentersByName(req, res);
    } else {
      const page = (req.query.page && Number(req.query.page) > 0) ? Number(req.query.page) : 1;
      const interval = 25;
      const offset = (page * interval) - interval;
      const limit = offset + interval;

      EventCenter
        .findAndCountAll({
          offset,
          limit,
          include: [
            {
              model: Event,
              as: 'events',
              required: false,
              offset: 0,
              limit: 10,
              where: {
                date: { $gte: new Date().toISOString() },
              },
            },
            { model: Facility, as: 'facility' },
          ],
        })
        .then((result) => {
          if (result.rows && result.rows !== []) {
            const maxExceeded = result.count < offset;
            if (!maxExceeded) {
              res.status(200).send({ message: 'All centers delivered!', centers: result.rows });
            } else {
              res.status(404).send({ message: 'Maximum page exceeded!' });
            }
          } else {
            res.status(404).send({ message: 'Cannot find any center!' });
          }
        })
        .catch((err) => {
          res.status(400).send({ message: err.errors ? err.errors[0].message : err.message });
        });
    }
  }

  /**
   * Get all centers by name
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @return{json}
   */
  static getCentersByName(req, res) {
    const { name } = req.query;

    EventCenter
      .findAll({
        where: {
          $or: {
            name: { $iRegexp: name },
            location: { $iRegexp: name },
          },
        },
        offset: 0,
        limit: 10,
      })
      .then((centers) => {
        res.status(200).send({ message: 'All centers delivered!', centers });
      })
      .catch((err) => {
        res.status(400).send({ message: err.errors ? err.errors[0].message : err.message });
      });
  }

  /**
   * Get a center's details, associated events and facility
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @return{json}
   */
  static getCenter(req, res) {
    EventCenter
      .findById(req.params.centerId, {
        include: [
          { model: Event, as: 'events' },
          { model: Facility, as: 'facility' },
        ],
      })
      .then((center) => {
        if (center) {
          res.status(200).send({ message: 'Center delivered!', center });
        } else {
          res.status(404).send({ message: 'Cannot find specified center!' });
        }
      })
      .catch((err) => {
        res.status(400).send({ message: err.errors ? err.errors[0].message : err.message });
      });
  }
}

export default EventCenterController;
