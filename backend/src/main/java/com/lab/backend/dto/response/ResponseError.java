package com.lab.backend.dto.response;

public class ResponseError extends ResponseData{

    public ResponseError(int status, String message, Object data) {
        super(status, message, data);
    }
}
