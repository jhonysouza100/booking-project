import Hotel from '../src/models/Hotel.js';

export const CreateHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    next(error);
  }
};

export const UpdateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id, 
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    next(error);
  }
}

export const DeleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json(`Hotel id: ${req.params.id} has been deleted`);
  } catch (error) {
    next(error);
  }
}

export const GetHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
}

export const GetAllHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    console.log(hotels)
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
}

export const CountByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(cities.map(city => {
      return Hotel.countDocuments({city: city})
    }));
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
}

export const CountByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({type: "hotel"});
    const apartmentCount = await Hotel.countDocuments({type: "apartment"});
    const resortCount = await Hotel.countDocuments({type: "resort"});
    const villaCount = await Hotel.countDocuments({type: "villa"});
    const cabinCount = await Hotel.countDocuments({type: "cabin"});
    res.status(200).json([
      {type: "hotels", count: hotelCount},
      {type: "apartments", count: apartmentCount},
      {type: "resorts", count: resortCount},
      {type: "villas", count: villaCount},
      {type: "cabins", count: cabinCount},
    ]);
  } catch (error) {
    next(error);
  }
}