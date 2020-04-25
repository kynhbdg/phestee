import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HandleErrorService {

  constructor() { }

  handleError(errorResponse: HttpErrorResponse)
  {
    let messageErrorB: any;
    if(typeof errorResponse.error !== undefined)
    {

          if(errorResponse.error.user != null)
            messageErrorB = errorResponse.error.messages[errorResponse.error.messages.length - 1];
          else
            messageErrorB = errorResponse.error.messages[0];


          messageErrorB += ", "+errorResponse.error.error.errmsg;
    }
    else
          messageErrorB = errorResponse;


    return throwError(messageErrorB);
  }
}
