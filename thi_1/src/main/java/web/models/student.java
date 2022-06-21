package web.models;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class student {
	@Id
	public String id;
	public String name;
	public Date dob;
	public String department;
	public int approved;
	
public student() {
	// TODO Auto-generated constructor stub
}public int getApproved() {
	return approved;
}public String getDepartment() {
	return department;
}public String getId() {
	return id;
}public String getName() {
	return name;
}public void setApproved(int approved) {
	this.approved = approved;
}public Date getDob() {
	return dob;
}public void setDob(Date dob) {
	this.dob = dob;
}public void setDepartment(String department) {
	this.department = department;
}public void setId(String id) {
	this.id = id;
}public void setName(String name) {
	this.name = name;
}	
	
}
