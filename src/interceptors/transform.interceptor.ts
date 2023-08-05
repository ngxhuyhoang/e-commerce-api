import { MetadataKey } from '@constants/enum';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  statusCode: number;
  message?: string;
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    const responseMessage = this.reflector.getAllAndOverride<boolean>(MetadataKey.RESPONSE_MESSAGE, [
      context.getHandler(),
      context.getClass(),
    ]);

    // next.handle() trả về một Observable từ kêt quả của controller
    return next.handle().pipe(
      map((data) => ({
        statusCode: context.switchToHttp().getResponse().statusCode,
        message: responseMessage || 'Success',
        data: data,
      })),
    );
  }
}
