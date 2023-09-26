package com.unishare.backend.service;

import com.unishare.backend.DTO.Response.UniversityResponse;
import com.unishare.backend.exceptionHandlers.ErrorMessageException;
import com.unishare.backend.model.University;
import com.unishare.backend.repository.UniversityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UniversityService {

    private final UniversityRepository universityRepository;

    @Autowired
    public UniversityService(UniversityRepository universityRepository) {
        this.universityRepository = universityRepository;
    }

    public List<UniversityResponse> getAllUniversities() {
        List<University> universities = universityRepository.findAll();
        return universities.stream()
                .map(uni -> new UniversityResponse(uni.getId(), uni.getUniversityName()))
                .collect(Collectors.toList());
    }

    public UniversityResponse getUniversityById(Long id) {
        University university = universityRepository.findById(id)
                .orElseThrow(() -> new ErrorMessageException("University is not found with ID: " + id));
        return new UniversityResponse(university.getId(), university.getUniversityName());
    }

    public UniversityResponse createUniversity(String universityName) {
        University university = new University();
        university.setUniversityName(universityName);

        university = universityRepository.save(university);
        return new UniversityResponse(university.getId(), university.getUniversityName());
    }

    public UniversityResponse updateUniversity(Long id, String updatedUniversityName) {
        University university = universityRepository.findById(id)
                .orElseThrow(() -> new ErrorMessageException("University is not found with ID: " + id));

        university.setUniversityName(updatedUniversityName);

        university = universityRepository.save(university);
        return new UniversityResponse(university.getId(), university.getUniversityName());
    }

    public void deleteUniversity(Long id) {
        University university = universityRepository.findById(id)
                .orElseThrow(() -> new ErrorMessageException("University not found with ID: " + id));

        universityRepository.delete(university);
    }
}