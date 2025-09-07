package com.raicod3.SDC.exceptions;

import com.raicod3.SDC.constants.HttpStatusConstants;

public class HttpBadRequestException extends HttpException {
    public HttpBadRequestException(String message) {
        super(HttpStatusConstants.BAD_REQUEST, message);
    }
}
