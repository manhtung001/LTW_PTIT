package web.controllers;

import java.sql.Date;
import java.util.Optional;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import web.models.student;
import web.models.studentRaw;
import web.repositories.studentRepository;

@Controller
@RequestMapping(path="student")
public class studentController {
	
	@Autowired
	private studentRepository StudentRepository;
	
	@RequestMapping(value="addStudentPage", method=RequestMethod.GET)
	public String addStudentPage(Model model) {
		model.addAttribute("studentRaw", new studentRaw());
		return "addStudentPage";
	}
	
	@RequestMapping(value="addStudentConfirm", method=RequestMethod.POST)
	public String addStudentConfirm(Model model, studentRaw StudentRaw, HttpSession session) {
		
		session.setAttribute("departmentSession", StudentRaw.department);
		
		
		String messageErrorId = "";
		String messageErrorName = "";
		String messageErrorDob = "";
		
		int checkError = 0;
		
		if(StudentRaw.id.trim().isEmpty()) {
			messageErrorId = "id not empty";
			checkError += 1;
		} else {
			if(StudentRepository.existsById(StudentRaw.id)) {
				messageErrorId = "id has exist";
				checkError += 1;
			}
		}
		
		if(StudentRaw.name.trim().isEmpty()) {
			messageErrorName = "name not empty";
			checkError += 1;
		}
		
		if(StudentRaw.dob.trim().isEmpty()) {
			messageErrorDob = "dob not empty";
			checkError += 1;
		} else {
			try {
		        Date dateParsed = Date.valueOf(StudentRaw.dob);
			} catch(Exception e) {
				messageErrorDob = "dob khong dung dinh dang yyyy-mm-dd";
				checkError += 1;
			}
		}
		
		if(checkError == 0) {
			model.addAttribute("StudentRaw", StudentRaw);
			return "addStudentConfirm";
		} else {
			model.addAttribute("messageErrorId", messageErrorId);
			model.addAttribute("messageErrorName", messageErrorName);
			model.addAttribute("messageErrorDob", messageErrorDob);
			return "addStudentPage";
		}
		
	}
	
	@RequestMapping(value="addStudent", method=RequestMethod.POST)
	public String addProduct(Model model, studentRaw StudentRaw) {
		student StudentAdd = new student();
		StudentAdd.setId(StudentRaw.id);
		StudentAdd.setName(StudentRaw.name);
		StudentAdd.setDob(Date.valueOf(StudentRaw.dob));
		StudentAdd.setDepartment(StudentRaw.department);
		StudentAdd.setApproved(Integer.parseInt(StudentRaw.approved));
		StudentRepository.save(StudentAdd);
		return "redirect:/";	
	}
	
	
	
	@RequestMapping(value="updateStudentPage/{Id}", method=RequestMethod.GET)
	public String updateStudentPage(Model model, @PathVariable String Id) {
		student studentFinded = StudentRepository.findById(Id).get();
		studentRaw studentRawFinded = new studentRaw();
		studentRawFinded.setId(studentFinded.id);
		studentRawFinded.setName(studentFinded.name);
		studentRawFinded.setDob(studentFinded.dob.toString());
		studentRawFinded.setDepartment(studentFinded.department);
		studentRawFinded.setApproved(String.valueOf(studentFinded.approved));
		model.addAttribute("studentRawFinded", studentRawFinded);
		return "updateStudentPage";
	}
	@RequestMapping(value="updateStudent", method=RequestMethod.POST)
	public String updateStudent(Model model, studentRaw StudentRaw) {
		
		String messageErrorName = "";
		String messageErrorDob = "";
		
		int checkError = 0;
		
		if(StudentRaw.name.trim().isEmpty()) {
			messageErrorName = "name not empty";
		}
		
		if(StudentRaw.dob.trim().isEmpty()) {
			messageErrorDob = "dob not empty";
		} else {
			try {
		        Date dateParsed = Date.valueOf(StudentRaw.dob);
			} catch(Exception e) {
				messageErrorDob = "dob khong dung dinh dang yyyy-mm-dd";
			}
		}
		
		if(checkError == 0) {
			student StudentAdd = new student();
			StudentAdd.setId(StudentRaw.id);
			StudentAdd.setName(StudentRaw.name);
			StudentAdd.setDob(Date.valueOf(StudentRaw.dob));
			StudentAdd.setDepartment(StudentRaw.department);
			StudentAdd.setApproved(Integer.parseInt(StudentRaw.approved));
			StudentRepository.save(StudentAdd);
			return "redirect:/";
		} else {
			student studentFinded = StudentRepository.findById(StudentRaw.id).get();
			studentRaw studentRawFinded = new studentRaw();
			studentRawFinded.setId(studentFinded.id);
			studentRawFinded.setName(studentFinded.name);
			studentRawFinded.setDob(studentFinded.dob.toString());
			studentRawFinded.setDepartment(studentFinded.department);
			studentRawFinded.setApproved(String.valueOf(studentFinded.approved));
			model.addAttribute("studentRawFinded", studentRawFinded);
			model.addAttribute("messageErrorName", messageErrorName);
			model.addAttribute("messageErrorDob", messageErrorDob);
			return "updateStudentPage";
		}
	}
	
	
	
	@RequestMapping(value="deleteStudentPage/{Id}", method=RequestMethod.GET)
	public String deleteStudentPage(Model model, @PathVariable String Id) {
		Optional<student> studentFinded = StudentRepository.findById(Id);
		model.addAttribute("studentFinded", studentFinded.get());
		return "deleteStudent";
	}
	
	@RequestMapping(value="deleteStudent", method=RequestMethod.POST)
	public String deleteStudent(Model model, student Student) {
		StudentRepository.deleteById(Student.id);
		return "redirect:/";
	}
}

