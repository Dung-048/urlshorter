import {Injectable} from '@nestjs/common';
import {UserRequest} from "./domain/user-request";

@Injectable()
export class UserService {
    create(user: UserRequest) {
        return user;
    }
}
