import db from '../models';

const { Facility } = db;

class FacilityController {
  /**
   * Creates a new facility
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @return{json}
   */
  static createFacility(req, res) {
    Facility.findOne({ where: { centerId: req.body.centerId } })
      .then((facility) => {
        // If a facility table is already linked to target center, update that instead
        if (facility) {
          facility
            .update({
              chairs: req.body.chairs || facility.chairs,
              tables: req.body.tables || facility.tables,
              parkinglot: req.body.parkinglot || facility.parkinglot,
              restrooms: req.body.restrooms || facility.restrooms,
              telescreens: req.body.telescreens || facility.telescreens,
              lighting: req.body.lighting || facility.lighting,
              sounds: req.body.sounds || facility.sounds,
              stage: req.body.stage || facility.stage,
            })
            .then((modifiedFacility) => {
              res.status(200).send({ message: 'facility updated!', facility: modifiedFacility });
            })
            .catch(err => res.status(400).send({ message: err.message || err }));
        } else { // Otherwise create a new one
          Facility
            .create({
              chairs: req.body.chairs || null,
              tables: req.body.tables || null,
              parkinglot: req.body.parkinglot || null,
              restrooms: req.body.restrooms || null,
              telescreens: req.body.telescreens || null,
              lights: req.body.lights || null,
              sounds: req.body.sounds || null,
              stage: req.body.stage || null,
              centerId: req.body.centerId,
            })
            .then((newFacility) => {
              res.status(201).send({ message: 'facility created!', facility: newFacility });
            })
            .catch(err => res.status(400).send({ message: err.message || err }));
        }
      })
      .catch(err => res.status(400).send({ message: err.message || err }));
  }

  /**
   * Modifies an existing facility
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @return{json}
   */
  static modifyFacility(req, res) {
    Facility
      .findById(req.params.facilityId)
      .then((facility) => {
        if (facility) {
          facility
            .update({
              chairs: req.body.chairs || facility.chairs,
              tables: req.body.tables || facility.tables,
              parkinglot: req.body.parkinglot || facility.parkinglot,
              restrooms: req.body.restrooms || facility.restrooms,
              telescreens: req.body.telescreens || facility.telescreens,
              lighting: req.body.lighting || facility.lighting,
              sounds: req.body.sounds || facility.sounds,
              stage: req.body.stage || facility.stage,
            })
            .then((modifiedFacility) => {
              res.status(200).send({ message: 'facility updated!', facility: modifiedFacility });
            });
        } else {
          res.status(404).send({ message: 'cannot find specified facility!' });
        }
      })
      .catch(err => res.status(400).send({ message: err.message || err }));
  }
}

export default FacilityController;
