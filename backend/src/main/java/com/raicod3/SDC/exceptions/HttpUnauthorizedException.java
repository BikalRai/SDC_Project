package com.raicod3.SDC.exceptions;

import com.raicod3.SDC.constants.HttpStatusConstants;

public class HttpUnauthorizedException extends HttpException{

    public HttpUnauthorizedException(String message) {
        super(HttpStatusConstants.UNAUTHORIZED, message);
    }
}
