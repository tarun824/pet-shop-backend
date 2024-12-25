import express from "express"
import { CreatePetController } from "../../controller/pets/create_pet_controller";
import { deleteAllPetController } from "../../controller/pets/delete_all_pet_controller";
import { getAllPetController } from "../../controller/pets/get_all_pet_controller";
import { getAllSoldPetController } from "../../controller/pets/get_all_sold_pet_controller";
import { getPetById } from "../../controller/pets/get_pet_by_id_controller";
import { UpdatePetDataController } from "../../controller/pets/update_pet_data_controller";
import { GetAllPetByPagination } from "../../controller/pets/get_all_pet_by_pagination";

const petRouter = express.Router();


petRouter.post("/create_pet", CreatePetController)
petRouter.get("/get_all_pet", getAllPetController)
petRouter.get("/get_all_sold_pet", getAllSoldPetController)
petRouter.get("/get_pet_by_id/:petId", getPetById)
petRouter.put("/update_pet_data", UpdatePetDataController)
petRouter.delete("/delete_all_pets", deleteAllPetController)
// /get_all_pet_by_pagination?limit=value1&next=value2

petRouter.get("/get_all_pet_by_pagination", GetAllPetByPagination)



export default petRouter;