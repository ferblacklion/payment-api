import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

const VALID_TOKEN = '1234';
@Injectable()
export class TokenGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const auth = request?.headers?.authorization || '';

    const keys = auth?.split(' ');
    if (keys?.[1] === VALID_TOKEN) return true;

    return false;
  }
}
