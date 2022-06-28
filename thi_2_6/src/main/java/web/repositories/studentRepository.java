package web.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import web.models.student;

public interface studentRepository extends CrudRepository<student, String> {
	@Query(value="select * from student s where s.approved=:status", nativeQuery = true)
	Iterable<student> getListStudentHandle(@Param("status") int status);
}
