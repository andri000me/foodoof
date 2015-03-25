<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class RecipeController extends CI_Controller {

	public function publish($id, $isPublished){
		$recipe  = new Recipe();
		$recipe->get_by_id($id)->update('status', $isPublished);
	}

	public function edit($id){
		$recipe  = new Recipe();
		$recipe->id = $id;
		foreach ($recipe->get() as $obj)
		{
			
		}
	}

	// ini pake post, lihat registration
	public function save(){
		$recipe = new Recipe();
		$recipe->name = $this->input->post("title");
		$recipe->description = $this->input->post("description");
		$recipe->portion = $this->input->post("portion");
		$recipe->duration = $this->input->post("duration");
		$recipe->author = $this->input->post("author");
		if($recipe->save()){
			echo "Success";
		}
		else{
			echo "Failed";
		}
	}

	// 
	public function create(){
		$recipe = new Recipe();
		$id = $recipe->createRecipe(); 
		if ($id != 0) {
			$this->edit($id);
		} else {

		}
	}

	// ini buat ambil resep dengan input id
	public function recipes($id){
		$recipe = new Recipe();
		$recipe->get_by_id($id); 
	}

	// top resep untuk halaman top Page.
	public function topPage(){
		$recipe = new Recipe();
		$recipe->order_by("rating","desc");
		
		$this->load->library('parser');
		$arr = array();

		foreach ($recipe->get(10,0) as $obj)
		{
			$data = array(
				'judul' => $obj->name,
				'author' => $obj->author,
				'date' => $obj->last_update,
				'rating' => $obj->rating,
				'views' => $obj->views,
				'photo' => $obj->photo
				);
			array_push($arr, $data);
		}
		$data1=array(
			'data' => $arr
			);

		$this->parser->parse("coba_top_recipe", $data1);
	}

	// top recipe untuk halaman home.
	public function topHome(){
		$recipe = new Recipe();
		$recipe->order_by("rating","desc");
		
		$this->load->library('parser');
		$arr = array();

		foreach ($recipe->get(5,0) as $obj)
		{
			$data = array(
				'judul' => $obj->name,
				'author' => $obj->author,
				'date' => $obj->last_update,
				'rating' => $obj->rating,
				'views' => $obj->views,
				'photo' => $obj->photo
				);
			array_push($arr, $data);
		}
		$data1=array(
			'data' => $arr
			);
		
		$this->parser->parse("coba_top_recipe", $data1);
	}

	// ini buat ambil highlight resep
	public function highlight(){
		$recipe = new Recipe();
		$recipe->get_by_highlight(0);
		foreach ($recipe as $obj)
		{
		    echo $obj->name ;
		    echo "<br>";
		}

	}

	// ini buat ambil recent resep
	public function recent(){
		$recipe = new Recipe();
		$recipe->order_by("create_date","desc");
		foreach ($recipe->get() as $obj)
		{
		    echo $obj->name ;
		    echo "<br>";
		}
	}
}