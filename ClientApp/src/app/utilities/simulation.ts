import { of } from 'rxjs';
import { delay, catchError } from 'rxjs/operators';

export function SimulateAsync(obj, successCallback = null, errorCallback = null) {
    return of(obj).pipe(delay(2000), catchError(errorCallback)).subscribe(successCallback);
}
