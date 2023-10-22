import { UserController } from "app/user/controllers/controller";
import { UserService } from "app/user/services/service";
import { UserRepository } from "app/user/repositories/repository";
import { User } from "app/user/domain/user";

class MakeUser{
    static getInstance(){
        const repository = new UserRepository(User)
        const service = new UserService(repository)
        const controller = new UserController(service)

        return controller
    }
}

export {MakeUser}