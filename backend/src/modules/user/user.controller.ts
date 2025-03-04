import {Body, Controller, Post} from '@nestjs/common';
import {UserService} from './user.service';
import {UserRequestDto} from './dto/user-request.dto';
import {ApiTags} from "@nestjs/swagger";


@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post()
    create(@Body() createUserDto: UserRequestDto) {
        return this.userService.create(UserRequestDto.toUserRequest(createUserDto));
    }
}
