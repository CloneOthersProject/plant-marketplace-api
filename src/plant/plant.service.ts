import { Injectable, NotFoundException } from '@nestjs/common';

import { PlantModel } from 'src/model/plant.model';
import { StatusDTO } from 'src/model/types/status.types';
import { PlantCreateDTO, PlantUpdateDTO } from './dto/plant.dto';

@Injectable()
export class PlantService {
  getPlants = (status?: StatusDTO) => {
    const query = PlantModel.query();

    if (status !== StatusDTO.ALL) {
      return query.modify('status', status);
    }

    return query;
  };

  getPlantById = async (id: string) => {
    const plantFinded = await PlantModel.query().findById(id);
    if (!plantFinded) {
      throw new NotFoundException(`The plant with id ${id} doesn't exists`);
    }
    return plantFinded;
  };

  insertPlants = (plant: PlantCreateDTO) => {
    return PlantModel.query().insertAndFetch(plant);
  };

  updatePlant = async (id: string, plant: PlantUpdateDTO) => {
    const plantUpdated = await PlantModel.query().updateAndFetchById(id, plant);
    if (!plantUpdated) {
      throw new NotFoundException(`The plant with id ${id} doesn't exists`);
    }
    return plantUpdated;
  };

  deletePlant = async (id: string) => {
    const plantToDelete = await PlantModel.query().findById(id);
    if (!plantToDelete) {
      throw new NotFoundException(`The plant with id ${id} doesn't exists`);
    }
    await PlantModel.query().deleteById(id);
    return plantToDelete;
  };
}
