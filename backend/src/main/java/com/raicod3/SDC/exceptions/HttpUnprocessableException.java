package com.raicod3.SDC.exceptions;

import com.raicod3.SDC.constants.HttpStatusConstants;

public class HttpUnprocessableException extends HttpException {
    public HttpUnprocessableException(String message) {
        super(HttpStatusConstants.UNPROCESSABLE_ENTITY, message);
    }
}
