import Shop from "../models/shop.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

export const createAndEditShop = async (req, res) => {
  try {
    const { name, city, state, address } = req.body;
    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file?.path);
    }
    let shop = await Shop.findOne({ owner: req.userId });
    if (!shop) {
      shop = await Shop.create({
        name,
        city,
        state,
        address,
        image,
        owner: req.userId,
      });
    } else {
      shop = await Shop.findByIdAndUpdate(
        shop._id,
        {
          name,
          city,
          state,
          address,
          image,
          owner: req.userId,
        },
        { new: true },
      );
    }
    await shop.populate("owner");
    return res.status(201).json({
      shop,
    });
  } catch (error) {
    return res.status(500).json({
        message:`created shop error ${error}`
    })
  }
};
