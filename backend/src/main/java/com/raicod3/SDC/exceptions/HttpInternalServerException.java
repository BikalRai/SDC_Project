package com.raicod3.SDC.exceptions;

import com.raicod3.SDC.constants.HttpStatusConstants;

public class HttpInternalServerException extends HttpException {
    public HttpInternalServerException(String message) {
        super(HttpStatusConstants.INTERNAL_SERVER_ERROR, message);
    }
}
