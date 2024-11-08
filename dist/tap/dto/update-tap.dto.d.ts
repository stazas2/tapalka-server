import { CreateTapDto } from './create-tap.dto';
declare const UpdateTapDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateTapDto>>;
export declare class UpdateTapDto extends UpdateTapDto_base {
    id: number;
}
export {};
