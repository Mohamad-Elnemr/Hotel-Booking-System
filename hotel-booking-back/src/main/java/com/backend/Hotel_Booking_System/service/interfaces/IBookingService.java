package com.backend.Hotel_Booking_System.service.interfaces;

import com.backend.Hotel_Booking_System.dto.Response;
import com.backend.Hotel_Booking_System.entity.Booking;

public interface IBookingService {

    Response saveBooking(Long roomId, Long userId, Booking bookingRequest);

    Response findBookingByConfirmationCode(String confirmationCode);

    Response getAllBookings();

    Response cancelBooking(Long bookingId);

}
