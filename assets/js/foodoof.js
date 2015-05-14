$(document).ready(function() {
	$validateDuplicate = true;
	$validatePassword = true;	
	$recipeId = $("#image-recipe").data("id");
	$lock = 0;
	$submitStatus=false;
	$hasChanged = false;
	$baseurl = "http://localhost/foodoof/index.php";
	$baseurlnoConflict = "http://localhost/foodoof/";
	$.get( $baseurl+"/processAjax/schedulercleantmp", function( data ) {
	},"json");
	/*
	script for init fileinput of user's photo
	*/
	$("#photo-profile").fileinput({
		previewFileType: "image",
		browseClass: "btn button-default btn-block",
		browseLabel: "  Pick Image",
		browseIcon: '<i class="fa fa-image"> </i>',
		showCaption: false,
		showRemove: false,
		showUpload: false,
		uploadUrl: $baseurl+"/processAjax/uploadProfileUser/"+$("#photo-profile").data("id"), // server upload action
		uploadAsync: false,
		previewTemplates: {
	    	image: "<div class='file-preview-frame' id='{previewId}' data-fileindex='{fileindex}'>\n" +
        "   <img src='{data}' class='file-preview-image img-responsive' title='{caption}' alt='{caption}'>\n" +
        "   {footer}\n" +
        "</div>\n",
	    },
	    layoutTemplates:{
	    	preview: "<div class='file-preview {class}''>\n" +
		        "    <div class='close fileinput-remove' style='display:none'>&times;</div>\n" +
		        "    <div class=''>\n" +
		        "    <div class='file-preview-thumbnails'>\n" +
		        "    </div>\n" +
		        "    <div class='clearfix'></div>" +
		        "    <div class='file-preview-status text-center text-success'></div>\n" +
		        "    <div class='kv-fileinput-error'></div>\n" +
		        "    </div>\n" +
		        "</div>",
		    progress: '<div class="progress" style="display:none;">\n' +
		        '    <div class="{class}" role="progressbar" aria-valuenow="{percent}" aria-valuemin="0" aria-valuemax="100" style="width:{percent}%;">\n' +
		        '        {percent}%\n' +
		        '     </div>\n' +
		        '</div>',
	    },
		initialPreview: [
	        "<img src='"+$("#photo-profile").data("src")+"' class='file-preview-image img-responsive' alt='"+$("#photo-profile").data("title")+"' title='"+$("#photo-profile").data("title")+"'>",
	    ],
	    overwriteInitial: true,
	    maxFileSize: 5120,
	}).on("filebatchselected", function(event, files) {
    	// trigger upload method immediately after files are selecte
    	$("#photo-profile").fileinput("upload");
	});
	$("#photo-profile").on('filelock', function(event, filestack, extraData) {
	    $lock++;
	    $hasChanged = true;
    });
   $("#photo-profile").on('fileunlock', function(event, filestack, extraData) {
	    $lock-=2;
	    if ($submitStatus){
	    	$("form").trigger("submit");
	    }
    });

	/*
	script for init fileinput of recipe's photo
	*/
	$photoRecipe = $("#image-recipe");
	$photoRecipe.fileinput({
		previewFileType: "image",
		browseClass: "btn button-default btn-block",
		browseLabel: "  Pick Image",
		browseIcon: '<i class="fa fa-image"> </i>',
		showCaption: false,
		showRemove: false,
		showUpload: false,
		maxFileCount: 1,
		uploadUrl: $baseurl+"/processAjax/uploadProfileRecipe/"+$recipeId, // server upload action
		uploadAsync: false,
		previewTemplates: {
	    	image: "<div class='file-preview-frame' id='{previewId}' data-fileindex='{fileindex}'>\n" +
        "   <img src='{data}' class='file-preview-image img-responsive' title='{caption}' alt='{caption}'>\n" +
        "   {footer}\n" +
        "</div>\n",
	    },
	    layoutTemplates:{
	    	preview: "<div class='file-preview {class}''>\n" +
		        "    <div class='close fileinput-remove' style='display:none'>&times;</div>\n" +
		        "    <div class=''>\n" +
		        "    <div class='file-preview-thumbnails'>\n" +
		        "    </div>\n" +
		        "    <div class='clearfix'></div>" +
		        "    <div class='file-preview-status text-center text-success'></div>\n" +
		        "    <div class='kv-fileinput-error'></div>\n" +
		        "    </div>\n" +
		        "</div>",
		    progress: '<div class="progress" style="display:none;">\n' +
		        '    <div class="{class}" role="progressbar" aria-valuenow="{percent}" aria-valuemin="0" aria-valuemax="100" style="width:{percent}%;">\n' +
		        '        {percent}%\n' +
		        '     </div>\n' +
		        '</div>',
	    },
		initialPreview: [
	        "<img src='"+$("#image-recipe").data("src")+"' class='file-preview-image img-responsive' alt='"+$("#image-recipe").data("title")+"' title='"+$("#image-recipe").data("title")+"'>",
	    ],
	    overwriteInitial: true,
	    maxFileSize: 5120,
	}).on("filebatchselected", function(event, files) {
    	// trigger upload method immediately after files are selecte
    	$photoRecipe.fileinput("upload");
	});
	$photoRecipe.on('filelock', function(event, filestack, extraData) {
	    $lock++;
	    $hasChanged = true;
    });
    $photoRecipe.on('fileunlock', function(event, filestack, extraData) {
	    $lock -= 2;
	    if ($submitStatus){
	    	$("form").trigger("submit");
	    }
    });

	/*
	script for init fileinput of step's photo
	*/
	var index = 0;
	$(".image-steps").click(function(){
		index = $(".image-steps").index(this)+1;
	});
	$input = $(".image-steps");
	$input.each(function(i){
		$(this).fileinput({
			previewFileType: "image",
			browseClass: "btn button-default btn-block",
			browseLabel: "  Pick Image",
			browseIcon: '<i class="fa fa-image"> </i>',
			showCaption: false,
			showRemove: false,
			showUpload: false,
			uploadUrl: $baseurl+"/processAjax/uploadStepsRecipe/"+$recipeId+"/", // server upload action
			uploadAsync: false,	
			previewTemplates: {
		    	image: "<div class='file-preview-frame' id='{previewId}' data-fileindex='{fileindex}'>\n" +
	        "   <img src='{data}' class='file-preview-image img-responsive' title='{caption}' alt='{caption}'>\n" +
	        "   {footer}\n" +
	        "</div>\n",
		    },
		    layoutTemplates:{
		    	preview: "<div class='file-preview {class}''>\n" +
			        "    <div class='close fileinput-remove' style='display:none'>&times;</div>\n" +
			        "    <div class=''>\n" +
			        "    <div class='file-preview-thumbnails'>\n" +
			        "    </div>\n" +
			        "    <div class='clearfix'></div>" +
			        "    <div class='file-preview-status text-center text-success'></div>\n" +
			        "    <div class='kv-fileinput-error'></div>\n" +
			        "    </div>\n" +
			        "</div>",
			    progress: '<div class="progress" style="display:none;">\n' +
			        '    <div class="{class}" role="progressbar" aria-valuenow="{percent}" aria-valuemin="0" aria-valuemax="100" style="width:{percent}%;">\n' +
			        '        {percent}%\n' +
			        '     </div>\n' +
			        '</div>',
		    },
			initialPreview: [
	        	"<img src='"+$(".image-steps[index='"+(i+1)+"']").data("src")+"' class='file-preview-image img-responsive' alt='"+$(".image-steps[index='"+(i+1)+"']").data("title")+"' title='"+$(".image-steps[index='"+(i+1)+"']").data("title")+"'>",
	    	],
		    uploadExtraData:
		    		function() {
					    return {
					       no_step: index,
					    };
					}
		    ,
		    overwriteInitial: true,
		    maxFileSize: 500,
		}).on("filebatchselected", function(event, files) {
	    	// trigger upload method immediately after files are selecte
	    	$(this).fileinput("upload");
		});
		$(this).on('filelock', function(event, filestack, extraData) {
	    	$lock++;
	    	$hasChanged = true;
	    });
	    $(this).on('fileunlock', function(event, filestack, extraData) {
		    $lock-=2;
		    if ($submitStatus){
		    	$("form").trigger("submit");
		    }
	    });
	});

	/*
	init ingredient if create recipe
	*/
	$countIngredient = $(".ingredient-item").length;
	if($countIngredient<1){
		$colAddRemoveBtnIngredient = $("#add-and-remove-btn-ingredient").clone();
		$ingredientItemFirst = "<div class='col-sm-10 col-xs-10 col-no-padding ingredient-item'>"+"<div class='col-sm-5 col-xs-5'>"+"<input type='text' value='' name='ingredient_subject[]' class='form-control input-ingredient' placeholder='Ingredient Name'>"+"</div>"+"<div class='col-sm-3 col-xs-3 col-no-padding-left'>"+"<input type='text' step='0.01' value='' name='ingredient_quantity[]' class='form-control' placeholder='Quantity'>"+"</div>"+"<div class='col-sm-3 col-xs-3 col-no-padding-left'>"+"<input type='text' value='' name='ingredient_unit[]'' class='form-control' placeholder='Unit'>"+"</div>"+"<div class='col-sm-1 col-xs-1 col-no-padding-left' style='padding:10px 0'><i class='fa fa-info-circle icons-secondary fa-lg' role='button' title='Info Ingrdient' data-toggle='popover-x' data-target='#ingredient-1' data-placement='right'></i><div id='ingredient-1' class='popover popover-default'><div class='arrow'></div><div class='popover-title'><span class='close' data-dismiss='popover-x'>&times;</span>Information Ingredient</div><div class='popover-content'><textarea class='form-control' name='ingredient_info[]'></textarea></div></div></div></div>";
		$("#add-and-remove-btn-ingredient").remove();
		$("#ingredient-entry").append($ingredientItemFirst);
		$("#ingredient-entry").append($colAddRemoveBtnIngredient);
	}
	$(".ingredient-item:first > div > input").each(function(i){
		$(this).prop('required',true);
		if($(this).hasClass('hidden')){
			$(this).prop('required',false);
		}
	});
	$(".ingredient-item > div > input[type='number']").prop('required',false);

	/*
	init step if create recipe
	*/
	$countStep = $(".step-item").length;
	if($countStep < 1){
		$colAddRemoveBtnStep = $("#add-and-remove-btn-step").clone();
		$stepItem = "<div class='col-sm-10 col-xs-10 col-no-padding step-item'><div class='col-sm-8 col-xs-7 col-no-padding-right'><textarea class='form-control' rows='6' name='step-description[]' placeholder='Steps'></textarea></div><div class='col-sm-4 col-xs-5'><input class='image-steps' name='photo-step' data-src='/foodoof/assets/img/step-default.jpg' index='1' data-title='new step' type='file' accept='image/*'></div></div>";
		$("#add-and-remove-btn-step").remove();
		$("#step-entry").append($stepItem);
		$("#step-entry").append($colAddRemoveBtnStep);
		$inputStepFirst = $(".image-steps[index='1']");
		$inputStepFirst.fileinput({
			previewFileType: "image",
			browseClass: "btn button-default btn-block",
			browseLabel: "  Pick Image",
			browseIcon: '<i class="fa fa-image"> </i>',
			showCaption: false,
			showRemove: false,
			showUpload: false,
			uploadUrl: $baseurl+"/processAjax/uploadStepsRecipe/"+$recipeId+"/", // server upload action
			uploadAsync: false,	
			previewTemplates: {
		    	image: "<div class='file-preview-frame' id='{previewId}' data-fileindex='{fileindex}'>\n" +
	        "   <img src='{data}' class='file-preview-image img-responsive' title='{caption}' alt='{caption}'>\n" +
	        "   {footer}\n" +
	        "</div>\n",
		    },
		    layoutTemplates:{
		    	preview: "<div class='file-preview {class}''>\n" +
			        "    <div class='close fileinput-remove' style='display:none'>&times;</div>\n" +
			        "    <div class=''>\n" +
			        "    <div class='file-preview-thumbnails'>\n" +
			        "    </div>\n" +
			        "    <div class='clearfix'></div>" +
			        "    <div class='file-preview-status text-center text-success'></div>\n" +
			        "    <div class='kv-fileinput-error'></div>\n" +
			        "    </div>\n" +
			        "</div>",
			    progress: '<div class="progress" style="display:none;">\n' +
			        '    <div class="{class}" role="progressbar" aria-valuenow="{percent}" aria-valuemin="0" aria-valuemax="100" style="width:{percent}%;">\n' +
			        '        {percent}%\n' +
			        '     </div>\n' +
			        '</div>',
		    },
			initialPreview: [
	        	"<img src='"+$inputStepFirst.data("src")+"' class='file-preview-image img-responsive' alt='"+$inputStepFirst.data("title")+"' title='"+$inputStepFirst.data("title")+"'>",
	    	],
		    uploadExtraData:
		    		function() {
					    return {
					       no_step: 1,
					    };
					}
		    ,
		    overwriteInitial: true,
		    maxFileSize: 5120,
		}).on("filebatchselected", function(event, files) {
	    	// trigger upload method immediately after files are selecte
	    	$inputStepFirst.fileinput("upload");
		});
		$inputStepFirst.on('filelock', function(event, filestack, extraData) {
		    $lock++;
	    });
	    $inputStepFirst.on('fileunlock', function(event, filestack, extraData) {
		    $lock-=2;
		    if ($submitStatus){
		    	$("form").trigger("submit");
		    }
	    });
	}
	$(".step-item:first > div > textarea").prop('required',true);
	
	/*
	event handler for search bar
	*/
	$("ul#listSearch > li").click(function(e){
		var search = $(this).find("input").val();
		if(search==="title"){	
			$("#searchbar").attr("placeholder", "Search Recipe By Title");
			$(".search-ingredient").typeahead('destroy');
			$("#searchbar").addClass("search-title");
			$("#searchbar").removeClass("search-ingredient");
			$("#searchbar").removeClass("search-account");
			$("button.dropdown-cat-search").html($("ul#listSearch > li > label[for='search-title']").find("i").clone());
			$("button.dropdown-cat-search").prop('title','Search Recipe By Title');
			$("ul#listSearch > li > input[value='title']").prop('checked', true);
			$("ul#listSearch > li > input[value='ingredient']").prop('checked', false);
			$("ul#listSearch > li > input[value='account']").prop('checked', false);
			initTypeahead("search-title");
		}
		else if(search==="ingredient"){	
			$("#searchbar").attr("placeholder", "Search Recipe By Ingredient");
			$("#searchbar").addClass("search-ingredient");
			$("#searchbar").removeClass("search-title");
			$("#searchbar").removeClass("search-account");
			$("button.dropdown-cat-search").html($("ul#listSearch > li > label[for='search-ingredient']").find("i").clone());
			$("button.dropdown-cat-search").prop('title','Search Recipe By Ingredient');
			$("ul#listSearch > li > input[value='title']").prop('checked', false);
			$("ul#listSearch > li > input[value='ingredient']").prop('checked', true);
			$("ul#listSearch > li > input[value='account']").prop('checked', false);
			initTypeahead("search-ingredient");
		}
		else if(search==="account"){	
			$("#searchbar").attr("placeholder", "Search Account");
			$(".search-ingredient").typeahead('destroy');
			$("#searchbar").removeClass("search-title");
			$("#searchbar").removeClass("search-ingredient");
			$("#searchbar").addClass("search-account");
			$("button.dropdown-cat-search").html($("ul#listSearch > li > label[for='search-account']").find("i").clone());
			$("button.dropdown-cat-search").prop('title','Search Account');
			$("ul#listSearch > li > input[value='title']").prop('checked', false);
			$("ul#listSearch > li > input[value='ingredient']").prop('checked', false);
			$("ul#listSearch > li > input[value='account']").prop('checked', true);
			initTypeahead("search-account");
		}
	});

	function getUrlParameter(sParam)
	{
	    var sPageURL = window.location.search.substring(1);
	    var sURLVariables = sPageURL.split('&');
	    for (var i = 0; i < sURLVariables.length; i++) 
	    {
	        var sParameterName = sURLVariables[i].split('=');
	        if (sParameterName[0].toLowerCase() === sParam) 
	        {
	            return sParameterName[1];
	        }
	    }
	}
	$searchBy = getUrlParameter('searchby')+"";
	if($searchBy.toLowerCase() === "title"){
		$("ul#listSearch > li > input[value='title']").prop('checked', true);
		$("ul#listSearch > li > input[value='ingredient']").prop('checked', false);
		$("ul#listSearch > li > input[value='account']").prop('checked', false);
		$("button.dropdown-cat-search").html($("ul#listSearch > li > label[for='search-title']").find("i").clone());
		$("button.dropdown-cat-search").prop('title','Search Recipe By Title');
		$("#searchbar").attr("placeholder", "Search Recipe By Title");
		$("#searchbar").addClass("search-title");
		$("#searchbar").removeClass("search-ingredient");
		$("#searchbar").removeClass("search-account");
		initTypeahead("search-title");
	}
	if($searchBy.toLowerCase() === "ingredient"){
		$("ul#listSearch > li > input[value='title']").prop('checked', false);
		$("ul#listSearch > li > input[value='ingredient']").prop('checked', true);
		$("ul#listSearch > li > input[value='account']").prop('checked', false);
		$("button.dropdown-cat-search").html($("ul#listSearch > li > label[for='search-ingredient']").find("i").clone());
		$("button.dropdown-cat-search").prop('title','Search Recipe By Ingredient');
		$("#searchbar").attr("placeholder", "Search Recipe By Ingredient");
		$("#searchbar").addClass("search-ingredient");
		$("#searchbar").removeClass("search-title");
		$("#searchbar").removeClass("search-account");
		initTypeahead("search-ingredient");
	}
	if($searchBy.toLowerCase() === "account"){
		$("ul#listSearch > li > input[value='title']").prop('checked', false);
		$("ul#listSearch > li > input[value='ingredient']").prop('checked', false);
		$("ul#listSearch > li > input[value='account']").prop('checked', true);
		$("button.dropdown-cat-search").html($("ul#listSearch > li > label[for='search-account']").find("i").clone());
		$("button.dropdown-cat-search").prop('title','Search Account');
		$("#searchbar").attr("placeholder", "Search Account");
		$("#searchbar").removeClass("search-title");
		$("#searchbar").removeClass("search-ingredient");
		$("#searchbar").addClass("search-account");
		initTypeahead("search-account");
	}
	$('#searchbar').keydown(function (e) {
	  if (e.which == 13) {
	  	$(".dropdown-menu").css("display","none");
	    $('form#form-search').submit();
	  }
	});     
	/*
	event for add ingredient
	*/
	$countIngredient = $(".ingredient-item").length;
	if($countIngredient == 1){
		$("#remove-ingredient").hide();
	}

	$colAddRemoveBtnIngredient = $("#add-and-remove-btn-ingredient").clone();
	$(document).on('click',"#add-ingredient",function(){
		$countIngredient++;
		$ingredientItem = 	"<div class='col-sm-10 col-xs-10 col-no-padding ingredient-item animated fadeInDown'>"+"<div class='col-sm-5 col-xs-5'>"+"<input type='text' value='' name='ingredient_subject[]' class='form-control input-ingredient' placeholder='Ingredient Name'>"+"</div>"+"<div class='col-sm-3 col-xs-3 col-no-padding-left'>"+"<input type='text' step='0.01' value='' name='ingredient_quantity[]' class='form-control' placeholder='Quantity'>"+"</div>"+"<div class='col-sm-3 col-xs-3 col-no-padding-left'>"+"<input type='text' value='' name='ingredient_unit[]'' class='form-control ingredient-unit' autocomplete='off' placeholder='Unit'>"+"</div>"+"<div class='col-sm-1 col-xs-1 col-no-padding-left' style='padding:10px 0'><i class='fa fa-info-circle icons-secondary fa-lg' role='button' title='Info Ingredient' data-toggle='popover-x' data-target='#ingredient-"+$countIngredient+"' data-placement='right'></i><div id='ingredient-"+$countIngredient+"' class='popover popover-default'><div class='arrow'></div><div class='popover-title'><span class='close' data-dismiss='popover-x'>&times;</span>Information Ingredient</div><div class='popover-content'><textarea class='form-control' name='ingredient_info[]'></textarea></div></div></div></div>";
		$("#add-and-remove-btn-ingredient").remove();
		$("#ingredient-entry").append($ingredientItem);
		$("#ingredient-entry").append($colAddRemoveBtnIngredient);
		$("#remove-ingredient").show();
		
		$hasChanged = true;
		$(".ingredient-item > div > .input-ingredient").last().focus();
		$(".ingredient-unit").typeahead({
		    source: units.ttAdapter(),
		    items: 4
		});
	});
	$(document).on('click',"#remove-ingredient",function(){
		$("#add-and-remove-btn-ingredient").remove();
		$(".ingredient-item:last").remove();
		$("#ingredient-entry").append($colAddRemoveBtnIngredient);
		$countIngredient--;
		if($countIngredient>1){
			$("#remove-ingredient").show();	
		}
		else{
			$("#remove-ingredient").hide();	
		}
		$hasChanged = true;
	});

	/*
	event for add step
	*/
	$countStep = $(".step-item").length;
	if($countStep == 1){
		$("#remove-step").hide();
	}
	$colAddRemoveBtnStep = $("#add-and-remove-btn-step").clone();
	$(document).on('click',"#add-step",function(){
		$countStep++;
		$.get($baseurl+"/processAjax/addStepImage/"+$recipeId+"/"+$countStep, function( data ) {
			if(data.status == '1'){
		  		/*console.log(data.message);  */		
		  	}
		  	else{
		  		/*console.log(data.message);*/
		  	}
		},"json");
		$stepItem = "<div class='col-sm-10 col-xs-10 col-no-padding step-item animated fadeInDown'>"+"<div class='col-sm-8 col-xs-7 col-no-padding-right'>"+"<textarea class='form-control' rows='6' name='step-description[]' placeholder='Steps'></textarea>"+"</div>"+"<div class='col-sm-4 col-xs-5'>"+"<input class='image-steps' name='photo-step' data-src='/foodoof/assets/img/step-default.jpg' index='"+$countStep+"' data-title='new step' type='file' accept='image/*'>"+"</div>"+"</div>";
		$("#add-and-remove-btn-step").remove();
		$("#step-entry").append($stepItem);
		$("#step-entry").append($colAddRemoveBtnStep);
		$("#remove-step").show();
		$(".step-item > div > textarea").last().focus();
		/*
		init pick photo for new step
		*/
		$input = $(".image-steps[index='"+($countStep)+"']");
		$input.fileinput({
			previewFileType: "image",
			browseClass: "btn button-default btn-block",
			browseLabel: "  Pick Image",
			browseIcon: '<i class="fa fa-image"> </i>',
			showCaption: false,
			showRemove: false,
			showUpload: false,
			uploadUrl: $baseurl+"/processAjax/uploadStepsRecipe/"+$recipeId+"/", // server upload action
			uploadAsync: false,	
			previewTemplates: {
		    	image: "<div class='file-preview-frame' id='{previewId}' data-fileindex='{fileindex}'>\n" +
	        "   <img src='{data}' class='file-preview-image img-responsive' title='{caption}' alt='{caption}'>\n" +
	        "   {footer}\n" +
	        "</div>\n",
		    },
		    layoutTemplates:{
		    	preview: "<div class='file-preview {class}''>\n" +
			        "    <div class='close fileinput-remove' style='display:none'>&times;</div>\n" +
			        "    <div class=''>\n" +
			        "    <div class='file-preview-thumbnails'>\n" +
			        "    </div>\n" +
			        "    <div class='clearfix'></div>" +
			        "    <div class='file-preview-status text-center text-success'></div>\n" +
			        "    <div class='kv-fileinput-error'></div>\n" +
			        "    </div>\n" +
			        "</div>",
			    progress: '<div class="progress" style="display:none;">\n' +
			        '    <div class="{class}" role="progressbar" aria-valuenow="{percent}" aria-valuemin="0" aria-valuemax="100" style="width:{percent}%;">\n' +
			        '        {percent}%\n' +
			        '     </div>\n' +
			        '</div>',
		    },
			initialPreview: [
	        	"<img src='"+$input.data("src")+"' class='file-preview-image img-responsive' alt='"+$input.data("title")+"' title='"+$input.data("title")+"'>",
	    	],
		    uploadExtraData:
		    		function() {
					    return {
					       no_step: $countStep,
					    };
					}
		    ,
		    overwriteInitial: true,
		    maxFileSize: 500,
		}).on("filebatchselected", function(event, files) {
	    	// trigger upload method immediately after files are selecte
	    	$input.fileinput("upload");
		});
		$input.on('filelock', function(event, filestack, extraData) {
		    $lock++;
		    $hasChanged = true;
	    });
	    $input.on('fileunlock', function(event, filestack, extraData) {
		    $lock-=2;
		    if ($submitStatus){
		    	$("form").trigger("submit");
		    }
	    });
	});

	$(document).on('click',"#remove-step",function(){
		$("#add-and-remove-btn-step").remove();
		$(".step-item:last").remove();
		$("#step-entry").append($colAddRemoveBtnStep);
		$.get($baseurl+"/processAjax/removeStepImage/"+$recipeId+"/"+$countStep, function( data ) {
			if(data.status == '1'){
		  		/*console.log(data.message); */ 		
		  	}
		  	else{
		  		/*console.log(data.message);*/
		  	}
		},"json");
		$countStep--;
		if($countStep>1){
			$("#remove-step").show();	
		}
		else{
			$("#remove-step").hide();	
		}
		$hasChanged = true;
	});

	/*
	handler event click save rating recipe
	*/
	$(document).on("click", ".rating-container", function(){
		$valueRating = $("#rating-recipe").val();
		$recipeIdView = $("#rating-recipe").data("recipeid");
		$.get( $baseurl+"/processAjax/setRating/"+$recipeIdView+"/"+$valueRating, function( data ) {
		  	if(data.status == '1'){
		  		$.notify({
					// options
					message: data.message 
				},{
					// settings
					mouse_over:'pause',
					newest_on_top: true,
					allow_dismiss: false,
					type: 'success',
					delay: 1500,
					placement: {
						from: 'top',
						align: 'center'
					},
				});  	
		  	}
		  	else{
		  		/*console.log(data.message);*/
		  	}
		},"json");
	});

	/*
	handler event click add favorite recipe
	*/
	$(document).on("click", "#add-favorite", function(){
		$.get( $baseurl+"/processAjax/setFavorite/"+$(this).data("recipeid"), function( data ) {
		  	if(data.status == '1'){
		  		$.notify({
					// options
					message: data.message
				},{
					// settings
					mouse_over:'pause',
					newest_on_top: true,
					allow_dismiss: false,
					type: 'success',
					delay: 1500,
					placement: {
						from: 'top',
						align: 'center'
					},
				});  		
		  	}
		  	else{
		  		$.notify({
					// options
					message: data.message 
				},{
					// settings
					mouse_over:'pause',
					newest_on_top: true,
					allow_dismiss: false,
					type: 'warning',
					delay: 1500,
					placement: {
						from: 'top',
						align: 'center'
					},
				});  	
		  	}
		},"json");
	});
	$(document).on("click", "#remove-favorite", function(){
		$.get( $baseurl+"/processAjax/setFavorite/"+$(this).data("recipeid"), function( data ) {
		  	if(data.status == '1'){
		  		$.notify({
					// options
					message: data.message
				},{
					// settings
					mouse_over:'pause',
					newest_on_top: true,
					allow_dismiss: false,
					type: 'success',
					delay: 1500,
					placement: {
						from: 'top',
						align: 'center'
					},
				});
				$("#remove-favorite").parent().parent().parent().slideToggle();  		
		  	}
		  	else{
		  		$.notify({
					// options
					message: data.message 
				},{
					// settings
					mouse_over:'pause',
					newest_on_top: true,
					allow_dismiss: false,
					type: 'warning',
					delay: 1500,
					placement: {
						from: 'top',
						align: 'center'
					},
				});  	
		  	}
		},"json");
	});

	/*
	handler event click add cook-later recipe
	*/
	$(document).on("click", "#add-cook-later", function(){
		$.get( $baseurl+"/processAjax/setCookLater/"+$(this).data("recipeid"), function( data ) {
		  	if(data.status == '1'){
		  		$.notify({
					// options
					message: data.message 
				},{
					// settings
					mouse_over:'pause',
					newest_on_top: true,
					allow_dismiss: false,
					type: 'success',
					delay: 1500,
					placement: {
						from: 'top',
						align: 'center'
					},
				});  		
		  	}
		  	else{
		  		$.notify({
					// options
					message: data.message 
				},{
					// settings
					mouse_over:'pause',
					newest_on_top: true,
					allow_dismiss: false,
					type: 'warning',
					delay: 1500,
					placement: {
						from: 'top',
						align: 'center'
					},
				});  	
		  	}
		},"json");
	});

	/*
	handler event click publish recipe
	*/
	$(document).on("change", ".checkedPublish", function(){
		var check = $(this).prop('checked');
		$.get( $baseurl+"/processAjax/setPublish/"+$(this).val(), function( data ) {
		  	if(data.status == '1'){
		  		$.notify({
					// options
					message: data.message 
				},{
					// settings
					mouse_over:'pause',
					newest_on_top: true,
					allow_dismiss: false,
					type: 'success',
					delay: 1500,
					placement: {
						from: 'top',
						align: 'center'
					},
				});  		
		  	}
		  	else{
		  		$.notify({
					// options
					message: data.message 
				},{
					// settings
					mouse_over:'pause',
					newest_on_top: true,
					allow_dismiss: false,
					type: 'warning',
					delay: 1500,
					placement: {
						from: 'top',
						align: 'center'
					},
				});  	
		  	}
		},"json");
	});

	/*
	handler buat submit form
	*/
	$("form").on("submit", function(e){
		if($lock>0){
			e.preventDefault();
			$("#modalWaiting").modal("show");
		}
		else if(!$validateDuplicate){
			e.preventDefault();
			$.notify({
				// options
				message: "There Are Duplicate Ingredient."
			},{
				// settings
				mouse_over:'pause',
				newest_on_top: true,
				allow_dismiss: false,
				type: 'danger',
				delay: 5000,
				placement: {
					from: 'top',
					align: 'center'
				},
			});
		}
		else if(!$validatePassword){
			e.preventDefault();
			$.notify({
			// options
				message: "Your Old and New Password is Same, Please Change." 
			},{
				// settings
				mouse_over:'pause',
				newest_on_top: true,
				allow_dismiss: false,
				type: 'danger',
				delay: 2000,
				placement: {
					from: 'top',
					align: 'center'
				},
			});
		}
		else{
			$hasChanged = false;
			$("#modalWaiting").modal("hide");	
		}
	});

	$(window).bind('beforeunload', function(){ 
		if($hasChanged){
			return 'You have unsaved changes!';	
		}
		else{
			return ;
		}
	});
	$("form#form-search").on("submit", function(e){
		if( $("#searchbar").val().trim().length == 0 )
			e.preventDefault();
	});

	/*
	handle click untuk create resep bila belum login
	*/
	$("#createRecipeMenubar").click(function(e){
		$('.btn-popover').popover('show');	
	});

	/*
	init admin page
	*/
	$(".checkedHighlight").each(function(i){
		if($(this).prop('checked')){
			$idHighlight = $(this).val();
			$addHighlightRecipe="<div class='col-md-12 list-group-item' data-id='"+$idHighlight+"'title='highlight setting'><div class='col-md-3 col-xs-3 col-no-padding'><img class='img-responsive' src='"+$baseurlnoConflict+$(this).data('imgsrc')+"'/></div><div class='col-md-9 col-xs-9'>"+$(this).data('recipename')+"</div></div>";
			$("#listHightlight").append($addHighlightRecipe);
		}
	});
	/*
	handle for check highlight recipe
	*/
	$countHighlight = $("#listHightlight > .list-group-item").length;
	$(document).on('change', ".checkedHighlight", function(e){
		$hasChanged = true;
		$idHighlight = $(this).val();
		if($(this).prop('checked')){
			if($countHighlight < 5){
				$addHighlightRecipe="<div class='col-md-12 list-group-item' data-id='"+$idHighlight+"'title='highlight setting'><div class='col-md-3 col-xs-3 col-no-padding'><img class='img-responsive' src='../"+$(this).data('imgsrc')+"'/></div><div class='col-md-9 col-xs-9'>"+$(this).data('recipename')+"</div></div>";
				$("#listHightlight").append($addHighlightRecipe);
				$countHighlight++;
			}
			else{
				$.notify({
					// options
					message: "You have selected 5 recipes" 
				},{
					// settings
					mouse_over:'pause',
					newest_on_top: true,
					allow_dismiss: false,
					type: 'warning',
					delay: 1500,
					placement: {
						from: 'top',
						align: 'center'
					},
				});
				$(this).prop('checked', false);
			}
		}
		else{
			$("#listHightlight").find(".list-group-item[data-id='"+$idHighlight+"']").remove();
			$countHighlight--;	
		}

	});

	/*
	handle if has change in page
	*/
	$("input .option-category-recipe").change(function(e){
		$hasChanged = true;
	});
	$(".ingredient-item > div > input").change(function(e){
		$hasChanged = true;
	});
	$(".step-item > div > textarea").change(function(e){
		$hasChanged = true;
	});
	$("input.form-profile").change(function(e){
		$hasChanged = true;
	});

	/*
	validate same ingredient
	*/
	$(document).on("change", ".input-ingredient", function(x){
		$indexValidation = $(".input-ingredient").index(this);
		$valueIngredient = $(this).val().toLowerCase();
		$validateDuplicate = true;
		$(".ingredient-item > div > .input-ingredient").each(function(e){
			if(e != $indexValidation){
				if($(this).val().toLowerCase() == $valueIngredient){
					$validateDuplicate = false;
					$.notify({
						// options
						message: "There are duplicate in ingredient" 
					},{
						// settings
						element: "body",
						mouse_over:'pause',
						newest_on_top: true,
						allow_dismiss: false,
						type: 'danger',
						delay: 5000,
						placement: {
							from: 'top',
							align: 'center'
						},
					});
				}
			}
		});
	});

	/*
	validate old and new password
	*/
	$("input[type='password'][name='old_password']").change(function(e){
		if($(this).val()==$("input[type='password'][name='new_password']").val()){
			$validatePassword=false;
			$.notify({
			// options
				message: "Your Old and New Password is Same, Please Change." 
			},{
				// settings
				mouse_over:'pause',
				newest_on_top: true,
				allow_dismiss: false,
				type: 'danger',
				delay: 2000,
				placement: {
					from: 'top',
					align: 'center'
				},
			});
		}
		else{
			$validatePassword=true;
		}
	});
	$("input[type='password'][name='new_password']").change(function(e){
		if($(this).val()==$("input[type='password'][name='old_password']").val()){
			$validatePassword=false;
			$.notify({
			// options
				message: "Your Old and New Password is Same, Please Change." 
			},{
				// settings
				mouse_over:'pause',
				newest_on_top: true,
				allow_dismiss: false,
				type: 'danger',
				delay: 2000,
				placement: {
					from: 'top',
					align: 'center'
				},
			});
		}
		else{
			$validatePassword=true;
		}
	});
	/*
	show alert
	*/
	if($("#alert-notification").data('status')=='success'){
		$.notify({
			// options
			message: $("#alert-notification").data('message') 
		},{
			// settings
			mouse_over:'pause',
			newest_on_top: true,
			allow_dismiss: false,
			type: 'success',
			delay: 2000,
			placement: {
				from: 'top',
				align: 'center'
			},
		});
	}
	if($("#alert-notification").data('status')=='failed'){
		$.notify({
			// options
			message: $("#alert-notification").data('message') 
		},{
			// settings
			mouse_over:'pause',
			newest_on_top: true,
			allow_dismiss: false,
			type: 'danger',
			delay: 2000,
			placement: {
				from: 'top',
				align: 'center'
			},
		});
	}

	if($("#alert-notification").data('status')=='warning'){
		$.notify({
			// options
			message: $("#alert-notification").data('message') 
		},{
			// settings
			mouse_over:'pause',
			newest_on_top: true,
			allow_dismiss: false,
			type: 'warning',
			delay: 2000,
			placement: {
				from: 'top',
				align: 'center'
			},
		});
	}

	/*
	slide menubar
	*/
	$("#btn-login-slide-menu").click(function(){
		$("#loginform-slide-menu").removeClass('hidden');
		$("#loginform-slide-menu").addClass('animated fadeInDown');
		$(this).addClass('hidden');
		$("#btn-join-slide-menu").removeClass('btn-group');
	});

	// Floating label headings for the contact form
	$(function() {
	    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
	        $(this).toggleClass("floating-label-form-group-with-value", !! $(e.target).val());
	    }).on("focus", ".floating-label-form-group", function() {
	        $(this).addClass("floating-label-form-group-with-focus");
	    }).on("blur", ".floating-label-form-group", function() {
	        $(this).removeClass("floating-label-form-group-with-focus");
	    });
	});

	/*
	carousel related recipe
	*/
	$carouselActiveFirst=0;
	$carouselActiveLast=2;
	$sizeRelatedRecipe = $(".related-recipe-entry").length;
	var owl = $('.owl-carousel');
	owl.owlCarousel({
	    nav:false,
	    margin:4,
	    dots:false,
	    onTranslated : dragNxtPrev,
	    responsive:{
	        0:{
	            items:1
	        },
	        600:{
	            items:3
	        },            
	        960:{
	            items:3
	        },
	        1200:{
	            items:3
	        }
	    }
	});
	owl.on('mousewheel', '.owl-stage', function (e) {
	    if (e.deltaY>0) {
	        owl.trigger('next.owl');
	        if($carouselActiveLast<($sizeRelatedRecipe-1)){
	        	$carouselActiveLast++;
				$carouselActiveFirst++;
				if($carouselActiveLast==($sizeRelatedRecipe-1)){
					$(".carousel-related-recipe.right").addClass("disabled hide");	
				}
				else{
					$(".carousel-related-recipe.right").removeClass("disabled hide");	
				}
				$(".carousel-related-recipe.left").removeClass("disabled hide");
	        }
	    } else {
	        owl.trigger('prev.owl');
	        if($carouselActiveFirst>0){
	        	$carouselActiveLast--;
				$carouselActiveFirst--;
				if($carouselActiveFirst==0){
					$(".carousel-related-recipe.left").addClass("disabled hide");	
				}
				else{
					$(".carousel-related-recipe.left").removeClass("disabled hide");	
				}
				$(".carousel-related-recipe.right").removeClass("disabled hide");
	        }
	    }
	    e.preventDefault();
	});
	$(".carousel-related-recipe.left").click(function(e){
		owl.trigger('prev.owl');
		$carouselActiveLast--;
		$carouselActiveFirst--;
		if($carouselActiveFirst==0){
			$(this).addClass("disabled hide");	
		}
		else{
			$(this).removeClass("disabled hide");	
		}
		$(".carousel-related-recipe.right").removeClass("disabled hide");
	});
	$(".carousel-related-recipe.right").click(function(e){
		owl.trigger('next.owl');
		$carouselActiveLast++;
		$carouselActiveFirst++;
		if($carouselActiveLast==($sizeRelatedRecipe-1)){
			$(this).addClass("disabled hide");	
		}
		else{
			$(this).removeClass("disabled hide");	
		}
		$(".carousel-related-recipe.left").removeClass("disabled hide");
	});
	function dragNxtPrev(event) {
	  	$tmp = $(".active");
	    $firstActive = $( ".owl-item" ).index($tmp);
	    $diff = Math.abs($firstActive-$carouselActiveFirst);
	    if($carouselActiveFirst < $firstActive){
	    	if($carouselActiveLast<($sizeRelatedRecipe-1)){
				$carouselActiveLast += $diff; 
				$carouselActiveFirst += $diff;
				if($carouselActiveLast==($sizeRelatedRecipe-1)||$firstActive==($sizeRelatedRecipe-3)){
					$(".carousel-related-recipe.right").addClass("disabled hide");	
				}
				else{
					$(".carousel-related-recipe.right").removeClass("disabled hide");	
				}
				$(".carousel-related-recipe.left").removeClass("disabled hide");
			}
	  	}
	  	else if($firstActive==0 || $firstActive==($sizeRelatedRecipe-3)){
	  		if($firstActive==0){
	  			$(".carousel-related-recipe.left").addClass("disabled hide");
	  			$(".carousel-related-recipe.right").removeClass("disabled hide");
	  		}
	  		else{
	  			$(".carousel-related-recipe.right").addClass("disabled hide");
	  			$(".carousel-related-recipe.left").removeClass("disabled hide");
	  		}
	  	}
	  	else{
	  		if($carouselActiveFirst>0){
		  		$carouselActiveLast -= $diff;
				$carouselActiveFirst -= $diff;
				if($carouselActiveFirst==0){
					$(".carousel-related-recipe.left").addClass("disabled hide");	
				}
				else{
					$(".carousel-related-recipe.left").removeClass("disabled hide");	
				}
				$(".carousel-related-recipe.right").removeClass("disabled hide");
			}
	  	}
	}
	/*
	comment
	*/
	$("textarea").on('autosize:resized', function(){
	    $height = $(this).height()+7;
		$(this).parent().css("margin-top",$height);
		$(this).css("margin-top", -($height-7));
	});
	
	/*
	typehead
	*/
	// instantiate the bloodhound suggestion engine
	var units = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.whitespace,
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		local:  [
		            "batang", "buah", "biji", "botol", "bungkus", 
		            "cc", "gram", "helai", "kg", "kilogram", "liter", "ml", 
		            "ons", "sdm", "sdt", "secukupnya", "siung"
		        ]
	});

	// initialize the bloodhound suggestion engine
	units.initialize();
	$(".ingredient-unit").typeahead({
	    source: units.ttAdapter(),
	    items: 4
	});
	function extractor(query) {
        var result = /([^,]+)$/.exec(query);
        if(result && result[1])
            return result[1].trim();
        return '';
    }
	function initTypeahead(classname){
		if(classname=="search-ingredient"){
			$.get('/foodoof/index.php/processAjax/getAllIngredient', function(data){
			    $("."+classname).typeahead({
				source: data,
		        items: 4,
			    updater: function(item) {
		            return this.$element.val().replace(/[^,]*$/,'')+item+', ';
		        },
		        matcher: function (item) {
		          var tquery = extractor(this.query);
		          if(!tquery) return false;
		          return ~item.toLowerCase().indexOf(tquery)
		        },
		        highlighter: function (item) {
		          $("ul.typeahead.dropdown-menu").addClass("bullet");
		          $("ul.typeahead.dropdown-menu").addClass("pull-center");
		          var query = extractor(this.query).replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&')
		          return item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
		            return '<strong>' + match + '</strong>'
		          })
		        }
			});
			},'json');
		}
		else{

		}
	}

	/*
		init tag input
	*/
	$.get($baseurl+'/processAjax/getAllUsers', function(data){
		$("#users-conversation").tagsinput({
		  	itemValue: 'value',
		  	itemText: 'text',
		  	typeahead: {
		    	source: data,
		  	}
		});
	},"json");
	$.get($baseurl+'/processAjax/getAllUsers/true', function(data){
		$("#users-email").tagsinput({
		  	itemValue: 'value',
		  	itemText: 'text',
		  	typeahead: {
		    	source: data,
		  	}
		});
	},"json");

	/*
	detail report
	*/
	$(".details-button").on("click", function(e){
		$(this).parent().next().slideToggle("slow");;
	});
	$("#add-entry-catalog").on("click", function(e){
		if($(this).parent().next().css("display")=="none"){
			$(this).find("i").removeClass("fa-plus");
			$(this).find("i").addClass("fa-times");
			$(this).find("span").html("Cancel");
		}
		else{
			$(this).find("i").addClass("fa-plus");
			$(this).find("i").removeClass("fa-times");
			$(this).find("span").html("Add Entry");	
		}
		$(this).parent().next().slideToggle("slow");;
	});
	
	/*
		init table catalog
	*/
	$("#catalog-table").dataTable();
	$('.edit').editable({
	    mode: "inline",
	    url: $baseurl+"/tempview/updateCatalogAjax",
	    success: function(response, newValue) {
	    	response = $.parseJSON(response);
		    if(response.status==="success"){
		    	$.notify({
					// options
					message: response.message 
				},{
					// settings
					mouse_over:'pause',
					newest_on_top: true,
					allow_dismiss: false,
					type: 'success',
					delay: 2000,
					placement: {
						from: 'top',
						align: 'center'
					},
				});
		    }
		    else{
		    	$.notify({
					// options
					message: response.message 
				},{
					// settings
					mouse_over:'pause',
					newest_on_top: true,
					allow_dismiss: false,
					type: 'warnig',
					delay: 2000,
					placement: {
						from: 'top',
						align: 'center'
					},
				});		
		    }
		}
	});
	/*
		generate harga
	*/
	$(document).on("click","#generate-price", function(e){
		$("#panel-price").slideToggle("slow");
		if($(this).data("status")==0){
			$.get($baseurl+"/tempview/generatePrice/"+$(this).data("recipeid"), function( data ) {
				if(data.status == '1'){
					$("#panel-price").html("Rp."+data.price+";-");
			  	}
			  	else{
			  		
			  	}
			},"json");
		}
	});

	/*
		filter resep
	*/
	function getUrlParameterArray(sParam)
	{
	    var sPageURL = window.location.search.substring(1);
	    var sURLVariables = sPageURL.split('&');
	    $data = new Array();
	    for (var i = 0; i < sURLVariables.length; i++) 
	    {
	        var sParameterName = sURLVariables[i].split('=');
	        if (sParameterName[0].toLowerCase() === sParam) 
	        {
	        	sParameterName[1] = sParameterName[1].replace("+"," ");
	     		$data.push(sParameterName[1]);
	        }
	    }
	    return $data;
	}
	if($searchBy.toLowerCase()=="title" || $searchBy.toLowerCase()=="ingredient"){
		$catFilter = getUrlParameterArray("ex2").sort();
		$selectedfilter = "";
		for(var i=0; i < $catFilter.length; i++){
			$("ul#filterCategory > li").each(function(z){
				if(($(this).find("label").html().toLowerCase()) == ($catFilter[i].toLowerCase())){
					$(this).find("input").prop("checked", true);
					if(i==0){
						$selectedfilter += $(this).find("label").html();
					}
					else{
						$selectedfilter += ", "+ $(this).find("label").html();
					}
				}
			});
		}
		if($selectedfilter==""){
			$selectedfilter = "All Category";
		}
		$("ul#filterCategory").prev().html($selectedfilter+"      <span class='caret'></span>");
	}

	/*
		Conversation
	*/
	if($("#icon-message").data("countmessage")>0){
		$("#icon-message").iosbadge({ theme: 'ios', size: 22, content: $("#icon-message").data("countmessage") });	
	}
	$(".conversation-list-item").each(function(i){
		if($(this).data("countmessage")>0){
			$(this).iosbadge({ theme: 'ios', size: 28, content: $(this).data("countmessage") });	
		}
	});
	$("ul.message-list-group").animate({ scrollTop: $("ul.message-list-group").height() });

	/*
	init javascript bootstrap;
	*/
	$('.carousel').carousel();
    $('.btn-popover').popover();
	$(".fa.fa-info-circle.icons-secondary.fa-lg").each(function(i){
		$(this).attr("data-target", "#ingredient-"+(i+1));
		$(this).next().attr("id", "ingredient-"+(i+1));
	});
	$(document).on("show.bs.modal", ".popover", function(){
		$(this).parent().parent().removeClass("animated");
		$(this).parent().parent().removeClass("fadeInDown");
	});
	$(".info-ingredients-popover").popover();
	$("#toggle-online-user").on("click", function(e){
		if($("#panel-users").css("display")=="none"){
			$("#toggle-online-user > div > i.fa-chevron-up").removeClass("fa-chevron-up");
			$("#toggle-online-user > div.col-md-2 > i").addClass("fa-chevron-down");
		}
		else{
			$("#toggle-online-user > div > i.fa-chevron-down").removeClass("fa-chevron-down");
			$("#toggle-online-user > div.col-md-2 > i").addClass("fa-chevron-up");	
		}
		$("#panel-users").slideToggle("slow");
	});
    autosize($('textarea')); 
    $("textarea").trigger("autosize:resized");
    tinymce.init({selector:'.textarea'});
    $("#message-email").css("margin-top","10px");
});
