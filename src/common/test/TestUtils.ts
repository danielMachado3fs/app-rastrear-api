import { User } from "../../app/usuario/entities/user.entity";
import { Vehicle } from "../../app/veiculo/entities/vehicle.entity";

export default class TestUtils {
  static giveAMeAValidUser(){
    const user = new User();
    user.name = "João Silva";
    user.email = "joao.silva@example.com";
    user.password = "senha123";
    user.address = {
      "street": "Rua A",
      "cep": "12345-678",
      "state": "São Paulo",
      "city": "São Paulo",
      "neighborhoods": "Centro",
      "number": "123",
      "complement": "Apartmento 456"
    }
    return user;
  }

  static giveAMeAValidVehicle(){
    const vehicle = new Vehicle();
    vehicle.model = "Gol";
    vehicle.yearManufacture = "2016";
    vehicle.plate = "ABC-1234";
    vehicle.dateAcquisition = new Date();
    vehicle.type = "passeio";
    return vehicle;
  }

  static giveAMeAValidLogin(){
    return {
      email: "joao.silva@example.com",
      senha: "senha123"
    }
  }
}