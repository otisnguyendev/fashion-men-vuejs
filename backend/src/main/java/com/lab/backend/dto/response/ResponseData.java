package com.lab.backend.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;

@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
public class ResponseData<T> implements Serializable {
    int status;
    String message;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    T data;
}
