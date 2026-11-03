package com.codeforge.notification;

import com.codeforge.notification.model.Notification;
import com.codeforge.notification.repository.NotificationRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class NotificationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private NotificationRepository notificationRepository;

    @Test
    void getNotificationsShouldReturnList() throws Exception {
        Notification notification = new Notification();
        notification.setId(1L);
        notification.setUserId(4L);
        notification.setTitle("Submission received");
        notification.setMessage("Your code is queued");
        notification.setType("INFO");
        given(notificationRepository.findByUserIdOrderByCreatedAtDesc(4L)).willReturn(List.of(notification));

        mockMvc.perform(get("/api/notifications/user/4"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("Submission received"));
    }
}
