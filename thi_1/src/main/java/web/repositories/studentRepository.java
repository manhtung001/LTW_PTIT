package web.repositories;

import org.springframework.data.repository.CrudRepository;

import web.models.student;

public interface studentRepository extends CrudRepository<student, String> {

}
