package com.example.demo.Service;

import com.example.demo.Entity.GoodReceivedNote;
import com.example.demo.Repository.GrnRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class GrnService {
    @Autowired
    private GrnRepository grnRepository;

    public GoodReceivedNote createNewNote(GoodReceivedNote note) {
        GoodReceivedNote newNote = new GoodReceivedNote();
        newNote.setImportDate(new Date());
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        authentication.getDetails();
        newNote.setEmpId(authentication.getName());
        return grnRepository.save(newNote);
    }

    public String deleteGrn(Integer grnId) {
        grnRepository.deleteById(grnId);
        return "Note with ID " + grnId + " deleted successfully!";
    }
}
