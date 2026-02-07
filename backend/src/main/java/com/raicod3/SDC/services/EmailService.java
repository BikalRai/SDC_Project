package com.raicod3.SDC.services;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String senderEmail;

    private void sendEmail(String to, String subject, String htmlContent) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setFrom(senderEmail);
        helper.setText(htmlContent, true);
        mailSender.send(message);
    }

    // --- TEMPLATE 1: Welcome/Registration ---
    public void sendWelcomeEmail(String to, String username) throws MessagingException {
        String subject = "Welcome to Kiraya Bazar!";
        String content = """
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                <h2 style="color: #4A90E2;">Welcome, %s!</h2>
                <p>Your account at <b>Kiraya Bazar</b> has been verified successfully.</p>
                <p>You can now start browsing items available for rent.</p>
                <a href="http://localhost:5173/login" style="display: inline-block; background: #4A90E2; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; margin-top: 15px;">Login to Dashboard</a>
            </div>
            """.formatted(username);
        sendEmail(to, subject, content);
    }

    // --- TEMPLATE 2: Renting Confirmation ---
    public void sendRentingConfirmation(String to, String username, String itemName, String price) throws MessagingException {
        String subject = "Renting Confirmation: " + itemName;
        String content = """
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                <h2 style="color: #27AE60;">Rental Confirmed!</h2>
                <p>Hi %s, you have successfully rented <b>%s</b>.</p>
                <p style="font-size: 1.1em;">Total Price: <b>%s</b></p>
                <hr style="border: 0; border-top: 1px solid #eee;">
                <p>Please coordinate with the owner for pick-up details.</p>
            </div>
            """.formatted(username, itemName, price);
        sendEmail(to, subject, content);
    }
}


