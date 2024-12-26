import express from "express";
import { getPetCacheDataController } from "../../controller/pets/get_pet_cache_data_controller";

const petRouterV1 = express.Router();

petRouterV1.get("/get_pet_cache_data/:petId", getPetCacheDataController);

export default petRouterV1;