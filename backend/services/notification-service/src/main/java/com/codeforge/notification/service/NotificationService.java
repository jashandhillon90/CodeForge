package com.codeforge.notification.service;

import com.codeforge.notification.model.Notification;
import com.codeforge.notification.repository.NotificationRepository;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public List<Notification> getNotificationsForUser(Long userId) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    @RabbitListener(queues = "submission.created")
    @Transactional
    public void onSubmissionCreated(Map<String, Object> message) {
        Notification notification = new Notification();
        notification.setUserId(((Number) message.get("userId")).longValue());
        notification.setTitle("Submission received");
        notification.setMessage("Your code has been queued for evaluation.");
        notification.setType("INFO");
        notification.setRead(false);
        notificationRepository.save(notification);
    }
}
