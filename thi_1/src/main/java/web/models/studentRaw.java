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
	
	public String getApproved() {
		return approved;
	}public String getDob() {
		return dob;
	}public String getDepartment() {
		return department;
	}public String getId() {
		return id;
	}public String getName() {
		return name;
	}public void setApproved(String approved) {
		this.approved = approved;
	}public void setDob(String dob) {
		this.dob = dob;
	}public void setDepartment(String department) {
		this.department = department;
	}public void setId(String id) {
		this.id = id;
	}public void setName(String name) {
		this.name = name;
	}

}

