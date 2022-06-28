package web.models;


public class studentRaw {
	
	public String id;
	public String name;
	public String dob;
	public String department;
	public String approved = "0";
	
	public studentRaw() {
		// TODO Auto-generated constructor stub
	}
	public void setDepartment(String department) {
		this.department = department;
	}public void setDob(String dob) {
		this.dob = dob;
	}public void setId(String id) {
		this.id = id;
	}public String getId() {
		return id;
	}public String getDepartment() {
		return department;
	}public String getDob() {
		return dob;
	}public String getName() {
		return name;
	}public String getApproved() {
		return approved;
	}public void setApproved(String approved) {
		this.approved = approved;
	}public void setName(String name) {
		this.name = name;
	}

}
