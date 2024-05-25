import { User } from "../domain/user";
import { UserRepository } from "../domain/userRepository";

export class DeleteUserUseCase{

    constructor(readonly userRepository: UserRepository){}

    async run(id: number): Promise<User | null> {
        try {
            const result = await this.userRepository.deleteUser(id);
            return result;
        } catch (error) {
            return null;
        }
    } 
}