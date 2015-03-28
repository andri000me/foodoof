<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class User extends CI_Controller {
	public function index(){
		$this->load->view('profile_view');
	}

	public function profile($id){
		$this->load->model('user_model');
		$profile = $this->user->getProfile($id);
		// print_r($profile);

		$data['data_profile'] = $profile;
		$this->load->model('viewer');
		$this->viewer->show('profile_view', $data);
	}

	public function timeline($id){
		$r = new Recipe();
		$recipe = $r->getUserRecipe($id);

		$data['user'] = $id;
		$data['listRecipe'] = $recipe;
		$this->load->model('viewer');
		$this->viewer->show('user_timeline_view', $data);
	}

	public function updatePassword($id){
		$data['oldPass'] = $this->input->post("password_user");
		$data['newPass'] = $this->input->post("new_password");
		$data['confirmPass'] = $this->input->post("confirm_password");
		 
		if($this->isValid($data)){
			$user = new User();
			$isChanged = $user->updatePassword($id, $data['newPass']);
			if($isChanged){
				$dataMessage['message'] = "Change Password Success"; 
			}
			else{
				$dataMessage['message'] = "Change Password Failed";
			}
		}
		else{
			$dataMessage['message'] = "Change Password Failed";
		} 

		$this->load->model('viewer');
		$this->viewer->show('change_password_view', $dataMessage);
	}

	public function viewChangePass(){
		$this->load->model('viewer');
		$this->viewer->show('change_password_view');
	}

	public function register(){
		$data['name'] = $this->input->post("name_user");
		$data['email'] = $this->input->post("email_user");
		$data['password'] = $this->input->post("password_user"); 
		$data['confrimPass'] = $this->input->post("confrim_password");
		
		if($this->isValid($data)){
			$user = new User();
			$isCreate = $user->createUser($data);
			if($isCreate){
				$dataMessage['message'] = "Registration Success"; 
			}
			else{
				$dataMessage['message'] = "Registration Failed";
			}
		}
		else{
			$dataMessage['message'] = "Registration Failed";
		} 

		$this->load->model('viewer');
		$this->viewer->show('register_view', $dataMessage);
	}

	public function edit($id){
		$u = new User();
		$data['dataProfile'] = $u->getProfile($id);

		$this->load->model('viewer');
		$this->viewer->show('edit_profile_view', $data);
		//$this->edit($id);
	}

	public function authEdit($id){ 		//
//		$this->load->model('viewer');
//		$this->viewer->show('edit_profile_view');

		$data['photo'] = $this->input->post("photo_user");
		$data['name'] = $this->input->post("name_user");
		$data['gender'] = $this->input->post("gender_user");
		$data['email'] = $this->input->post("email_user");
		$data['phone'] = $this->input->post("phone_user");
		$data['bdate'] = $this->input->post("birthDate_user");

/*		$data['twitter'] = $this->input->post("twitter_user");
		$data['fb'] = $this->input->post("fb_user");
		$data['ig'] = $this->input->post("ig_user");
		$data['gplus'] = $this->input->post("gplus_user");
		$data['linkedin'] = $this->input->post("linkedin_user");*/

		if($this->isValid($data)){
			$u = new User();
			$isUpdated = $u->updateProfile($id, $data);
			if($isUpdated){
				$dataMessage['message'] = "Update Success"; 
			}
			else{
				$dataMessage['message'] = "Update Failed";
			}
		}
		else{
			$dataMessage['message'] = "Update Failed";
		}

		$this->load->model('viewer');
		$this->viewer->show('edit_profile_view', $dataMessage);
	}

	public function getPassword($email){ //dari sequence lupa password, buat minta password nya dr userManager
		$u = new User();
		$data['password'] = $u->getPassword($email);
		$data['email'] = $email;
		if($this->sendEmail($data)){
			$dataMessage['message'] = "Email Sent";
			$this->load->model('viewer');
			$this->viewer->show('forget_password_view', $dataMessage); //else nya?
		}
	}

	public function isValid(){
		return TRUE;
	}

	public function sendEmail(){
		return TRUE;
	}
}
//udah mulai mabok -_-