package web.controllers;

import java.sql.Date;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import web.models.student;
import web.models.studentRaw;
import web.repositories.studentRepository;

@Controller
@RequestMapping(path="/")
public class studentController {
	
	@Autowired
	private studentRepository StudentRepository;
	
	@RequestMapping(value="", method=RequestMethod.GET)
	public String addPage(Model model) {
		model.addAttribute("studentRaw", new studentRaw());
		return "addPage";
	}
	
	
	@RequestMapping(value="addConfirm", method=RequestMethod.POST)
	public String addConfirm(Model model, studentRaw StudentRaw, HttpSession session) {
		
		session.setAttribute("departmentSession", StudentRaw.department);
		
		String errId = "";
		String errName = "";
		String errDob = "";
		
		int checkErr = 0;
		
		
		if(StudentRaw.id.trim().isEmpty()) {
			errId = "Id not null";
			checkErr += 1;
		} else if(StudentRepository.existsById(StudentRaw.id)) {
			errId = "Id has exist null";
			checkErr += 1;
		}
		
		if(StudentRaw.name.trim().isEmpty()) {
			errName = "Id not null";
			checkErr += 1;
		}
		
		if(StudentRaw.dob.trim().isEmpty()) {
			errDob = "Id not null";
			checkErr += 1;
		} else {
			try {
				Date tmp = Date.valueOf(StudentRaw.dob);
			} catch (Exception e) {
				errDob = "dob khong dung dinh dang";
				checkErr += 1;
			}
		}
		
		if(checkErr == 0) {
			model.addAttribute("studentRaw", StudentRaw);
			return "addConfirm";
		} else {
			model.addAttribute("errId", errId);
			model.addAttribute("errName", errName);
			model.addAttribute("errDob", errDob);
			return "addPage";
		}
	}
	
	@RequestMapping(value="add", method=RequestMethod.POST)
	public String add(Model model, studentRaw StudentRaw) {
		
		student StudentAdd = new student();
		
		StudentAdd.setId(StudentRaw.id);
		StudentAdd.setName(StudentRaw.name);
		StudentAdd.setDob(Date.valueOf(StudentRaw.dob));
		StudentAdd.setDepartment(StudentRaw.department);
		StudentAdd.setApproved(Integer.valueOf(StudentRaw.approved));
		
		StudentRepository.save(StudentAdd);
		
		return "redirect:/";
	}
	
}
