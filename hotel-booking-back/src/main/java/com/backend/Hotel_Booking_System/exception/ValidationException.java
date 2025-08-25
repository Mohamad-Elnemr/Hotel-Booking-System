package com.backend.Hotel_Booking_System.exception;

public class ValidationException extends RuntimeException{

    public ValidationException( String message ){
        super( message );
    }
}
