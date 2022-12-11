import { observable, Observable, of, throwError } from 'rxjs';

export function log(data:any){
    console.log("fetch data : " + data)
}

export function handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
        log(`${operation} failed: ${error.message}`);
        return of(result as T);
    };
}

export function handleErrorMessage<T>(operation = 'operation') {
    return (error: any): Observable<Error> => {
        log(`${operation} failed: ${error.message}`);

        let errorMessage:string = error.status + " "

        for(let detail in error.error){
            errorMessage += error.error[detail];
        }
        return throwError(() => new Error(errorMessage));
    };
}
