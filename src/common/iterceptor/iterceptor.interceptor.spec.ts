import { NullIterceptorInterceptor } from './null-iterceptor.interceptor';

describe('IterceptorInterceptor', () => {
  it('should be defined', () => {
    expect(new NullIterceptorInterceptor()).toBeDefined();
  });
});
