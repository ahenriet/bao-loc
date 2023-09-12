package com.example.baoloc.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.baoloc.helper.ResultHelper;
import com.example.baoloc.model.Result;
import com.example.baoloc.repository.ResultRepository;

@RestController
@RequestMapping("/api")
public class ResultController {

    @Autowired
    ResultRepository resultRepository;

    @PostMapping("/results")
    public ResponseEntity<List<Result>> computeResults() {
        List<Result> results = ResultHelper.computeAllResults();

        try {
            // I choose to delete all results from the DB before storing the results in
            // order to avoid duplicates
            resultRepository.deleteAll();
            List<Result> newResults = resultRepository.saveAll(results);
            return new ResponseEntity<>(newResults, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/results/{id}")
    public ResponseEntity<Result> updateResult(@PathVariable("id") long id, @RequestBody Result resultToUpdate) {
        try {
            Optional<Result> resultOptional = resultRepository.findById(id);
            if (resultOptional.isPresent()) {
                if (ResultHelper.isASolution(resultToUpdate.toIntArray())) {
                    resultToUpdate.setId(id);
                    Result updatedResult = resultRepository.save(resultToUpdate);
                    return new ResponseEntity<>(updatedResult, HttpStatus.OK);
                }
                return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/results/{id}")
    public ResponseEntity<HttpStatus> deleteResult(@PathVariable("id") long id) {
        try {
            resultRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
