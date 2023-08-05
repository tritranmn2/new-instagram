import { BaseDto } from './base.dto';

export function toClass(classConstructor: any) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const method = descriptor.value;
        descriptor.value = (...args: any[]) => {
            const value = method(...args);
            if (Array.isArray(value)) return BaseDto.plainToClassArray(classConstructor, value);
            return BaseDto.plainToClass(classConstructor, value);
        };
    };
}
