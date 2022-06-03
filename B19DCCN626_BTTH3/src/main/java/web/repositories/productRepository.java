package web.repositories;

import org.springframework.data.repository.CrudRepository;

import web.models.product;

public interface productRepository extends CrudRepository<product, String> {
	Iterable<product> findByProductCode(String ProductCode);
//	List<product> findByProductCode(String ProductCode);
	
//	product findByProductCode(String ProductCode);
}
