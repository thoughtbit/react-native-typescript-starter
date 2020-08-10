import { Action } from 'redux';

// Add redux action type to sentry error log for when an error happens.
const exampleMiddleware = () => (next: any) => (action: Action<string>) => {
  // action.type && { foo: action.type }

  return next(action);
}

export default exampleMiddleware
