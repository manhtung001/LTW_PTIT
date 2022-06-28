package web.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import web.models.student;
import web.repositories.studentRepository;

@Controller
@RequestMapping(path="student")
public class studentController {
	
	@Autowired
	private studentRepository StudentRepository;
	
	@RequestMapping(value="displayStudent", method=RequestMethod.GET)
	public String displayStudent(Model model) {
		
		Iterable<student> listStudent = StudentRepository.getListStudentHandle(0);
		model.addAttribute("listStudent", listStudent);
		
		return "displayStudent";
	}
	
	
	@RequestMapping(value="approved/{Id}", method=RequestMethod.GET)
	public String approved(Model model, @PathVariable String Id) {
		
		student StudentFind = StudentRepository.findById(Id).get();
		StudentFind.setApproved(1);
		StudentRepository.save(StudentFind);
		
		return "redirect:/student/displayStudent";
	}
	
	@RequestMapping(value="deletePage/{Id}", method=RequestMethod.GET)
	public String deletePage(Model model, @PathVariable String Id) {
		
		student StudentFind = StudentRepository.findById(Id).get();
		model.addAttribute("StudentFind", StudentFind);
		
		return "deletePage";
	}
	
	
	@RequestMapping(value="delete/{Id}", method=RequestMethod.GET)
	public String delete(Model model, @PathVariable String Id) {
		
		StudentRepository.deleteById(Id);
		
		return "redirect:/student/displayStudent";
	}
}
