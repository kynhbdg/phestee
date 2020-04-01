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
    if(errorResponse.error != undefined && errorResponse.error.transactionStatus == false)
    {
          if(errorResponse.error.error != "" && errorResponse.error.error != undefined && errorResponse.error.error != null)
          {
            let finalmessage;
            finalmessage = errorResponse.error.error.errmsg.split('index: ');
            finalmessage[0] = finalmessage[1].split("_",1);
            messageErrorB = finalmessage[0];
          }
          else
            messageErrorB = errorResponse.error.messages[errorResponse.error.messages.length - 1];
    }
    else
          messageErrorB = errorResponse;

    return throwError(messageErrorB);
  }
}
