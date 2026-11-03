package com.codeforge.contest.service;

import com.codeforge.contest.dto.ContestRequest;
import com.codeforge.contest.model.Contest;
import com.codeforge.contest.repository.ContestRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ContestService {

    private final ContestRepository contestRepository;

    public ContestService(ContestRepository contestRepository) {
        this.contestRepository = contestRepository;
    }

    public List<Contest> getAllContests() {
        return contestRepository.findAll();
    }

    public Contest getContestById(Long id) {
        return contestRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Contest not found: " + id));
    }

    @Transactional
    public Contest createContest(ContestRequest request) {
        Contest contest = new Contest();
        contest.setTitle(request.getTitle().trim());
        contest.setDescription(request.getDescription());
        contest.setStartTime(request.getStartTime());
        contest.setEndTime(request.getEndTime());
        contest.setMaxParticipants(request.getMaxParticipants() == null ? 200 : request.getMaxParticipants());
        contest.setProblemIds(request.getProblemIds() == null ? List.of() : request.getProblemIds());
        contest.setStatus("UPCOMING");
        return contestRepository.save(contest);
    }

    @Transactional
    public Contest registerParticipant(Long id) {
        Contest contest = getContestById(id);
        if (contest.getParticipantsCount() == null) {
            contest.setParticipantsCount(0);
        }
        if (contest.getParticipantsCount() >= contest.getMaxParticipants()) {
            throw new IllegalStateException("Contest is full");
        }
        contest.setParticipantsCount(contest.getParticipantsCount() + 1);
        return contestRepository.save(contest);
    }
}
