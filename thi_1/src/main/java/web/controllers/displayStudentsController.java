package web.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import web.models.student;
import web.repositories.studentRepository;

@Controller
@RequestMapping(path="/")
public class displayStudentsController {
	
	@Autowired
	private studentRepository StudentRepository;	
		
	@RequestMapping(value="", method=RequestMethod.GET)
	public String displaySudents(Model model) {
		
		Iterable<student> listStudent = StudentRepository.findAll();
		model.addAttribute("listStudent", listStudent);
		return "displayStudents";
	}
}

