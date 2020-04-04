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
          if(typeof errorResponse.error.transactionStatus === undefined)
          {
            let finalmessage;
            finalmessage = errorResponse.error.error.errmsg.split('index: ');
            finalmessage[0] = finalmessage[1].split("_",1);
            messageErrorB = finalmessage[0];
          }
          else
            messageErrorB = errorResponse.error.messages[0];
    }
    else
    {
          messageErrorB = errorResponse;
    }

    return throwError(messageErrorB);
  }
}
