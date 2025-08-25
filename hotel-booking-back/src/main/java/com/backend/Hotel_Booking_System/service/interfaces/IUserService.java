package com.backend.Hotel_Booking_System.service.interfaces;

import com.backend.Hotel_Booking_System.dto.LoginRequest;
import com.backend.Hotel_Booking_System.dto.Response;
import com.backend.Hotel_Booking_System.entity.User;

public interface IUserService {
    Response register(User user);

    Response login(LoginRequest loginRequest);

    Response getAllUsers();

    Response getUserBookingHistory(String userId);

    Response deleteUser(String userId);

    Response getUserById(String userId);

    Response getMyInfo(String email);

}