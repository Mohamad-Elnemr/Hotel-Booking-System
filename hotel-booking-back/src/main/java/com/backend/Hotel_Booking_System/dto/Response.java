package com.backend.Hotel_Booking_System.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.groups.Default;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Response {

    @Getter
    @Setter
    @Value("${my.default.statusCode:200}") // Default value if not set in properties
    private int statusCode;
    private String message;

    private String token;
    private String role;
    private String expirationTime;
    private String bookingConfirmationCode;

    private UserDTO user;
    private RoomDTO room;
    private BookingDTO booking;
    private List<UserDTO> userList;
    private List<RoomDTO> roomList;
    private List<BookingDTO> bookingList;

}
