package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.AbstractApplicationContext;

import java.lang.module.Configuration;

@SpringBootApplication
public class InventoryApplication {

	public static void main(String[] args) {
		AbstractApplicationContext context = (AbstractApplicationContext) SpringApplication.run(InventoryApplication.class, args);
		context.registerShutdownHook();
	}

}
