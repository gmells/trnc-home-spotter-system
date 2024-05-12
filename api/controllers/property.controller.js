import Property from "../models/property.model.js";
import { errorHandler } from "../utility/error.js";

export const createProperty = async (req, res, next) => {
  try {
    const property = await Property.create(req.body);
    return res.status(201).json(property);
  } catch (error) {
    next(error);
  }
};

export const deleteProperty = async (req, res, next) => {
  const property = await Property.findById(req.params.id);

  if (!property) {
    return next(errorHandler(404, "Property not found"));
  }

  if (req.user.id !== property.userRef) {
    return next(
      errorHandler(401, "You can only delete your own property listings")
    );
  }

  try {
    await Property.findByIdAndDelete(req.params.id);
    res.status(200).json("Property has been deleted");
  } catch (error) {
    next(error);
  }
};

export const updateProperty = async (req, res, next) => {
  const property = await Property.findById(req.params.id);

  if (!property) {
    return next(errorHandler(404, "Property not found"));
  }

  if (req.user.id !== property.userRef) {
    return next(
      errorHandler(401, "You can only delete your own property listing")
    );
  }

  try {
    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedProperty);
  } catch (error) {
    next(error);
  }
};

export const getProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return next(errorHandler(401, "property not found"));
    }

    res.status(200).json(property);
  } catch (error) {
    next(error);
  }
};
