import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';
import { StatusDTO } from 'src/model/types/status.types';
import { ValidateEnumPipe } from 'src/pipes/validate-enum.pipe';
import { ValidatePayloadExistsPipe } from 'src/pipes/validate-payload-exists.pipe';
import { PlantCreateDTO, PlantUpdateDTO } from './dto/plant.dto';
import { PlantService } from './plant.service';

@Controller('plant')
export class PlantController {
  constructor(private plantService: PlantService) {}

  @Get()
  getPlants(
    @Query('status', new ValidateEnumPipe(StatusDTO))
    status?: StatusDTO,
  ) {
    return this.plantService.getPlants(status);
  }

  @Get(':id')
  getPlantById(@Param('id', ParseUUIDPipe) id: string) {
    return this.plantService.getPlantById(id);
  }

  @Post()
  insertPlant(@Body() plantCreateDTO: PlantCreateDTO) {
    return this.plantService.insertPlants(plantCreateDTO);
  }

  @Put(':id')
  @UsePipes(ValidatePayloadExistsPipe)
  updatePlant(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() plantUpdateDTO: PlantUpdateDTO,
  ) {
    return this.plantService.updatePlant(id, plantUpdateDTO);
  }

  @Delete(':id')
  deletePlant(@Param('id', ParseUUIDPipe) id: string) {
    return this.plantService.deletePlant(id);
  }
}
