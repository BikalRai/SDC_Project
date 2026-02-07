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

    public void sendHtmlTemplateEmail(String to, String subject, String username) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();

        MimeMessageHelper helper = new MimeMessageHelper(message, true, "Utf8");

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setFrom(senderEmail);

        String htmlContent = """
                <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
                                <h2 style="color: #4A90E2;">Welcome, %s!</h2>
                                <p>We are thrilled to have you in our <b>Communication Technology</b> portal.</p>
                                <p>Your account is now active. You can start exploring our APIs right away.</p>
                                <br>
                                <a href="http://localhost:3000" style="background: #4A90E2; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                                    Visit Dashboard
                                </a>
                                <p style="margin-top: 20px; font-size: 0.8em; color: #888;">If you didn't sign up for this, please ignore this email.</p>
                            </div>
                """.formatted(username);

        helper.setText(htmlContent, true);
        mailSender.send(message);
    }

}
