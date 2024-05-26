package com.example.demo.Repository;

import com.example.demo.Entity.GoodReceivedNote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GrnRepository extends JpaRepository<GoodReceivedNote, Integer> {
}
