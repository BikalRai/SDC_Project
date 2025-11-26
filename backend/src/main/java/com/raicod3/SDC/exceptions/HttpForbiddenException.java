package com.raicod3.SDC.exceptions;

import com.raicod3.SDC.constants.HttpStatusConstants;

public class HttpForbiddenException extends HttpException {
    public HttpForbiddenException(String message) {
        super(HttpStatusConstants.FORBIDDEN, message);
    }
}
