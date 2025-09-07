package com.raicod3.SDC.exceptions;

import com.raicod3.SDC.constants.HttpStatusConstants;

public class HttpNotFoundException extends HttpException {
    public HttpNotFoundException(String message) {
        super(HttpStatusConstants.NOT_FOUND, message);
    }
}
